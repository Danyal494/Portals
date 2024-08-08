import React, { useEffect, useMemo, useRef } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function Demon({ hovered, ...props }) {
  const group = useRef()
  const { scene, animations } = useGLTF('/modals/Demon.gltf')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    const anim = hovered ? "Jump" : "Idle"
    actions[anim].reset().fadeIn(0.5).play()
    return () => actions[anim].fadeOut(0.5)
  }, [hovered, actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <skinnedMesh name="Demon" geometry={nodes.Demon.geometry} material={materials.Atlas} skeleton={nodes.Demon.skeleton} />
          <skinnedMesh name="Trident" geometry={nodes.Trident.geometry} material={materials.Atlas} skeleton={nodes.Trident.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/modals/Demon.gltf')
