import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sun, 
  CloudRain, 
  Maximize2, 
  ShieldCheck, 
  Sparkles,
  Layers,
  ChevronRight,
  ChevronLeft,
  Eye,
  Box,
  Compass,
  Zap,
  Activity,
  Award
} from 'lucide-react';
import type { 
  PhysicalExperienceStoryboard, 
  Physical3DEnvironment, 
  PhysicalSimulationHotspot,
  SimulationAppearance,
  UserModificationState
} from '../../types/simulation';

interface Physical3DExperienceCanvasProps {
  storyboard: PhysicalExperienceStoryboard;
  appearance: SimulationAppearance;
  activeStageIndex: number;
  onSelectStage: (index: number) => void;
  sceneOverrides?: UserModificationState;
}

export const Physical3DExperienceCanvas: React.FC<Physical3DExperienceCanvasProps> = ({
  storyboard,
  appearance,
  activeStageIndex,
  onSelectStage,
  sceneOverrides = {},
}) => {
  const { productMockup, visualProfile, customerPersona, stages } = storyboard;
  const currentStage = stages[activeStageIndex] || stages[0];

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulation controls state
  const [isPlayingFilm, setIsPlayingFilm] = useState<boolean>(false);
  const [environmentMode, setEnvironmentMode] = useState<Physical3DEnvironment>('studio');
  const [selectedHotspot, setSelectedHotspot] = useState<PhysicalSimulationHotspot | null>(null);
  const [hotspotScreenCoords, setHotspotScreenCoords] = useState<{ [id: string]: { x: number; y: number } }>({});
  const [isExploded, setIsExploded] = useState<boolean>(false);

  // Three.js References to manage animation and scene state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  
  // Scene Groups for the 7 Distinct Moments
  const packageGroupRef = useRef<THREE.Group | null>(null);
  const lidGroupRef = useRef<THREE.Group | null>(null);
  const productGroupRef = useRef<THREE.Group | null>(null);
  const explodedGroupRef = useRef<THREE.Group | null>(null);
  const activationFxGroupRef = useRef<THREE.Group | null>(null);
  const environmentGroupRef = useRef<THREE.Group | null>(null);
  const floorMeshRef = useRef<THREE.Mesh | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);
  
  // Lights
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const fillLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.PointLight | null>(null);
  const accentLightRef = useRef<THREE.PointLight | null>(null);

  // Dynamic particle systems
  const particlesRef = useRef<THREE.Points | null>(null);
  const waterDropletsRef = useRef<THREE.Points | null>(null);
  const steamParticlesRef = useRef<THREE.Points | null>(null);
  const medicalPulseRef = useRef<THREE.Mesh | null>(null);
  const kineticRingsRef = useRef<THREE.Group | null>(null);
  const reqIdRef = useRef<number | null>(null);

  // Manual rotation drag state (does not interfere with document wheel scrolling)
  const isDraggingRef = useRef<boolean>(false);
  const prevMouseXRef = useRef<number>(0);
  const prevMouseYRef = useRef<number>(0);
  const manualRotYRef = useRef<number>(0.2);
  const manualRotXRef = useRef<number>(0);

  // Film sequence auto-advancement loop
  useEffect(() => {
    let filmTimer: ReturnType<typeof setInterval> | null = null;
    if (isPlayingFilm) {
      filmTimer = setInterval(() => {
        onSelectStage((activeStageIndex + 1) % stages.length);
      }, 4500);
    }
    return () => {
      if (filmTimer) clearInterval(filmTimer);
    };
  }, [isPlayingFilm, activeStageIndex, stages.length, onSelectStage]);

  // Update hotspot 2D screen positions based on 3D camera projection
  const updateHotspotProjections = useCallback(() => {
    if (!cameraRef.current || !productGroupRef.current || !containerRef.current) return;
    const camera = cameraRef.current;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;

    // Only display hotspots in Stages 3 (Reveal), 4 (Materials), and 5 (Activation)
    if (activeStageIndex < 2 || activeStageIndex > 5) {
      setHotspotScreenCoords({});
      return;
    }

    const newCoords: { [id: string]: { x: number; y: number } } = {};
    const worldPos = new THREE.Vector3();

    productMockup.hotspots.forEach((spot) => {
      worldPos.set(spot.position[0], spot.position[1], spot.position[2]);
      productGroupRef.current?.localToWorld(worldPos);
      worldPos.project(camera);

      const x = ((worldPos.x + 1) * width) / 2;
      const y = ((-worldPos.y + 1) * height) / 2;

      if (worldPos.z < 1) {
        newCoords[spot.id] = { x, y };
      }
    });

    setHotspotScreenCoords(newCoords);
  }, [productMockup.hotspots, activeStageIndex]);

  // Primary WebGL Scene Construction and Lifecycle
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 540;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // INITIAL DEFAULT IS LIGHT STUDIO / WHITE
    const isLightDefault = appearance.theme === 'light' || !appearance.theme;
    scene.background = new THREE.Color(isLightDefault ? 0xf8fafc : 0x070a0f);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.0, 5.0);
    cameraRef.current = camera;

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;

    // 3. Dynamic Color & Material Tokens from Venture / Visual Profile & Overrides
    const primaryColorHex = sceneOverrides.primaryColorOverride || visualProfile?.primaryColor || productMockup.primaryColor || '#1E40AF';
    const accentColorHex = sceneOverrides.accentColorOverride || visualProfile?.accentColor || productMockup.accentColor || '#10B981';
    const primaryColor = new THREE.Color(primaryColorHex);
    const accentColor = new THREE.Color(accentColorHex);

    // 4. Studio Lighting System (Light Studio is Default)
    const ambientLight = new THREE.AmbientLight(0xffffff, isLightDefault ? 1.2 : 0.6);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const dirLight = new THREE.DirectionalLight(0xffffff, isLightDefault ? 2.0 : 2.0);
    dirLight.position.set(6, 12, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.0001;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    const fillLight = new THREE.DirectionalLight(0xf1f5f9, isLightDefault ? 1.1 : 0.8);
    fillLight.position.set(-6, 8, -4);
    scene.add(fillLight);
    fillLightRef.current = fillLight;

    const rimLight = new THREE.PointLight(isLightDefault ? 0xdbeafe : 0x4d8dff, isLightDefault ? 0.6 : 1.8, 12);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    const accentLight = new THREE.PointLight(accentColorHex, isLightDefault ? 0.9 : 1.8, 10);
    accentLight.position.set(3, 1.5, 3);
    scene.add(accentLight);
    accentLightRef.current = accentLight;

    // 5. Environment & Floor System
    const environmentGroup = new THREE.Group();
    environmentGroupRef.current = environmentGroup;
    scene.add(environmentGroup);

    // Floor Mesh (Neutral soft grey for Light Studio)
    const floorGeo = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: isLightDefault ? 0xe2e8f0 : 0x080c14,
      roughness: isLightDefault ? 0.7 : 0.65,
      metalness: isLightDefault ? 0.05 : 0.15,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -1.4;
    floorMesh.receiveShadow = true;
    environmentGroup.add(floorMesh);
    floorMeshRef.current = floorMesh;

    // Technical Grid Helper (optional for technical mode)
    const gridHelper = new THREE.GridHelper(12, 24, 0x3b82f6, 0x94a3b8);
    gridHelper.position.y = -1.39;
    gridHelper.visible = appearance.style === 'technical';
    environmentGroup.add(gridHelper);
    gridHelperRef.current = gridHelper;

    // =========================================================================
    // 6. BUILD 7 DISTINCT SCENE MOMENTS:
    // A. PACKAGE / PRESENTATION BOX GROUP (Stages 1 & 2)
    // =========================================================================
    const packageGroup = new THREE.Group();
    packageGroupRef.current = packageGroup;
    scene.add(packageGroup);

    const lidGroup = new THREE.Group();
    lidGroupRef.current = lidGroup;
    packageGroup.add(lidGroup);

    const packagingStyle = sceneOverrides.packagingOverride || visualProfile?.packagingStyle || productMockup.packagingStyle;
    const isKraftBox = packagingStyle.includes('kraft') || sceneOverrides.packagingOverride === 'kraft_box';
    const isWoodBox = packagingStyle.includes('wood') || sceneOverrides.packagingOverride === 'wooden_box';
    const isAlumCase = packagingStyle.includes('aluminum') || sceneOverrides.packagingOverride === 'aluminum_case';
    
    const boxBaseColor = isKraftBox ? 0xb45309 : isWoodBox ? 0x78350f : isAlumCase ? 0x475569 : 0x1e293b;
    const boxMat = new THREE.MeshStandardMaterial({
      color: boxBaseColor,
      roughness: isKraftBox ? 0.9 : isWoodBox ? 0.75 : isAlumCase ? 0.25 : 0.5,
      metalness: isAlumCase ? 0.85 : 0.1,
    });

    // Outer Box Base & Internal Molded Cradle
    const boxBaseGeo = new THREE.BoxGeometry(2.6, 0.6, 2.2);
    const boxBase = new THREE.Mesh(boxBaseGeo, boxMat);
    boxBase.position.set(0, -0.9, 0);
    boxBase.receiveShadow = true;
    boxBase.castShadow = true;
    packageGroup.add(boxBase);

    // Inner Velvet/Molded Cradle
    const cradleGeo = new THREE.BoxGeometry(2.3, 0.4, 1.9);
    const cradleMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.95,
      metalness: 0.05,
    });
    const cradle = new THREE.Mesh(cradleGeo, cradleMat);
    cradle.position.set(0, -0.75, 0);
    packageGroup.add(cradle);

    // Box Lid (Hinged at rear)
    const lidGeo = new THREE.BoxGeometry(2.65, 0.35, 2.25);
    const lidMesh = new THREE.Mesh(lidGeo, boxMat);
    lidMesh.position.set(0, 0.18, 0);
    lidMesh.castShadow = true;
    lidGroup.position.set(0, -0.6, -1.1); // Hinge anchor at rear
    lidMesh.position.set(0, 0.18, 1.1); // Offset relative to hinge
    lidGroup.add(lidMesh);

    // Tamper Ribbon / Brand Accent Strip on Lid
    const ribbonGeo = new THREE.PlaneGeometry(2.66, 0.25);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: accentColor,
      roughness: 0.4,
      metalness: 0.3,
    });
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbon.position.set(0, 0.2, 2.23);
    lidGroup.add(ribbon);

    // =========================================================================
    // B. HERO 3D PRODUCT GROUP (Stages 3, 5, 6, 7)
    // =========================================================================
    const productGroup = new THREE.Group();
    productGroupRef.current = productGroup;
    scene.add(productGroup);

    // Scale override if specified
    const scaleMult = sceneOverrides.scaleOverride || 1.0;
    productGroup.scale.set(scaleMult, scaleMult, scaleMult);

    // Hero Pedestal Base (illuminated ring for Stages 3 & 7)
    const pedestalGeo = new THREE.CylinderGeometry(1.2, 1.3, 0.2, 32);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: isLightDefault ? 0xffffff : 0x0f172a,
      roughness: 0.3,
      metalness: 0.4,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -1.3;
    pedestal.receiveShadow = true;
    productGroup.add(pedestal);

    const haloRingGeo = new THREE.TorusGeometry(1.25, 0.03, 16, 32);
    const haloRingMat = new THREE.MeshStandardMaterial({
      color: accentColor,
      emissive: accentColor,
      emissiveIntensity: 1.0,
      roughness: 0.2,
    });
    const haloRing = new THREE.Mesh(haloRingGeo, haloRingMat);
    haloRing.rotation.x = Math.PI / 2;
    haloRing.position.y = -1.2;
    productGroup.add(haloRing);

    // =========================================================================
    // C. EXPLODED COMPONENT GROUP (Stage 4 - Deep Materials Inspection)
    // =========================================================================
    const explodedGroup = new THREE.Group();
    explodedGroupRef.current = explodedGroup;
    explodedGroup.scale.set(scaleMult, scaleMult, scaleMult);
    scene.add(explodedGroup);

    // =========================================================================
    // D. ACTIVATION FX GROUP (Stage 5 - Real Functional Doing)
    // =========================================================================
    const activationFxGroup = new THREE.Group();
    activationFxGroupRef.current = activationFxGroup;
    scene.add(activationFxGroup);

    // Category-Specific Procedural 3D Geometry
    const category = visualProfile?.category || productMockup.categoryType;
    const materialOverride = sceneOverrides.materialOverride;
    const compVis = sceneOverrides.componentVisibility || {};

    if (category === 'hardware') {
      // -----------------------------------------------------------------------
      // HARDWARE 3D MODEL
      // -----------------------------------------------------------------------
      const isMatteBlack = materialOverride === 'matte_black';
      const isTitanium = materialOverride === 'brushed_titanium';
      const isCarbon = materialOverride === 'carbon_fiber';
      const isCeramic = materialOverride === 'ceramic';
      const isSteel = materialOverride === 'brushed_steel';

      const chassisMat = new THREE.MeshStandardMaterial({
        color: isMatteBlack ? 0x0f172a : isTitanium ? 0xe2e8f0 : isCeramic ? 0xf8fafc : primaryColor,
        metalness: isMatteBlack ? 0.2 : isCarbon ? 0.3 : isCeramic ? 0.05 : isSteel ? 0.92 : 0.85,
        roughness: isMatteBlack ? 0.7 : isCarbon ? 0.4 : isCeramic ? 0.1 : 0.25,
      });

      // 1. Unibody CNC Enclosure
      const chassisGeo = new THREE.BoxGeometry(1.8, 1.0, 0.3);
      const chassis = new THREE.Mesh(chassisGeo, chassisMat);
      chassis.castShadow = true;
      chassis.receiveShadow = true;
      productGroup.add(chassis);

      // Glass OLED Display Screen
      if (compVis.screen !== false) {
        const screenGlassGeo = new THREE.PlaneGeometry(1.4, 0.7);
        const screenGlassMat = new THREE.MeshStandardMaterial({
          color: 0x050914,
          emissive: new THREE.Color(0x0284c7),
          emissiveIntensity: sceneOverrides.activeFeatureMode === 'telemetry' ? 0.8 : 0.25,
          roughness: 0.08,
          metalness: 0.9,
        });
        const screenGlass = new THREE.Mesh(screenGlassGeo, screenGlassMat);
        screenGlass.position.set(0, 0, 0.16);
        productGroup.add(screenGlass);
      }

      // Tactile Brass / Accent Button
      if (compVis.buttons !== false) {
        const btnGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.06, 24);
        const btnMat = new THREE.MeshStandardMaterial({
          color: accentColor,
          metalness: 0.9,
          roughness: 0.18,
        });
        const button = new THREE.Mesh(btnGeo, btnMat);
        button.rotation.x = Math.PI / 2;
        button.position.set(0.72, 0.32, 0.16);
        productGroup.add(button);
      }

      // Status LED Ring
      if (compVis.led !== false) {
        const ledGeo = new THREE.SphereGeometry(0.04, 16, 16);
        const ledMat = new THREE.MeshStandardMaterial({
          color: accentColor,
          emissive: accentColor,
          emissiveIntensity: 2.0,
        });
        const led = new THREE.Mesh(ledGeo, ledMat);
        led.position.set(-0.72, 0.32, 0.16);
        productGroup.add(led);
      }

      // EXPLODED VIEW COMPONENTS (Stage 4)
      const expGlass = new THREE.Mesh(
        new THREE.PlaneGeometry(1.4, 0.7),
        new THREE.MeshStandardMaterial({ color: 0x0284c7, emissive: 0x0284c7, emissiveIntensity: 0.3, roughness: 0.1 })
      );
      expGlass.position.set(0, 0, 0.7);
      explodedGroup.add(expGlass);

      // Gold / Emerald PCB Circuit Substrate
      if (compVis.pcb !== false) {
        const pcbGeo = new THREE.BoxGeometry(1.5, 0.8, 0.04);
        const pcbMat = new THREE.MeshStandardMaterial({ color: 0x064e3b, metalness: 0.5, roughness: 0.3 });
        const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
        pcbMesh.position.set(0, 0, 0.3);
        explodedGroup.add(pcbMesh);

        // Microchips on PCB
        for (let c = 0; c < 4; c++) {
          const chip = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 0.2, 0.02),
            new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.2, roughness: 0.4 })
          );
          chip.position.set(-0.4 + c * 0.28, 0.1, 0.33);
          explodedGroup.add(chip);
        }
      }

      // Battery Core
      if (compVis.battery !== false) {
        const battGeo = new THREE.BoxGeometry(0.7, 0.6, 0.1);
        const battMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.3 });
        const battery = new THREE.Mesh(battGeo, battMat);
        battery.position.set(0.3, -0.05, 0.0);
        explodedGroup.add(battery);
      }

      // Rear Aluminum Shell
      const rearShell = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.0, 0.15), chassisMat);
      rearShell.position.set(0, 0, -0.5);
      explodedGroup.add(rearShell);

      // ACTIVATION FUNCTION FX (Stage 5 - Magnetic Dock vs USB-C Cable)
      if (sceneOverrides.activeFeatureMode === 'usbc') {
        const cableGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 16);
        const cableMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
        const cable = new THREE.Mesh(cableGeo, cableMat);
        cable.position.set(0, -0.65, 0);
        activationFxGroup.add(cable);
      } else {
        const dockGeo = new THREE.CylinderGeometry(0.8, 0.9, 0.15, 32);
        const dockMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 });
        const dock = new THREE.Mesh(dockGeo, dockMat);
        dock.position.set(0, -0.65, 0);
        activationFxGroup.add(dock);

        const dockRingGeo = new THREE.TorusGeometry(0.7, 0.02, 16, 32);
        const dockRingMat = new THREE.MeshStandardMaterial({ color: accentColor, emissive: accentColor, emissiveIntensity: 2.2 });
        const dockRing = new THREE.Mesh(dockRingGeo, dockRingMat);
        dockRing.rotation.x = Math.PI / 2;
        dockRing.position.set(0, -0.56, 0);
        activationFxGroup.add(dockRing);
      }

    } else if (category === 'apparel') {
      // -----------------------------------------------------------------------
      // APPAREL / TEXTILE 3D MODEL
      // -----------------------------------------------------------------------
      const woolMat = new THREE.MeshStandardMaterial({
        color: primaryColor,
        roughness: 0.88,
        metalness: 0.08,
      });

      // Sculpted Outerwear Torso Silhouette
      const torsoGeo = new THREE.CylinderGeometry(0.85, 0.7, 2.0, 32);
      const torsoMesh = new THREE.Mesh(torsoGeo, woolMat);
      torsoMesh.castShadow = true;
      torsoMesh.receiveShadow = true;
      productGroup.add(torsoMesh);

      // Articulated Storm Collar
      if (compVis.collar !== false) {
        const collarGeo = new THREE.TorusGeometry(0.6, 0.14, 16, 32, Math.PI);
        const collarMat = new THREE.MeshStandardMaterial({ color: 0x3b2a1a, roughness: 0.9 });
        const collar = new THREE.Mesh(collarGeo, collarMat);
        collar.rotation.x = Math.PI / 2;
        collar.position.set(0, 1.0, 0);
        productGroup.add(collar);
      }

      // Fastener Assembly
      if (compVis.buttons !== false) {
        for (let b = 0; b < 4; b++) {
          const btnGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.03, 16);
          const btnMat = new THREE.MeshStandardMaterial({ color: accentColor, metalness: 0.9, roughness: 0.2 });
          const btn = new THREE.Mesh(btnGeo, btnMat);
          btn.rotation.x = Math.PI / 2;
          btn.position.set(0, 0.65 - b * 0.42, 0.83 - b * 0.03);
          productGroup.add(btn);
        }
      }

      // EXPLODED LAYERS (Stage 4 - Shell / Membrane / Lining)
      const outerLayer = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.72, 2.0, 32, 1, false, 0, Math.PI), woolMat);
      outerLayer.position.set(0, 0, 0.5);
      explodedGroup.add(outerLayer);

      const membraneMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.5, transparent: true, opacity: 0.7 });
      const membraneLayer = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.7, 1.9, 32, 1, false, 0, Math.PI), membraneMat);
      membraneLayer.position.set(0, 0, 0.1);
      explodedGroup.add(membraneLayer);

      const liningMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3, metalness: 0.4 });
      const liningLayer = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.68, 1.8, 32, 1, false, 0, Math.PI), liningMat);
      liningLayer.position.set(0, 0, -0.3);
      explodedGroup.add(liningLayer);

      // ACTIVATION FX (Stage 5 - Hydrophobic Water Beading / Weather Stress)
      const dropletCount = 60;
      const dropGeo = new THREE.BufferGeometry();
      const dropPos = new Float32Array(dropletCount * 3);
      for (let i = 0; i < dropletCount * 3; i += 3) {
        dropPos[i] = (Math.random() - 0.5) * 1.5;
        dropPos[i + 1] = Math.random() * 2.0;
        dropPos[i + 2] = 0.85 + Math.random() * 0.4;
      }
      dropGeo.setAttribute('position', new THREE.BufferAttribute(dropPos, 3));
      const dropMat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.05, transparent: true, opacity: 0.8 });
      const droplets = new THREE.Points(dropGeo, dropMat);
      waterDropletsRef.current = droplets;
      activationFxGroup.add(droplets);

    } else if (category === 'coffee') {
      // -----------------------------------------------------------------------
      // COFFEE / BEVERAGE 3D MODEL
      // -----------------------------------------------------------------------
      const pouchMat = new THREE.MeshStandardMaterial({
        color: primaryColor,
        roughness: 0.45,
        metalness: 0.65,
      });

      // Matte Foil Valve Pouch
      const pouchGeo = new THREE.BoxGeometry(1.3, 1.9, 0.65);
      const pouch = new THREE.Mesh(pouchGeo, pouchMat);
      pouch.castShadow = true;
      pouch.receiveShadow = true;
      productGroup.add(pouch);

      // Aroma Degassing Valve
      if (compVis.valve !== false) {
        const valveGeo = new THREE.TorusGeometry(0.09, 0.02, 16, 24);
        const valveMat = new THREE.MeshStandardMaterial({ color: accentColor, metalness: 0.8, roughness: 0.2 });
        const valve = new THREE.Mesh(valveGeo, valveMat);
        valve.position.set(0, 0.6, 0.33);
        productGroup.add(valve);
      }

      // Floating Roasted Coffee Bean Meshes
      if (compVis.beans !== false) {
        const beanGeo = new THREE.SphereGeometry(0.08, 16, 16);
        beanGeo.scale(1, 1.4, 0.7);
        const beanMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.7 });

        for (let b = 0; b < 6; b++) {
          const bean = new THREE.Mesh(beanGeo, beanMat);
          bean.position.set(
            Math.sin(b * 1.1) * 1.3,
            -0.8 + (b % 3) * 0.35,
            Math.cos(b * 1.1) * 0.9
          );
          bean.rotation.set(b, b * 0.6, b * 0.4);
          productGroup.add(bean);
        }
      }

      // EXPLODED LAYERS (Stage 4)
      const expFoil = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.9, 0.05), pouchMat);
      expFoil.position.set(0, 0, 0.55);
      explodedGroup.add(expFoil);

      const barrierMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.1 });
      const expBarrier = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.8, 0.05), barrierMat);
      expBarrier.position.set(0, 0, 0.1);
      explodedGroup.add(expBarrier);

      // ACTIVATION FX (Stage 5 - Steam billow & Aroma stream)
      const steamCount = 50;
      const steamGeo = new THREE.BufferGeometry();
      const steamPos = new Float32Array(steamCount * 3);
      for (let s = 0; s < steamCount * 3; s += 3) {
        steamPos[s] = (Math.random() - 0.5) * 0.3;
        steamPos[s + 1] = 0.6 + Math.random() * 1.2;
        steamPos[s + 2] = 0.35 + (Math.random() - 0.5) * 0.2;
      }
      steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));
      const steamMat = new THREE.PointsMaterial({ color: 0xfef08a, size: 0.06, transparent: true, opacity: 0.7 });
      const steam = new THREE.Points(steamGeo, steamMat);
      steamParticlesRef.current = steam;
      activationFxGroup.add(steam);

    } else if (category === 'medical') {
      // -----------------------------------------------------------------------
      // MEDICAL DEVICE / CLINICAL BIOSENSOR 3D MODEL
      // -----------------------------------------------------------------------
      const isMatteBlack = materialOverride === 'matte_black';
      const isCeramic = materialOverride === 'ceramic' || !materialOverride;
      
      const medicalMat = new THREE.MeshStandardMaterial({
        color: isMatteBlack ? 0x0f172a : isCeramic ? 0xf8fafc : primaryColor,
        roughness: 0.18,
        metalness: 0.12,
      });

      // 1. Sleek Ergonomic Medical Unibody
      const medicalGeo = new THREE.BoxGeometry(1.4, 1.8, 0.45);
      const medicalBody = new THREE.Mesh(medicalGeo, medicalMat);
      medicalBody.castShadow = true;
      medicalBody.receiveShadow = true;
      productGroup.add(medicalBody);

      // Cyan OLED Cardiogram / Telemetry Display
      const displayGeo = new THREE.PlaneGeometry(1.1, 0.7);
      const displayMat = new THREE.MeshStandardMaterial({
        color: 0x021a2c,
        emissive: new THREE.Color(0x06b6d4),
        emissiveIntensity: 0.85,
        roughness: 0.1,
      });
      const display = new THREE.Mesh(displayGeo, displayMat);
      display.position.set(0, 0.35, 0.23);
      productGroup.add(display);

      // High-Precision Optical Biosensor Aperture (Glowing Lens)
      const sensorLensGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.08, 32);
      const sensorLensMat = new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        emissive: new THREE.Color(0x38bdf8),
        emissiveIntensity: 1.4,
        roughness: 0.05,
      });
      const sensorLens = new THREE.Mesh(sensorLensGeo, sensorLensMat);
      sensorLens.rotation.x = Math.PI / 2;
      sensorLens.position.set(0, -0.4, 0.23);
      productGroup.add(sensorLens);

      // Antimicrobial Grip Ring
      const gripRingGeo = new THREE.TorusGeometry(0.24, 0.03, 16, 32);
      const gripRingMat = new THREE.MeshStandardMaterial({ color: accentColor, roughness: 0.5 });
      const gripRing = new THREE.Mesh(gripRingGeo, gripRingMat);
      gripRing.position.set(0, -0.4, 0.25);
      productGroup.add(gripRing);

      // Induction Charging Contacts (Rear)
      for (let p = 0; p < 2; p++) {
        const pinGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.02, 16);
        const pinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95, roughness: 0.1 });
        const pin = new THREE.Mesh(pinGeo, pinMat);
        pin.rotation.x = Math.PI / 2;
        pin.position.set(-0.2 + p * 0.4, -0.6, -0.23);
        productGroup.add(pin);
      }

      // EXPLODED VIEW COMPONENTS (Stage 4 - Medical Dissection)
      // Front Polycarbonate Shell
      const expFrontShell = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.8, 0.08), medicalMat);
      expFrontShell.position.set(0, 0, 0.65);
      explodedGroup.add(expFrontShell);

      // Optical Biosensor Module
      const expBioArray = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.25, 0.06, 32),
        new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 0.6 })
      );
      expBioArray.rotation.x = Math.PI / 2;
      expBioArray.position.set(0, -0.4, 0.4);
      explodedGroup.add(expBioArray);

      // Clinical Telemetry PCB Board
      const expMedPcb = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 1.5, 0.04),
        new THREE.MeshStandardMaterial({ color: 0x0f766e, metalness: 0.6, roughness: 0.25 })
      );
      expMedPcb.position.set(0, 0, 0.1);
      explodedGroup.add(expMedPcb);

      // Medical Grade LiPo Power Cell
      const expMedBatt = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.7, 0.1),
        new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.3 })
      );
      expMedBatt.position.set(0, 0.2, -0.2);
      explodedGroup.add(expMedBatt);

      // Rear Induction Casing
      const expRearShell = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.8, 0.08), medicalMat);
      expRearShell.position.set(0, 0, -0.55);
      explodedGroup.add(expRearShell);

      // ACTIVATION FX (Stage 5 - Real Heartbeat Telemetry Wave Pulse)
      const pulseRingGeo = new THREE.RingGeometry(0.3, 0.38, 32);
      const pulseRingMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      });
      const pulseRing = new THREE.Mesh(pulseRingGeo, pulseRingMat);
      pulseRing.position.set(0, -0.4, 0.28);
      medicalPulseRef.current = pulseRing;
      activationFxGroup.add(pulseRing);

      // Vital Beam Cone
      const coneGeo = new THREE.ConeGeometry(0.5, 1.2, 32, 1, true);
      const coneMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      });
      const vitalCone = new THREE.Mesh(coneGeo, coneMat);
      vitalCone.rotation.x = -Math.PI / 2;
      vitalCone.position.set(0, -0.4, 0.85);
      activationFxGroup.add(vitalCone);

    } else if (category === 'footwear') {
      // -----------------------------------------------------------------------
      // FOOTWEAR / PERFORMANCE SNEAKER 3D MODEL
      // -----------------------------------------------------------------------
      const upperMat = new THREE.MeshStandardMaterial({
        color: primaryColor,
        roughness: 0.85,
        metalness: 0.08,
      });

      const foamMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.6,
        metalness: 0.05,
      });

      const rubberMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.9,
        metalness: 0.1,
      });

      // 1. Nitrogen Foam Midsole Chassis
      const midsoleGeo = new THREE.BoxGeometry(1.1, 0.35, 2.4);
      const midsole = new THREE.Mesh(midsoleGeo, foamMat);
      midsole.position.set(0, -0.3, 0);
      midsole.castShadow = true;
      midsole.receiveShadow = true;
      productGroup.add(midsole);

      // 2. Contoured Knit Upper
      const upperGeo = new THREE.CylinderGeometry(0.5, 0.55, 0.8, 32);
      upperGeo.scale(1.0, 1.0, 1.8);
      const upper = new THREE.Mesh(upperGeo, upperMat);
      upper.position.set(0, 0.2, -0.1);
      upper.castShadow = true;
      upper.receiveShadow = true;
      productGroup.add(upper);

      // 3. Heel Stability Clip
      const heelClipGeo = new THREE.TorusGeometry(0.48, 0.08, 16, 32, Math.PI);
      const heelClipMat = new THREE.MeshStandardMaterial({ color: accentColor, metalness: 0.85, roughness: 0.2 });
      const heelClip = new THREE.Mesh(heelClipGeo, heelClipMat);
      heelClip.rotation.x = Math.PI / 2;
      heelClip.position.set(0, 0.05, -0.85);
      productGroup.add(heelClip);

      // 4. Outsole Grip Traction Plate
      const outsoleGeo = new THREE.BoxGeometry(1.12, 0.08, 2.42);
      const outsole = new THREE.Mesh(outsoleGeo, rubberMat);
      outsole.position.set(0, -0.5, 0);
      productGroup.add(outsole);

      // EXPLODED LAYERS (Stage 4 - Footwear Construction Stack)
      const expInsole = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.05, 2.0), new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.8 }));
      expInsole.position.set(0, 0.7, 0);
      explodedGroup.add(expInsole);

      const expUpper = new THREE.Mesh(upperGeo, upperMat);
      expUpper.position.set(0, 0.35, 0);
      explodedGroup.add(expUpper);

      const expPlate = new THREE.Mesh(
        new THREE.BoxGeometry(0.95, 0.03, 2.1),
        new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.9, roughness: 0.15 })
      );
      expPlate.position.set(0, 0.0, 0);
      explodedGroup.add(expPlate);

      const expMidsole = new THREE.Mesh(midsoleGeo, foamMat);
      expMidsole.position.set(0, -0.35, 0);
      explodedGroup.add(expMidsole);

      const expOutsole = new THREE.Mesh(outsoleGeo, rubberMat);
      expOutsole.position.set(0, -0.7, 0);
      explodedGroup.add(expOutsole);

      // ACTIVATION FX (Stage 5 - Kinetic Energy Rebound Wave)
      const kineticGroup = new THREE.Group();
      for (let k = 0; k < 3; k++) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.6 + k * 0.2, 0.02, 16, 32),
          new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.8 - k * 0.2 })
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.set(0, -0.5, -0.4);
        kineticGroup.add(ring);
      }
      kineticRingsRef.current = kineticGroup;
      activationFxGroup.add(kineticGroup);

    } else {
      // -----------------------------------------------------------------------
      // GENERAL GOODS / PRECISION CONSUMER PRODUCT
      // -----------------------------------------------------------------------
      const bodyMat = new THREE.MeshStandardMaterial({
        color: primaryColor,
        roughness: 0.35,
        metalness: 0.7,
      });

      const bodyGeo = new THREE.CylinderGeometry(0.65, 0.75, 1.5, 32);
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.castShadow = true;
      body.receiveShadow = true;
      productGroup.add(body);

      const accentRingGeo = new THREE.TorusGeometry(0.7, 0.04, 16, 32);
      const accentRingMat = new THREE.MeshStandardMaterial({ color: accentColor, metalness: 0.9, roughness: 0.2 });
      const ring = new THREE.Mesh(accentRingGeo, accentRingMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(0, 0.2, 0);
      productGroup.add(ring);

      // Exploded Shell / Core
      const expShell = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.85, 1.5, 32, 1, false, 0, Math.PI), bodyMat);
      expShell.position.set(0, 0, 0.5);
      explodedGroup.add(expShell);

      const expCore = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 1.3, 24), accentRingMat);
      expCore.position.set(0, 0, -0.2);
      explodedGroup.add(expCore);
    }

    // 7. Ambient Dust Particles
    const dustCount = 80;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPos[i] = (Math.random() - 0.5) * 8;
      dustPos[i + 1] = Math.random() * 4 - 1.0;
      dustPos[i + 2] = (Math.random() - 0.5) * 8;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.4,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    particlesRef.current = dust;
    scene.add(dust);

    // =========================================================================
    // 8. ANIMATION & RENDER LOOP
    // =========================================================================
    const clock = new THREE.Clock();

    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Theme & Environment settings
      const envOverride = sceneOverrides.environmentOverride;
      const isDark = appearance.theme === 'dark' || envOverride === 'dark_studio';
      const isLight = (appearance.theme === 'light' || !appearance.theme || envOverride === 'light_studio') && !isDark;
      const isPremium = appearance.style === 'premium';
      const isIndustrial = appearance.style === 'industrial' || envOverride === 'workshop' || envOverride === 'construction';
      const isTechnical = appearance.style === 'technical';
      const isOutdoor = envOverride === 'outdoor';

      if (sceneRef.current) {
        if (isOutdoor) {
          sceneRef.current.background = new THREE.Color(0xdbeafe); // outdoor sky
        } else if (isLight) {
          sceneRef.current.background = new THREE.Color(0xf8fafc); // clean light studio
        } else if (isPremium) {
          sceneRef.current.background = new THREE.Color(0x0a0907); // luxury obsidian
        } else if (isDark) {
          sceneRef.current.background = new THREE.Color(0x070a0f); // dark studio
        } else {
          sceneRef.current.background = new THREE.Color(0xf8fafc); // default light studio
        }
      }

      if (ambientLightRef.current) {
        ambientLightRef.current.intensity = isLight ? 1.2 : isIndustrial ? 0.4 : 0.6;
      }

      if (dirLightRef.current) {
        dirLightRef.current.intensity = isLight ? 2.0 : isIndustrial ? 2.4 : 2.0;
      }

      if (fillLightRef.current) {
        fillLightRef.current.intensity = isLight ? 1.1 : 0.8;
      }

      if (rimLightRef.current) {
        if (isLight) {
          rimLightRef.current.intensity = 0.5;
          rimLightRef.current.color.set(0xdbeafe);
        } else if (isPremium) {
          rimLightRef.current.intensity = 2.8;
          rimLightRef.current.color.set(0xf59e0b);
        } else if (isTechnical) {
          rimLightRef.current.intensity = 2.5;
          rimLightRef.current.color.set(0x06b6d4);
        } else {
          rimLightRef.current.intensity = 1.8;
          rimLightRef.current.color.set(0x4d8dff);
        }
      }

      if (particlesRef.current) {
        // Disable particles in Light Studio mode
        particlesRef.current.visible = !isLight;
      }

      if (floorMeshRef.current) {
        const floorMat = floorMeshRef.current.material as THREE.MeshStandardMaterial;
        if (envOverride === 'outdoor') {
          floorMat.color.set(0x78716c); // stone ground
          floorMat.roughness = 0.95;
        } else if (envOverride === 'cafe' || envOverride === 'desk') {
          floorMat.color.set(0x78350f); // rich wood counter
          floorMat.roughness = 0.4;
        } else if (isLight) {
          floorMat.color.set(0xe2e8f0); // clean soft grey
          floorMat.roughness = 0.7;
          floorMat.metalness = 0.05;
        } else {
          floorMat.color.set(0x0a0f18);
          floorMat.roughness = 0.7;
        }
      }

      if (gridHelperRef.current) {
        gridHelperRef.current.visible = isTechnical;
      }

      // -----------------------------------------------------------------------
      // STAGE-SPECIFIC VISIBILITY & TRANSFORMS:
      // -----------------------------------------------------------------------
      const stageIdx = activeStageIndex;

      if (packageGroupRef.current) {
        // Visible in Stages 1 & 2
        packageGroupRef.current.visible = stageIdx <= 1;
        packageGroupRef.current.position.y = THREE.MathUtils.lerp(
          packageGroupRef.current.position.y,
          stageIdx === 0 ? -0.2 : -0.6,
          0.06
        );
      }

      if (lidGroupRef.current) {
        // Stage 1: Closed lid (0). Stage 2: Open lid (-Math.PI * 0.68)
        const targetLidRot = stageIdx === 0 ? 0 : -Math.PI * 0.68;
        lidGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          lidGroupRef.current.rotation.x,
          targetLidRot,
          0.06
        );
      }

      if (productGroupRef.current) {
        // Visible in all stages except Stage 4 if exploded is active
        productGroupRef.current.visible = stageIdx !== 3;

        // Position: Inside box in Stage 1 (-0.6), lifting out in Stage 2 (0.0), floating hero in Stage 3+ (0.15)
        const targetPosY = stageIdx === 0 ? -0.6 : stageIdx === 1 ? 0.0 : 0.15 + Math.sin(elapsed * 1.5) * 0.03;
        productGroupRef.current.position.y = THREE.MathUtils.lerp(
          productGroupRef.current.position.y,
          targetPosY,
          0.06
        );

        // Rotation: Apply manual drag + gentle orbit
        const autoOrbit = isPlayingFilm || stageIdx === 2 || stageIdx === 6 ? elapsed * 0.35 : 0;
        productGroupRef.current.rotation.y = manualRotYRef.current + autoOrbit;
        productGroupRef.current.rotation.x = manualRotXRef.current;
      }

      if (explodedGroupRef.current) {
        // Visible only in Stage 04 (Materials / Exploded Inspection)
        explodedGroupRef.current.visible = stageIdx === 3 || isExploded;
        const sepMult = sceneOverrides.explodedSeparation || 1.0;
        explodedGroup.children.forEach((child, cIdx) => {
          const baseZ = (cIdx - 2) * 0.32 * sepMult;
          child.position.z = THREE.MathUtils.lerp(child.position.z, baseZ, 0.08);
        });
        explodedGroupRef.current.rotation.y = manualRotYRef.current + elapsed * 0.15;
        explodedGroupRef.current.rotation.x = manualRotXRef.current;
      }

      if (activationFxGroupRef.current) {
        // Visible in Stage 5 (Activation)
        activationFxGroupRef.current.visible = stageIdx === 4;
      }

      // Animate Water Droplets (Apparel Stage 5)
      if (waterDropletsRef.current) {
        const positions = waterDropletsRef.current.geometry.attributes.position.array as Float32Array;
        for (let p = 1; p < positions.length; p += 3) {
          positions[p] -= 0.04;
          if (positions[p] < -0.8) positions[p] = 2.0;
        }
        waterDropletsRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Animate Steam Particles (Coffee Stage 5)
      if (steamParticlesRef.current) {
        const positions = steamParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let s = 1; s < positions.length; s += 3) {
          positions[s] += 0.02;
          if (positions[s] > 2.0) positions[s] = 0.6;
        }
        steamParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Animate Medical Biosensor Telemetry Wave (Medical Stage 5)
      if (medicalPulseRef.current) {
        const pulseScale = 1.0 + Math.sin(elapsed * 5.0) * 0.18;
        medicalPulseRef.current.scale.set(pulseScale, pulseScale, 1.0);
      }

      // Animate Kinetic Energy Rings (Footwear Stage 5)
      if (kineticRingsRef.current) {
        kineticRingsRef.current.children.forEach((child, kIdx) => {
          const kScale = 1.0 + ((elapsed * 2 + kIdx * 0.4) % 1.5) * 0.3;
          child.scale.set(kScale, kScale, kScale);
        });
      }

      // Animate Ambient Dust
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let p = 1; p < positions.length; p += 3) {
          positions[p] -= 0.015;
          if (positions[p] < -1.4) positions[p] = 3.5;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Smooth camera transition to stage preset
      if (cameraRef.current) {
        let targetCamPos = currentStage.cameraPosition;
        if (stageIdx === 0) targetCamPos = [0, 2.2, 5.2];
        if (stageIdx === 1) targetCamPos = [0, 2.6, 4.4];
        if (stageIdx === 2) targetCamPos = [0, 0.5, 3.6];
        if (stageIdx === 3) targetCamPos = [1.8, 1.0, 2.8];
        if (stageIdx === 4) targetCamPos = [-1.0, 0.3, 3.0];
        if (stageIdx === 5) targetCamPos = [2.2, 1.4, 4.0];
        if (stageIdx === 6) targetCamPos = [0.6, 0.8, 3.8];

        cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, targetCamPos[0], 0.05);
        cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, targetCamPos[1], 0.05);
        cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, targetCamPos[2], 0.05);
        cameraRef.current.lookAt(currentStage.cameraTarget[0], currentStage.cameraTarget[1], currentStage.cameraTarget[2]);
      }

      renderer.render(scene, camera);
      updateHotspotProjections();
    };

    animate();

    // 9. Resize Observer for Canvas Frame
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height || 540;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
        updateHotspotProjections();
      }
    });
    resizeObserver.observe(container);

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [productMockup, visualProfile, currentStage, activeStageIndex, isPlayingFilm, appearance, sceneOverrides, isExploded, updateHotspotProjections]);

  // Pointer drag rotation handlers (passive, no wheel hijack)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    prevMouseXRef.current = e.clientX;
    prevMouseYRef.current = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - prevMouseXRef.current;
    const deltaY = e.clientY - prevMouseYRef.current;
    manualRotYRef.current += deltaX * 0.01;
    manualRotXRef.current = Math.max(-0.6, Math.min(0.6, manualRotXRef.current + deltaY * 0.01));
    prevMouseXRef.current = e.clientX;
    prevMouseYRef.current = e.clientY;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleResetCamera = () => {
    manualRotYRef.current = 0.2;
    manualRotXRef.current = 0;
  };

  return (
    <div className="space-y-6">
      {/* 1. Cinematic 7-Stage Sequence Navigator Ribbon */}
      <div className="bg-[#111823] border border-[#263244] rounded-xl p-2.5 shadow-md flex flex-wrap md:flex-nowrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
          {stages.map((stg, idx) => {
            const isSelected = activeStageIndex === idx;
            const stageIcons = [
              <Box key="1" className="w-3 h-3" />,
              <Layers key="2" className="w-3 h-3" />,
              <Eye key="3" className="w-3 h-3" />,
              <Sparkles key="4" className="w-3 h-3" />,
              <Zap key="5" className="w-3 h-3" />,
              <Compass key="6" className="w-3 h-3" />,
              <Award key="7" className="w-3 h-3" />,
            ];

            return (
              <button
                key={stg.id}
                type="button"
                onClick={() => {
                  onSelectStage(idx);
                  setIsPlayingFilm(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#4D8DFF] text-[#080B10] font-bold shadow-md'
                    : 'text-[#AAB4C3] hover:text-[#F3F4F6] hover:bg-[#1A2536]'
                }`}
              >
                {stageIcons[idx]}
                <span>{stg.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Real Interactive "Play 3D Film" Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsPlayingFilm(!isPlayingFilm)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm ${
              isPlayingFilm 
                ? 'bg-[#10B981] text-[#080B10] animate-pulse' 
                : 'bg-[#1A2536] hover:bg-[#263244] text-[#F3F4F6] border border-[#263244]'
            }`}
            title={isPlayingFilm ? 'Pause 3D film sequence' : 'Play continuous cinematic 3D product experience film'}
          >
            {isPlayingFilm ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current text-[#4D8DFF]" />}
            <span>{isPlayingFilm ? 'Pause Film' : 'Play 3D Film'}</span>
          </button>
        </div>
      </div>

      {/* 2. Genuine Three.js WebGL 3D Canvas Frame */}
      <div 
        ref={containerRef}
        className={`relative w-full h-[540px] rounded-2xl border-2 ${
          appearance.theme === 'light' || !appearance.theme
            ? 'border-slate-300 shadow-xl bg-[#F8FAFC]'
            : 'border-[#263244] shadow-2xl bg-[#070A0F]'
        } overflow-hidden transition-colors`}
      >
        {/* Canvas (Passive pointer drag for 360 rotation; wheel passes naturally through) */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="w-full h-full cursor-grab active:cursor-grabbing block"
          style={{ touchAction: 'pan-y' }}
        />

        {/* Floating Hotspot Pins in 3D Scene */}
        {productMockup.hotspots.map((spot) => {
          const coords = hotspotScreenCoords[spot.id];
          if (!coords) return null;

          return (
            <button
              key={spot.id}
              type="button"
              onClick={() => setSelectedHotspot(spot)}
              style={{
                left: `${coords.x}px`,
                top: `${coords.y}px`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-[#4D8DFF] text-[#080B10] font-bold text-[10px] flex items-center justify-center shadow-lg border-2 border-white hover:scale-125 transition-transform group"
              title={spot.label}
            >
              <span>+</span>
              <span className="sr-only">{spot.label}</span>
            </button>
          );
        })}

        {/* Viewport Top HUD: Stage Title & Environment Switcher */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none gap-2">
          <div className="pointer-events-auto flex items-center gap-2 bg-[#080B10]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#263244]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-mono font-bold text-[#F3F4F6] uppercase">
              {currentStage.stageName}
            </span>
            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#1E293B] text-[#4D8DFF]">
              {productMockup.categoryType.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="pointer-events-auto flex items-center bg-[#080B10]/85 backdrop-blur-md p-1 rounded-lg border border-[#263244]">
            <button
              type="button"
              onClick={() => setEnvironmentMode('studio')}
              className={`px-2.5 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-colors ${
                environmentMode === 'studio' ? 'bg-[#263244] text-white font-bold' : 'text-[#738095] hover:text-[#AAB4C3]'
              }`}
            >
              <Sun className="w-3 h-3 text-[#F59E0B]" />
              <span className="hidden sm:inline">Studio</span>
            </button>
            <button
              type="button"
              onClick={() => setEnvironmentMode('field')}
              className={`px-2.5 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-colors ${
                environmentMode === 'field' ? 'bg-[#263244] text-white font-bold' : 'text-[#738095] hover:text-[#AAB4C3]'
              }`}
            >
              <CloudRain className="w-3 h-3 text-[#38BDF8]" />
              <span className="hidden sm:inline">Field Use</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setEnvironmentMode('macro');
                setIsExploded(!isExploded);
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-colors ${
                environmentMode === 'macro' || isExploded ? 'bg-[#263244] text-white font-bold' : 'text-[#738095] hover:text-[#AAB4C3]'
              }`}
            >
              <Maximize2 className="w-3 h-3 text-[#10B981]" />
              <span className="hidden sm:inline">Exploded Spec</span>
            </button>
          </div>
        </div>

        {/* Viewport Bottom Controls HUD */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
          <div className="pointer-events-auto bg-[#080B10]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#263244] text-xs font-mono text-[#AAB4C3] flex items-center gap-3">
            <span>Drag on canvas to rotate 360°</span>
            <button
              type="button"
              onClick={handleResetCamera}
              className="text-[#4D8DFF] hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Angle</span>
            </button>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectStage(Math.max(0, activeStageIndex - 1))}
              disabled={activeStageIndex === 0}
              className="p-2 rounded-lg bg-[#080B10]/85 backdrop-blur-md border border-[#263244] text-[#AAB4C3] hover:text-white disabled:opacity-40"
              title="Previous scene"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="bg-[#080B10]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#263244] text-xs font-mono font-bold text-white">
              Phase {activeStageIndex + 1} of {stages.length}
            </span>
            <button
              type="button"
              onClick={() => onSelectStage(Math.min(stages.length - 1, activeStageIndex + 1))}
              disabled={activeStageIndex === stages.length - 1}
              className="p-2 rounded-lg bg-[#080B10]/85 backdrop-blur-md border border-[#263244] text-[#AAB4C3] hover:text-white disabled:opacity-40"
              title="Next scene"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Hotspot Detail Drawer */}
      {selectedHotspot && (
        <div className="p-4 rounded-xl bg-[#111823] border border-[#4D8DFF]/60 shadow-lg flex items-start justify-between gap-4 animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#4D8DFF]/20 text-[#4D8DFF] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase bg-[#1E293B] text-[#4D8DFF] px-1.5 py-0.2 rounded font-bold">
                  {selectedHotspot.category}
                </span>
                <h4 className="text-xs font-bold text-[#F3F4F6]">
                  {selectedHotspot.label}
                </h4>
                {selectedHotspot.metric && (
                  <span className="text-[10px] font-mono bg-[#10B981]/20 text-[#34D399] px-1.5 py-0.2 rounded">
                    {selectedHotspot.metric}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#AAB4C3] mt-1 leading-relaxed">
                {selectedHotspot.detail}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedHotspot(null)}
            className="text-xs font-mono text-[#738095] hover:text-[#F3F4F6] p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* 4. Stage Moment Narrative & Verification Context */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#111823] border border-[#263244] rounded-xl p-4 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#4D8DFF] font-bold">{currentStage.stageName}</span>
            <span className="text-[#738095]">Step {activeStageIndex + 1} / {stages.length}</span>
          </div>
          <h3 className="text-sm font-bold text-[#F3F4F6]">
            {currentStage.title}
          </h3>
          <p className="text-xs text-[#AAB4C3] leading-relaxed">
            {currentStage.description}
          </p>
          <div className="pt-2 border-t border-[#263244] flex items-center gap-2 text-[11px] font-mono text-[#FBBF24]">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Delight Trigger: {currentStage.delightMoment}</span>
          </div>
        </div>

        <div className="bg-[#111823] border border-[#263244] rounded-xl p-4 space-y-2 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#1E293B] text-[#4D8DFF] flex items-center justify-center">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-[#F3F4F6] font-mono">
              Material & Sensory Profile
            </span>
          </div>
          <div className="text-xs text-[#AAB4C3] space-y-1">
            <div><strong className="text-white">Tactile:</strong> {productMockup.sensoryProfile.tactileFeel}</div>
            <div><strong className="text-white">Acoustic / Scent:</strong> {productMockup.sensoryProfile.acousticOrScentNote}</div>
          </div>
          <div className="pt-2 border-t border-[#263244] text-[11px] font-mono text-[#93C5FD] italic">
            "{customerPersona.initialReaction}"
          </div>
        </div>
      </div>
    </div>
  );
};
