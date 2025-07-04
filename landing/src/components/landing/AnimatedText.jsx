import { memo, useEffect, useRef } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  Color,
  BufferAttribute,
  ShaderMaterial,
} from "three";

const AnimatedText = () => {
  const containerRef = useRef();

  useEffect(() => {
    let animationId;

    const initScene = async () => {
      const { FontLoader } = await import(
        "three/examples/jsm/loaders/FontLoader"
      );
      const { TextGeometry } = await import(
        "three/examples/jsm/geometries/TextGeometry"
      );
      const { TessellateModifier } = await import(
        "three/examples/jsm/modifiers/TessellateModifier"
      );

      const width = window.innerWidth;
      const height = window.innerHeight;

      const getCameraZ = (w) => {
        if (w < 480) return 480;
        if (w < 640) return 420;
        if (w < 768) return 360;
        if (w < 1024) return 320;
        return 280;
      };

      const getFontSize = (w) => {
        if (w < 480) return 16;
        if (w < 640) return 20;
        if (w < 768) return 24;
        return 30;
      };

      const scene = new Scene();
      const camera = new PerspectiveCamera(40, width / height, 1, 10000);
      camera.position.set(0, 100, getCameraZ(width));

      const renderer = new WebGLRenderer({ alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height);

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        containerRef.current.appendChild(renderer.domElement);
      }

      const loader = new FontLoader();
      loader.load("/Backso_Regular.json", (font) => {
        const fontSize = getFontSize(width);
        let geometry = new TextGeometry("ROLL-A-BINGO", {
          font,
          size: fontSize,
          depth: 5,
          curveSegments: 2,
          bevelEnabled: true,
          bevelThickness: 1,
          bevelSize: 0.5,
        });

        geometry.computeBoundingBox();
        const boundingBox = geometry.boundingBox;
        const textWidth = boundingBox.max.x - boundingBox.min.x;

        function getTranslate() {
          if (width > 1280)
            return geometry.translate(
              -textWidth / 2,
              -boundingBox.min.y * 60,
              -20,
            );
          if (width > 1180)
            return geometry.translate(
              -textWidth / 2,
              -boundingBox.min.y * 65,
              -50,
            );
          if (width > 1024)
            return geometry.translate(
              -textWidth / 2,
              -boundingBox.min.y * 60,
              -100,
            );
          if (width > 900)
            return geometry.translate(
              -textWidth / 2,
              -boundingBox.min.y * 74,
              -90,
            );
          if (width > 800)
            return geometry.translate(
              -textWidth / 2,
              -boundingBox.min.y * 80,
              -180,
            );
          if (width > 780)
            return geometry.translate(
              -textWidth / 2,
              -boundingBox.min.y * 82,
              -167,
            );
          if (width > 640)
            return geometry.translate(
              -textWidth / 2,
              -boundingBox.min.y * 100,
              -90,
            );
          if (width > 540)
            return geometry.translate(
              -textWidth / 2,
              -boundingBox.min.y * 120,
              -70,
            );
          if (width > 420)
            return geometry.translate(
              -textWidth / 2,
              -boundingBox.min.y * 145,
              -85,
            );
          return geometry.translate(
            -textWidth / 2,
            -boundingBox.min.y * 150,
            -85,
          );
        }

        getTranslate();

        const tessellateModifier = new TessellateModifier(4, 3);
        geometry = tessellateModifier.modify(geometry);

        const numFaces = geometry.attributes.position.count / 3;
        const colors = new Float32Array(numFaces * 9);
        const displacement = new Float32Array(numFaces * 9);
        const color = new Color();

        for (let i = 0; i < numFaces; i++) {
          const idx = i * 9;
          color.setStyle("#f6c500");
          color.offsetHSL(0, 0, (Math.random() - 0.5) * 0.2);
          const d = 8 * (0.5 - Math.random());
          for (let j = 0; j < 3; j++) {
            colors.set([color.r, color.g, color.b], idx + j * 3);
            displacement.set([d, d, d], idx + j * 3);
          }
        }

        geometry.setAttribute("customColor", new BufferAttribute(colors, 3));
        geometry.setAttribute(
          "displacement",
          new BufferAttribute(displacement, 3),
        );

        const uniforms = { amplitude: { value: 0.0 } };

        const material = new ShaderMaterial({
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

        const mesh = new Mesh(geometry, material);
        scene.add(mesh);

        let rotation = 0;
        const maxRotation = 0.1;
        let direction = 1;

        const animate = () => {
          animationId = requestAnimationFrame(animate);
          uniforms.amplitude.value = 1 + Math.sin(Date.now() * 0.001 * 0.4);
          rotation += 0.0015 * direction;
          if (rotation > maxRotation || rotation < -maxRotation)
            direction *= -1;
          mesh.rotation.y = rotation;
          renderer.render(scene, camera);
        };

        animate();
      });
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(initScene);
    } else {
      setTimeout(initScene, 0);
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative flex min-h-[70vh] w-full flex-col gap-5 overflow-hidden sm:h-[80vh] md:h-screen">
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      />
      <div className="font-gameBubble absolute top-[40%] left-1/2 z-20 w-full max-w-[90vw] -translate-x-1/2 px-4 text-center text-[12px] font-semibold tracking-wide text-white drop-shadow-lg sm:text-base md:text-xl md:tracking-widest lg:text-2xl">
        EXPERIENCE THE THRILL OF THIS MODERN GAME
      </div>
    </div>
  );
};

export default memo(AnimatedText);
