import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDynastyById, getArtifactsByDynastyId } from '@/utils/data';
import { ArrowLeft } from 'lucide-react';

const DynastyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dynasty = id ? getDynastyById(id) : undefined;
  const artifacts = id ? getArtifactsByDynastyId(id) : [];

  if (!dynasty) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-400 mb-4">朝代未找到</h2>
          <Link
            to="/"
            className="text-amber-400 hover:text-amber-300 transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={dynasty.iconImage}
            alt={dynasty.name}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-gray-900/80" />
          
          {/* Holographic Effect */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${dynasty.color}20, transparent)`,
            }}
          />
        </div>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 bg-gray-800/80 backdrop-blur-sm rounded-full text-gray-300 hover:text-white hover:bg-gray-700/80 transition-all border border-gray-700"
        >
          <ArrowLeft className="w-5 h-5" />
          返回
        </motion.button>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-4"
            style={{ color: dynasty.color }}
          >
            {dynasty.name}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-amber-100/80 mb-6"
          >
            {dynasty.period}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {dynasty.description}
          </motion.p>
        </motion.div>

        {/* Particle Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ backgroundColor: dynasty.color }}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0.3,
              }}
              animate={{
                y: [null, Math.random() * -50 - 20],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: Math.random() * 4 + 4,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Artifacts Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.05),_transparent_70%)]" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-amber-400 mb-4">珍贵文物</h2>
          <p className="text-gray-400 text-lg">探索{`${dynasty.name}`}的文明瑰宝</p>
        </motion.div>

        {artifacts.length > 0 ? (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {artifacts.map((artifact, index) => (
              <motion.div
                key={artifact.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -15, scale: 1.02 }}
              >
                <Link to={`/artifact/${artifact.id}`}>
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-amber-500/50 transition-all duration-500 group">
                    {/* Glow Effect */}
                    <div
                      className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                      style={{ backgroundColor: `${dynasty.color}30` }}
                    />
                    
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={artifact.imageUrl}
                        alt={artifact.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />
                      
                      {/* Holographic Overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(135deg, ${dynasty.color}10, transparent, ${dynasty.color}10)`,
                          }}
                        />
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-amber-300 text-xs rounded-full border border-amber-500/30">
                          {artifact.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 relative z-10">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                        {artifact.name}
                      </h3>
                      <p className="text-amber-400/70 text-sm mb-3">{artifact.period}</p>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {artifact.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-amber-400 text-sm font-medium group-hover:text-amber-300 transition-colors">
                          查看详情 →
                        </span>
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: dynasty.color }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-20 relative z-10"
          >
            <p className="text-gray-500 text-lg">暂无文物展示</p>
          </motion.div>
        )}
      </section>

      {/* Navigation Footer */}
      <section className="py-16 px-4 border-t border-gray-800 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-8"
          >
            <Link
              to="/"
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-full transition-all duration-300 border border-gray-700 hover:border-amber-500/30"
            >
              返回首页
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DynastyDetail;
