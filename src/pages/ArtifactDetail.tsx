import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { getArtifactById, getDynastyById } from '@/utils/data';
import { ArrowLeft, ZoomIn, MapPin, Clock, Tag } from 'lucide-react';
import { useRef, useState } from 'react';

const ArtifactDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const artifact = id ? getArtifactById(id) : undefined;
  const dynasty = artifact ? getDynastyById(artifact.dynastyId) : undefined;
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  if (!artifact) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-400 mb-4">文物未找到</h2>
          <button
            onClick={() => navigate('/')}
            className="text-amber-400 hover:text-amber-300 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const rotateY = ((mouseX - centerX) / centerX) * 15;
    const rotateX = ((mouseY - centerY) / centerY) * -15;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => dynasty ? navigate(`/dynasty/${dynasty.id}`) : navigate('/')}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 bg-gray-800/80 backdrop-blur-sm rounded-full text-gray-300 hover:text-white hover:bg-gray-700/80 transition-all border border-gray-700"
      >
        <ArrowLeft className="w-5 h-5" />
        返回
      </motion.button>

      {/* Hero Section with Holographic Display */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black" />
          
          {/* Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.15),transparent_60%)]" />
          
          {/* Grid Lines */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Particle Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/50 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0.2,
              }}
              animate={{
                y: [null, Math.random() * -100 - 50],
                x: [null, Math.random() * 40 - 20],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: Math.random() * 6 + 4,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-6xl px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Holographic Image Display */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative perspective-1000"
              >
                {/* Holographic Container */}
                <motion.div
                  animate={{
                    rotateX: rotation.x,
                    rotateY: rotation.y,
                  }}
                  transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                  className="relative"
                >
                  {/* Outer Glow Ring */}
                  <div className="absolute -inset-8 rounded-full opacity-30">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle, transparent 30%, ${dynasty?.color || '#D4AF37'}40 70%, transparent 100%)`,
                      }}
                    />
                  </div>

                  {/* Scan Lines */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl z-20 pointer-events-none">
                    <motion.div
                      animate={{ y: ['-100%', '100%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.1), transparent)',
                      }}
                    />
                  </div>

                  {/* Main Image */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30">
                    <img
                      src={artifact.imageUrl}
                      alt={artifact.name}
                      className="w-full aspect-square object-cover"
                    />
                    
                    {/* Overlay Effects */}
                    <div className="absolute inset-0">
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(45deg, transparent 40%, ${dynasty?.color || '#D4AF37'}10 50%, transparent 60%)`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                    </div>

                    {/* Holo Corners */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400/50 rounded-tl-2xl" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400/50 rounded-tr-2xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400/50 rounded-bl-2xl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400/50 rounded-br-2xl" />
                  </div>

                  {/* Floating Labels */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-4 -right-4 bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-500/40 shadow-lg"
                  >
                    <span className="text-amber-400 text-sm font-medium flex items-center gap-2">
                      <ZoomIn className="w-4 h-4" />
                      8K 超高清
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Info Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Title */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex items-center gap-3"
                >
                  <span
                    className="px-4 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: `${dynasty?.color || '#D4AF37'}20`,
                      color: dynasty?.color || '#D4AF37',
                    }}
                  >
                    {artifact.category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {dynasty?.name}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                >
                  {artifact.name}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-xl text-amber-400/80"
                >
                  {artifact.period}
                </motion.p>
              </div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-amber-400">文物简介</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {artifact.description}
                </p>
              </motion.div>

              {/* Details Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="grid gap-4"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    详细信息
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-gray-500 text-sm">年代</span>
                        <p className="text-gray-300">{artifact.period}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-gray-500 text-sm">馆藏地点</span>
                        <p className="text-gray-300">{artifact.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Details */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-amber-400 mb-4">核心特点</h3>
                  <div className="space-y-3">
                    {artifact.details.map((detail, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                        className="flex items-start gap-3"
                      >
                        <div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: dynasty?.color || '#D4AF37' }}
                        />
                        <p className="text-gray-400">{detail}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Navigation Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="flex gap-4 pt-4"
              >
                {dynasty && (
                  <button
                    onClick={() => navigate(`/dynasty/${dynasty.id}`)}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-medium rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-amber-500/30 border border-amber-400/30"
                  >
                    查看{`${dynasty.name}`}更多文物
                  </button>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" />
      </section>
    </div>
  );
};

export default ArtifactDetail;
