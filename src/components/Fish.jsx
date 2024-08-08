/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 public/modals/Fish.gltf -o src/components/Fish.jsx -r public 
*/

import React, { useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function Fish({hovered,...props}) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/modals/Fish.gltf')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)
 
  useEffect(() => {
    const anim = hovered ? "Wave" : "Idle"
    actions[anim].reset().fadeIn(0.5).play()
    return () => actions[anim].fadeOut(0.5)
  }, [hovered, actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <skinnedMesh name="Fish" geometry={nodes.Fish.geometry} material={materials.Atlas} skeleton={nodes.Fish.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/modals/Fish.gltf')