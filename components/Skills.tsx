import React, { useEffect, memo, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

// Animated Dashboard Visual - Interactive Chart
const DashboardVisual = memo(() => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const bars = [65, 85, 45, 95, 70, 80, 55];

  return (
    <div className="relative w-full h-32 flex items-end justify-center gap-1.5 px-2 group">
      {/* Grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between opacity-20">
        {[0, 1, 2, 3].map(i => <div key={i} className="border-t border-dashed border-gray-400" />)}
      </div>

      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="relative flex-1 rounded-t-md cursor-pointer"
          initial={{ height: 0 }}
          whileInView={{ height: `${height}%` }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.6, type: "spring", bounce: 0.3 }}
          onMouseEnter={() => setHoveredBar(i)}
          onMouseLeave={() => setHoveredBar(null)}
          style={{
            background: hoveredBar === i
              ? 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)'
              : 'linear-gradient(180deg, #FBBF24 0%, #F59E0B 100%)',
            boxShadow: hoveredBar === i
              ? '0 -4px 20px rgba(245, 158, 11, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)'
              : '0 -2px 10px rgba(245, 158, 11, 0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
            transform: hoveredBar === i ? 'scaleY(1.05)' : 'scaleY(1)',
            transformOrigin: 'bottom',
            transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s'
          }}
        >
          <AnimatePresence>
            {hoveredBar === i && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: -8 }}
                exit={{ opacity: 0 }}
                className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap z-10"
              >
                {height}%
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Floating trend line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <motion.path
          d="M 10 80 Q 40 50 70 65 T 130 40 T 190 55"
          fill="none"
          stroke="#DC2626"
          strokeWidth="2"
          strokeDasharray="4 2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
        />
      </svg>
    </div>
  );
});
DashboardVisual.displayName = 'DashboardVisual';

// Animated ETL Pipeline Visual - 3D Style
const ETLPipelineVisual = memo(() => {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode(prev => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const nodes = ['Extract', 'Transform', 'Load', 'Store'];
  const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'];

  return (
    <div className="relative w-full h-32 flex items-center justify-between px-4">
      {nodes.map((node, i) => (
        <React.Fragment key={i}>
          {/* Node */}
          <motion.div
            className="relative flex flex-col items-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <motion.div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${colors[i]} 0%, ${colors[i]}dd 100%)`,
                boxShadow: activeNode === i
                  ? `0 8px 25px ${colors[i]}60, 0 4px 10px ${colors[i]}40, inset 0 1px 0 rgba(255,255,255,0.3)`
                  : `0 4px 15px ${colors[i]}30, inset 0 1px 0 rgba(255,255,255,0.2)`,
                transform: activeNode === i ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.3s ease'
              }}
            >
              {i === 0 && <DatabaseIcon />}
              {i === 1 && <TransformIcon />}
              {i === 2 && <UploadIcon />}
              {i === 3 && <StorageIcon />}
            </motion.div>
            <span className="text-[9px] font-semibold text-gray-500 mt-1.5">{node}</span>

            {/* Pulse ring */}
            {activeNode === i && (
              <motion.div
                className="absolute top-0 w-10 h-10 rounded-xl"
                style={{ border: `2px solid ${colors[i]}` }}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.div>

          {/* Connector */}
          {i < 3 && (
            <div className="flex-1 h-0.5 mx-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-200 rounded-full" />
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: colors[i] }}
                initial={{ width: 0 }}
                animate={{ width: activeNode > i ? '100%' : '0%' }}
                transition={{ duration: 0.5 }}
              />
              {/* Data packet animation */}
              {activeNode === i && (
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                  style={{ background: colors[i], boxShadow: `0 0 10px ${colors[i]}` }}
                  initial={{ left: 0 }}
                  animate={{ left: '100%' }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
              )}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
});
ETLPipelineVisual.displayName = 'ETLPipelineVisual';

// Mini Icons for ETL
const DatabaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);
const TransformIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);
const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const StorageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

// Animated Analytics Visual - Live Chart
const AnalyticsVisual = memo(() => {
  const [points, setPoints] = useState([40, 55, 35, 70, 50, 80, 60, 75]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev => {
        const newPoints = [...prev.slice(1), Math.random() * 40 + 40];
        return newPoints;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const pathD = points.reduce((acc, point, i) => {
    const x = (i / (points.length - 1)) * 180 + 10;
    const y = 100 - point;
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  const areaD = `${pathD} L 190 100 L 10 100 Z`;

  return (
    <div className="relative w-full h-32 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
        {/* Grid */}
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <motion.path
          d={areaD}
          fill="url(#areaGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Line */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Dots */}
        {points.map((point, i) => {
          const x = (i / (points.length - 1)) * 180 + 10;
          const y = 100 - point;
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill="#10B981"
              stroke="white"
              strokeWidth="1.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="cursor-pointer"
              whileHover={{ scale: 1.5 }}
            />
          );
        })}
      </svg>

      {/* KPI Badge */}
      <motion.div
        className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
      >
        +24.5%
      </motion.div>
    </div>
  );
});
AnalyticsVisual.displayName = 'AnalyticsVisual';

// 3D Tool Card - Enhanced
const ToolCard3D = memo(({ name, icon, color, delay = 0 }: { name: string; icon: React.ReactNode; color: string; delay?: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer w-full"
      initial={{ opacity: 0, y: 20, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative p-4 rounded-2xl bg-white border border-gray-100 flex flex-col items-center gap-3 w-full h-full"
        animate={{
          rotateY: isHovered ? 5 : 0,
          rotateX: isHovered ? -5 : 0,
          scale: isHovered ? 1.05 : 1,
          boxShadow: isHovered
            ? `0 20px 40px -10px ${color}40, 0 10px 20px -10px rgba(0,0,0,0.1)`
            : '0 4px 15px -3px rgba(0,0,0,0.05)',
          borderColor: isHovered ? `${color}40` : '#f3f4f6'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0"
          style={{ background: `radial-gradient(circle at center, ${color}20 0%, transparent 70%)` }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Icon container */}
        <motion.div
          className="relative w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{
            background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
            border: `1px solid ${color}20`
          }}
          animate={{
            y: isHovered ? -5 : 0,
            rotate: isHovered ? 5 : 0,
            boxShadow: isHovered ? `0 8px 20px ${color}30` : 'none'
          }}
        >
          <div className="w-8 h-8 flex items-center justify-center">
            {icon}
          </div>
        </motion.div>

        <span className="text-sm font-bold text-gray-800 relative z-10">{name}</span>

        {/* Floating particles on hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{ background: color }}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: (i - 1) * 20,
                    y: -30 - i * 10
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});
ToolCard3D.displayName = 'ToolCard3D';

// Skill Meter - Animated 3D style
const SkillMeter = memo(({ percentage, color, label }: { percentage: number; color: string; label: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const controls = animate(count, percentage, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [percentage, count]);

  return (
    <div className="w-full mt-auto pt-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</span>
        <div className="flex items-baseline gap-0.5">
          <motion.span className="text-2xl font-black text-gray-900">{rounded}</motion.span>
          <span className="text-sm font-bold text-gray-400">%</span>
        </div>
      </div>
      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color} 0%, ${color}cc 100%)`,
            boxShadow: `0 2px 10px ${color}50`
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* Shine effect */}
        <motion.div
          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          initial={{ x: -80 }}
          whileInView={{ x: 300 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
        />
      </div>
    </div>
  );
});
SkillMeter.displayName = 'SkillMeter';

// Main 3D Skill Card
const SkillCard3D = memo(({
  title,
  skills,
  visual: Visual,
  color,
  badge,
  percentage,
  index
}: {
  title: string;
  skills: string[];
  visual: React.ComponentType;
  color: string;
  badge: string;
  percentage: number;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative h-full p-5 rounded-3xl bg-white border overflow-hidden"
        animate={{
          rotateY: isHovered ? 2 : 0,
          rotateX: isHovered ? -2 : 0,
          scale: isHovered ? 1.02 : 1,
          borderColor: isHovered ? `${color}40` : '#f3f4f6',
          boxShadow: isHovered
            ? `0 30px 60px -15px ${color}25, 0 15px 30px -15px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)`
            : '0 8px 30px -10px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5)'
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Background glow */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl"
          style={{ background: color }}
          animate={{ opacity: isHovered ? 0.15 : 0.05 }}
        />

        {/* Header */}
        <div className="flex justify-between items-start mb-3 relative z-10">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <motion.span
            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg"
            style={{
              background: `${color}15`,
              color: color,
              border: `1px solid ${color}30`
            }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
          >
            {badge}
          </motion.span>
        </div>

        {/* Visual */}
        <div className="relative z-10 mb-4 bg-gradient-to-b from-gray-50/50 to-white rounded-2xl p-2 border border-gray-100/50">
          <Visual />
        </div>

        {/* Skills list */}
        <div className="space-y-2 relative z-10">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 text-sm text-gray-600"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: color }}
                animate={{ scale: isHovered ? [1, 1.3, 1] : 1 }}
                transition={{ delay: i * 0.05 }}
              />
              <span>{skill}</span>
            </motion.div>
          ))}
        </div>

        {/* Skill meter */}
        <SkillMeter percentage={percentage} color={color} label="Proficiency" />
      </motion.div>
    </motion.div>
  );
});
SkillCard3D.displayName = 'SkillCard3D';

// Tool Icons
const PowerBIIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path fill="#F2C811" d="M12 2v20h-2V2z" />
    <path fill="#E8A618" d="M16 6v16h-2V6z" />
    <path fill="#DD8A00" d="M20 10v12h-2V10z" />
    <path fill="#FFDA59" d="M8 4v18H6V4z" />
    <path fill="#F9E589" d="M4 8v14H2V8z" />
  </svg>
);

const TableauIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path fill="#E97627" d="M11.5 2v3h-2V3.5h-.5V5h-2V3.5H6.5V5H5V2h2v1.5h.5V2h2v1.5h.5V2zM19 8h.5v.5H19v2h.5v.5H19v2h-2v-.5h-.5v.5h-2v-2h.5v-.5h-.5V8h2v.5h.5V8zm-7.5 6v3h-2v-1.5h-.5v1.5h-2v-1.5H6.5v1.5H5v-3h2v1.5h.5V14h2v1.5h.5V14zM19 14h.5v.5H19v2h.5v.5H19v2h-2v-.5h-.5v.5h-2v-2h.5v-.5h-.5v-2h2v.5h.5V14zM11.5 8v3h-2V9.5h-.5V11h-2V9.5H6.5V11H5V8h2v1.5h.5V8h2v1.5h.5V8z" />
  </svg>
);

const PythonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path fill="#3776AB" d="M12 2c-2.5 0-2.8.5-2.8 1.5v1.8h5.6v.7H7.5C5.5 6 4 7.9 4 11c0 3.1 1.5 5 3.5 5h1.8v-2.5c0-2 1.7-3.5 3.7-3.5h4c1.5 0 2.5-1 2.5-2.5v-4C19.5 2 18.5 2 16 2zm-2 1c.4 0 .8.4.8.9s-.4.9-.8.9-.8-.4-.8-.9.4-.9.8-.9z" />
    <path fill="#FFD43B" d="M12 22c2.5 0 2.8-.5 2.8-1.5v-1.8H9.2v-.7h7.3c2 0 3.5-1.9 3.5-5s-1.5-5-3.5-5h-1.8v2.5c0 2-1.7 3.5-3.7 3.5h-4C5.5 14 4.5 15 4.5 16.5v4c0 1.5 1 1.5 3.5 1.5zm2-1c-.4 0-.8-.4-.8-.9s.4-.9.8-.9.8.4.8.9-.4.9-.8.9z" />
  </svg>
);

const SQLIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <ellipse cx="12" cy="6" rx="8" ry="3" fill="#1976D2" />
    <path fill="#1976D2" d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6c0 1.7-3.6 3-8 3S4 7.7 4 6z" />
    <ellipse cx="12" cy="6" rx="8" ry="3" fill="#2196F3" />
  </svg>
);

const ExcelIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path fill="#4CAF50" d="M21 5H11v14h10c.3 0 .5-.2.5-.5v-13c0-.3-.2-.5-.5-.5z" />
    <path fill="#2E7D32" d="M11 21L3 19V5l8-2v18z" />
    <path fill="#FFF" d="M7.5 15l-1.2-2.3L5 15H4l1.5-3L4 9h1l1.2 2.2L7.5 9h1l-1.5 3 1.5 3h-1z" />
  </svg>
);

const AirflowIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path fill="#017CEE" d="M12 3L4 7v10l8 4 8-4V7l-8-4zm0 2l6 3-6 3-6-3 6-3zM5 9l6 3v6l-6-3V9zm14 6l-6 3v-6l6-3v6z" />
  </svg>
);

const PostgreSQLIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path fill="#336791" d="M12 2C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 1.1.9 2 2 2h1v2c0 .6.4 1 1 1s1-.4 1-1v-2h1c1.1 0 2-.9 2-2v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7zm-2 13H9v-2h1v2zm4 0h-1v-2h1v2z" />
  </svg>
);

const Skills: React.FC = memo(() => {
  const skills = [
    {
      title: "Reporting & Dashboards",
      skills: ["Interactive dashboard design", "Data-driven decision support", "Infographics & storytelling", "Business reports"],
      visual: DashboardVisual,
      color: "#F59E0B",
      badge: "BI",
      percentage: 95
    },
    {
      title: "Data Management",
      skills: ["Dimensional modeling", "ETL pipeline development", "Data warehouse design", "Data quality assurance"],
      visual: ETLPipelineVisual,
      color: "#3B82F6",
      badge: "ETL",
      percentage: 92
    },
    {
      title: "Analysis & Insights",
      skills: ["Statistical analysis", "KPI monitoring", "A/B testing", "Customer segmentation"],
      visual: AnalyticsVisual,
      color: "#10B981",
      badge: "Analytics",
      percentage: 90
    }
  ];

  const tools = [
    { name: "Power BI", icon: <PowerBIIcon />, color: "#F2C811" },
    { name: "Tableau", icon: <TableauIcon />, color: "#E97627" },
    { name: "Python", icon: <PythonIcon />, color: "#3776AB" },
    { name: "SQL", icon: <SQLIcon />, color: "#1976D2" },
    { name: "PostgreSQL", icon: <PostgreSQLIcon />, color: "#336791" },
    { name: "Excel", icon: <ExcelIcon />, color: "#217346" },
    { name: "Airflow", icon: <AirflowIcon />, color: "#017CEE" },
    { name: "DAX", icon: <PowerBIIcon />, color: "#DD8A00" },
    { name: "Pandas", icon: <PythonIcon />, color: "#150458" },
    { name: "Matplotlib", icon: <PythonIcon />, color: "#11557C" },
  ];

  return (
    <div className="w-full min-h-full flex flex-col items-center p-4 md:p-6 lg:p-8 overflow-visible pb-20">
      {/* Header */}
      <div className="text-center mb-10 shrink-0 relative z-10 mt-2">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gray-900 tracking-tight flex items-baseline justify-center gap-2"
        >
          My
          <div className="relative inline-block">
            <span className="font-designer font-normal text-3xl md:text-4xl lg:text-5xl relative z-10">Skills</span>
            <svg className="absolute w-[110%] -left-[5%] h-[50%] bottom-[8%] -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <motion.path d="M 2 5 S 20 4 50 6 S 98 4 98 5" stroke="#FCDD00" strokeWidth="8" strokeLinecap="round" className="mix-blend-multiply opacity-80" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2 }} />
            </svg>
          </div>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-2 text-gray-500 font-medium max-w-lg mx-auto text-sm tracking-wide">
          Transforming data into <span className="bg-brand/20 px-1.5 py-0.5 rounded-md text-brand-dark font-bold">actionable insights</span> with cutting-edge tools
        </motion.p>
      </div>

      {/* Skills Grid */}
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {skills.map((skill, i) => (
          <SkillCard3D key={i} {...skill} index={i} />
        ))}
      </div>

      {/* Tools Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-[1200px]"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">My Tools</h3>
          <p className="text-sm text-gray-500">My daily arsenal for data excellence</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tools.map((tool, i) => (
            <ToolCard3D key={tool.name} {...tool} delay={i * 0.05} />
          ))}
        </div>
      </motion.div>
    </div>
  );
});

Skills.displayName = 'Skills';

export default Skills;
