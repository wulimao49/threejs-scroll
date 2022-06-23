import * as React from 'react';
// import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import './style.css';

export default function App() {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = ref.current!;

    // const scene = new Scene();

    // const camera = new PerspectiveCamera();

    // const renderer = new WebGLRenderer({});

    // renderer.setClearAlpha(0);

    let rafId: any;

    const ctx = canvas.getContext('2d');

    const animate = () => {
      ctx.clearRect(0, 0, 300, 300); // clear canvas
      rafId = requestAnimationFrame(animate);
      // ctx.globalCompositeOperation = 'destination-over';

      // ctx.drawImage(sun, 0, 0, 300, 300);

      // renderer.render(scene, camera);
    };

    const handler = () => {
      canvas.style.setProperty('transform', `translateY(${window.scrollY}px)`);
    };

    requestAnimationFrame(animate);

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={ref} />;
}
