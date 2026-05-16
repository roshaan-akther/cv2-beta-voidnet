"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function TestPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Node positions
    const buildingPos = new THREE.Vector3(-6, 0, 0);
    const hostingPos = new THREE.Vector3(-2, 2, 0);
    const billingPos = new THREE.Vector3(-2, 0, 0);
    const meteringPos = new THREE.Vector3(-2, -2, 0);
    const distributionPos = new THREE.Vector3(6, 0, 0);

    // Create text label function
    function createLabel(text: string, color: string): THREE.Sprite {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return new THREE.Sprite();

      canvas.width = 256;
      canvas.height = 64;

      context.fillStyle = color;
      context.font = 'bold 32px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, 128, 32);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(4, 1, 1);

      return sprite;
    }

    // Create node function
    function createNode(position: THREE.Vector3, color: number, label: string) {
      const group = new THREE.Group();

      // Outer glow
      const glowGeometry = new THREE.CircleGeometry(1.2, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.2,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      group.add(glow);

      // Main circle
      const circleGeometry = new THREE.CircleGeometry(0.8, 32);
      const circleMaterial = new THREE.MeshBasicMaterial({
        color: color,
      });
      const circle = new THREE.Mesh(circleGeometry, circleMaterial);
      group.add(circle);

      // Inner white circle
      const innerGeometry = new THREE.CircleGeometry(0.6, 32);
      const innerMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });
      const inner = new THREE.Mesh(innerGeometry, innerMaterial);
      group.add(inner);

      // Add label
      const labelSprite = createLabel(label, '#ffffff');
      labelSprite.position.set(0, -1.5, 0);
      group.add(labelSprite);

      group.position.copy(position);
      scene.add(group);

      return { group, glow, circle };
    }

    // Create nodes
    const buildingNode = createNode(buildingPos, 0x3b82f6, 'Building');
    const hostingNode = createNode(hostingPos, 0x10b981, 'Hosting');
    const billingNode = createNode(billingPos, 0xf59e0b, 'Billing');
    const meteringNode = createNode(meteringPos, 0xef4444, 'Metering');
    const distributionNode = createNode(distributionPos, 0x8b5cf6, 'Distribution');

    // Create beam function
    function createBeam(
      startPos: THREE.Vector3,
      endPos: THREE.Vector3,
      color: number
    ) {
      const group = new THREE.Group();

      // Create straight line
      const points = [startPos, endPos];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.3,
      });
      const line = new THREE.Line(geometry, material);
      group.add(line);

      // Create particle
      const particleGeometry = new THREE.CircleGeometry(0.15, 16);
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: color,
      });
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      group.add(particle);

      scene.add(group);

      return { group, startPos, endPos, particle, line };
    }

    // Create beams
    const buildingToHosting = createBeam(buildingPos, hostingPos, 0x3b82f6);
    const buildingToBilling = createBeam(buildingPos, billingPos, 0x3b82f6);
    const buildingToMetering = createBeam(buildingPos, meteringPos, 0x3b82f6);
    const hostingToDistribution = createBeam(hostingPos, distributionPos, 0x10b981);
    const billingToDistribution = createBeam(billingPos, distributionPos, 0xf59e0b);
    const meteringToDistribution = createBeam(meteringPos, distributionPos, 0xef4444);

    const beams = [
      buildingToHosting,
      buildingToBilling,
      buildingToMetering,
      hostingToDistribution,
      billingToDistribution,
      meteringToDistribution,
    ];

    // Animation
    let time = 0;
    function animate() {
      requestAnimationFrame(animate);
      time += 0.01;

      // Animate particles along beams
      beams.forEach((beam, index) => {
        const t = (time + index * 0.3) % 1;
        const point = new THREE.Vector3().lerpVectors(beam.startPos, beam.endPos, t);
        beam.particle.position.copy(point);

        // Pulse effect on nodes
        const pulse = Math.sin(time * 2 + index) * 0.1 + 1;
        beam.line.material.opacity = 0.2 + Math.sin(time * 3 + index) * 0.1;
      });

      // Animate node glows
      [
        buildingNode,
        hostingNode,
        billingNode,
        meteringNode,
        distributionNode,
      ].forEach((node, index) => {
        node.glow.material.opacity = 0.15 + Math.sin(time * 2 + index * 0.5) * 0.1;
      });

      renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 text-white text-2xl font-bold">
        Building → Hosting, Billing, Metering → Distribution
      </div>
    </div>
  );
}
