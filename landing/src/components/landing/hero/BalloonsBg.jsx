import { memo, useEffect, useRef } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
  Color,
  AmbientLight,
  DirectionalLight,
} from "three";

const BalloonsBg = () => {
  const containerRef = useRef();
  const spheresRef = useRef([]);
  const rendererRef = useRef();

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(initScene);
    } else {
      setTimeout(initScene, 0);
    }

    function initScene() {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      const numSpheres = isMobile ? 10 : isTablet ? 15 : 20;
      const spreadX = isMobile ? 10 : isTablet ? 20 : 28;
      const spreadY = isMobile ? 12 : isTablet ? 12 : 18;
      const spreadZ = isMobile ? 10 : isTablet ? 16 : 24;

      const width = window.innerWidth;
      const height = window.innerHeight;

      const container = containerRef.current;
      const scene = new Scene();
      scene.background = null;

      const camera = new PerspectiveCamera(60, width / height, 0.1, 100);
      camera.position.set(0, 0, 20);

      const ambient = new AmbientLight(0xffffff, 0.55);
      const directional = new DirectionalLight(0xffffff, 0.8);
      directional.position.set(10, 10, 10);
      scene.add(ambient, directional);

      const colors = [
        "#7300bd",
        "#bf0d74",
        "#ea88c6",
        "#f6c500",
        "#489373",
        "#c10a11",
        "#006fff",
      ];

      const baseGeometry = isMobile
        ? new SphereGeometry(0.5, 10, 10)
        : new SphereGeometry(0.5, 12, 12);

      const colorMaterials = colors.map(
        (color) =>
          new MeshStandardMaterial({
            color: new Color(color),
            roughness: 0.35,
            metalness: 0.4,
            emissive: new Color(color),
            emissiveIntensity: 0.08,
          }),
      );

      for (let i = 0; i < numSpheres; i++) {
        const material = colorMaterials[i % colorMaterials.length];
        const mesh = new Mesh(baseGeometry, material);
        mesh.position.set(
          Math.random() * spreadX - spreadX / 2,
          Math.random() * spreadY - spreadY / 2,
          Math.random() * spreadZ - spreadZ / 2,
        );
        const scale = Math.random() * 1.2 + 0.3;
        mesh.scale.set(scale, scale, scale);
        scene.add(mesh);
        spheresRef.current.push(mesh);
      }

      const renderer = new WebGLRenderer({
        alpha: true,
        antialias: false,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
      renderer.setSize(width, height);
      // renderer.outputEncoding = sRGBEncoding;

      while (container.firstChild) container.removeChild(container.firstChild);
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const animate = () => {
        const timer = 0.00005 * Date.now(); // slower movement

        spheresRef.current.forEach((sphere, i) => {
          // 3D motion on x, y, z
          sphere.position.x += 0.015 * Math.cos(timer + i * 0.5);
          sphere.position.y += 0.015 * Math.sin(timer + i * 0.8);
          sphere.position.z += 0.015 * Math.cos(timer + i * 1.1);

          sphere.rotation.x += 0.002;
          sphere.rotation.y += 0.002;

          const { x, y, z } = sphere.position;
          const maxDistance = 20;

          if (
            Math.abs(x) > maxDistance ||
            Math.abs(y) > maxDistance ||
            Math.abs(z) > maxDistance
          ) {
            sphere.position.set(
              (Math.random() - 0.5) * spreadX,
              (Math.random() - 0.5) * spreadY,
              (Math.random() - 0.5) * spreadZ,
            );
          }
        });

        renderer.render(scene, camera);
      };

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          renderer.setAnimationLoop(animate);
        } else {
          renderer.setAnimationLoop(null);
        }
      });
      observer.observe(container);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        baseGeometry.dispose();
        colorMaterials.forEach((m) => m.dispose());
        spheresRef.current = [];
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="max-h-[80vh] w-full overflow-hidden md:min-h-screen"
      style={{
        background:
          "linear-gradient(to bottom right, #1d001a, #75106b, #af1173)",
        overflow: "hidden",
      }}
    />
  );
};

export default memo(BalloonsBg);
