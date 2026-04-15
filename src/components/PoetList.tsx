import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { poets } from '../utils/data';
import { useStore } from '../utils/store';
import { Poet } from '../types';

// 主组件
const PoetList: React.FC = () => {
  const [hoveredPoet, setHoveredPoet] = useState<Poet | null>(null);
  const [selectedPoet, setSelectedPoetState] = useState<Poet | null>(null);
  const navigate = useNavigate();
  const setSelectedPoet = useStore(state => state.setSelectedPoet);

  const handlePoetHover = (poet: Poet) => {
    setHoveredPoet(poet);
  };

  const handlePoetUnhover = () => {
    setHoveredPoet(null);
  };

  const handlePoetSelect = (poet: Poet) => {
    setSelectedPoet(poet);
    setSelectedPoetState(poet);
    navigate(`/poet/${poet.id}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 中国大好河山背景 */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20beautiful%20landscape%20mountains%20rivers%20traditional%20Chinese%20painting%20style&image_size=landscape_16_9" 
          alt="中国大好河山" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
      </div>

      {/* 页面内容 */}
      <div className="relative z-10">
        {/* 页面标题 */}
        <div className="pt-20 pb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-shadow mb-4">中小学古诗词学习平台</h1>
          <p className="text-xl md:text-2xl text-yellow-200">探索古代诗人的世界</p>
        </div>

        {/* 诗人卡片容器 */}
        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {poets.map((poet) => (
              <div
                key={poet.id}
                className="bg-white bg-opacity-90 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
                onMouseEnter={() => handlePoetHover(poet)}
                onMouseLeave={handlePoetUnhover}
                onClick={() => handlePoetSelect(poet)}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={poet.imageUrl} 
                    alt={poet.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-red-600 mb-1">{poet.name}</h3>
                  <p className="text-yellow-600 mb-3">{poet.dynasty}</p>
                  <p className="text-gray-700 text-sm line-clamp-2">{poet.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 悬停信息 */}
        {hoveredPoet && (
          <div className="fixed top-1/4 left-10 bg-white rounded-lg shadow-xl p-6 max-w-md z-20">
            <h2 className="text-2xl font-bold text-red-600 mb-2">{hoveredPoet.name}</h2>
            <p className="text-yellow-600 mb-4">{hoveredPoet.dynasty}</p>
            <p className="text-gray-700 mb-4">{hoveredPoet.description}</p>
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800 mb-2">著名诗句：</h3>
              <ul className="list-disc pl-5 space-y-1">
                {hoveredPoet.famousLines.map((line, index) => (
                  <li key={index} className="text-gray-600 text-sm">{line}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoetList;
