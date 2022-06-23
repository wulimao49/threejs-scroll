import * as React from 'react';
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import './style.css';

export default function App() {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = ref.current!;

    const scene = new Scene();

    const camera = new PerspectiveCamera(75, 2, 0.1, 5);

    camera.position.z = 2;

    const renderer = new WebGLRenderer({
      canvas,
    });

    let rafId: any;

    // const ctx = canvas.getContext('2d');

    const geo = new BoxGeometry(1, 1, 1);

    const material = new MeshBasicMaterial({ color: 0x66ccff });

    const mesh = new Mesh(geo, material);

    mesh.position.set(0, 0, 0);

    scene.add(mesh);

    const animate = () => {
      // ctx.clearRect(0, 0, 300, 300); // clear canvas
      rafId = requestAnimationFrame(animate);
      // ctx.globalCompositeOperation = 'destination-over';

      // ctx.drawImage(sun, 0, 0, 300, 300);
      const time = Date.now() * 0.01;  // convert time to seconds

      mesh.rotation.x = time;
      mesh.rotation.y = time;

      renderer.render(scene, camera);
    };

    animate();

    // setTimeout(animate, 1000);

    const handler = () => {
      rafId || animate();
      canvas.style.setProperty('transform', `translateY(${window.scrollY}px)`);
    };

    // requestAnimationFrame(animate);

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={ref} />;
}
