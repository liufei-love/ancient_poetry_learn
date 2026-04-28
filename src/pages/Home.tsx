import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { dynasties } from '@/utils/data';
import { ChevronDown } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-amber-900/10 to-transparent" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.15),_transparent_70%)]" />
        </div>

        {/* Particle Background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0.2,
              }}
              animate={{
                y: [null, Math.random() * -100 - 50],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-2xl">
              中华上下五千年
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-xl md:text-2xl lg:text-3xl text-amber-100/90 mb-12 font-light tracking-widest"
          >
            沉浸式文物数字博物馆
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <Link
              to="#timeline"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white text-lg font-medium rounded-full shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 hover:scale-105 border border-amber-400/30"
            >
              探索历史长河
              <ChevronDown className="w-6 h-6" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-amber-400/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [5, 15, 5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-amber-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.05),_transparent_70%)]" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-amber-400 mb-4">历史长河</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            从远古到明清，穿越五千年中华文明
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-600 via-amber-400 to-amber-600 rounded-full opacity-40" />

          {/* Timeline Items */}
          {dynasties.map((dynasty, index) => (
            <motion.div
              key={dynasty.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative mb-16 flex items-center ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                <Link
                  to={`/dynasty/${dynasty.id}`}
                  className="block group"
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 hover:scale-[1.02]">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-2xl font-bold"
                        style={{ color: dynasty.color }}
                      >
                        {dynasty.name}
                      </span>
                      <span className="text-amber-400/70 text-sm">
                        {dynasty.period}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {dynasty.description}
                    </p>
                  </div>
                </Link>
              </div>

              {/* Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className="w-6 h-6 rounded-full border-4 border-gray-900 shadow-lg"
                  style={{
                    backgroundColor: dynasty.color,
                    boxShadow: `0 0 20px ${dynasty.color}60`,
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: dynasty.color,
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dynasty Cards Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 to-transparent" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-amber-400 mb-4">历代珍藏</h2>
          <p className="text-gray-400 text-lg">探索每个朝代的珍贵文物</p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {dynasties.map((dynasty, index) => (
            <motion.div
              key={dynasty.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Link to={`/dynasty/${dynasty.id}`}>
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-amber-500/50 transition-all duration-500 group">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={dynasty.iconImage}
                      alt={dynasty.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                    
                    {/* Holographic Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(45deg, ${dynasty.color}20, transparent, ${dynasty.color}20)`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3
                        className="text-2xl font-bold"
                        style={{ color: dynasty.color }}
                      >
                        {dynasty.name}
                      </h3>
                      <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
                        {dynasty.period}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {dynasty.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-400 text-sm font-medium group-hover:text-amber-300 transition-colors">
                        查看文物 →
                      </span>
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: dynasty.color }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800 bg-gray-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2024 中华文物数字博物馆 · 传承文明 · 启迪未来
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
