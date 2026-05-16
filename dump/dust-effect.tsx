"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

export function DustEffect() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 50

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Create 10 wave layers with 10 waves each
    const waveLayers: THREE.Mesh[] = []
    const materials: THREE.ShaderMaterial[] = []
    const geometries: THREE.PlaneGeometry[] = []

    for (let layer = 0; layer < 10; layer++) {
      const numWaves = 10
      const amplitudes = new Float32Array(numWaves)
      const wavelengths = new Float32Array(numWaves)
      const speeds = new Float32Array(numWaves)
      const directions = new Float32Array(numWaves * 2)

      for (let i = 0; i < numWaves; i++) {
        amplitudes[i] = 0.3 + Math.random() * 0.8
        wavelengths[i] = 15.0 + Math.random() * 20.0
        speeds[i] = 0.5 + Math.random() * 0.8
        
        const angle = Math.random() * Math.PI * 2
        directions[i * 2] = Math.cos(angle)
        directions[i * 2 + 1] = Math.sin(angle)
      }

      const width = 35 + layer * 2
      const height = 100 + layer * 5
      const segmentsX = 100 + layer * 10
      const segmentsY = 200 + layer * 20

      const geometry = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY)
      geometry.translate(width / 2, 0, 0)
      geometries.push(geometry)

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          amplitudes: { value: amplitudes },
          wavelengths: { value: wavelengths },
          speeds: { value: speeds },
          directions: { value: directions },
          numWaves: { value: numWaves },
          layerIndex: { value: layer },
          mousePos: { value: new THREE.Vector2(0, 0) }
        },
        vertexShader: `
          uniform float time;
          uniform float amplitudes[10];
          uniform float wavelengths[10];
          uniform float speeds[10];
          uniform float directions[20];
          uniform int numWaves;
          uniform float layerIndex;
          
          varying float vElevation;
          varying vec3 vNormal;
          varying vec2 vUv;
          varying float vLayer;

          const float PI = 3.14159;

          vec2 getDirection(int i) {
            int idx = i * 2;
            return vec2(directions[idx], directions[idx + 1]);
          }

          float wave(int i, float x, float y) {
            float frequency = 2.0 * PI / wavelengths[i];
            float phase = speeds[i] * frequency;
            vec2 dir = getDirection(i);
            float theta = dot(dir, vec2(x, y));
            return amplitudes[i] * sin(theta * frequency + time * phase);
          }

          float dWavedx(int i, float x, float y) {
            float frequency = 2.0 * PI / wavelengths[i];
            float phase = speeds[i] * frequency;
            vec2 dir = getDirection(i);
            float theta = dot(dir, vec2(x, y));
            float A = amplitudes[i] * dir.x * frequency;
            return A * cos(theta * frequency + time * phase);
          }

          float dWavedy(int i, float x, float y) {
            float frequency = 2.0 * PI / wavelengths[i];
            float phase = speeds[i] * frequency;
            vec2 dir = getDirection(i);
            float theta = dot(dir, vec2(x, y));
            float A = amplitudes[i] * dir.y * frequency;
            return A * cos(theta * frequency + time * phase);
          }

          void main() {
            vUv = uv;
            vLayer = layerIndex;
            vec3 pos = position;
            
            float height = 0.0;
            float dx = 0.0;
            float dy = 0.0;
            
            for (int i = 0; i < 10; i++) {
              if (i >= numWaves) break;
              height += wave(i, pos.x, pos.y);
              dx += dWavedx(i, pos.x, pos.y);
              dy += dWavedy(i, pos.x, pos.y);
            }
            
            pos.z += height;
            vElevation = height;
            
            vec3 normal = normalize(vec3(-dx, -dy, 1.0));
            vNormal = normal;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform float layerIndex;
          uniform vec2 mousePos;
          varying float vElevation;
          varying vec3 vNormal;
          varying vec2 vUv;
          varying float vLayer;

          void main() {
            vec3 lightDir = normalize(vec3(0.5, 0.5, 1.0));
            float diff = max(dot(vNormal, lightDir), 0.0);
            
            float alpha = smoothstep(-3.0, 3.0, vElevation) * 0.15;
            alpha *= 0.7 + 0.3 * diff;
            alpha *= 0.8 + 0.2 * sin(vUv.y * 5.0 + time * 0.2 + layerIndex);
            
            // Softer edge blur
            float edgeFactor = 1.0 - abs(vUv.x - 0.5) * 2.0;
            alpha *= smoothstep(0.0, 0.6, edgeFactor);
            
            // Layer-based opacity for depth with softer falloff
            alpha *= 1.0 - (layerIndex * 0.06);
            
            // Add blur-like softness
            alpha *= 0.9 + 0.1 * sin(vUv.x * 10.0 + time * 0.3);
            
            // Mouse interaction - increase brightness and opacity near mouse
            vec2 screenPos = gl_FragCoord.xy / vec2(1920.0, 1080.0);
            float mouseDist = distance(screenPos, mousePos);
            float mouseInfluence = smoothstep(0.3, 0.0, mouseDist);
            alpha *= 1.0 + mouseInfluence * 0.5;
            
            // Lighter navy blue color
            vec3 lightNavyColor = vec3(0.15, 0.5, 0.7);
            lightNavyColor += mouseInfluence * vec3(0.1, 0.1, 0.15);
            
            gl_FragColor = vec4(lightNavyColor, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.NormalBlending
      })

      materials.push(material)

      const wave = new THREE.Mesh(geometry, material)
      // Center the waves vertically
      wave.position.x = 0
      wave.position.z = -layer * 3
      scene.add(wave)
      waveLayers.push(wave)
    }

    // Animation
    const animate = (time: number) => {
      requestAnimationFrame(animate)

      materials.forEach(material => {
        material.uniforms.time.value = time / 1000
        material.uniforms.mousePos.value.set(mouseRef.current.x, mouseRef.current.y)
      })

      renderer.render(scene, camera)
    }

    animate(0)

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = 1.0 - (event.clientY - rect.top) / rect.height
      mouseRef.current = { x, y }
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)

      // Keep waves centered
      waveLayers.forEach((wave, layer) => {
        wave.position.x = 0
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      container.removeChild(renderer.domElement)
      
      geometries.forEach(geometry => geometry.dispose())
      materials.forEach(material => material.dispose())
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-[-1]"
    />
  )
}
