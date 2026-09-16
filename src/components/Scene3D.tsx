import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function createDumbbell(): THREE.Group {
  const group = new THREE.Group()

  const plateMat = new THREE.MeshStandardMaterial({
    color: 0xff2e2e,
    wireframe: true,
    roughness: 0.2,
    metalness: 0.9,
    emissive: 0x440011,
    transparent: true,
    opacity: 0.55,
  })

  const barMat = new THREE.MeshStandardMaterial({
    color: 0x8a8a9a,
    roughness: 0.15,
    metalness: 1,
    emissive: 0x220011,
  })

  const gripMat = new THREE.MeshStandardMaterial({
    color: 0x111122,
    roughness: 0.4,
    metalness: 0.7,
    emissive: 0x771111,
  })

  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 6.4, 24), barMat)
  bar.rotation.z = Math.PI / 2
  group.add(bar)

  const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.9, 24), gripMat)
  grip.rotation.z = Math.PI / 2
  group.add(grip)

  const platePositions = [1.45, 2.5]
  const plateSizes = [1.5, 1.15]

  platePositions.forEach((x, i) => {
    const size = plateSizes[i]
    ;[-1, 1].forEach((side) => {
      const plate = new THREE.Mesh(new THREE.TorusGeometry(size, 0.28, 12, 48), plateMat)
      plate.rotation.y = Math.PI / 2
      plate.position.x = x * side
      group.add(plate)
    })
  })

  const collarMat = new THREE.MeshStandardMaterial({
    color: 0xe94560,
    roughness: 0.2,
    metalness: 1,
    emissive: 0x330022,
  })
  ;[2.95, -2.95].forEach((x) => {
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.1, 8, 24), collarMat)
    collar.rotation.y = Math.PI / 2
    collar.position.x = x
    group.add(collar)
  })

  return group
}

function createBarbell(): THREE.Group {
  const group = new THREE.Group()

  const barMat = new THREE.MeshStandardMaterial({
    color: 0x9aa0b0,
    roughness: 0.12,
    metalness: 1,
    emissive: 0x220011,
  })

  const plateMat = new THREE.MeshStandardMaterial({
    color: 0xe94560,
    wireframe: true,
    roughness: 0.2,
    metalness: 0.9,
    emissive: 0x330022,
    transparent: true,
    opacity: 0.5,
  })

  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 13, 24), barMat)
  bar.rotation.z = Math.PI / 2
  group.add(bar)

  const radii = [1.7, 1.5, 1.3, 1.1, 0.9]
  radii.forEach((r, i) => {
    ;[-1, 1].forEach((side) => {
      const plate = new THREE.Mesh(new THREE.TorusGeometry(r, 0.3, 10, 40), plateMat)
      plate.rotation.y = Math.PI / 2
      plate.position.x = (2.1 + i * 0.72) * side
      group.add(plate)
    })
  })

  const collarMat = new THREE.MeshStandardMaterial({
    color: 0xff2e2e,
    roughness: 0.2,
    metalness: 1,
    emissive: 0x440011,
  })
  ;[5.5, -5.5].forEach((x) => {
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.35, 16), collarMat)
    collar.rotation.z = Math.PI / 2
    collar.position.x = x
    group.add(collar)
  })

  return group
}

function createKettlebell(): THREE.Group {
  const group = new THREE.Group()

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xff2e2e,
    wireframe: true,
    roughness: 0.15,
    metalness: 1,
    emissive: 0x440011,
    transparent: true,
    opacity: 0.5,
  })

  const solidMat = new THREE.MeshStandardMaterial({
    color: 0x14141f,
    roughness: 0.3,
    metalness: 0.85,
    emissive: 0x551111,
  })

  const body = new THREE.Mesh(new THREE.SphereGeometry(1.35, 32, 24), bodyMat)
  body.scale.y = 0.82
  body.position.y = -0.75
  group.add(body)

  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.35, 0.5, 32), solidMat)
  base.position.y = -1.75
  group.add(base)

  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.17, 12, 40), bodyMat)
  handle.position.y = 1.15
  group.add(handle)

  const topCap = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.35, 24), solidMat)
  topCap.position.y = 0.55
  group.add(topCap)

  return group
}

function createEcg(): { line: THREE.Mesh; dot: THREE.Mesh } {
  const points = [
    new THREE.Vector3(-8, 0, 0),
    new THREE.Vector3(-6.2, 0, 0),
    new THREE.Vector3(-5.4, 0, 0),
    new THREE.Vector3(-4.9, 0.9, 0),
    new THREE.Vector3(-4.4, -0.5, 0),
    new THREE.Vector3(-3.9, 0, 0),
    new THREE.Vector3(-3.4, 0, 0),
    new THREE.Vector3(-2.8, 0, 0),
    new THREE.Vector3(-2.3, 2.7, 0),
    new THREE.Vector3(-1.5, -1.5, 0),
    new THREE.Vector3(-0.7, 0, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1.8, 0, 0),
    new THREE.Vector3(2.3, 0.8, 0),
    new THREE.Vector3(2.9, 0, 0),
    new THREE.Vector3(8, 0, 0),
  ]

  const curve = new THREE.CatmullRomCurve3(points)

  const tubeGeo = new THREE.TubeGeometry(curve, 160, 0.06, 6, false)
  const tubeMat = new THREE.MeshBasicMaterial({
    color: 0xff2e2e,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  const line = new THREE.Mesh(tubeGeo, tubeMat)

  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 16, 16),
    new THREE.MeshBasicMaterial({
      color: 0xff5a5a,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  )

  return { line, dot }
}

function createNumber24(): THREE.Mesh {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  const gradient = ctx.createLinearGradient(0, 0, 1024, 512)
  gradient.addColorStop(0, '#ff2e2e')
  gradient.addColorStop(1, '#e94560')

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.font = '900 380px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.shadowColor = 'rgba(255, 46, 46, 0.9)'
  ctx.shadowBlur = 60
  ctx.fillStyle = gradient
  ctx.fillText('24', canvas.width / 2, canvas.height / 2 + 20)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(26, 13),
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.07,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
  )
  plane.userData.texture = texture

  return plane
}

export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0xff2e2e, 3, 50)
    pointLight1.position.set(15, 10, 15)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xe94560, 2.5, 50)
    pointLight2.position.set(-15, -10, 10)
    scene.add(pointLight2)

    // 1. Particle Constellation
    const particleCount = 1200
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const colorRed = new THREE.Color(0xff2e2e)
    const colorCrimson = new THREE.Color(0xe94560)
    const colorWhite = new THREE.Color(0xffffff)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 80
      positions[i3 + 1] = (Math.random() - 0.5) * 80
      positions[i3 + 2] = (Math.random() - 0.5) * 60

      const mixedColor = Math.random() > 0.6 ? colorRed : Math.random() > 0.3 ? colorCrimson : colorWhite
      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(geometry, particleMaterial)
    scene.add(particles)

    // 2. Fitness Equipment Models
    const dumbbell = createDumbbell()
    dumbbell.position.set(16, 2, -12)
    dumbbell.rotation.z = 0.25
    scene.add(dumbbell)

    const barbell = createBarbell()
    barbell.position.set(-17, 9, -16)
    barbell.rotation.x = 0.5
    barbell.rotation.z = 0.2
    barbell.rotation.y = -0.4
    barbell.scale.setScalar(0.85)
    scene.add(barbell)

    const kettlebell = createKettlebell()
    kettlebell.position.set(-14, -7, -9)
    kettlebell.rotation.y = 0.6
    scene.add(kettlebell)

    // 3. ECG Heartbeat Line
    const ecg = createEcg()
    ecg.line.position.set(0, -12, -16)
    ecg.dot.position.copy(ecg.line.position)
    scene.add(ecg.line)
    scene.add(ecg.dot)

    // 4. Glowing "24" Watermark
    const number24 = createNumber24()
    number24.position.set(0, 5, -32)
    scene.add(number24)

    // Interactive Mouse & Scroll Tracking with Lerp
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    let scrollY = window.scrollY
    let targetScrollY = scrollY

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2
      mouseY = -(event.clientY / window.innerHeight - 0.5) * 2
    }

    const handleScroll = () => {
      targetScrollY = window.scrollY
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener('resize', handleResize)

    // Animation Loop
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth lerp for mouse
      targetX += (mouseX - targetX) * 0.04
      targetY += (mouseY - targetY) * 0.04
      scrollY += (targetScrollY - scrollY) * 0.06

      // Camera parallax
      camera.position.x = targetX * 3
      camera.position.y = targetY * 3 - scrollY * 0.012
      camera.lookAt(0, -scrollY * 0.012, 0)

      // Particles subtle continuous wave & rotation
      particles.rotation.y = elapsedTime * 0.03 + scrollY * 0.0004
      particles.rotation.x = elapsedTime * 0.015

      // Dumbbell: slow spin, gentle bob, tilts with mouse
      dumbbell.rotation.y = elapsedTime * 0.3 + targetX * 0.4
      dumbbell.rotation.x = 0.25 + Math.sin(elapsedTime * 0.7) * 0.12 - targetY * 0.35
      dumbbell.position.y = 2 + Math.sin(elapsedTime * 0.6) * 1.4 - scrollY * 0.008

      // Barbell: slow tumble in the distance
      barbell.rotation.y = elapsedTime * 0.18 - targetX * 0.3
      barbell.rotation.x = 0.5 + Math.sin(elapsedTime * 0.4) * 0.25
      barbell.position.y = 9 + Math.cos(elapsedTime * 0.5) * 1.2 - scrollY * 0.006

      // Kettlebell: gentle float and sway
      kettlebell.rotation.y = elapsedTime * 0.22 - targetX * 0.3
      kettlebell.rotation.z = Math.sin(elapsedTime * 0.5) * 0.15
      kettlebell.position.y = -7 + Math.sin(elapsedTime * 0.8) * 1.1 - scrollY * 0.007

      // ECG heartbeat: pulse dot travels along the line
      const ecgT = (elapsedTime * 0.18) % 1
      const ecgPoint = ecg.line.userData.curvePoint as THREE.Vector3
      const curve = ecg.line.userData.curve as THREE.CatmullRomCurve3 | undefined
      if (curve) {
        curve.getPointAt(ecgT, ecgPoint)
        ecg.dot.position.x = ecg.line.position.x + ecgPoint.x
        ecg.dot.position.y = ecg.line.position.y + ecgPoint.y
        ecg.dot.position.z = ecg.line.position.z + ecgPoint.z
      }
      ecg.dot.scale.setScalar(1 + Math.sin(elapsedTime * 6) * 0.25)
      ;(ecg.line.material as THREE.MeshBasicMaterial).opacity = 0.45 + Math.sin(elapsedTime * 1.5) * 0.1

      // "24" watermark: slow breathing scale
      number24.scale.setScalar(1 + Math.sin(elapsedTime * 0.5) * 0.03)

      renderer.render(scene, camera)
    }

    // Store curve on the line userData for the animation loop
    ecg.line.userData.curve = (ecg.line.geometry as THREE.TubeGeometry).parameters.path as THREE.CatmullRomCurve3
    ecg.line.userData.curvePoint = new THREE.Vector3()

    animate()

    // Store curve on the line userData for the animation loop
    const curveGeo = ecg.line.geometry as THREE.TubeGeometry
    const curve = curveGeo.parameters.path as THREE.CatmullRomCurve3
    ecg.line.userData.curve = curve
    ecg.line.userData.curvePoint = new THREE.Vector3()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)

      geometry.dispose()
      particleMaterial.dispose()

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
          mats.forEach((m) => m.dispose())
        }
      })

      const texture = number24.userData.texture as THREE.Texture
      if (texture) texture.dispose()

      renderer.dispose()

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    />
  )
}