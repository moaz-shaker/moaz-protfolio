import React, { memo, useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { MapPin, Calendar, Globe, TrendingUp, Award, Languages } from 'lucide-react';
import profilePic from '../images/profile-pic.jpeg';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

// 3D Stat Card Component
const StatCard = memo(({ icon: Icon, label, value, color, delay }: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  delay: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex-1 min-w-[200px]"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 h-full"
        animate={{
          rotateY: isHovered ? 5 : 0,
          scale: isHovered ? 1.05 : 1,
          boxShadow: isHovered
            ? `0 20px 40px -10px ${color}30, 0 10px 20px -10px rgba(0,0,0,0.1)`
            : '0 4px 15px -3px rgba(0,0,0,0.05)',
          borderColor: isHovered ? `${color}40` : '#f3f4f6'
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
            boxShadow: isHovered ? `0 8px 20px ${color}40` : 'none'
          }}
          animate={{ y: isHovered ? -4 : 0, rotate: isHovered ? 5 : 0 }}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>

        <div className="flex flex-col">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
          <p className="font-bold text-gray-900 text-base md:text-lg leading-tight">{value}</p>
        </div>

        {/* Floating particles on hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full right-4 top-4"
                  style={{ background: color }}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: Math.random() * 20 - 10,
                    y: -20 - Math.random() * 20
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});
StatCard.displayName = 'StatCard';

const About: React.FC = memo(() => {
  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center p-6 md:p-12 overflow-visible">
      <div className="w-full max-w-6xl flex flex-col items-center text-center">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="w-full flex flex-col items-center"
        >
          {/* Headline */}
          <motion.div variants={itemVariants} className="mb-8 relative z-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 tracking-tight leading-tight flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <span>About</span>
              <div className="relative inline-block">
                <span className="font-designer font-normal relative z-10 text-5xl md:text-6xl lg:text-7xl">Me</span>
                <div className="absolute -right-8 -top-8 w-16 h-16 md:w-20 md:h-20 -z-10 opacity-20 animate-pulse">
                  <div className="absolute inset-0 bg-brand rounded-full blur-2xl"></div>
                </div>

                {/* Data Analysis Icon (Chart) replacing the abstract shape */}
                <svg
                  className="absolute w-[140%] -left-[20%] h-[120%] -bottom-[10%] -z-10"
                  viewBox="0 0 100 40"
                  preserveAspectRatio="none"
                  style={{ overflow: 'visible' }}
                >
                  <motion.path
                    d="M 5 35 L 30 20 L 55 28 L 95 5"
                    fill="none"
                    stroke="#FCDD00"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mix-blend-multiply opacity-80"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  />
                  {/* Area fill */}
                  <motion.path
                    d="M 5 35 L 30 20 L 55 28 L 95 5 V 40 H 5 Z"
                    fill="url(#chartGradient)"
                    className="opacity-30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FCDD00" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#FCDD00" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Dots on points */}
                  {[
                    { cx: 5, cy: 35 },
                    { cx: 30, cy: 20 },
                    { cx: 55, cy: 28 },
                    { cx: 95, cy: 5 }
                  ].map((point, i) => (
                    <motion.circle
                      key={i}
                      cx={point.cx}
                      cy={point.cy}
                      r="2"
                      fill="#FCDD00"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + i * 0.1, type: "spring" }}
                    />
                  ))}
                </svg>
              </div>
            </h2>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full mb-12">
            {/* Profile Picture */}
            <motion.div
              variants={itemVariants}
              className="relative w-48 h-48 md:w-64 md:h-64 shrink-0"
            >
              <div className="absolute inset-0 bg-brand/20 rounded-full blur-2xl transform rotate-6"></div>
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-3 hover:rotate-0 transition-all duration-500">
                <img
                  src={profilePic}
                  alt="Moaz Shaker"
                  className="w-full h-full object-cover shadow-inner"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Floating Elements near picture */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white p-2 rounded-lg shadow-lg border border-gray-100 z-10"
              >
                <div className="text-xl">👋</div>
              </motion.div>
            </motion.div>

            {/* Bio Text */}
            <motion.div variants={itemVariants} className="prose prose-lg text-gray-600 max-w-2xl text-center md:text-left">
              <p className="text-xl md:text-2xl leading-relaxed font-medium text-gray-800 mb-6">
                I'm Moaz, a Business Intelligence Specialist & Data Analyst, blending <span className="bg-brand/20 px-2 py-0.5 rounded-lg text-brand-dark font-bold mx-1">problem-solving</span> with hands-on expertise in BI solutions, ETL development, and <span className="bg-blue-50 px-2 py-0.5 rounded-lg text-blue-900 font-bold mx-1">automation</span>.
              </p>
              <p className="leading-relaxed text-base md:text-lg text-gray-500">
                I focus on building robust analytics systems that scale with business needs. From designing efficient data pipelines to helping stakeholders make data-driven decisions, I ensure every solution delivers actionable insights that drive real business growth.
              </p>
            </motion.div>
          </div>

          {/* 3D Stats Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 w-full"
          >
            <StatCard
              icon={Award}
              label="Experience"
              value="+3 Years"
              color="#F59E0B"
              delay={0.1}
            />

            <StatCard
              icon={MapPin}
              label="Location"
              value="Cairo / Riyadh"
              color="#F97316"
              delay={0.2}
            />

            <StatCard
              icon={Languages}
              label="Languages"
              value="Arabic, English"
              color="#3B82F6"
              delay={0.3}
            />
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
});

About.displayName = 'About';

export default About;