import React, { useRef, useCallback, useEffect, useState } from 'react';

const CELL_SIZE = 24;
const FADE_DURATION = 2200;
const IDLE_INTERVAL = 120;

export default function Separator({ showHint = false }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const activeCells = useRef(new Map());
  const rafId = useRef(null);
  const dimsRef = useRef({ cols: 0, rows: 0 });
  const idlePosRef = useRef({ x: 0, y: 0, dx: 1, dy: 0, hue: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    const updateDims = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      dimsRef.current = {
        cols: Math.ceil(rect.width / CELL_SIZE),
        rows: Math.ceil(rect.height / CELL_SIZE),
      };

      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = dimsRef.current.cols * CELL_SIZE * dpr;
        canvasRef.current.height = dimsRef.current.rows * CELL_SIZE * dpr;
        const ctx = canvasRef.current.getContext('2d');
        ctx.scale(dpr, dpr);
        drawFrame();
      }

      idlePosRef.current.x = Math.floor(Math.random() * dimsRef.current.cols);
      idlePosRef.current.y = Math.floor(Math.random() * dimsRef.current.rows);
    };
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, []);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const { cols, rows } = dimsRef.current;
    if (!canvas || !cols) return;
    const ctx = canvas.getContext('2d');
    const now = Date.now();

    ctx.clearRect(0, 0, cols * CELL_SIZE, rows * CELL_SIZE);

    const computedStyle = getComputedStyle(document.documentElement);
    const sepColor = computedStyle.getPropertyValue('--separator-line').trim() || 'rgba(0,0,0,0.06)';
    ctx.strokeStyle = sepColor;
    ctx.lineWidth = 1;

    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * CELL_SIZE + 0.5, 0);
      ctx.lineTo(c * CELL_SIZE + 0.5, rows * CELL_SIZE);
      ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * CELL_SIZE + 0.5);
      ctx.lineTo(cols * CELL_SIZE, r * CELL_SIZE + 0.5);
      ctx.stroke();
    }

    let hasActive = false;
    activeCells.current.forEach((value, key) => {
      const elapsed = now - value.timestamp;
      if (elapsed > FADE_DURATION) {
        activeCells.current.delete(key);
        return;
      }
      hasActive = true;
      const progress = elapsed / FADE_DURATION;
      const opacity = 0.35 * (1 - progress * progress);
      const [col, row] = key.split('-').map(Number);

      ctx.fillStyle = `hsla(${value.hue}, 50%, 60%, ${opacity})`;
      ctx.fillRect(col * CELL_SIZE + 1, row * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
    });

    if (hasActive) {
      rafId.current = requestAnimationFrame(drawFrame);
    } else {
      rafId.current = null;
    }
  }, []);

  // Idle wandering trail
  useEffect(() => {
    const stepIdle = () => {
      if (isHovering.current) return;
      const { cols, rows } = dimsRef.current;
      if (!cols || !rows) return;

      const pos = idlePosRef.current;

      if (Math.random() < 0.15) {
        const dirs = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]];
        const d = dirs[Math.floor(Math.random() * dirs.length)];
        pos.dx = d[0];
        pos.dy = d[1];
      }

      pos.x += pos.dx;
      pos.y += pos.dy;

      if (pos.x < 0) { pos.x = 0; pos.dx = Math.abs(pos.dx); }
      if (pos.x >= cols) { pos.x = cols - 1; pos.dx = -Math.abs(pos.dx); }
      if (pos.y < 0) { pos.y = 0; pos.dy = Math.abs(pos.dy); }
      if (pos.y >= rows) { pos.y = rows - 1; pos.dy = -Math.abs(pos.dy); }

      pos.hue = (pos.hue + 7) % 360;

      const key = `${pos.x}-${pos.y}`;
      activeCells.current.set(key, { timestamp: Date.now(), hue: pos.hue });

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(drawFrame);
      }
    };

    const id = setInterval(stepIdle, IDLE_INTERVAL);
    return () => clearInterval(id);
  }, [drawFrame]);

  // Initial draw
  useEffect(() => {
    const t = setTimeout(() => drawFrame(), 50);
    return () => {
      clearTimeout(t);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [drawFrame]);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const { cols, rows } = dimsRef.current;
    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);

    if (col < 0 || col >= cols || row < 0 || row >= rows) return;

    const key = `${col}-${row}`;
    const hue = ((col * 37 + row * 53) % 360);
    activeCells.current.set(key, { timestamp: Date.now(), hue });

    if (!rafId.current) {
      rafId.current = requestAnimationFrame(drawFrame);
    }
  }, [drawFrame]);

  const handleMouseEnter = useCallback(() => { isHovering.current = true; }, []);
  const handleMouseLeave = useCallback(() => { isHovering.current = false; }, []);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Hint label — only shown for the first separator (after Hero) */}
      {showHint && (
        <div className="flex items-end gap-1 mb-1 select-none pointer-events-none self-start pl-4 md:pl-0">
          <span className="text-[12px] font-heading text-muted-light italic tracking-wide opacity-60 leading-none">
            <span className="hidden md:inline">hover to paint</span>
            <span className="md:hidden inline">tap to paint</span>
          </span>
          {/* Hand-drawn cursive arrow pointing down-right */}
          <svg width="28" height="22" viewBox="0 0 28 22" fill="none" className="text-muted-light opacity-50 -mb-0.5">
            <path
              d="M2 2C6 3 14 6 18 12C20 15 20 17 19 19"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M15 17L19 20L22 16"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      )}

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full h-20 md:h-24 cursor-crosshair relative"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}
