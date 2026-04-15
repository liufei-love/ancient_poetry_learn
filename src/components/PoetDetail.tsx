import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPoetById, getPoemsByPoetId } from '../utils/data';
import { Poem } from '../types';

// 主组件
const PoetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const poet = getPoetById(id || '');
  const poems = getPoemsByPoetId(id || '');

  const handleBack = () => {
    navigate('/');
  };

  if (!poet) {
    return <div className="flex items-center justify-center h-screen">诗人不存在</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-gray-100">
      {/* 页面标题 */}
      <div className="bg-gradient-to-r from-red-600 to-yellow-600 text-white p-8 text-center">
        <h1 className="text-4xl font-bold">{poet.name} - {poet.dynasty}</h1>
        <p className="text-xl mt-2">诗词欣赏</p>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* 诗人信息 */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-4">
                <img 
                  src={poet.imageUrl} 
                  alt={poet.name}
                  className="w-48 h-64 object-cover rounded-lg mx-auto shadow-md"
                />
              </div>
              <h2 className="text-2xl font-bold text-red-600 text-center">{poet.name}</h2>
              <p className="text-yellow-600 text-center mb-4">{poet.dynasty}</p>
              <p className="text-gray-700 mb-4">{poet.description}</p>
              <button
                className="w-full px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                onClick={handleBack}
              >
                返回首页
              </button>
            </div>
          </div>

          {/* 诗词列表 */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-red-600 mb-4">诗词作品</h3>
              <div className="space-y-4">
                {poems.map((poem) => (
                  <div key={poem.id} className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
                    <h4 className="text-lg font-semibold text-gray-800">{poem.title}</h4>
                    <div className="mt-2 text-gray-700 whitespace-pre-line">
                      {poem.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoetDetail;
