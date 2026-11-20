"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type Keyframe = {
  p: number;
  x: number;
  y: number;
  z: number;
  rotY: number;
  rotZ: number;
  scale: number;
  accent: number;
  repulsorPose: number; // 0 = heroic relaxed, 1 = Iron Man raised palm repulsor!
};

// Clean 7-chapter choreography for the Black & White Humanoid Exosuit
const KEYFRAMES: Keyframe[] = [
  // 01 HERO — Heroic stance right beside Sachithra's real face portrait, slight repulsor poise
  { p: 0.0, x: 1.98, y: -0.08, z: 0.35, rotY: -0.36, rotZ: 0.0, scale: 0.96, accent: 0xd2ff00, repulsorPose: 0.85 },
  // 02 THE CLONE — Facing slightly inward toward Sachithra's biometric portrait
  { p: 0.16, x: 2.1, y: -0.08, z: 0.48, rotY: -0.52, rotZ: -0.02, scale: 1.0, accent: 0x00e5ff, repulsorPose: 0.35 },
  // 03 SYNCODE — Left sentinel during studio showcase
  { p: 0.34, x: -2.4, y: 0.05, z: -0.3, rotY: 0.44, rotZ: 0.02, scale: 0.86, accent: 0xd2ff00, repulsorPose: 0.15 },
  // 04 ENGINEERING — Right side architectural poise
  { p: 0.52, x: 2.4, y: 0.02, z: -0.35, rotY: -0.44, rotZ: -0.02, scale: 0.85, accent: 0x00e5ff, repulsorPose: 0.2 },
  // 05 ARSENAL — Left side
  { p: 0.68, x: -2.35, y: -0.05, z: -0.38, rotY: 0.38, rotZ: 0.02, scale: 0.84, accent: 0xd2ff00, repulsorPose: 0.15 },
  // 06 ON AIR — Broadcast crimson reactor pulse for YouTube & SLBC
  { p: 0.84, x: 2.25, y: 0.02, z: -0.1, rotY: -0.36, rotZ: 0.01, scale: 0.9, accent: 0xff3b5c, repulsorPose: 0.25 },
  // 07 TRANSMIT — Returns foreground with heroic repulsor salute!
  { p: 1.0, x: 1.92, y: -0.08, z: 0.42, rotY: -0.28, rotZ: 0.0, scale: 1.0, accent: 0xd2ff00, repulsorPose: 1.0 },
];

const FIRST_NAME = "SACHITHRA";
const LAST_NAME = "WIJESINGHE";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function easeOutBack(t: number) {
  const c1 = 1.35;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function sampleKeyframes(progress: number): Keyframe {
  const p = clamp01(progress);
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const a = KEYFRAMES[i];
    const b = KEYFRAMES[i + 1];
    if (p >= a.p && p <= b.p) {
      const span = b.p - a.p || 1;
      const raw = (p - a.p) / span;
      const t = raw * raw * (3 - 2 * raw);
      const colA = new THREE.Color(a.accent);
      const colB = new THREE.Color(b.accent);
      colA.lerp(colB, t);
      return {
        p,
        x: lerp(a.x, b.x, t),
        y: lerp(a.y, b.y, t),
        z: lerp(a.z, b.z, t),
        rotY: lerp(a.rotY, b.rotY, t),
        rotZ: lerp(a.rotZ, b.rotZ, t),
        scale: lerp(a.scale, b.scale, t),
        accent: colA.getHex(),
        repulsorPose: lerp(a.repulsorPose, b.repulsorPose, t),
      };
    }
  }
  return KEYFRAMES[KEYFRAMES.length - 1];
}

// High-DPI Glowing Shield/Hex Arc Reactor with Team SYNCODE "<<" Logo in the Heart!
function createHeartReactorTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  const draw = (power: number, accentHex: string) => {
    ctx.clearRect(0, 0, 512, 512);

    // Deep reactor cavity
    const bg = ctx.createRadialGradient(256, 256, 18, 256, 256, 240);
    bg.addColorStop(0, "#19202e");
    bg.addColorStop(1, "#05070c");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 512, 512);

    if (power <= 0.02) {
      tex.needsUpdate = true;
      return;
    }

    ctx.save();
    ctx.globalAlpha = clamp01(power);

    // Outer glowing reactor energy ring
    ctx.strokeStyle = "#ffffff";
    ctx.shadowColor = accentHex;
    ctx.shadowBlur = 42;
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(256, 256, 206, 0, Math.PI * 2);
    ctx.stroke();

    // Inner tech segmentation ring
    ctx.strokeStyle = accentHex;
    ctx.lineWidth = 8;
    ctx.setLineDash([28, 18]);
    ctx.beginPath();
    ctx.arc(256, 256, 174, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Core bright radial bloom
    const bloom = ctx.createRadialGradient(256, 256, 10, 256, 256, 155);
    bloom.addColorStop(0, "rgba(255,255,255,0.45)");
    bloom.addColorStop(0.55, `${accentHex}33`);
    bloom.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = bloom;
    ctx.beginPath();
    ctx.arc(256, 256, 155, 0, Math.PI * 2);
    ctx.fill();

    // Crisp Glowing Team SYNCODE "<<" Logo right in the center of the Heart!
    ctx.strokeStyle = "#ffffff";
    ctx.shadowColor = accentHex;
    ctx.shadowBlur = 32;
    ctx.lineWidth = 34;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Left chevron "<"
    ctx.beginPath();
    ctx.moveTo(250, 168);
    ctx.lineTo(162, 256);
    ctx.lineTo(250, 344);
    ctx.stroke();

    // Right chevron "<"
    ctx.beginPath();
    ctx.moveTo(346, 168);
    ctx.lineTo(258, 256);
    ctx.lineTo(346, 344);
    ctx.stroke();

    ctx.restore();
    tex.needsUpdate = true;
  };

  draw(0, "#d2ff00");
  return { tex, draw };
}

// Sculpted Iron-Man-style Inverted Shield/Pentagon Arc Reactor Shape
function createReactorShieldShape(scale = 1) {
  const s = new THREE.Shape();
  s.moveTo(-0.18 * scale, 0.14 * scale);
  s.lineTo(0.18 * scale, 0.14 * scale);
  s.lineTo(0.22 * scale, 0.04 * scale);
  s.lineTo(0.08 * scale, -0.17 * scale);
  s.lineTo(-0.08 * scale, -0.17 * scale);
  s.lineTo(-0.22 * scale, 0.04 * scale);
  s.closePath();
  return s;
}

export default function SyncBotStage() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      34,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.06, 6.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    container.appendChild(renderer.domElement);

    // Photorealistic Studio HDR Environment Reflections (Makes white/black armor look REAL!)
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    scene.environmentIntensity = 0.85;

    // Dramatic Hero Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4.5, 6.5, 5.5);
    scene.add(keyLight);

    const coolFill = new THREE.DirectionalLight(0xc2d8ff, 1.0);
    coolFill.position.set(-5.5, 3.0, 3.5);
    scene.add(coolFill);

    const rimLight = new THREE.PointLight(0xd2ff00, 6.0, 15);
    rimLight.position.set(-2.5, 2.2, -2.5);
    scene.add(rimLight);

    const underBounce = new THREE.PointLight(0xffffff, 1.8, 12);
    underBounce.position.set(2.0, -2.8, 2.5);
    scene.add(underBounce);

    const weldFlashLight = new THREE.PointLight(0x00e5ff, 0, 8);
    scene.add(weldFlashLight);

    // === BLACK & WHITE EXOSUIT PBR MATERIALS ===
    // 1. Glossy Pearl-White Ceramic Armor Plates
    const pearlWhiteArmor = new THREE.MeshPhysicalMaterial({
      color: 0xf5f7fb,
      roughness: 0.14,
      metalness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 0.95,
    });

    // 2. Matte Carbon-Black Undersuit & Mechanical Joints
    const carbonBlackMat = new THREE.MeshStandardMaterial({
      color: 0x101218,
      roughness: 0.42,
      metalness: 0.72,
    });

    // 3. Gloss Obsidian Armor Trim (Black secondary armor panels)
    const obsidianArmorMat = new THREE.MeshPhysicalMaterial({
      color: 0x191d28,
      roughness: 0.2,
      metalness: 0.85,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
    });

    // 4. Brushed Chrome / Titanium Edge Accents
    const brushedSilverMat = new THREE.MeshPhysicalMaterial({
      color: 0xd0d7e3,
      roughness: 0.22,
      metalness: 0.92,
      clearcoat: 0.4,
    });

    // 5. Glowing Eyes & Repulsor Core Material
    const eyeGlowMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xd2ff00,
      emissiveIntensity: 3.2,
      roughness: 0.1,
    });

    const repulsorGlowMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x00e5ff,
      emissiveIntensity: 3.5,
      roughness: 0.1,
    });

    const droneEyeMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x00e5ff,
      emissiveIntensity: 2.6,
      roughness: 0.1,
    });

    // Heart Arc Reactor Canvas Texture with SYNCODE "<<" Logo
    const heartCanvas = createHeartReactorTexture();
    const heartCoreMat = new THREE.MeshStandardMaterial({
      map: heartCanvas.tex,
      emissive: 0xffffff,
      emissiveMap: heartCanvas.tex,
      emissiveIntensity: 1.55,
      roughness: 0.1,
      metalness: 0.1,
    });

    // =====================================================================
    // BUILD BLACK & WHITE HUMANOID EXOSUIT (IRON MAN PROPORTIONS + SYNCODE HEART)
    // =====================================================================
    const suitRoot = new THREE.Group();
    scene.add(suitRoot);

    const suitInner = new THREE.Group();
    suitRoot.add(suitInner);

    // -----------------------------------------------------------------
    // MODULE 1: ATHLETIC V-TAPER TORSO + ABS + SYNCODE HEART REACTOR
    // -----------------------------------------------------------------
    const torsoModule = new THREE.Group();
    torsoModule.position.set(0, 0.22, 0);
    suitInner.add(torsoModule);

    // Core carbon-black inner ribcage / spine
    const innerChest = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.28, 0.72, 24),
      carbonBlackMat
    );
    innerChest.scale.set(1.12, 1, 0.68);
    innerChest.position.set(0, 0.18, 0);
    torsoModule.add(innerChest);

    // Left & Right Sculpted Pearl-White Pectoral Armor Plates
    const pecGeo = new THREE.BoxGeometry(0.42, 0.34, 0.26);
    const leftPec = new THREE.Mesh(pecGeo, pearlWhiteArmor);
    leftPec.position.set(-0.23, 0.3, 0.16);
    leftPec.rotation.set(0.14, 0.24, -0.1);

    const rightPec = new THREE.Mesh(pecGeo, pearlWhiteArmor);
    rightPec.position.set(0.23, 0.3, 0.16);
    rightPec.rotation.set(0.14, -0.24, 0.1);
    torsoModule.add(leftPec, rightPec);

    // Upper Collarbone / Trapezius Yoke (Gloss Obsidian + Pearl Trim)
    const yoke = new THREE.Mesh(
      new THREE.BoxGeometry(0.84, 0.16, 0.36),
      obsidianArmorMat
    );
    yoke.position.set(0, 0.52, 0.02);
    torsoModule.add(yoke);

    const collarRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.19, 0.036, 16, 36),
      brushedSilverMat
    );
    collarRing.rotation.x = Math.PI / 2 + 0.15;
    collarRing.position.set(0, 0.58, 0.04);
    torsoModule.add(collarRing);

    // Back spine armor plates
    const backPlate = new THREE.Mesh(
      new THREE.BoxGeometry(0.68, 0.54, 0.18),
      pearlWhiteArmor
    );
    backPlate.position.set(0, 0.24, -0.2);
    torsoModule.add(backPlate);

    // === HEART ARC REACTOR WITH TEAM SYNCODE "<<" LOGO ===
    const reactorHousingGeo = new THREE.ExtrudeGeometry(
      createReactorShieldShape(1.08),
      { depth: 0.07, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.015, bevelSegments: 3 }
    );
    const reactorHousing = new THREE.Mesh(reactorHousingGeo, brushedSilverMat);
    reactorHousing.position.set(0, 0.29, 0.25);
    torsoModule.add(reactorHousing);

    const reactorInnerGeo = new THREE.ExtrudeGeometry(
      createReactorShieldShape(0.92),
      { depth: 0.03, bevelEnabled: false }
    );
    const reactorInner = new THREE.Mesh(reactorInnerGeo, carbonBlackMat);
    reactorInner.position.set(0, 0.29, 0.305);
    torsoModule.add(reactorInner);

    // Glowing Circular Core with SYNCODE "<<" Logo right inside the chest shield!
    const heartDisc = new THREE.Mesh(
      new THREE.CircleGeometry(0.155, 36),
      heartCoreMat
    );
    heartDisc.position.set(0, 0.285, 0.342);
    torsoModule.add(heartDisc);

    // Subtle Heart Reactor PointLight illuminating the chest armor!
    const heartLight = new THREE.PointLight(0xd2ff00, 1.8, 2.2);
    heartLight.position.set(0, 0.29, 0.52);
    torsoModule.add(heartLight);

    // Segmented 4-Tier Armored Abs (Tapered Black & White Plates)
    for (let i = 0; i < 4; i++) {
      const w = 0.44 - i * 0.045;
      const y = 0.02 - i * 0.115;
      const abPlate = new THREE.Mesh(
        new THREE.BoxGeometry(w, 0.092, 0.24 - i * 0.01),
        i % 2 === 0 ? pearlWhiteArmor : obsidianArmorMat
      );
      abPlate.position.set(0, y, 0.14 - i * 0.012);
      abPlate.rotation.x = 0.08;
      torsoModule.add(abPlate);

      // Side oblique carbon ribs
      const lRib = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.085, 0.22),
        carbonBlackMat
      );
      lRib.position.set(-(w / 2 + 0.06), y + 0.01, 0.04);
      lRib.rotation.y = 0.35;
      const rRib = lRib.clone();
      rRib.position.x = -lRib.position.x;
      rRib.rotation.y = -0.35;
      torsoModule.add(lRib, rRib);
    }

    // Armored Pelvis / Belt Chassis
    const pelvis = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.21, 0.28, 20),
      obsidianArmorMat
    );
    pelvis.scale.set(1.15, 1, 0.72);
    pelvis.position.set(0, -0.44, 0.02);
    torsoModule.add(pelvis);

    const beltBuckle = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.11, 0.14),
      pearlWhiteArmor
    );
    beltBuckle.position.set(0, -0.38, 0.18);
    torsoModule.add(beltBuckle);

    // -----------------------------------------------------------------
    // MODULE 2: ATHLETIC ARMORED LEGS, KNEE-GUARDS & THRUSTER BOOTS
    // -----------------------------------------------------------------
    const legsModule = new THREE.Group();
    suitInner.add(legsModule);

    const buildArmoredLeg = (side: -1 | 1) => {
      const legRoot = new THREE.Group();
      // Athletic hero stance (slight outward V-angle like the reference!)
      legRoot.position.set(side * 0.21, -0.26, 0.02);
      legRoot.rotation.z = side * 0.11;

      // Hip ball joint
      const hip = new THREE.Mesh(new THREE.SphereGeometry(0.115, 20, 20), carbonBlackMat);
      legRoot.add(hip);

      // Muscular Thigh Undersuit
      const thighCore = new THREE.Mesh(
        new THREE.CylinderGeometry(0.145, 0.11, 0.68, 24),
        carbonBlackMat
      );
      thighCore.position.set(0, -0.36, 0);
      legRoot.add(thighCore);

      // Glossy Pearl-White Thigh Outer Armor Plate
      const thighPlate = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.135, 0.42, 14, 24),
        pearlWhiteArmor
      );
      thighPlate.scale.set(0.95, 1, 0.85);
      thighPlate.position.set(side * 0.03, -0.34, 0.05);
      legRoot.add(thighPlate);

      // Dark Obsidian Inner Thigh Accent
      const thighStripe = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.44, 0.18),
        obsidianArmorMat
      );
      thighStripe.position.set(-side * 0.07, -0.35, 0.03);
      legRoot.add(thighStripe);

      // Angular Mechanical Knee-Guard
      const kneeJoint = new THREE.Mesh(new THREE.SphereGeometry(0.1, 20, 20), brushedSilverMat);
      kneeJoint.position.set(0, -0.72, 0.02);
      legRoot.add(kneeJoint);

      const kneeCap = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.17, 0.12),
        pearlWhiteArmor
      );
      kneeCap.position.set(0, -0.72, 0.11);
      kneeCap.rotation.x = 0.18;
      legRoot.add(kneeCap);

      // Tapered Armored Shin Greave / Calf
      const shinCore = new THREE.Mesh(
        new THREE.CylinderGeometry(0.11, 0.082, 0.68, 24),
        obsidianArmorMat
      );
      shinCore.position.set(0, -1.08, -0.01);
      legRoot.add(shinCore);

      const shinArmor = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.105, 0.46, 14, 24),
        pearlWhiteArmor
      );
      shinArmor.scale.set(0.92, 1, 0.9);
      shinArmor.position.set(0, -1.08, 0.045);
      legRoot.add(shinArmor);

      // Armored Ankle & Boot
      const ankle = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), brushedSilverMat);
      ankle.position.set(0, -1.43, 0);
      legRoot.add(ankle);

      const bootUpper = new THREE.Mesh(
        new THREE.BoxGeometry(0.19, 0.13, 0.34),
        pearlWhiteArmor
      );
      bootUpper.position.set(0, -1.52, 0.08);
      bootUpper.rotation.z = -side * 0.11;
      legRoot.add(bootUpper);

      const bootSole = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.05, 0.36),
        carbonBlackMat
      );
      bootSole.position.set(0, -1.59, 0.08);
      bootSole.rotation.z = -side * 0.11;
      legRoot.add(bootSole);

      // Subtle Hover Thruster Glow Under Boot
      const thruster = new THREE.Mesh(
        new THREE.CircleGeometry(0.075, 20),
        repulsorGlowMat
      );
      thruster.rotation.x = Math.PI / 2;
      thruster.position.set(0, -1.62, 0.06);
      legRoot.add(thruster);

      return legRoot;
    };

    const leftLeg = buildArmoredLeg(-1);
    const rightLeg = buildArmoredLeg(1);
    legsModule.add(leftLeg, rightLeg);

    // -----------------------------------------------------------------
    // MODULE 3: ARMORED PAULDRONS, ARMS, GAUNTLETS & PALM REPULSORS
    // -----------------------------------------------------------------
    const buildArmoredArm = (side: -1 | 1) => {
      const shoulderPivot = new THREE.Group();
      shoulderPivot.position.set(side * 0.56, 0.64, 0.02);

      // Dark mechanical shoulder ball
      const shoulderBall = new THREE.Mesh(
        new THREE.SphereGeometry(0.125, 22, 22),
        carbonBlackMat
      );
      shoulderPivot.add(shoulderBall);

      // Sculpted Curved Pearl-White Shoulder Pauldron (Iron Man Armor Plate!)
      const pauldron = new THREE.Mesh(
        new THREE.SphereGeometry(0.195, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.58),
        pearlWhiteArmor
      );
      pauldron.position.set(side * 0.03, 0.04, 0);
      pauldron.rotation.z = -side * 0.55;
      shoulderPivot.add(pauldron);

      const pauldronTrim = new THREE.Mesh(
        new THREE.TorusGeometry(0.17, 0.015, 10, 28),
        brushedSilverMat
      );
      pauldronTrim.position.set(side * 0.05, -0.02, 0);
      pauldronTrim.rotation.x = Math.PI / 2;
      pauldronTrim.rotation.y = side * 0.55;
      shoulderPivot.add(pauldronTrim);

      // Bicep Undersuit + White Armor Shell
      const bicep = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.088, 0.44, 20),
        carbonBlackMat
      );
      bicep.position.set(side * 0.06, -0.24, 0);
      bicep.rotation.z = side * 0.14;
      shoulderPivot.add(bicep);

      const bicepArmor = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.095, 0.24, 12, 20),
        obsidianArmorMat
      );
      bicepArmor.position.set(side * 0.075, -0.24, 0.02);
      bicepArmor.rotation.z = side * 0.14;
      shoulderPivot.add(bicepArmor);

      // Elbow Hinge Pivot (for expressive Iron Man repulsor pose!)
      const elbowPivot = new THREE.Group();
      elbowPivot.position.set(side * 0.1, -0.48, 0);
      shoulderPivot.add(elbowPivot);

      const elbowJoint = new THREE.Mesh(
        new THREE.SphereGeometry(0.085, 18, 18),
        brushedSilverMat
      );
      elbowPivot.add(elbowJoint);

      // Tapered Pearl-White Forearm Gauntlet
      const forearm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.098, 0.072, 0.46, 22),
        pearlWhiteArmor
      );
      forearm.position.set(0, -0.24, 0.02);
      elbowPivot.add(forearm);

      const gauntletGuard = new THREE.Mesh(
        new THREE.BoxGeometry(0.11, 0.34, 0.08),
        obsidianArmorMat
      );
      gauntletGuard.position.set(side * 0.05, -0.23, 0.04);
      elbowPivot.add(gauntletGuard);

      // Articulated Armored Hand + Glowing Palm Repulsor!
      const handGroup = new THREE.Group();
      handGroup.position.set(0, -0.5, 0.03);
      elbowPivot.add(handGroup);

      const palm = new THREE.Mesh(
        new THREE.BoxGeometry(0.13, 0.14, 0.06),
        pearlWhiteArmor
      );
      handGroup.add(palm);

      // Glowing Circular Palm Repulsor (like Iron Man's hand!)
      const repulsorRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.045, 0.008, 10, 24),
        brushedSilverMat
      );
      repulsorRing.position.set(0, 0, 0.033);
      handGroup.add(repulsorRing);

      const repulsorCore = new THREE.Mesh(
        new THREE.CircleGeometry(0.04, 24),
        repulsorGlowMat
      );
      repulsorCore.position.set(0, 0, 0.036);
      handGroup.add(repulsorCore);

      // 4 Sculpted Armored Fingers + Thumb
      for (let f = 0; f < 4; f++) {
        const fx = (f - 1.5) * 0.032;
        const finger = new THREE.Mesh(
          new THREE.CapsuleGeometry(0.013, 0.085, 6, 10),
          f % 2 === 0 ? pearlWhiteArmor : obsidianArmorMat
        );
        finger.position.set(fx, -0.115, 0.015);
        finger.rotation.x = 0.22;
        handGroup.add(finger);
      }

      const thumb = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.015, 0.07, 6, 10),
        pearlWhiteArmor
      );
      thumb.position.set(-side * 0.085, -0.02, 0.03);
      thumb.rotation.z = side * 0.65;
      handGroup.add(thumb);

      return { shoulderPivot, elbowPivot, handGroup };
    };

    const leftArm = buildArmoredArm(-1);
    const rightArm = buildArmoredArm(1);
    suitInner.add(leftArm.shoulderPivot, rightArm.shoulderPivot);

    // -----------------------------------------------------------------
    // MODULE 4: AERODYNAMIC IRON-MAN-INSPIRED BLACK & WHITE HELMET
    // -----------------------------------------------------------------
    const headModule = new THREE.Group();
    headModule.position.set(0, 1.05, 0.03);
    suitInner.add(headModule);

    // Ribbed Hydraulic Carbon Neck
    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11, 0.145, 0.24, 22),
      carbonBlackMat
    );
    neck.position.set(0, -0.22, -0.02);
    headModule.add(neck);

    // Main Sculpted Cranium Shell (Gloss Pearl-White)
    const craniumGeo = new THREE.SphereGeometry(0.245, 40, 32);
    craniumGeo.scale(0.92, 1.18, 1.04);
    const cranium = new THREE.Mesh(craniumGeo, pearlWhiteArmor);
    headModule.add(cranium);

    // Sleek Angular Obsidian-Black Faceplate Mask (Iron Man Signature Contour!)
    const faceMaskGeo = new THREE.BoxGeometry(0.31, 0.38, 0.16);
    const faceMask = new THREE.Mesh(faceMaskGeo, obsidianArmorMat);
    faceMask.position.set(0, -0.02, 0.15);
    faceMask.scale.set(0.94, 1.0, 0.85);
    headModule.add(faceMask);

    // Sculpted Pearl-White Chin / Jaw Plate
    const jawPlate = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.1, 0.15),
      pearlWhiteArmor
    );
    jawPlate.position.set(0, -0.19, 0.16);
    jawPlate.rotation.x = 0.22;
    headModule.add(jawPlate);

    // Brow Ridge Crest
    const browCrest = new THREE.Mesh(
      new THREE.BoxGeometry(0.34, 0.08, 0.16),
      pearlWhiteArmor
    );
    browCrest.position.set(0, 0.12, 0.165);
    browCrest.rotation.x = 0.25;
    headModule.add(browCrest);

    // Fierce Angled Glowing Slit Eyes (Iron Man Signature!)
    const eyeGeo = new THREE.BoxGeometry(0.11, 0.028, 0.03);
    const leftEye = new THREE.Mesh(eyeGeo, eyeGlowMat);
    leftEye.position.set(-0.078, 0.042, 0.232);
    leftEye.rotation.z = -0.14;
    leftEye.rotation.y = -0.18;

    const rightEye = new THREE.Mesh(eyeGeo, eyeGlowMat);
    rightEye.position.set(0.078, 0.042, 0.232);
    rightEye.rotation.z = 0.14;
    rightEye.rotation.y = 0.18;
    headModule.add(leftEye, rightEye);

    // Subtle Side Ear/Temporal Armor Caps
    const earCapGeo = new THREE.CylinderGeometry(0.085, 0.095, 0.05, 24);
    earCapGeo.rotateZ(Math.PI / 2);
    const lEar = new THREE.Mesh(earCapGeo, brushedSilverMat);
    lEar.position.set(-0.225, 0.01, -0.01);
    const rEar = new THREE.Mesh(earCapGeo, brushedSilverMat);
    rEar.position.set(0.225, 0.01, -0.01);
    headModule.add(lEar, rEar);

    // Repulsor Beam Light attached to right palm!
    const repulsorLight = new THREE.PointLight(0x00e5ff, 0, 5.0);
    repulsorLight.position.set(0, 0, 0.25);
    rightArm.handGroup.add(repulsorLight);

    // =====================================================================
    // 4× PIT-CREW MINI BUILDER DRONES + LASER WELDING BEAMS & SPARKS!
    // =====================================================================
    const crewGroup = new THREE.Group();
    scene.add(crewGroup);

    type BuilderDrone = {
      root: THREE.Group;
      beam: THREE.Line;
      beamMat: THREE.LineBasicMaterial;
      home: THREE.Vector3;
    };

    const drones: BuilderDrone[] = [];
    const droneHomes = [
      new THREE.Vector3(-4.6, 2.5, 1.6),
      new THREE.Vector3(4.6, 2.5, 1.6),
      new THREE.Vector3(-4.6, -2.1, 1.6),
      new THREE.Vector3(4.6, -2.1, 1.6),
    ];

    for (let i = 0; i < 4; i++) {
      const dRoot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.18, 22, 22), carbonBlackMat);
      dRoot.add(body);

      const band = new THREE.Mesh(
        new THREE.TorusGeometry(0.185, 0.024, 12, 28),
        pearlWhiteArmor
      );
      band.rotation.x = Math.PI / 2;
      dRoot.add(band);

      const eye = new THREE.Mesh(
        new THREE.SphereGeometry(0.068, 14, 14),
        i % 2 === 0 ? eyeGlowMat : droneEyeMat
      );
      eye.position.set(0, 0, 0.14);
      dRoot.add(eye);

      const pincerGeo = new THREE.CapsuleGeometry(0.022, 0.13, 6, 10);
      const lPincer = new THREE.Mesh(pincerGeo, brushedSilverMat);
      lPincer.position.set(-0.12, -0.07, 0.14);
      lPincer.rotation.x = Math.PI / 2.5;
      const rPincer = new THREE.Mesh(pincerGeo, brushedSilverMat);
      rPincer.position.set(0.12, -0.07, 0.14);
      rPincer.rotation.x = Math.PI / 2.5;
      dRoot.add(lPincer, rPincer);

      dRoot.position.copy(droneHomes[i]);
      crewGroup.add(dRoot);

      const beamGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]);
      const beamMat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? 0xd2ff00 : 0x00e5ff,
        transparent: true,
        opacity: 0,
      });
      const beam = new THREE.Line(beamGeo, beamMat);
      crewGroup.add(beam);

      drones.push({ root: dRoot, beam, beamMat, home: droneHomes[i] });
    }

    // Welding Sparks Burst System
    const sparkCount = 52;
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkVels: THREE.Vector3[] = [];
    const sparkLife = new Float32Array(sparkCount);

    for (let i = 0; i < sparkCount; i++) {
      sparkPositions[i * 3 + 1] = -99;
      sparkVels.push(new THREE.Vector3());
    }

    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPositions, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0xd2ff00,
      size: 0.075,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const sparksMesh = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparksMesh);

    const spawnSparks = (origin: THREE.Vector3, count = 8) => {
      let spawned = 0;
      for (let i = 0; i < sparkCount && spawned < count; i++) {
        if (sparkLife[i] <= 0) {
          sparkPositions[i * 3] = origin.x + (Math.random() - 0.5) * 0.15;
          sparkPositions[i * 3 + 1] = origin.y + (Math.random() - 0.5) * 0.15;
          sparkPositions[i * 3 + 2] = origin.z + (Math.random() - 0.5) * 0.15;
          sparkVels[i].set(
            (Math.random() - 0.5) * 3.8,
            Math.random() * 2.6 + 0.5,
            (Math.random() - 0.5) * 2.2
          );
          sparkLife[i] = 0.32 + Math.random() * 0.25;
          spawned++;
        }
      }
    };

    // Subtle distant ambient dust
    const pCount = 75;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 20;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 2] = -4.5 - Math.random() * 6;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const dustField = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.022,
        transparent: true,
        opacity: 0.2,
      })
    );
    scene.add(dustField);

    // === TIMELINE & INTERACTION STATE ===
    // RobotBlastIntro handles the photorealistic assembly + palm blast on Hero;
    // SyncBotStage runs directly in 60fps 7-Chapter Scroll Story Mode!
    let introElapsed = 99;
    const ASSEMBLY_DURATION = 2.95;
    const WRITE_DURATION = 1.65;
    const SETTLE_DURATION = 0.72;
    const TOTAL_INTRO = ASSEMBLY_DURATION + WRITE_DURATION + SETTLE_DURATION;

    let introFinished = true;
    crewGroup.visible = false;
    let lastEmitTime = -1;
    let lastLine1 = reducedMotion ? FIRST_NAME.length : 0;
    let lastLine2 = reducedMotion ? LAST_NAME.length : 0;
    let lastPhase: "assembling" | "writing" | "ready" = reducedMotion
      ? "ready"
      : "assembling";

    let mouseX = 0;
    let mouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;
    let targetScroll = 0;
    let smoothScroll = 0;
    let boostSpin = 0;
    let excitedTimer = 0;
    let lastAccentHex = "#d2ff00";
    let sparkCooldown = 0;

    const emitIntro = (
      phase: "assembling" | "writing" | "ready",
      progress: number,
      partLabel: string,
      line1: number,
      line2: number
    ) => {
      window.dispatchEvent(
        new CustomEvent("syncbot:intro", {
          detail: { phase, progress, partLabel, line1, line2 },
        })
      );
    };

    if (reducedMotion) {
      crewGroup.visible = false;
      emitIntro("ready", 100, "EXOSUIT ONLINE", FIRST_NAME.length, LAST_NAME.length);
    }

    const updateScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      targetScroll = window.scrollY / maxScroll;
    };

    const onPointerMove = (e: PointerEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const triggerBoost = () => {
      boostSpin += Math.PI * 2;
      excitedTimer = 1.25;
    };

    const skipIntro = () => {
      introElapsed = TOTAL_INTRO + 0.1;
      introFinished = true;
      crewGroup.visible = false;
      sparksMesh.visible = false;
      lastPhase = "ready";
      lastLine1 = FIRST_NAME.length;
      lastLine2 = LAST_NAME.length;
      emitIntro("ready", 100, "EXOSUIT ONLINE", FIRST_NAME.length, LAST_NAME.length);
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("syncbot:boost", triggerBoost);
    window.addEventListener("syncbot:skipIntro", skipIntro);
    window.addEventListener("resize", onResize);
    updateScroll();

    const setBeam = (drone: BuilderDrone, target: THREE.Vector3, active: boolean) => {
      if (!active) {
        drone.beamMat.opacity = 0;
        return;
      }
      const posAttr = drone.beam.geometry.attributes.position as THREE.BufferAttribute;
      posAttr.setXYZ(0, drone.root.position.x, drone.root.position.y, drone.root.position.z);
      posAttr.setXYZ(1, target.x, target.y, target.z);
      posAttr.needsUpdate = true;
      drone.beamMat.opacity = 0.75 + Math.random() * 0.25;
    };

    let rafId = 0;
    const clock = new THREE.Clock();
    const weldTarget = new THREE.Vector3();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.getElapsedTime();

      smoothScroll = lerp(smoothScroll, targetScroll, reducedMotion ? 0.3 : 0.075);
      smoothMouseX = lerp(smoothMouseX, mouseX, 0.06);
      smoothMouseY = lerp(smoothMouseY, mouseY, 0.06);

      const isMobile = window.innerWidth < 768;
      const kf = sampleKeyframes(smoothScroll);

      let heartPower = 1;
      let eyePower = 1;
      let repulsorPower = 0;
      weldFlashLight.intensity = 0;

      // Update sparks physics
      let anySparkAlive = false;
      const sPosAttr = sparkGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < sparkCount; i++) {
        if (sparkLife[i] > 0) {
          anySparkAlive = true;
          sparkLife[i] -= dt;
          sparkVels[i].y -= 7.8 * dt;
          sparkPositions[i * 3] += sparkVels[i].x * dt;
          sparkPositions[i * 3 + 1] += sparkVels[i].y * dt;
          sparkPositions[i * 3 + 2] += sparkVels[i].z * dt;
          if (sparkLife[i] <= 0) sparkPositions[i * 3 + 1] = -99;
        }
      }
      if (anySparkAlive) sPosAttr.needsUpdate = true;

      if (!introFinished) {
        introElapsed += dt;

        // ============================================================
        // ACT 1: 4× PIT-CREW DRONES RAPIDLY SUIT UP THE EXOSUIT!
        // ============================================================
        if (introElapsed < ASSEMBLY_DURATION) {
          crewGroup.visible = true;
          sparksMesh.visible = true;

          const ap = clamp01(introElapsed / ASSEMBLY_DURATION);
          const pct = Math.round(ap * 100);

          suitRoot.position.set(0, 0.14 + Math.sin(t * 2.2) * 0.02, isMobile ? 0.1 : 0.72);
          suitRoot.scale.setScalar(isMobile ? 0.78 : 1.02);
          suitRoot.rotation.set(0.04, Math.sin(ap * Math.PI * 1.4) * 0.38, 0);

          // Step 1 (0.00 - 0.24): Armored Torso & SYNCODE Heart Reactor
          const s1 = easeOutBack(clamp01(ap / 0.24));
          torsoModule.visible = ap > 0.01;
          torsoModule.position.set(0, lerp(-2.6, 0.22, s1), 0);
          torsoModule.scale.setScalar(lerp(0.5, 1, clamp01(ap / 0.18)));
          heartPower = clamp01((ap - 0.1) / 0.18);

          // Step 2 (0.22 - 0.44): Armored Legs & Thruster Boots
          const s2 = easeOutBack(clamp01((ap - 0.22) / 0.22));
          legsModule.visible = ap > 0.22;
          legsModule.position.set(0, lerp(-3.0, 0, s2), 0);

          // Step 3 (0.42 - 0.64): Pauldrons, Gauntlets & Palm Repulsors
          const s3 = easeOutBack(clamp01((ap - 0.42) / 0.22));
          leftArm.shoulderPivot.visible = ap > 0.42;
          rightArm.shoulderPivot.visible = ap > 0.42;
          leftArm.shoulderPivot.position.set(lerp(-3.2, -0.56, s3), 0.64, 0.02);
          rightArm.shoulderPivot.position.set(lerp(3.2, 0.56, s3), 0.64, 0.02);
          leftArm.shoulderPivot.rotation.set(0, 0, lerp(0.8, 0.14, s3));
          rightArm.shoulderPivot.rotation.set(0, 0, lerp(-0.8, -0.14, s3));
          leftArm.elbowPivot.rotation.set(-0.2, 0, 0);
          rightArm.elbowPivot.rotation.set(-0.2, 0, 0);

          // Step 4 (0.62 - 0.84): Aerodynamic Black & White Helmet Seals
          const s4 = easeOutBack(clamp01((ap - 0.62) / 0.22));
          headModule.visible = ap > 0.62;
          headModule.position.set(0, lerp(3.4, 1.05, s4), 0.03);
          headModule.rotation.set(0, lerp(0.5, 0, s4), 0);

          // Step 5 (0.82 - 1.00): Fierce Glowing Eyes Ignite + Drones Blast Away!
          eyePower = clamp01((ap - 0.8) / 0.16);

          const exitT = clamp01((ap - 0.85) / 0.15);
          const droneWorkSpots = [
            new THREE.Vector3(-1.45, 1.15, 1.45),
            new THREE.Vector3(1.45, 1.15, 1.45),
            new THREE.Vector3(-1.35, -0.75, 1.45),
            new THREE.Vector3(1.35, -0.75, 1.45),
          ];

          if (ap < 0.24) weldTarget.set(0, 0.45, 1.1);
          else if (ap < 0.44) weldTarget.set(0, -0.75, 1.05);
          else if (ap < 0.64) weldTarget.set(Math.sin(t * 24) > 0 ? 0.68 : -0.68, 0.55, 1.05);
          else weldTarget.set(0, 1.15, 1.1);

          const isWelding = ap > 0.05 && ap < 0.85;
          if (isWelding) {
            weldFlashLight.position.copy(weldTarget);
            weldFlashLight.intensity = 3.5 + Math.random() * 4.5;
            sparkCooldown -= dt;
            if (sparkCooldown <= 0) {
              spawnSparks(weldTarget, 8);
              sparkCooldown = 0.05;
            }
          }

          drones.forEach((d, idx) => {
            const enterT = easeOutCubic(clamp01(ap / 0.14));
            const spot = droneWorkSpots[idx];
            const jx = Math.sin(t * (7.2 + idx * 1.3)) * 0.14;
            const jy = Math.cos(t * (6.1 + idx * 1.1)) * 0.12;

            if (exitT > 0) {
              d.root.position.lerpVectors(
                spot,
                d.home.clone().multiplyScalar(1.65),
                easeInOutCubic(exitT)
              );
              setBeam(d, weldTarget, false);
            } else {
              d.root.position.lerpVectors(
                d.home,
                new THREE.Vector3(spot.x + jx, spot.y + jy, spot.z),
                enterT
              );
              d.root.lookAt(weldTarget);
              const beamOn =
                isWelding && (idx % 2 === (Math.floor(t * 14) % 2) || ap > 0.65);
              setBeam(d, weldTarget, beamOn);
            }
          });

          let partLabel = "4× PIT-CREW // IGNITING SYNCODE HEART";
          if (ap >= 0.84) partLabel = "EXOSUIT LOCKED // OPTICS ONLINE";
          else if (ap >= 0.62) partLabel = "SEALING TACTICAL HELMET";
          else if (ap >= 0.42) partLabel = "LOCKING PAULDRONS & REPULSORS";
          else if (ap >= 0.22) partLabel = "INSTALLING ARMORED LEGS";

          if (t - lastEmitTime > 0.03) {
            lastEmitTime = t;
            emitIntro("assembling", pct, partLabel, 0, 0);
          }
        }
        // ============================================================
        // ACT 2: EXOSUIT AIMS PALM REPULSOR & CONSTRUCTS TOP-LEFT NAME!
        // ============================================================
        else if (introElapsed < ASSEMBLY_DURATION + WRITE_DURATION) {
          crewGroup.visible = false;
          const wp = clamp01((introElapsed - ASSEMBLY_DURATION) / WRITE_DURATION);

          torsoModule.visible = true;
          torsoModule.position.set(0, 0.22, 0);
          torsoModule.scale.setScalar(1);
          legsModule.visible = true;
          legsModule.position.set(0, 0, 0);
          leftArm.shoulderPivot.visible = true;
          rightArm.shoulderPivot.visible = true;
          leftArm.shoulderPivot.position.set(-0.56, 0.64, 0.02);
          rightArm.shoulderPivot.position.set(0.56, 0.64, 0.02);
          headModule.visible = true;
          headModule.position.set(0, 1.05, 0.03);

          heartPower = 1;
          eyePower = 1;
          repulsorPower = 5.5;

          let rx = 0;
          let ry = 0;
          let line1Count = 0;
          let line2Count = 0;

          if (wp < 0.5) {
            const p1 = easeInOutCubic(wp / 0.5);
            rx = lerp(isMobile ? -1.1 : -2.25, isMobile ? 0.5 : -0.65, p1);
            ry = isMobile ? 0.65 : 0.72;
            line1Count = Math.ceil(p1 * FIRST_NAME.length);
            line2Count = 0;
          } else {
            const p2 = easeInOutCubic((wp - 0.5) / 0.5);
            rx = lerp(isMobile ? -1.1 : -2.25, isMobile ? 0.7 : -0.45, p2);
            ry = isMobile ? 0.35 : 0.35;
            line1Count = FIRST_NAME.length;
            line2Count = Math.ceil(p2 * LAST_NAME.length);
          }

          suitRoot.position.set(rx, ry, isMobile ? 0.0 : 0.45);
          suitRoot.scale.setScalar(isMobile ? 0.65 : 0.8);
          suitRoot.rotation.set(0.08, 0.32, -0.1);
          headModule.rotation.set(0.04, 0.18, 0);

          // Heroic Iron Man Palm Repulsor Aim!
          rightArm.shoulderPivot.rotation.set(-1.35, 0.15, -0.2);
          rightArm.elbowPivot.rotation.set(-0.25, 0, 0);
          rightArm.handGroup.rotation.set(-1.1, 0, 0);
          leftArm.shoulderPivot.rotation.set(0.25, 0, 0.25);
          leftArm.elbowPivot.rotation.set(-0.3, 0, 0);

          if (
            lastPhase !== "writing" ||
            line1Count !== lastLine1 ||
            line2Count !== lastLine2
          ) {
            lastPhase = "writing";
            lastLine1 = line1Count;
            lastLine2 = line2Count;
            emitIntro("writing", 100, "CONSTRUCTING IDENTITY", line1Count, line2Count);
          }
        }
        // ============================================================
        // ACT 3: GLIDE BESIDE SACHITHRA'S REAL FACE PORTRAIT
        // ============================================================
        else if (introElapsed < TOTAL_INTRO) {
          crewGroup.visible = false;
          const sp = easeOutCubic(
            clamp01((introElapsed - ASSEMBLY_DURATION - WRITE_DURATION) / SETTLE_DURATION)
          );
          const heroX = isMobile ? 0.78 : kf.x;
          const heroY = isMobile ? -0.35 : kf.y;
          const heroScale = isMobile ? 0.64 : kf.scale;

          suitRoot.position.set(
            lerp(isMobile ? 0.7 : -0.45, heroX, sp),
            lerp(0.35, heroY, sp),
            lerp(0.45, kf.z, sp)
          );
          suitRoot.scale.setScalar(lerp(isMobile ? 0.65 : 0.8, heroScale, sp));
          suitRoot.rotation.set(
            lerp(0.08, 0, sp),
            lerp(0.32, kf.rotY, sp),
            lerp(-0.1, kf.rotZ, sp)
          );
          repulsorPower = lerp(5.5, 2.2, sp);

          if (lastLine1 !== FIRST_NAME.length || lastLine2 !== LAST_NAME.length) {
            lastLine1 = FIRST_NAME.length;
            lastLine2 = LAST_NAME.length;
            emitIntro("writing", 100, "IDENTITY LOCKED", FIRST_NAME.length, LAST_NAME.length);
          }
        } else {
          introFinished = true;
          crewGroup.visible = false;
          lastPhase = "ready";
          emitIntro("ready", 100, "EXOSUIT ONLINE", FIRST_NAME.length, LAST_NAME.length);
        }
      } else {
        // ============================================================
        // INTERACTIVE 7-CHAPTER STORY MODE — BLACK & WHITE EXOSUIT
        // ============================================================
        crewGroup.visible = false;
        torsoModule.visible = true;
        torsoModule.position.set(0, 0.22, 0);
        torsoModule.scale.setScalar(1);
        legsModule.visible = true;
        legsModule.position.set(0, 0, 0);
        leftArm.shoulderPivot.visible = true;
        rightArm.shoulderPivot.visible = true;
        leftArm.shoulderPivot.position.set(-0.56, 0.64, 0.02);
        rightArm.shoulderPivot.position.set(0.56, 0.64, 0.02);
        headModule.visible = true;
        headModule.position.set(0, 1.05, 0.03);

        const targetX = isMobile ? kf.x * 0.36 : kf.x;
        const targetY = isMobile ? kf.y - 0.32 : kf.y;
        const targetScale = isMobile ? kf.scale * 0.62 : kf.scale;

        const hover = reducedMotion ? 0 : Math.sin(t * 1.85) * 0.065;
        suitRoot.position.set(
          targetX + smoothMouseX * 0.12,
          targetY + hover + smoothMouseY * 0.08,
          kf.z
        );
        suitRoot.scale.setScalar(targetScale);

        if (boostSpin > 0.001) {
          const step = boostSpin * Math.min(1, dt * 6.2);
          suitInner.rotation.y += step;
          boostSpin -= step;
        } else {
          suitInner.rotation.y = lerp(suitInner.rotation.y, 0, 0.08);
        }

        suitRoot.rotation.y = kf.rotY + smoothMouseX * 0.2;
        suitRoot.rotation.x = -smoothMouseY * 0.08;
        suitRoot.rotation.z = kf.rotZ - smoothMouseX * 0.03;

        // Head tracks user cursor fiercely
        headModule.rotation.y = smoothMouseX * 0.32;
        headModule.rotation.x = -smoothMouseY * 0.18;

        // Left arm heroic athletic poise
        leftArm.shoulderPivot.rotation.set(0.1 + Math.sin(t * 1.8) * 0.04, 0, 0.18);
        leftArm.elbowPivot.rotation.set(-0.28, 0, 0);
        leftArm.handGroup.rotation.set(0, 0, 0);

        // Right arm blends cleanly into the iconic Iron Man Palm Repulsor Pose!
        const rp = kf.repulsorPose;
        rightArm.shoulderPivot.rotation.set(
          lerp(0.1, -1.25, rp) + Math.sin(t * 2.0) * 0.04,
          lerp(0, 0.18, rp),
          lerp(-0.18, -0.12, rp)
        );
        rightArm.elbowPivot.rotation.set(lerp(-0.28, -0.35, rp), 0, 0);
        rightArm.handGroup.rotation.set(lerp(0, -1.15, rp), 0, 0);

        repulsorPower = rp * 2.4 + (excitedTimer > 0 ? 3.0 : 0);
      }

      if (excitedTimer > 0) excitedTimer = Math.max(0, excitedTimer - dt);

      // Update dynamic theme accent lighting (Eyes, Heart Reactor, Repulsor)
      const accentColor = new THREE.Color(kf.accent);
      eyeGlowMat.emissive.copy(accentColor);
      eyeGlowMat.emissiveIntensity = eyePower * (excitedTimer > 0 ? 5.2 : 3.2);
      repulsorGlowMat.emissive.copy(accentColor);
      repulsorLight.color.copy(accentColor);
      repulsorLight.intensity = repulsorPower;
      heartLight.color.copy(accentColor);
      heartLight.intensity = heartPower * (1.8 + Math.sin(t * 3.2) * 0.35);
      rimLight.color.copy(accentColor);

      const hexStr = `#${accentColor.getHexString()}`;
      if (!introFinished || hexStr !== lastAccentHex || excitedTimer > 0) {
        heartCanvas.draw(heartPower, hexStr);
        lastAccentHex = hexStr;
      }

      dustField.rotation.y = t * 0.015 + smoothScroll * 0.35;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("syncbot:boost", triggerBoost);
      window.removeEventListener("syncbot:skipIntro", skipIntro);
      window.removeEventListener("resize", onResize);
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    />
  );
}
