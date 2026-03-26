import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CELL_SIZE = 20;
const FADE_DURATION = 1200;
const TRAIL_INTERVAL = 40;

export default function Preloader({ onFinish }) {
  const canvasRef = useRef(null);
  const activeCells = useRef(new Map());
  const rafId = useRef(null);
  const dimsRef = useRef({ cols: 0, rows: 0 });
  const trailRef = useRef([]);
  const hueRef = useRef(Math.random() * 360);
  const stepCountRef = useRef(0);
  const [visible, setVisible] = useState(true);

  // Setup canvas dimensions
  useEffect(() => {
    const updateDims = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      dimsRef.current = {
        cols: Math.ceil(w / CELL_SIZE),
        rows: Math.ceil(h / CELL_SIZE),
      };
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = w * dpr;
        canvasRef.current.height = h * dpr;
        const ctx = canvasRef.current.getContext('2d');
        ctx.scale(dpr, dpr);
      }
    };
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, []);

  // Seed trails — spawn 3 independent walkers
  useEffect(() => {
    const { cols, rows } = dimsRef.current;
    trailRef.current = [
      { x: Math.floor(cols * 0.2), y: Math.floor(rows * 0.5), dx: 1, dy: 0 },
      { x: Math.floor(cols * 0.8), y: Math.floor(rows * 0.3), dx: -1, dy: 1 },
      { x: Math.floor(cols * 0.5), y: Math.floor(rows * 0.8), dx: 0, dy: -1 },
    ];
  }, []);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const { cols, rows } = dimsRef.current;
    if (!canvas || !cols) return;
    const ctx = canvas.getContext('2d');
    const now = Date.now();
    const w = cols * CELL_SIZE;
    const h = rows * CELL_SIZE;

    ctx.clearRect(0, 0, w, h);

    // Draw active cells (NO grid lines — invisible grid)
    activeCells.current.forEach((value, key) => {
      const elapsed = now - value.timestamp;
      if (elapsed > FADE_DURATION) {
        activeCells.current.delete(key);
        return;
      }
      const progress = elapsed / FADE_DURATION;
      const opacity = 0.45 * (1 - progress * progress);
      const [col, row] = key.split('-').map(Number);

      ctx.fillStyle = `hsla(${value.hue}, 60%, 55%, ${opacity})`;
      ctx.beginPath();
      ctx.roundRect(
        col * CELL_SIZE + 1,
        row * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2,
        3
      );
      ctx.fill();
    });

    if (activeCells.current.size > 0) {
      rafId.current = requestAnimationFrame(drawFrame);
    } else {
      rafId.current = null;
    }
  }, []);

  // Trail stepper
  useEffect(() => {
    const id = setInterval(() => {
      const { cols, rows } = dimsRef.current;
      if (!cols || !rows) return;

      trailRef.current.forEach((pos) => {
        if (Math.random() < 0.2) {
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

        hueRef.current = (hueRef.current + 5) % 360;

        const key = `${pos.x}-${pos.y}`;
        activeCells.current.set(key, { timestamp: Date.now(), hue: hueRef.current });
      });

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(drawFrame);
      }

      stepCountRef.current += 1;
    }, TRAIL_INTERVAL);

    return () => clearInterval(id);
  }, [drawFrame]);

  // Auto-dismiss after ~2.2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onFinish?.(), 600);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-background"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />

          {/* Center branding */}
          <div className="relative z-10 flex flex-col items-center gap-3 select-none pointer-events-none">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl md:text-3xl font-heading tracking-tight"
              style={{ color: 'var(--ink-blue)' }}
            >
              Madhusmita
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-[2px] w-20 origin-left"
              style={{ background: 'var(--ink-blue)' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
