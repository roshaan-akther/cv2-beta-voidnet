"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function StarEffect() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    camera.position.z = 500

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Create stars with dynamic animation
    const starsGeometry = new THREE.BufferGeometry()
    const maxStars = 20
    const positions = new Float32Array(maxStars * 3)
    const velocities = new Float32Array(maxStars * 3)
    const sizes = new Float32Array(maxStars)
    const activeStars = new Float32Array(maxStars)

    // Target point - positioned at top-left corner of viewport
    const getTargetPosition = () => {
      // Calculate actual top-left corner based on camera FOV and position
      const fov = camera.fov * (Math.PI / 180)
      const aspect = window.innerWidth / window.innerHeight
      const height = 2 * Math.tan(fov / 2) * camera.position.z
      const width = height * aspect
      
      // Top-left corner in world coordinates
      const targetX = -width / 2
      const targetY = height / 2
      return { x: targetX, y: targetY, z: 0 }
    }

    let targetPos = getTargetPosition()

    // Initialize all stars as inactive
    for (let i = 0; i < maxStars; i++) {
      activeStars[i] = 0
      positions[i * 3] = (Math.random() - 0.5) * 1000 // Random scattered position
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1000
      velocities[i * 3] = 0
      velocities[i * 3 + 1] = 0
      velocities[i * 3 + 2] = 0
      sizes[i] = Math.random() * 5 + 4
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    // Custom shader for circular stars
    const starsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        varying float vSize;
        
        void main() {
          vSize = size;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        varying float vSize;
        
        void main() {
          // Create circular star shape
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          // Circular shape with soft edges
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          
          gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
        }
      `,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false
    })

    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    // Animation
    let frameCount = 0
    const animate = (time: number) => {
      requestAnimationFrame(animate)
      frameCount++

      // Spawn new stars periodically - much slower
      if (frameCount % 60 === 0) {
        // Find an inactive star
        for (let i = 0; i < maxStars; i++) {
          if (activeStars[i] === 0) {
            // Spawn star at random scattered position
            const angle = Math.random() * Math.PI * 2
            const radius = 300 + Math.random() * 200
            
            positions[i * 3] = Math.cos(angle) * radius
            positions[i * 3 + 1] = Math.sin(angle) * radius
            positions[i * 3 + 2] = (Math.random() - 0.5) * 200
            
            // Calculate velocity towards target
            const dx = targetPos.x - positions[i * 3]
            const dy = targetPos.y - positions[i * 3 + 1]
            const dz = targetPos.z - positions[i * 3 + 2]
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
            const speed = 0.1 + Math.random() * 0.1 // Much slower speed (0.1-0.2 instead of 0.5-1.0)      
            velocities[i * 3] = (dx / dist) * speed
            velocities[i * 3 + 1] = (dy / dist) * speed
            velocities[i * 3 + 2] = (dz / dist) * speed
            
            activeStars[i] = 1
            break
          }
        }
      }

      // Update star positions
      for (let i = 0; i < maxStars; i++) {
        if (activeStars[i] === 1) {
          positions[i * 3] += velocities[i * 3]
          positions[i * 3 + 1] += velocities[i * 3 + 1]
          positions[i * 3 + 2] += velocities[i * 3 + 2]

          // Check if star reached target
          const dx = positions[i * 3] - targetPos.x
          const dy = positions[i * 3 + 1] - targetPos.y
          const dz = positions[i * 3 + 2] - targetPos.z
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < 20) {
            // Reset star - move to random scattered position instead of center
            activeStars[i] = 0
            positions[i * 3] = (Math.random() - 0.5) * 1000
            positions[i * 3 + 1] = (Math.random() - 0.5) * 1000
            positions[i * 3 + 2] = (Math.random() - 0.5) * 1000
          }
        }
      }

      starsGeometry.attributes.position.needsUpdate = true
      starsMaterial.uniforms.time.value = time / 1000
      renderer.render(scene, camera)
    }

    animate(0)

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      targetPos = getTargetPosition()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      container.removeChild(renderer.domElement)
      starsGeometry.dispose()
      starsMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
    />
  )
}
