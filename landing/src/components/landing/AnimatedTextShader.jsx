import { memo, useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { TessellateModifier } from "three/examples/jsm/modifiers/TessellateModifier";

// import fontJson from "../../assets/Backso_Regular.json";
import fontJson from "https://res.cloudinary.com/dqlvs4ae5/raw/upload/v1751594365/Backso_Regular_unez5e.json";

const TessellatedText = () => {
  const containerRef = useRef();

  useEffect(() => {
    let scene, camera, renderer, mesh, uniforms;

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

    camera = new THREE.PerspectiveCamera(40, width / height, 1, 10000);
    camera.position.set(0, 100, getCameraZ(width));

    scene = new THREE.Scene();
    scene.background = null;

    const loader = new FontLoader();
    const font = loader.parse(fontJson);

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

    function getTranslate() {
      if (width > 1280)
        return geometry.translate(-textWidth / 2, -boundingBox.min.y * 45, -20);

      if (width > 1180)
        return geometry.translate(-textWidth / 2, -boundingBox.min.y * 50, -50);

      if (width > 1024)
        return geometry.translate(
          -textWidth / 2,
          -boundingBox.min.y * 50,
          -100,
        );

      if (width > 900)
        return geometry.translate(
          -textWidth / 2,
          -boundingBox.min.y * 62,
          -130,
        );

      if (width > 800)
        return geometry.translate(
          -textWidth / 2,
          -boundingBox.min.y * 65,
          -180,
        );

      if (width > 780)
        return geometry.translate(
          -textWidth / 2,
          -boundingBox.min.y * 65,
          -167,
        );

      if (width > 640)
        return geometry.translate(
          -textWidth / 2,
          -boundingBox.min.y * 75,
          -150,
        );

      if (width > 540)
        return geometry.translate(-textWidth / 2, -boundingBox.min.y * 85, -70);

      if (width > 420)
        return geometry.translate(-textWidth / 2, -boundingBox.min.y * 95, -40);

      return geometry.translate(-textWidth / 2, -boundingBox.min.y * 100, -110);
    }
    getTranslate();

    const tessellateModifier = new TessellateModifier(4, 3);
    geometry = tessellateModifier.modify(geometry);

    const numFaces = geometry.attributes.position.count / 3;
    const colors = new Float32Array(numFaces * 3 * 3);
    const displacement = new Float32Array(numFaces * 3 * 3);

    const color = new THREE.Color();
    for (let f = 0; f < numFaces; f++) {
      const index = 9 * f;
      // set all to shades of #f6c500
      color.setStyle("#f6c500");
      color.offsetHSL(0, 0, (Math.random() - 0.5) * 0.2); // slight variation
      const d = 8 * (0.5 - Math.random());
      for (let i = 0; i < 3; i++) {
        colors[index + 3 * i + 0] = color.r;
        colors[index + 3 * i + 1] = color.g;
        colors[index + 3 * i + 2] = color.b;
        displacement[index + 3 * i + 0] = d;
        displacement[index + 3 * i + 1] = d;
        displacement[index + 3 * i + 2] = d;
      }
    }

    geometry.setAttribute("customColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute(
      "displacement",
      new THREE.BufferAttribute(displacement, 3),
    );

    uniforms = {
      amplitude: { value: 0.0 },
    };

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

    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    if (containerRef.current) {
      const existingCanvases = containerRef.current.querySelectorAll("canvas");
      existingCanvases.forEach((c) => c.remove());
    }
    containerRef.current.appendChild(renderer.domElement);

    let rotationDirection = 1;
    let rotationAngle = 0;
    const maxRotation = 0.1;

    const animate = () => {
      requestAnimationFrame(animate);

      uniforms.amplitude.value = 1.0 + Math.sin(Date.now() * 0.001 * 0.5);

      rotationAngle += 0.0015 * rotationDirection;
      if (rotationAngle > maxRotation || rotationAngle < -maxRotation) {
        rotationDirection *= -1;
      }
      mesh.rotation.y = rotationAngle;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.position.z = getCameraZ(newWidth);
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      shaderMaterial.dispose();
    };
  }, []);

  return (
    <div className="relative flex min-h-[70vh] w-full flex-col gap-10 overflow-hidden sm:h-[80vh] md:h-screen">
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      />
      <div className="absolute top-[40%] left-1/2 z-20 hidden w-full max-w-[90vw] -translate-x-1/2 px-4 text-center text-sm font-semibold tracking-wide text-white drop-shadow-lg sm:text-base md:text-xl lg:block">
        EXPERIENCE THE THRILL OF THIS MODERN GAME
      </div>
    </div>
  );
};

export default memo(TessellatedText);
