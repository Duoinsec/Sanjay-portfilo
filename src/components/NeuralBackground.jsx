import { useEffect, useRef } from 'react';

const NeuralBackground = () => {
    const canvasRef = useRef(null);
    const animRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width, height;
        const COUNT = 90;
        const CONNECTION_DIST = 160;
        const nodes = [];

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const init = () => {
            nodes.length = 0;
            for (let i = 0; i < COUNT; i++) {
                nodes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    r: Math.random() * 1.5 + 1,
                });
            }
        };

        let mouseX = width / 2;
        let mouseY = height / 2;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Update & draw nodes
            for (let i = 0; i < COUNT; i++) {
                const n = nodes[i];

                // Soft mouse attraction
                const dx = mouseX - n.x;
                const dy = mouseY - n.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    n.vx += (dx / dist) * 0.015;
                    n.vy += (dy / dist) * 0.015;
                }

                // Speed cap
                const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
                if (speed > 1.2) {
                    n.vx = (n.vx / speed) * 1.2;
                    n.vy = (n.vy / speed) * 1.2;
                }

                n.x += n.vx;
                n.y += n.vy;

                // Bounce
                if (n.x < 0 || n.x > width) n.vx *= -1;
                if (n.y < 0 || n.y > height) n.vy *= -1;

                // Draw node
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 242, 255, 0.7)';
                ctx.fill();
            }

            // Draw connections
            for (let i = 0; i < COUNT; i++) {
                for (let j = i + 1; j < COUNT; j++) {
                    const a = nodes[i];
                    const b = nodes[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < CONNECTION_DIST) {
                        const alpha = (1 - d / CONNECTION_DIST) * 0.4;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(188, 19, 254, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            animRef.current = requestAnimationFrame(draw);
        };

        resize();
        init();
        draw();

        window.addEventListener('resize', () => { resize(); init(); });
        window.addEventListener('mousemove', onMouseMove);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', () => { resize(); init(); });
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    );
};

export default NeuralBackground;
