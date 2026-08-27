import React, { useEffect, useRef } from 'react';

interface RomanticCanvasProps {
  isCelebration?: boolean;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  wobble: number;
  wobbleSpeed: number;
  color: string;
  opacity: number;
  layer: number; // For depth/parallax
}

interface Sparkle {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
  pulseSpeed: number;
  pulse: number;
}

interface FloatingHeart {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
  wobble: number;
  wobbleSpeed: number;
}

interface TouchSparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

export const RomanticCanvas: React.FC<RomanticCanvasProps> = ({ isCelebration = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const touchSparklesRef = useRef<TouchSparkle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color palettes
    const petalColors = [
      '#e11d48', // rose-600
      '#be123c', // rose-700
      '#9f1239', // rose-800
      '#fb7185', // rose-400
      '#fda4af', // rose-300
      '#881337', // rose-900 (deep velvet)
    ];

    const sparkleColors = ['#fde68a', '#fbbf24', '#f59e0b', '#fecdd3', '#ffffff', '#fed7aa'];
    const heartColors = ['#f43f5e', '#fb7185', '#fda4af', '#f472b6', '#e11d48'];

    // Spawn Petals
    const petalCount = isCelebration ? (width < 768 ? 38 : 65) : (width < 768 ? 20 : 35);
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 12 + 10,
        speedY: Math.random() * 0.9 + 0.6,
        speedX: (Math.random() - 0.5) * 0.7,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.025,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        opacity: Math.random() * 0.4 + 0.5,
        layer: Math.random() * 0.5 + 0.5,
      });
    }

    // Spawn Sparkles / Golden Embers
    const sparkleCount = isCelebration ? (width < 768 ? 45 : 80) : (width < 768 ? 25 : 45);
    const sparkles: Sparkle[] = [];

    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        maxRadius: Math.random() * 3 + 2,
        speedY: -(Math.random() * 0.5 + 0.2),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Spawn Floating Hearts
    const heartCount = isCelebration ? (width < 768 ? 12 : 20) : (width < 768 ? 6 : 10);
    const hearts: FloatingHeart[] = [];

    for (let i = 0; i < heartCount; i++) {
      hearts.push({
        x: Math.random() * width,
        y: height + Math.random() * 200,
        size: Math.random() * 10 + 8,
        speedY: -(Math.random() * 0.6 + 0.4),
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.4 + 0.25,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Draw single realistic rose petal
    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.sin(p.wobble) * 0.6 + 0.7, 1);
      ctx.globalAlpha = p.opacity;

      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      // Soft organic curve of rose petal
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.8, p.size * 0.9, p.size * 0.4, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.4, -p.size * 0.8, -p.size * 0.8, 0, -p.size);
      ctx.closePath();

      // Petal velvet gradient
      const grad = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
      grad.addColorStop(0, p.color);
      grad.addColorStop(0.7, p.color);
      grad.addColorStop(1, '#4c0519'); // subtle velvet depth
      ctx.fillStyle = grad;
      ctx.fill();

      // Subtle rose petal highlight vein
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.7);
      ctx.quadraticCurveTo(p.size * 0.1, 0, 0, p.size * 0.7);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();
    };

    // Draw Heart
    const drawHeart = (h: FloatingHeart) => {
      ctx.save();
      ctx.translate(h.x, h.y);
      ctx.globalAlpha = h.opacity;
      ctx.fillStyle = h.color;

      const s = h.size / 15;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-5 * s, -12 * s, -15 * s, -5 * s, 0, 10 * s);
      ctx.bezierCurveTo(15 * s, -5 * s, 5 * s, -12 * s, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Interaction handler (Desktop & Mobile)
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
      if (clientX === undefined || clientY === undefined) return;

      // Spawn 2-3 mini sparkles on touch
      for (let k = 0; k < 2; k++) {
        touchSparklesRef.current.push({
          x: clientX + (Math.random() - 0.5) * 15,
          y: clientY + (Math.random() - 0.5) * 15,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1,
          size: Math.random() * 3 + 2,
          color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
          life: 0,
          maxLife: Math.random() * 30 + 20,
        });
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Render Sparkles / Golden Bokeh
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.y += s.speedY;
        s.x += s.speedX;
        s.pulse += s.pulseSpeed;

        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }

        const currentOpacity = s.opacity * (0.6 + 0.4 * Math.sin(s.pulse));
        const r = s.radius * (0.8 + 0.4 * Math.sin(s.pulse));

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, currentOpacity));
        ctx.shadowBlur = 10;
        ctx.shadowColor = s.color;
        ctx.fill();
        ctx.restore();
      }

      // 2. Render Floating Hearts
      for (let i = 0; i < hearts.length; i++) {
        const h = hearts[i];
        h.y += h.speedY;
        h.wobble += h.wobbleSpeed;
        h.x += Math.sin(h.wobble) * 0.6 + h.speedX;

        if (h.y < -30) {
          h.y = height + 30;
          h.x = Math.random() * width;
        }

        drawHeart(h);
      }

      // 3. Render Falling Velvet Petals
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.wobble += p.wobbleSpeed;
        p.x += Math.sin(p.wobble) * 1.2 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 40) {
          p.y = -30;
          p.x = Math.random() * width;
        }

        drawPetal(p);
      }

      // 4. Render Touch Sparkles
      const touchSparkles = touchSparklesRef.current;
      for (let i = touchSparkles.length - 1; i >= 0; i--) {
        const ts = touchSparkles[i];
        ts.x += ts.vx;
        ts.y += ts.vy;
        ts.life++;

        const progress = ts.life / ts.maxLife;
        const opacity = Math.max(0, 1 - progress);

        ctx.save();
        ctx.beginPath();
        ctx.arc(ts.x, ts.y, ts.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = ts.color;
        ctx.globalAlpha = opacity;
        ctx.shadowBlur = 12;
        ctx.shadowColor = ts.color;
        ctx.fill();
        ctx.restore();

        if (ts.life >= ts.maxLife) {
          touchSparkles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isCelebration]);

  return (
    <canvas
      id="romantic-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
