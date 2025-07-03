import { useEffect, useRef } from "react";
import * as THREE from "three";

import cloudImage from "../../assets/fog1.webp";

const AnaglyphScene = () => {
  const containerRef = useRef();
  const spheresRef = useRef([]);
  const cameraRef = useRef();
  const rendererRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const windowHalfRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    const numSpheres = isMobile ? 30 : isTablet ? 50 : 80;
    const spreadX = isMobile ? 18 : isTablet ? 28 : 36;
    const spreadY = isMobile ? 10 : isTablet ? 15 : 20;
    const spreadZ = isMobile ? 12 : isTablet ? 22 : 28;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.Fog("#bf0d74", 5, 60);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 20;
    cameraRef.current = camera;

    const cloudTexture = new THREE.TextureLoader().load(cloudImage);
    const cloudMaterial = new THREE.SpriteMaterial({
      map: cloudTexture,
      color: "#670B52",
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });

    const clouds = [];
    for (let i = 0; i < 8; i++) {
      const cloud = new THREE.Sprite(cloudMaterial.clone());
      cloud.position.set(
        Math.random() * 60 - 30,
        Math.random() * 30 - 15,
        Math.random() * 60 - 30,
      );
      const scale = Math.random() * 18 + 8;
      cloud.scale.set(scale, scale, 1);
      scene.add(cloud);
      clouds.push(cloud);
    }

    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
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

    const geometry = new THREE.SphereGeometry(0.5, 24, 24);

    for (let i = 0; i < numSpheres; i++) {
      const color = colors[i % colors.length];
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.35,
        metalness: 0.4,
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.08,
      });

      const mesh = new THREE.Mesh(geometry, material);
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

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.outputEncoding = THREE.sRGBEncoding;

    while (container.firstChild) container.removeChild(container.firstChild);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const onResize = () => {
      windowHalfRef.current.x = window.innerWidth / 2;
      windowHalfRef.current.y = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onMouseMove = (event) => {
      mouseRef.current.x = (event.clientX - windowHalfRef.current.x) / 100;
      mouseRef.current.y = (event.clientY - windowHalfRef.current.y) / 100;
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      const timer = 0.0001 * Date.now();

      camera.position.x += (mouseRef.current.x - camera.position.x) * 0.04;
      camera.position.y += (-mouseRef.current.y - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      spheresRef.current.forEach((sphere, i) => {
        sphere.position.x += 0.04 * Math.cos(timer + i);
        sphere.position.y += 0.04 * Math.sin(timer + i * 1.2);
        sphere.rotation.x += 0.004;
        sphere.rotation.y += 0.004;
      });

      clouds.forEach((cloud, i) => {
        cloud.position.x += 0.008 * Math.sin(timer + i);
        cloud.position.y += 0.004 * Math.cos(timer * 0.8 + i);
      });

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      geometry.dispose();
      spheresRef.current.forEach((mesh) => mesh.geometry.dispose());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full"
      style={{
        background:
          "linear-gradient(to bottom right, #3e054c, #75106b, #af1173)",
        overflow: "hidden",
      }}
    />
  );
};

export default AnaglyphScene;
