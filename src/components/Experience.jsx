import { CameraControls, Environment, MeshPortalMaterial, RoundedBox, Text, useTexture } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import * as Three from 'three'
import { Fish } from './Fish'
import { Cactoro } from './Cactoro'
import { Demon } from './Demon'
import { easing } from 'maath'

const Experience = () => {
    const [active, setActive] = useState(null)
    const controlsRef = useRef()

    return (
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }} style={{ height: "100vh" }}>
            <color attach="background" args={["#87CEEB"]} />
            <CameraControls maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} ref={controlsRef} />
            <Scene active={active} setActive={setActive} controlsRef={controlsRef} />
        </Canvas>
    )
}

const Scene = ({ active, setActive, controlsRef }) => {
    const { scene } = useThree()
    const [hovered, setHovered] = useState(null)

    useEffect(() => {
        if (active) {
            const targetPosition = new Three.Vector3()
            scene.getObjectByName(active).getWorldPosition(targetPosition)
            controlsRef.current.setLookAt(
                0, 0, 5, targetPosition.x, targetPosition.y, targetPosition.z, true,
            )
        } else {
            controlsRef.current.setLookAt(
                0, 0, 10, 0, 0, 0, true,
            )
        }
    }, [active, scene, controlsRef])

    return (
        <>
            <Sphere name="FishKing" color={"#38adcf"} texture={'texture/anime_art_style_a_water_based_pokemon_like_environ.jpg'}
                active={active} setActive={setActive} hovered={hovered} setHovered={setHovered}>
                <Fish hovered={hovered === "FishKing"} scale={0.6} position-y={-1} />
            </Sphere>
            <Sphere name="DesrtKing" color="#739d3c" texture={'texture/anime_art_style_cactus_forest.jpg'} position-x={-2.5} rotation-y={Math.PI / 8}
                active={active} setActive={setActive} hovered={hovered} setHovered={setHovered}>
                <Cactoro hovered={hovered === "DesrtKing"} scale={0.6} position-y={-1} />
            </Sphere>
            <Sphere name="DemonKing" color="#df8d52" texture={'texture/anime_art_style_lava_world.jpg'} position-x={2.5} rotation-y={-Math.PI / 8}
                active={active} setActive={setActive} hovered={hovered} setHovered={setHovered}>
                <Demon hovered={hovered === "DemonKing"} scale={0.6} position-y={-1} />
            </Sphere>
        </>
    )
}

const Sphere = ({ children, hovered, setHovered, texture, name, color, active, setActive, ...props }) => {
    const map = useTexture(texture)
    const portalMaterial = useRef()

    useFrame((_state, delta) => {
        const worldOpen = active === name
        easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta)
    })

    return (
        <group {...props}>
            <Text font="Fonts/Caprasimo-Regular.ttf" fontSize={0.3} position={[0, -1.3, 0.051]} anchorY={"bottom"}>
                {name}
                <meshBasicMaterial color={color} toneMapped={false} />
            </Text>
            {/* tonemapped is used to get the exact color we are expecting */}
            <RoundedBox onPointerOver={() => setHovered(name)} onPointerLeave={() => setHovered(null)} onDoubleClick={() => setActive(active === name ? null : name)} args={[2, 3, 0.1]} name={name}>
                <MeshPortalMaterial
                    ref={portalMaterial}
                    side={Three.DoubleSide}>
                    <Environment preset='sunset' />
                    <ambientLight intensity={1.5} />
                    {children}
                    <mesh>
                        <sphereGeometry args={[6, 64, 64]} />
                        <meshStandardMaterial map={map} side={Three.BackSide} />
                    </mesh>
                </MeshPortalMaterial>
            </RoundedBox>
        </group>
    )
}

export default Experience
