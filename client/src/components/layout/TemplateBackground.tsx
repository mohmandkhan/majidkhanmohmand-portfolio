import { useEffect, useRef } from "react";

export default function TemplateBackground() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      if (cursor) {
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        className="fixed top-0 w-full h-screen bg-cover bg-center -z-10"
        style={{
          backgroundImage:
            'url("https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/0dd9b13b-ea30-4e17-8a26-53d1f9d1c6d3_3840w.webp")',
          maskImage:
            "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)",
        }}
      ></div>

      <div className="pre-footer_grid">
        <div className="grid_cell"></div>
        <div className="grid_cell"></div>
        <div className="grid_cell"></div>
        <div className="grid_cell"></div>
        <div className="grid_cell"></div>
        <div className="grid_cell"></div>
        <div className="grid_cell"></div>
        <div className="grid_cell"></div>
        <div className="grid_cell"></div>
        <div className="grid_cell"></div>
        <div className="grid_cell"></div>
        <div className="grid_cell"></div>
      </div>

      <div className="grid-lines">
        <div
          ref={cursorRef}
          className="grid-lines_cursor-position"
          style={{ transform: "translate3d(0px, 0px, 0px)" }}
        >
          <div className="grid-lines_cursor"></div>
        </div>
      </div>

      <div className="gradient-blur">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}
