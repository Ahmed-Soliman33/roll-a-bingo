import { memo, useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

import fontJson from "../../assets/Backso_Regular.json";

const AnimatedText = () => {
  const containerRef = useRef();

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(initScene);
    } else {
      setTimeout(initScene, 0);
    }

    async function initScene() {
      let scene, camera, renderer, mesh, uniforms, animationId;

      const width = window.innerWidth;
      const height = window.innerHeight;

      const getCameraZ = (w) =>
        w < 480 ? 480 : w < 640 ? 420 : w < 768 ? 360 : w < 1024 ? 320 : 280;
      const getFontSize = (w) =>
        w < 480 ? 16 : w < 640 ? 20 : w < 768 ? 24 : 30;

      camera = new THREE.PerspectiveCamera(40, width / height, 1, 10000);
      camera.position.set(0, 100, getCameraZ(width));
      scene = new THREE.Scene();

      const font = new FontLoader().parse(fontJson);
      const fontSize = getFontSize(width);
      let geometry = new TextGeometry("ROLL-A-BINGO", {
        font,
        size: fontSize,
        depth: 8,
        curveSegments: 4,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 1.5,
      });

      geometry.computeBoundingBox();
      const boundingBox = geometry.boundingBox;
      const textWidth = boundingBox.max.x - boundingBox.min.x;
      geometry.translate(-textWidth / 2, -boundingBox.min.y * 60, -100);

      const { TessellateModifier } = await import(
        "three/examples/jsm/modifiers/TessellateModifier"
      );
      const tessellateModifier = new TessellateModifier(4, 3);
      geometry = tessellateModifier.modify(geometry);

      const numFaces = geometry.attributes.position.count / 3;
      const colors = new Float32Array(numFaces * 3 * 3);
      const displacement = new Float32Array(numFaces * 3 * 3);

      const color = new THREE.Color("#ffce0a");
      for (let f = 0; f < numFaces; f++) {
        const index = 9 * f;
        color.setStyle("#ffce0a");
        color.offsetHSL(0, 0, (Math.random() - 0.5) * 0.2);
        const d = 8 * (0.5 - Math.random());
        for (let i = 0; i < 3; i++) {
          colors.set([color.r, color.g, color.b], index + 3 * i);
          displacement.set([d, d, d], index + 3 * i);
        }
      }

      geometry.setAttribute(
        "customColor",
        new THREE.BufferAttribute(colors, 3),
      );
      geometry.setAttribute(
        "displacement",
        new THREE.BufferAttribute(displacement, 3),
      );

      uniforms = { amplitude: { value: 0.0 } };

      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
          uniform float amplitude;
          attribute vec3 customColor;
          attribute vec3 displacement;
          varying vec3 vNormal;
          varying vec3 vColor;
          void main() {
            vNormal = normal;
            vColor = customColor;
            vec3 newPosition = position + normal * amplitude * displacement;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vColor;
          void main() {
            const float ambient = 0.4;
            vec3 light = normalize(vec3(1.0));
            float directional = max(dot(vNormal, light), 0.0);
            gl_FragColor = vec4((directional + ambient) * vColor, 1.0);
          }
        `,
        transparent: true,
      });

      mesh = new THREE.Mesh(geometry, shaderMaterial);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height);

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        containerRef.current.appendChild(renderer.domElement);
      }

      let rotationDirection = 1;
      let rotationAngle = 0;
      const maxRotation = 0.1;

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        uniforms.amplitude.value = 1.0 + Math.sin(Date.now() * 0.001 * 0.5);
        rotationAngle += 0.0015 * rotationDirection;
        if (rotationAngle > maxRotation || rotationAngle < -maxRotation)
          rotationDirection *= -1;
        mesh.rotation.y = rotationAngle;
        renderer.render(scene, camera);
      };

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          animate();
        } else {
          cancelAnimationFrame(animationId);
        }
      });
      observer.observe(containerRef.current);

      const onResize = () => {
        const newW = window.innerWidth,
          newH = window.innerHeight;
        camera.aspect = newW / newH;
        camera.position.z = getCameraZ(newW);
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      };

      window.addEventListener("resize", onResize);

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", onResize);
        geometry.dispose();
        shaderMaterial.dispose();
        renderer.dispose();
      };
    }
  }, []);

  return (
    <div className="relative flex min-h-[70vh] w-full flex-col gap-10 overflow-hidden sm:h-[80vh] md:h-screen">
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      />
      <div className="font-gameBubble absolute top-[40%] left-1/2 z-20 hidden w-full max-w-[90vw] -translate-x-1/2 px-4 text-center text-sm font-semibold tracking-wide text-white drop-shadow-lg sm:text-base md:text-2xl lg:block">
        EXPERIENCE THE THRILL OF THIS MODERN GAME
      </div>
    </div>
  );
};

export default memo(AnimatedText);
