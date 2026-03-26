import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CELL_SIZE = 10;
const FADE_DURATION = 1200;
const TRAIL_INTERVAL = 25;
const BAR_W = 320;
const BAR_H = 14;

export default function Preloader({ onFinish }) {
  const canvasRef = useRef(null);
  const activeCells = useRef(new Map());
  const rafId = useRef(null);
  const trailRef = useRef([]);
  const hueRef = useRef(Math.random() * 360);
  const [visible, setVisible] = useState(true);

  const cols = Math.ceil(BAR_W / CELL_SIZE);
  const rows = Math.ceil(BAR_H / CELL_SIZE);

  // Setup canvas
  useEffect(() => {
    if (canvasRef.current) {
      const dpr = window.devicePixelRatio || 1;
      canvasRef.current.width = BAR_W * dpr;
      canvasRef.current.height = BAR_H * dpr;
      const ctx = canvasRef.current.getContext('2d');
      ctx.scale(dpr, dpr);
    }

    // Seed walkers
    trailRef.current = [
      { x: 0, y: 0, dx: 1 },
      { x: Math.floor(cols * 0.25), y: 0, dx: 1 },
      { x: Math.floor(cols * 0.5), y: 0, dx: 1 },
      { x: Math.floor(cols * 0.75), y: 0, dx: 1 },
      { x: cols - 1, y: 0, dx: -1 },
    ];
  }, [cols]);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const now = Date.now();

    ctx.clearRect(0, 0, BAR_W, BAR_H);

    activeCells.current.forEach((value, key) => {
      const elapsed = now - value.timestamp;
      if (elapsed > FADE_DURATION) {
        activeCells.current.delete(key);
        return;
      }
      const progress = elapsed / FADE_DURATION;
      const opacity = 0.7 * (1 - progress * progress);
      const col = Number(key);

      ctx.fillStyle = `hsla(${value.hue}, 70%, 60%, ${opacity})`;
      ctx.fillRect(col * CELL_SIZE, 0, CELL_SIZE - 1, BAR_H);
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
      trailRef.current.forEach((pos) => {
        if (Math.random() < 0.08) {
          pos.dx = pos.dx > 0 ? -1 : 1;
        }

        pos.x += pos.dx;

        // Wrap horizontally
        if (pos.x < 0) pos.x = cols - 1;
        if (pos.x >= cols) pos.x = 0;

        hueRef.current = (hueRef.current + 6) % 360;

        activeCells.current.set(String(pos.x), { timestamp: Date.now(), hue: hueRef.current });
      });

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(drawFrame);
      }
    }, TRAIL_INTERVAL);

    return () => clearInterval(id);
  }, [drawFrame, cols]);

  // Auto-dismiss
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onFinish?.(), 600);
    }, 2500);
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
          className="fixed inset-0 z-999 flex items-center justify-center bg-background"
        >
          <div className="relative z-10 flex flex-col items-center gap-6 select-none pointer-events-none w-full max-w-xl px-6">
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-8xl font-heading tracking-tighter text-center text-foreground"
            >
              Madhusmita
            </motion.h1>
            
            {/* Loading Bar — fixed size canvas, not dependent on layout */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative overflow-hidden rounded-sm"
              style={{ width: BAR_W, height: BAR_H }}
            >
              <canvas
                ref={canvasRef}
                style={{ width: BAR_W, height: BAR_H }}
                className="block"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
