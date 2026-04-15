import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Image as ThreeImage } from '@react-three/drei';
import { Mesh, PlaneGeometry, MeshBasicMaterial, MeshStandardMaterial, TextureLoader } from 'three';
import { useNavigate, useParams } from 'react-router-dom';
import { getPoetById, getPoemsByPoetId } from '../utils/data';
import { useStore } from '../utils/store';
import { Poem } from '../types';

// 诗词卡片组件
const PoemCard: React.FC<{
  poem: Poem;
  position: [number, number, number];
  rotation: [number, number, number];
  onSelect: (poem: Poem) => void;
}> = ({ poem, position, rotation, onSelect }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = React.useState(false);
  const navigate = useNavigate();
  const setSelectedPoem = useStore(state => state.setSelectedPoem);

  // 鼠标悬停效果
  const handleHover = () => {
    setHovered(true);
  };

  const handleUnhover = () => {
    setHovered(false);
  };

  const handleClick = () => {
    setSelectedPoem(poem);
    onSelect(poem);
    navigate(`/poem/${poem.id}`);
  };

  // 动画效果
  useFrame((state, delta) => {
    if (meshRef.current) {
      if (hovered) {
        // 悬停时放大
        meshRef.current.scale.set(1.1, 1.1, 1.1);
      } else {
        // 恢复原始状态
        meshRef.current.scale.set(1, 1, 1);
      }
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={meshRef}
        onPointerEnter={handleHover}
        onPointerLeave={handleUnhover}
        onClick={handleClick}
      >
        <planeGeometry args={[6, 4, 1]} />
        <meshStandardMaterial
          color={hovered ? '#E53E3E' : '#F7FAFC'}
          transparent
          opacity={hovered ? 0.9 : 0.8}
        />
      </mesh>
      <Text
        position={[0, 1.5, 0.1]}
        fontSize={0.6}
        color={hovered ? '#F7FAFC' : '#E53E3E'}
        anchorX="center"
        anchorY="middle"
      >
        {poem.title}
      </Text>
      <Text
        position={[0, 0.5, 0.1]}
        fontSize={0.4}
        color={hovered ? '#F7FAFC' : '#D69E2E'}
        anchorX="center"
        anchorY="middle"
      >
        {poem.sentences[0]}
      </Text>
    </group>
  );
};

// 3D诗人详情场景
const PoetDetailScene: React.FC<{
  poetId: string;
  onPoemSelect: (poem: Poem) => void;
}> = ({ poetId, onPoemSelect }) => {
  const poet = getPoetById(poetId);
  const poems = getPoemsByPoetId(poetId);
  const [rotation, setRotation] = React.useState(0);

  // 计算诗词卡片的位置函数
  const getPoemPosition = (index: number) => {
    const angle = poems.length > 0 ? (index / poems.length) * Math.PI * 2 + rotation : 0;
    const radius = 15;
    return {
      position: [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.5,
        Math.sin(angle) * radius
      ] as [number, number, number],
      rotation: [0, angle + Math.PI / 2, 0] as [number, number, number]
    };
  };

  // 旋转动画
  useFrame((state, delta) => {
    setRotation(prev => prev + delta * 0.1);
  });

  return (
    <Canvas camera={{ position: [0, 5, 20], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls enableDamping dampingFactor={0.1} />
      
      {/* 诗人图像 */}
      {poet && (
        <group position={[0, 0, 0]}>
          <mesh scale={[5, 7, 1]}>
            <planeGeometry />
            <meshBasicMaterial
              map={new TextureLoader().load(poet.imageUrl)}
              transparent
              opacity={0.9}
            />
          </mesh>
        </group>
      )}
      
      {/* 诗词卡片 */}
      {poems.length > 0 && poems.map((poem, index) => {
        const { position, rotation } = getPoemPosition(index);
        return (
          <PoemCard
            key={poem.id || index}
            poem={poem}
            position={position}
            rotation={rotation}
            onSelect={onPoemSelect}
          />
        );
      })}
      
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
const PoetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const poet = getPoetById(id || '');
  const poems = getPoemsByPoetId(id || '');

  const handlePoemSelect = (poem: Poem) => {
    // 诗词选择逻辑已在PoemCard组件中处理
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!poet) {
    return <div className="flex items-center justify-center h-screen">诗人不存在</div>;
  }

  return (
    <div className="relative w-full h-screen">
      <PoetDetailScene
        poetId={id || ''}
        onPoemSelect={handlePoemSelect}
      />
      
      {/* 诗人信息 */}
      <div className="absolute top-10 left-10 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md">
        <h2 className="text-2xl font-bold text-red-600">{poet.name}</h2>
        <p className="text-yellow-600 mb-4">{poet.dynasty}</p>
        <p className="text-gray-700 mb-4">{poet.description}</p>
        <button
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          onClick={handleBack}
        >
          返回首页
        </button>
      </div>
      
      {/* 诗词列表 */}
      <div className="absolute bottom-10 right-10 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md">
        <h3 className="text-xl font-bold text-red-600 mb-4">诗词作品</h3>
        <ul className="space-y-2">
          {poems.map((poem) => (
            <li key={poem.id} className="text-gray-700 hover:text-red-600 cursor-pointer">
              {poem.title}
            </li>
          ))}
        </ul>
      </div>
      
      {/* 页面标题 */}
      <div className="absolute top-0 left-0 w-full p-8 text-center">
        <h1 className="text-4xl font-bold text-red-600">{poet.name} - {poet.dynasty}</h1>
        <p className="text-xl text-yellow-600 mt-2">诗词欣赏</p>
      </div>
    </div>
  );
};

export default PoetDetail;