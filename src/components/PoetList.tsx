import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Mesh, BoxGeometry, MeshBasicMaterial, PlaneGeometry, MeshStandardMaterial } from 'three';
import { useNavigate } from 'react-router-dom';
import { poets } from '../utils/data';
import { useStore } from '../utils/store';
import { Poet } from '../types';

// 诗人卡片组件
const PoetCard: React.FC<{
  poet: Poet;
  position: [number, number, number];
  onHover: (poet: Poet) => void;
  onUnhover: () => void;
  onSelect: (poet: Poet) => void;
}> = ({ poet, position, onHover, onUnhover, onSelect }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const setSelectedPoet = useStore(state => state.setSelectedPoet);

  // 鼠标悬停效果
  const handleHover = (event: any) => {
    setHovered(true);
    onHover(poet);
  };

  const handleUnhover = () => {
    setHovered(false);
    onUnhover();
  };

  const handleClick = () => {
    setSelectedPoet(poet);
    onSelect(poet);
    navigate(`/poet/${poet.id}`);
  };

  // 动画效果
  useFrame((state, delta) => {
    if (meshRef.current) {
      if (hovered) {
        // 悬停时放大并旋转
        meshRef.current.scale.set(1.1, 1.1, 1.1);
        meshRef.current.rotation.y += delta * 0.5;
      } else {
        // 恢复原始状态
        meshRef.current.scale.set(1, 1, 1);
        meshRef.current.rotation.y += delta * 0.1;
      }
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerEnter={handleHover}
        onPointerLeave={handleUnhover}
        onClick={handleClick}
      >
        <boxGeometry args={[4, 6, 0.1]} />
        <meshStandardMaterial
          color={hovered ? '#E53E3E' : '#F7FAFC'}
          transparent
          opacity={hovered ? 0.9 : 0.8}
        />
      </mesh>
      <Text
        position={[0, 1.5, 0.1]}
        fontSize={0.8}
        color={hovered ? '#F7FAFC' : '#E53E3E'}
        anchorX="center"
        anchorY="middle"
      >
        {poet.name}
      </Text>
      <Text
        position={[0, 0.5, 0.1]}
        fontSize={0.5}
        color={hovered ? '#F7FAFC' : '#D69E2E'}
        anchorX="center"
        anchorY="middle"
      >
        {poet.dynasty}
      </Text>
    </group>
  );
};

// 3D诗人列表场景
const PoetListScene: React.FC<{
  onPoetHover: (poet: Poet) => void;
  onPoetUnhover: () => void;
  onPoetSelect: (poet: Poet) => void;
}> = ({ onPoetHover, onPoetUnhover, onPoetSelect }) => {
  // 计算诗人卡片的位置
  const positions = poets.map((_, index) => {
    const angle = (index / poets.length) * Math.PI * 2;
    const radius = 15;
    return [
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    ] as [number, number, number];
  });

  return (
    <Canvas camera={{ position: [0, 5, 20], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls enableDamping dampingFactor={0.1} />
      
      {poets.map((poet, index) => (
        <PoetCard
          key={poet.id}
          poet={poet}
          position={positions[index]}
          onHover={onPoetHover}
          onUnhover={onPoetUnhover}
          onSelect={onPoetSelect}
        />
      ))}
      
      {/* 背景 */}
      <mesh position={[0, 0, -50]} scale={[100, 100, 1]}>
        <planeGeometry />
        <meshBasicMaterial
          color="#F7FAFC"
          transparent
          opacity={0.3}
        />
      </mesh>
    </Canvas>
  );
};

// 主组件
const PoetList: React.FC = () => {
  const [hoveredPoet, setHoveredPoet] = useState<Poet | null>(null);

  const handlePoetHover = (poet: Poet) => {
    setHoveredPoet(poet);
    // 这里可以添加音频播放逻辑
  };

  const handlePoetUnhover = () => {
    setHoveredPoet(null);
  };

  const handlePoetSelect = (poet: Poet) => {
    setHoveredPoet(null);
  };

  return (
    <div className="relative w-full h-screen">
      <PoetListScene
        onPoetHover={handlePoetHover}
        onPoetUnhover={handlePoetUnhover}
        onPoetSelect={handlePoetSelect}
      />
      
      {/* 悬停信息 */}
      {hoveredPoet && (
        <div className="absolute top-10 left-10 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-600">{hoveredPoet.name}</h2>
          <p className="text-yellow-600 mb-4">{hoveredPoet.dynasty}</p>
          <p className="text-gray-700 mb-4">{hoveredPoet.description}</p>
          <div className="mt-4">
            <h3 className="font-semibold text-gray-800">著名诗句：</h3>
            <ul className="list-disc pl-5 mt-2">
              {hoveredPoet.famousLines.map((line, index) => (
                <li key={index} className="text-gray-600">{line}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* 页面标题 */}
      <div className="absolute top-0 left-0 w-full p-8 text-center">
        <h1 className="text-4xl font-bold text-red-600">中小学古诗词学习平台</h1>
        <p className="text-xl text-yellow-600 mt-2">探索古代诗人的世界</p>
      </div>
    </div>
  );
};

export default PoetList;