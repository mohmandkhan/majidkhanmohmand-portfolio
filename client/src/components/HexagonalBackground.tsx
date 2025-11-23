import React, { useEffect, useRef } from "react";

export default function HexagonalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Hexagon properties
    const hexagons: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const colors = ["#FFD700", "#C0C0C0", "#1a1a1a"];

    // Create hexagons - much smaller
    const hexSize = 15;
    const spacing = hexSize * 3;

    for (let x = -spacing; x < canvas.width + spacing; x += spacing) {
      for (let y = -spacing; y < canvas.height + spacing; y += spacing) {
        hexagons.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          size: hexSize,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
        });
      }
    }

    function drawHexagon(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string
    ) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.4;

      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    }

    function animate() {
      // Clear canvas with dark background - more transparent
      ctx.fillStyle = "rgba(20, 20, 20, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw hexagons
      hexagons.forEach((hex) => {
        hex.x += hex.vx;
        hex.y += hex.vy;
        hex.rotation += hex.rotationSpeed;

        // Wrap around screen
        if (hex.x < -100) hex.x = canvas.width + 100;
        if (hex.x > canvas.width + 100) hex.x = -100;
        if (hex.y < -100) hex.y = canvas.height + 100;
        if (hex.y > canvas.height + 100) hex.y = -100;

        drawHexagon(ctx, hex.x, hex.y, hex.size, hex.rotation, hex.color);
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.6 }}
    />
  );
}
