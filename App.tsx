import * as React from 'react';
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import './style.css';

export default function App() {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = ref.current!;

    const scene = new Scene();

    const camera = new PerspectiveCamera();

    const renderer = new WebGLRenderer({
      canvas,
    });

    renderer.setClearAlpha(0);

    let rafId: any;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    const handler = () => {
      canvas.style.setProperty('transform', `translateY(${window.scrollY}px)`);
    };

    animate();

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={ref} />;
}
