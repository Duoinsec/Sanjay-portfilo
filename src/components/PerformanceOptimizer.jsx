import { useEffect } from 'react';

/**
 * Performance Optimizer Component
 * Implements various optimizations to ensure smooth 60fps performance
 */
const PerformanceOptimizer = () => {
    useEffect(() => {
        // 1. Enable GPU acceleration for smoother animations
        const style = document.createElement('style');
        style.innerHTML = `
            * {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            
            /* Force GPU acceleration for animated elements */
            .glass, 
            [class*="motion-"],
            [class*="animate-"],
            .group:hover > *,
            button,
            a {
                transform: translateZ(0);
                will-change: transform;
                backface-visibility: hidden;
                perspective: 1000px;
            }
            
            /* Optimize scroll performance */
            * {
                scroll-behavior: smooth;
            }
            
            /* Reduce motion for better performance on lower-end devices */
            @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
        `;
        document.head.appendChild(style);

        // 2. Optimize Canvas rendering
        const optimizeCanvas = () => {
            const canvases = document.querySelectorAll('canvas');
            canvases.forEach(canvas => {
                // EXTREMELY IMPORTANT: Avoid touching Three.js / WebGL canvases
                // These attributes are common markers for Three.js/Fiber
                const isManagedByThree = 
                    canvas.hasAttribute('data-engine') || 
                    canvas.getAttribute('data-testid') === 'rf-canvas' ||
                    canvas.classList.contains('three-canvas') ||
                    canvas.parentElement?.classList.contains('three-container');

                if (isManagedByThree) return;
                
                // If it looks like a Three.js canvas, skip it
                if (canvas.style.position === 'absolute' && canvas.style.pointerEvents === 'none') {
                    // background canvases often have these
                    return;
                }

                const ctx = canvas.getContext('2d', {
                    alpha: false,
                    desynchronized: true,
                    willReadFrequently: false
                });

                // Enable image smoothing for better performance
                if (ctx) {
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'low'; // Faster rendering
                }
            });
        };

        // 3. Debounce resize events to prevent lag
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                optimizeCanvas();
            }, 150);
        };

        // 4. Request higher refresh rate if available
        if (window.screen && window.screen.orientation) {
            try {
                // Try to unlock higher refresh rates on supported devices
                window.screen.orientation.lock?.('any').catch(() => {
                    // Silently fail if lock is canceled or not supported
                });
            } catch (e) {
                // Silently fail if not supported
            }
        }

        // 5. Optimize images loading
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
            img.decoding = 'async';
        });

        // 6. Use requestIdleCallback for non-critical tasks
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                optimizeCanvas();
            });
        } else {
            setTimeout(optimizeCanvas, 100);
        }

        // Add event listeners
        window.addEventListener('resize', handleResize);
        optimizeCanvas();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            document.head.removeChild(style);
        };
    }, []);

    return null;
};

export default PerformanceOptimizer;
