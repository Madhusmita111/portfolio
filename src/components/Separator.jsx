import React, { useRef, useCallback, useEffect, useState } from 'react';

const CELL_SIZE = 24;
const FADE_DURATION = 1800;

export default function Separator() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const activeCells = useRef(new Map());
  const rafId = useRef(null);
  const dimsRef = useRef({ cols: 0, rows: 0 });
  const [, forceUpdate] = useState(0);

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

    // Grid lines
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

    // Active cells
    let hasActive = false;
    activeCells.current.forEach((value, key) => {
      const elapsed = now - value.timestamp;
      if (elapsed > FADE_DURATION) {
        activeCells.current.delete(key);
        return;
      }
      hasActive = true;
      const progress = elapsed / FADE_DURATION;
      const opacity = 0.30 * (1 - progress * progress);
      const [col, row] = key.split('-').map(Number);

      ctx.fillStyle = `hsla(${value.hue}, 40%, 60%, ${opacity})`;
      ctx.fillRect(col * CELL_SIZE + 1, row * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
    });

    if (hasActive) {
      rafId.current = requestAnimationFrame(drawFrame);
    } else {
      rafId.current = null;
    }
  }, []);

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

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-20 md:h-24 cursor-crosshair relative"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
