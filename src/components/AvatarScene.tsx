'use client';

import { Component, Fragment, Suspense, useEffect, useMemo, useRef, useState, type ElementRef, type ReactNode, type RefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Decal, Environment, Lightformer, OrbitControls, useGLTF, useProgress, useTexture } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import gsap from 'gsap';
import * as THREE from 'three';
import { RefreshCw } from 'lucide-react';
import { SITE_CONFIG } from '@/src/config';

type SceneProps = { activeSticker: string | null; onStickerSelect: (id: string | null) => void };
type BoundaryProps = { children: ReactNode; onError: () => void };

class SceneErrorBoundary extends Component<BoundaryProps, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function Sticker({ sticker, meshRef, onSelect }: {
  sticker: (typeof SITE_CONFIG.stickers)[number]; meshRef: RefObject<THREE.Mesh>; onSelect: () => void;
}) {
  const sourceTexture = useTexture(sticker.image);
  const texture = useMemo(() => {
    const nextTexture = sourceTexture.clone();
    nextTexture.flipY = false;
    nextTexture.needsUpdate = true;
    return nextTexture;
  }, [sourceTexture]);
  const [hovered, setHovered] = useState(false);

  // DecalGeometry 的 UV 方向与普通图片纹理相反；关闭自动 Y 翻转后贴纸保持正向。
  useEffect(() => {
    return () => texture.dispose();
  }, [texture]);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : '';
    return () => { document.body.style.cursor = ''; };
  }, [hovered]);

  const image = texture.image as { width?: number; height?: number } | undefined;
  const aspect = image?.width && image?.height ? image.width / image.height : 1;
  const hitArea = useMemo(() => {
    const normal = new THREE.Vector3(...sticker.normal).normalize();
    return {
      position: new THREE.Vector3(...sticker.position).addScaledVector(normal, 0.014),
      quaternion: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal),
    };
  }, [sticker.normal, sticker.position]);

  const selectSticker = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    onSelect();
  };

  const attractPointer = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    setHovered(true);
  };

  return (
    <Fragment>
      <Decal mesh={meshRef} position={sticker.position as [number, number, number]} rotation={sticker.rotation}
        scale={[sticker.scale * aspect, sticker.scale, sticker.projectionDepth]} depthTest renderOrder={10}
        onClick={selectSticker}
        onPointerOver={attractPointer}
        onPointerOut={() => setHovered(false)}>
        <meshBasicMaterial map={texture} transparent alphaTest={0.04} depthWrite={false}
          polygonOffset polygonOffsetFactor={-10} polygonOffsetUnits={-4} toneMapped={false} />
      </Decal>
      {/* 隐形命中面比贴纸略大，让鼠标靠近边缘时也能被稳定捕获。 */}
      <mesh position={hitArea.position} quaternion={hitArea.quaternion} renderOrder={11}
        onClick={selectSticker} onPointerOver={attractPointer} onPointerOut={() => setHovered(false)}>
        <planeGeometry args={[sticker.scale * aspect * 1.45, sticker.scale * 1.45]} />
        <meshBasicMaterial transparent opacity={0} depthTest={false} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    </Fragment>
  );
}

function AvatarAssembly({ activeSticker, onStickerSelect, onReady }: SceneProps & { onReady: () => void }) {
  const gltf = useGLTF(SITE_CONFIG.model.url);
  const group = useRef<THREE.Group>(null);
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const avatarMesh = useMemo(() => {
    let found: THREE.Mesh | null = null;
    scene.traverse((child) => {
      if (!found && child instanceof THREE.Mesh) found = child;
    });
    if (!found) throw new Error('Avatar mesh was not found in the GLB scene.');
    return found;
  }, [scene]);
  const avatarMeshRef = useMemo<RefObject<THREE.Mesh>>(() => ({ current: avatarMesh }), [avatarMesh]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // 生成模型的密集表面在强自阴影下容易出现条纹；头像采用柔光材质避免阴影波纹。
        child.castShadow = false;
        child.receiveShadow = false;
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material) => {
          if (material instanceof THREE.MeshStandardMaterial) {
            material.normalScale.setScalar(SITE_CONFIG.model.normalStrength);
            material.roughness = SITE_CONFIG.model.roughness;
            material.metalness = SITE_CONFIG.model.metalness;
            material.needsUpdate = true;
          }
        });
      }
    });
    onReady();
  }, [onReady, scene]);

  // 模型与贴纸共用同一根节点，转动时贴纸会牢固地跟随脸部。
  useFrame(({ pointer }, delta) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.x * 0.065, 4, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.y * 0.025, 4, delta);
  });

  return (
    <group ref={group} scale={SITE_CONFIG.model.scale} position={SITE_CONFIG.model.position as [number, number, number]} rotation={SITE_CONFIG.model.rotation as [number, number, number]}>
      <primitive object={scene} />
      {SITE_CONFIG.stickers.map((sticker) => (
        <Sticker key={sticker.id} sticker={sticker} meshRef={avatarMeshRef}
          onSelect={() => onStickerSelect(activeSticker === sticker.id ? null : sticker.id)} />
      ))}
    </group>
  );
}

function CameraRig({ activeSticker }: { activeSticker: string | null }) {
  const { camera } = useThree();
  const controls = useRef<ElementRef<typeof OrbitControls>>(null);
  const active = SITE_CONFIG.stickers.find((sticker) => sticker.id === activeSticker);

  useEffect(() => {
    const position = active?.focusPosition ?? SITE_CONFIG.camera.defaultPosition;
    const target = active
      ? active.position.map((value, index) => value * SITE_CONFIG.model.scale + SITE_CONFIG.model.position[index])
      : SITE_CONFIG.camera.defaultTarget;
    const duration = SITE_CONFIG.camera.transitionDuration;
    gsap.to(camera.position, { x: position[0], y: position[1], z: position[2], duration, ease: 'power3.inOut' });
    if (controls.current) {
      gsap.to(controls.current.target, {
        x: target[0], y: target[1], z: active ? 0.12 : target[2], duration, ease: 'power3.inOut',
        onUpdate: () => controls.current?.update(),
      });
    }
  }, [active, camera]);

  return (
    <OrbitControls ref={controls} makeDefault enablePan={false} enableZoom minDistance={1.8} maxDistance={4.4}
      minPolarAngle={Math.PI * 0.38} maxPolarAngle={Math.PI * 0.62} autoRotate={!activeSticker}
      autoRotateSpeed={SITE_CONFIG.camera.orbitSpeed} enableDamping dampingFactor={0.06}
      target={SITE_CONFIG.camera.defaultTarget as [number, number, number]} />
  );
}

function LoadingOverlay({ failed, onRetry, ready }: { failed: boolean; onRetry: () => void; ready: boolean }) {
  const { active, progress } = useProgress();
  const visible = !ready || active || failed;
  return (
    <div className={`loader ${visible ? 'is-visible' : 'is-hidden'}`} aria-live="polite">
      <div className="loader-orbit"><span /></div>
      {failed ? (
        <><strong>3D 模型暂时没有加载成功</strong><p>请检查网络或刷新后重试。</p><button type="button" onClick={onRetry}><RefreshCw size={15} /> 重新加载</button></>
      ) : (
        <><span className="loader-percent">{Math.round(progress)}%</span><p>正在组装你的 3D 名片</p><div className="loader-track"><span style={{ width: `${progress}%` }} /></div></>
      )}
    </div>
  );
}

export function AvatarScene({ activeSticker, onStickerSelect }: SceneProps) {
  const [modelReady, setModelReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const retry = () => {
    useGLTF.clear(SITE_CONFIG.model.url);
    setFailed(false);
    setModelReady(false);
    setRetryKey((value) => value + 1);
  };

  return (
    <>
      <SceneErrorBoundary key={retryKey} onError={() => setFailed(true)}>
        <Canvas shadows={false} dpr={[1, 1.65]}
          camera={{ position: SITE_CONFIG.camera.defaultPosition as [number, number, number], fov: SITE_CONFIG.camera.fov, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          onPointerMissed={() => onStickerSelect(null)}>
          <color attach="background" args={['#ebe8de']} />
          <fog attach="fog" args={['#ebe8de', 4, 8]} />
          <ambientLight intensity={SITE_CONFIG.lighting.ambientIntensity} color={SITE_CONFIG.lighting.ambient} />
          <directionalLight position={[2.8, 4, 4]} intensity={SITE_CONFIG.lighting.keyIntensity} color={SITE_CONFIG.lighting.key} />
          <pointLight position={[-2.4, 0.6, 2.2]} intensity={SITE_CONFIG.lighting.fillIntensity} distance={7} color={SITE_CONFIG.lighting.fill} />
          <Suspense fallback={null}>
            <AvatarAssembly activeSticker={activeSticker} onStickerSelect={onStickerSelect} onReady={() => setModelReady(true)} />
            <Environment frames={1} resolution={64} environmentIntensity={SITE_CONFIG.lighting.environmentIntensity}>
              <Lightformer intensity={2} position={[0, 3, 2]} scale={[4, 1, 1]} />
              <Lightformer intensity={1.4} position={[-3, 0, 1]} scale={[1, 3, 1]} color="#b7c6ff" />
              <Lightformer intensity={1.2} position={[3, -1, 1]} scale={[1, 2, 1]} color="#fff3df" />
            </Environment>
          </Suspense>
          <CameraRig activeSticker={activeSticker} />
          <EffectComposer multisampling={0}><Bloom mipmapBlur intensity={SITE_CONFIG.lighting.bloomIntensity} luminanceThreshold={0.9} /></EffectComposer>
        </Canvas>
      </SceneErrorBoundary>
      <LoadingOverlay failed={failed} onRetry={retry} ready={modelReady} />
    </>
  );
}

useGLTF.preload(SITE_CONFIG.model.url);
