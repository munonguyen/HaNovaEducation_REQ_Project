import { useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════
   HANOVA STARFIELD — Premium Canvas Renderer v2
   
   ✦ 3-layer parallax starfield (far / mid / near)
   ✦ Per-star sinusoidal twinkling
   ✦ Constellation lines connecting nearby bright stars
   ✦ Physics-based shooting stars with gradient tails
   ✦ Pulsating nebula glow zones
   ✦ Floating dust particles for depth
   ═══════════════════════════════════════════════════════════════ */

interface Star {
  x: number; y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  layer: number;
}

interface ShootingStar {
  x: number; y: number;
  length: number; speed: number;
  angle: number; opacity: number;
  life: number; maxLife: number;
  thickness: number;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  alpha: number;
  life: number;
  maxLife: number;
}

const STAR_COLORS = [
  '255,255,255', '255,255,255', '255,255,255',
  '200,215,255', '200,215,255',   // Cool blue-white
  '255,235,210', '255,230,200',   // Warm white
  '180,200,255',                   // Electric blue
];

function createStars(w: number, h: number): Star[] {
  const stars: Star[] = [];
  const count = (w * h) / 2400;
  for (let i = 0; i < count; i++) {
    const layer = Math.random() < 0.55 ? 0 : Math.random() < 0.65 ? 1 : 2;
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: [0.5, 0.9, 1.6][layer] + Math.random() * 0.3,
      baseAlpha: [0.3, 0.55, 0.85][layer] + Math.random() * 0.15,
      twinkleSpeed: 0.4 + Math.random() * 2,
      twinklePhase: Math.random() * Math.PI * 2,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      layer,
    });
  }
  return stars;
}

function spawnShootingStar(w: number, h: number): ShootingStar {
  const angle = (20 + Math.random() * 30) * (Math.PI / 180);
  return {
    x: Math.random() * w * 0.8,
    y: Math.random() * h * 0.35,
    length: 70 + Math.random() * 120,
    speed: 350 + Math.random() * 500,
    angle,
    opacity: 0.85 + Math.random() * 0.15,
    life: 0,
    maxLife: 0.6 + Math.random() * 0.5,
    thickness: 1.2 + Math.random() * 1,
  };
}

function spawnParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 8,
    vy: (Math.random() - 0.5) * 8,
    radius: 0.6 + Math.random() * 1.2,
    alpha: 0.15 + Math.random() * 0.25,
    life: 0,
    maxLife: 6 + Math.random() * 8,
  };
}

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootRef = useRef<ShootingStar[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const nextShootRef = useRef(1.5 + Math.random() * 3);
  const timerRef = useRef(0);
  const animRef = useRef(0);
  const lastRef = useRef(0);

  const resize = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    c.width = w * dpr;
    c.height = h * dpr;
    c.style.width = `${w}px`;
    c.style.height = `${h}px`;
    const ctx = c.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
    starsRef.current = createStars(w, h);
    // Seed some particles
    particlesRef.current = Array.from({ length: 30 }, () => spawnParticle(w, h));
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    const c = canvasRef.current;
    if (!c) return;
    const context = c.getContext('2d');
    if (!context) return;
    const ctx = context;
    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    /* ─── NEBULA ─── */
    function drawNebula(t: number) {
      const nebulae = [
        { x: 0.12, y: 0.25, r: 0.42, c: '40,100,220', a: 0.09 },
        { x: 0.88, y: 0.45, r: 0.38, c: '120,60,220', a: 0.07 },
        { x: 0.45, y: 0.82, r: 0.30, c: '20,170,160', a: 0.05 },
        { x: 0.65, y: 0.08, r: 0.28, c: '220,140,30', a: 0.045 },
        { x: 0.25, y: 0.65, r: 0.22, c: '200,60,140', a: 0.035 },
      ];
      for (const n of nebulae) {
        // Gentle pulsate
        const pulse = 1 + Math.sin(t * 0.3 + n.x * 10) * 0.15;
        const g = ctx.createRadialGradient(
          W() * n.x, H() * n.y, 0,
          W() * n.x, H() * n.y, Math.max(W(), H()) * n.r * pulse
        );
        g.addColorStop(0, `rgba(${n.c},${n.a * pulse})`);
        g.addColorStop(0.7, `rgba(${n.c},${n.a * 0.3 * pulse})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W(), H());
      }
    }

    /* ─── STARS ─── */
    function drawStars(t: number) {
      for (const s of starsRef.current) {
        const tw = Math.sin(t * s.twinkleSpeed + s.twinklePhase);
        const a = Math.max(0.05, Math.min(1, s.baseAlpha + tw * 0.25));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${a})`;
        ctx.fill();

        // Glow halo for bright near stars
        if (s.layer === 2 && a > 0.65) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.color},${a * 0.06})`;
          ctx.fill();
        }
      }
    }

    /* ─── CONSTELLATIONS ─── */
    function drawConstellations(t: number) {
      const bright = starsRef.current.filter(s => s.layer === 2);
      const maxDist = 120;
      ctx.lineWidth = 0.4;
      const lineAlpha = 0.04 + Math.sin(t * 0.5) * 0.015;

      for (let i = 0; i < bright.length; i++) {
        for (let j = i + 1; j < bright.length; j++) {
          const dx = bright[i].x - bright[j].x;
          const dy = bright[i].y - bright[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            const fade = 1 - d / maxDist;
            ctx.beginPath();
            ctx.moveTo(bright[i].x, bright[i].y);
            ctx.lineTo(bright[j].x, bright[j].y);
            ctx.strokeStyle = `rgba(150,180,255,${lineAlpha * fade})`;
            ctx.stroke();
          }
        }
      }
    }

    /* ─── SHOOTING STARS ─── */
    function drawShooting(dt: number) {
      for (let i = shootRef.current.length - 1; i >= 0; i--) {
        const s = shootRef.current[i];
        s.life += dt;
        if (s.life > s.maxLife) { shootRef.current.splice(i, 1); continue; }

        const p = s.life / s.maxLife;
        const dist = s.speed * s.life;
        const cx = s.x + Math.cos(s.angle) * dist;
        const cy = s.y + Math.sin(s.angle) * dist;

        let a = s.opacity;
        if (p < 0.08) a *= p / 0.08;
        if (p > 0.4) a *= 1 - (p - 0.4) / 0.6;

        const tailLen = s.length * (1 - p * 0.4);
        const tx = cx - Math.cos(s.angle) * tailLen;
        const ty = cy - Math.sin(s.angle) * tailLen;

        const g = ctx.createLinearGradient(tx, ty, cx, cy);
        g.addColorStop(0, 'rgba(255,255,255,0)');
        g.addColorStop(0.5, `rgba(200,220,255,${a * 0.35})`);
        g.addColorStop(1, `rgba(255,255,255,${a})`);

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = g;
        ctx.lineWidth = s.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(cx, cy, s.thickness * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${a * 0.15})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx, cy, s.thickness * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      }
    }

    /* ─── DUST PARTICLES ─── */
    function drawParticles(dt: number) {
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life += dt;
        if (p.life > p.maxLife) {
          particlesRef.current[i] = spawnParticle(W(), H());
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const fade = p.life < 1 ? p.life : p.life > p.maxLife - 1 ? (p.maxLife - p.life) : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,200,255,${p.alpha * fade * 0.5})`;
        ctx.fill();
      }
    }

    /* ─── FRAME LOOP ─── */
    function frame(ts: number) {
      if (!lastRef.current) lastRef.current = ts;
      const dt = Math.min((ts - lastRef.current) / 1000, 0.1);
      lastRef.current = ts;
      timerRef.current += dt;
      const t = timerRef.current;

      ctx.clearRect(0, 0, W(), H());

      // Dark base
      ctx.fillStyle = '#03030a';
      ctx.fillRect(0, 0, W(), H());

      drawNebula(t);
      drawConstellations(t);
      drawStars(t);
      drawParticles(dt);

      // Shooting stars spawn
      nextShootRef.current -= dt;
      if (nextShootRef.current <= 0) {
        shootRef.current.push(spawnShootingStar(W(), H()));
        nextShootRef.current = 2.5 + Math.random() * 5;
      }
      drawShooting(dt);

      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [resize]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
