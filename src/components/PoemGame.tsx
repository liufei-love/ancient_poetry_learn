import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Mesh, PlaneGeometry, MeshBasicMaterial, MeshStandardMaterial } from 'three';
import { useNavigate, useParams } from 'react-router-dom';
import { getPoemById, getPoetById } from '../utils/data';
import { useStore } from '../utils/store';

// 可拖拽元素组件
const DraggableElement: React.FC<{
  text: string;
  position: [number, number, number];
  index: number;
  onDragStart: (index: number) => void;
  onDragEnd: () => void;
  isDragging: boolean;
  targetPosition: [number, number, number] | null;
}> = ({ text, position, index, onDragStart, onDragEnd, isDragging, targetPosition }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(position);
  const [rotation, setRotation] = useState([0, 0, 0] as [number, number, number]);

  // 鼠标悬停效果
  const handleHover = () => {
    setHovered(true);
  };

  const handleUnhover = () => {
    setHovered(false);
  };

  const handleClick = () => {
    onDragStart(index);
  };

  // 动画效果
  useFrame((state, delta) => {
    if (meshRef.current) {
      // 随机游动效果
      if (!isDragging && !targetPosition) {
        setCurrentPosition(prev => [
          prev[0] + Math.sin(Date.now() * 0.001 + index) * 0.05,
          prev[1] + Math.cos(Date.now() * 0.001 + index) * 0.05,
          prev[2]
        ]);
        setRotation(prev => [
          prev[0] + 0.01,
          prev[1] + 0.01,
          prev[2] + 0.01
        ]);
      }
      
      // 拖拽到目标位置
      if (targetPosition) {
        setCurrentPosition(prev => [
          prev[0] + (targetPosition[0] - prev[0]) * 0.1,
          prev[1] + (targetPosition[1] - prev[1]) * 0.1,
          prev[2] + (targetPosition[2] - prev[2]) * 0.1
        ]);
        setRotation([0, 0, 0]);
      }
    }
  });

  return (
    <group position={currentPosition} rotation={rotation}>
      <mesh
        ref={meshRef}
        onPointerEnter={handleHover}
        onPointerLeave={handleUnhover}
        onClick={handleClick}
      >
        <planeGeometry args={[4, 2, 1]} />
        <meshStandardMaterial
          color={hovered || isDragging ? '#E53E3E' : '#F7FAFC'}
          transparent
          opacity={hovered || isDragging ? 0.9 : 0.8}
        />
      </mesh>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.4}
        color={hovered || isDragging ? '#F7FAFC' : '#E53E3E'}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
};

// 3D游戏场景
const PoemGameScene: React.FC<{
  poemId: string;
  gameMode: 'sentence' | 'character';
  onComplete: () => void;
}> = ({ poemId, gameMode, onComplete }) => {
  const poem = getPoemById(poemId);
  const [draggableElements, setDraggableElements] = useState<{
    text: string;
    index: number;
    position: [number, number, number];
    targetPosition: [number, number, number] | null;
  }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(-1);
  const [completedElements, setCompletedElements] = useState<number[]>([]);

  // 初始化可拖拽元素
  useEffect(() => {
    if (poem) {
      const elements = gameMode === 'sentence' ? poem.sentences : poem.characters;
      const initialElements = elements.map((text, index) => {
        // 随机位置
        const position: [number, number, number] = [
          Math.random() * 20 - 10,
          Math.random() * 10 - 5,
          Math.random() * 5 - 2.5
        ];
        return {
          text,
          index,
          position,
          targetPosition: null
        };
      });
      setDraggableElements(initialElements);
      setCompletedElements([]);
    }
  }, [poem, gameMode]);

  // 处理拖拽开始
  const handleDragStart = (index: number) => {
    setIsDragging(true);
    setDraggingIndex(index);
  };

  // 处理拖拽结束
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggingIndex(-1);
  };

  // 处理放置到答案区
  const handleDrop = (targetIndex: number) => {
    if (draggingIndex !== -1) {
      // 检查是否正确
      const isCorrect = draggingIndex === targetIndex;
      
      if (isCorrect) {
        // 计算目标位置（答案区）
        const targetPosition: [number, number, number] = [
          -15 + (targetIndex % 5) * 6,
          -10 + Math.floor(targetIndex / 5) * 2.5,
          0
        ];
        
        setDraggableElements(prev => prev.map((el, i) => 
          i === draggingIndex ? { ...el, targetPosition } : el
        ));
        
        setCompletedElements(prev => [...prev, draggingIndex]);
        
        // 检查是否全部完成
        if (completedElements.length + 1 === draggableElements.length) {
          setTimeout(onComplete, 1000);
        }
      }
      
      handleDragEnd();
    }
  };

  if (!poem) {
    return null;
  }

  return (
    <Canvas camera={{ position: [0, 0, 25], fov: 40 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls enableDamping dampingFactor={0.1} />
      
      {/* 可拖拽元素 */}
      {draggableElements.map((element) => (
        <DraggableElement
          key={element.index}
          text={element.text}
          position={element.position}
          index={element.index}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          isDragging={isDragging && draggingIndex === element.index}
          targetPosition={element.targetPosition}
        />
      ))}
      
      {/* 答案区 */}
      <group position={[-15, -10, 0]}>
        {draggableElements.map((element, index) => {
          const x = (index % 5) * 6;
          const y = Math.floor(index / 5) * 2.5;
          const isCompleted = completedElements.includes(index);
          
          return (
            <mesh
              key={index}
              position={[x, y, -0.1]}
              onClick={() => handleDrop(index)}
            >
              <planeGeometry args={[4, 2, 1]} />
              <meshStandardMaterial
                color={isCompleted ? '#9AE6B4' : '#F7FAFC'}
                transparent
                opacity={0.5}
              />
            </mesh>
          );
        })}
      </group>
      
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
const PoemGame: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const poem = getPoemById(id || '');
  const poet = poem ? getPoetById(poem.poetId) : null;
  
  const gameMode = useStore(state => state.gameMode);
  const setGameMode = useStore(state => state.setGameMode);
  const gameStarted = useStore(state => state.gameStarted);
  const setGameStarted = useStore(state => state.setGameStarted);
  const gameCompleted = useStore(state => state.gameCompleted);
  const setGameCompleted = useStore(state => state.setGameCompleted);

  const handleGameModeSelect = (mode: 'sentence' | 'character') => {
    setGameMode(mode);
    setGameStarted(true);
    setGameCompleted(false);
  };

  const handleGameComplete = () => {
    setGameCompleted(true);
  };

  const handleBack = () => {
    navigate(`/poet/${poem?.poetId}`);
  };

  if (!poem || !poet) {
    return <div className="flex items-center justify-center h-screen">诗词不存在</div>;
  }

  return (
    <div className="relative w-full h-screen">
      {!gameStarted ? (
        // 游戏模式选择
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90">
          <h1 className="text-4xl font-bold text-red-600 mb-8">{poem.title}</h1>
          <p className="text-xl text-yellow-600 mb-4">{poet.name} · {poem.dynasty}</p>
          <p className="text-gray-700 mb-8 text-center max-w-2xl">{poem.content}</p>
          <div className="flex space-x-8">
            <button
              className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-lg"
              onClick={() => handleGameModeSelect('sentence')}
            >
              句子式游戏
            </button>
            <button
              className="px-8 py-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-lg"
              onClick={() => handleGameModeSelect('character')}
            >
              单个字式游戏
            </button>
          </div>
          <button
            className="mt-8 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            onClick={handleBack}
          >
            返回诗人详情
          </button>
        </div>
      ) : gameCompleted ? (
        // 游戏完成
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90">
          <h1 className="text-4xl font-bold text-red-600 mb-4">恭喜完成！</h1>
          <p className="text-xl text-yellow-600 mb-8">你成功完成了《{poem.title}》的游戏</p>
          <div className="flex space-x-4">
            <button
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              onClick={() => setGameStarted(false)}
            >
              重新开始
            </button>
            <button
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              onClick={handleBack}
            >
              返回诗人详情
            </button>
          </div>
        </div>
      ) : (
        // 游戏界面
        <>
          <PoemGameScene
            poemId={id || ''}
            gameMode={gameMode || 'sentence'}
            onComplete={handleGameComplete}
          />
          
          {/* 游戏信息 */}
          <div className="absolute top-10 left-10 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-2xl font-bold text-red-600">{poem.title}</h2>
            <p className="text-yellow-600 mb-4">{poet.name} · {poem.dynasty}</p>
            <p className="text-gray-700 mb-4">游戏模式：{gameMode === 'sentence' ? '句子式' : '单个字式'}</p>
            <button
              className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              onClick={handleBack}
            >
              返回诗人详情
            </button>
          </div>
          
          {/* 游戏说明 */}
          <div className="absolute bottom-10 right-10 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md">
            <h3 className="text-xl font-bold text-red-600 mb-4">游戏说明</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>点击上方游动的{gameMode === 'sentence' ? '句子' : '字'}</li>
              <li>将其拖拽到下方对应的答案区</li>
              <li>正确放置后会显示绿色背景</li>
              <li>所有{gameMode === 'sentence' ? '句子' : '字'}都正确放置后游戏完成</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default PoemGame;