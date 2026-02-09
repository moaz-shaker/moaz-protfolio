import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  link: string;
  tags: string[];
  image: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Online Superstore Dashboard",
    category: "Tableau",
    description: "Comprehensive performance overview of sales, profits, and customer behavior with YoY comparisons.",
    link: "https://github.com/moaz-shaker/Sales-Analysis-Dashboard-Tableau",
    tags: ["Tableau", "Sales", "KPIs"],
    image: "https://www.moaz.solutions/pics/projects/super%20store/Executive%20Summary(Home).webp",
    color: "#E97627"
  },
  {
    id: 2,
    title: "Data Modeling & BI Cleaning",
    category: "Data Engineering",
    description: "Star and snowflake schema design for computer workstations sales data with BI-optimized cleaning.",
    link: "https://github.com/moaz-shaker/Data-Modeling/blob/main/Data%20Modeling%20Project.ipynb",
    tags: ["Data Modeling", "SQL", "ETL"],
    image: "https://www.moaz.solutions/pics/projects/ERD/ERD.webp",
    color: "#3B82F6"
  },
  {
    id: 3,
    title: "Hotel Booking Analysis",
    category: "Tableau",
    description: "Visual report on booking trends, revenue, guest preferences, and cancellation patterns.",
    link: "https://public.tableau.com/views/HotelBookingAnalysisDashboard_16767863403260/Home",
    tags: ["Tableau", "Hospitality", "Analysis"],
    image: "https://www.moaz.solutions/pics/projects/hotel%20booking/Hotel-Reservation-Analysis_Home_.webp",
    color: "#8B5CF6"
  },
  {
    id: 4,
    title: "Travel Insurance Marketing",
    category: "Data Analysis",
    description: "Budget optimization analysis for a travel insurance company to reduce marketing costs.",
    link: "https://github.com/moaz-shaker",
    tags: ["Marketing", "Optimization", "ROI"],
    image: "https://www.moaz.solutions/pics/projects/travel/travel%20home.webp",
    color: "#10B981"
  },
  {
    id: 5,
    title: "Product Survey Analysis",
    category: "Analytics",
    description: "Analysis of product survey responses with multiple visualization versions (Diverging, Stacked Bar).",
    link: "https://github.com/moaz-shaker",
    tags: ["Survey", "Visualization", "Insights"],
    image: "https://www.moaz.solutions/pics/projects/survey/Diverging%20version(Home)%20coursel.webp",
    color: "#F59E0B"
  },
  {
    id: 6,
    title: "ER Admission Dashboard",
    category: "Tableau",
    description: "Healthcare analytics helping professionals analyze emergency room admission trends.",
    link: "https://public.tableau.com/app/profile/ahmed.shehata.ali/viz/EmergencyRoomAdmissionDashboard/Home",
    tags: ["Tableau", "Healthcare", "Trends"],
    image: "https://www.moaz.solutions/pics/projects/ER%20admission/Home-copy.webp",
    color: "#EF4444"
  },
  {
    id: 7,
    title: "Video Game Sales (SQL)",
    category: "SQL",
    description: "SQL-based analysis of video game sales data to uncover market trends and top performers.",
    link: "https://github.com/moaz-shaker",
    tags: ["SQL", "Gaming", "Sales"],
    image: "https://www.moaz.solutions/pics/projects/golden%20games/golden-game.webp",
    color: "#6366F1"
  },
  {
    id: 8,
    title: "Las Vegas Hotels Reviews",
    category: "Python",
    description: "Detailed sentiment analysis and review exploration of Las Vegas hotels using Python.",
    link: "https://github.com/moaz-shaker",
    tags: ["Python", "NLP", "Reviews"],
    image: "https://www.moaz.solutions/pics/projects/Las-vegas-hotels/Las-vegas-hotels.webp",
    color: "#EC4899"
  },
  {
    id: 9,
    title: "Sports Retail Revenue (SQL)",
    category: "SQL",
    description: "Optimizing online sports retail revenue through data analysis and SQL querying.",
    link: "https://github.com/moaz-shaker",
    tags: ["SQL", "Retail", "Revenue"],
    image: "https://www.moaz.solutions/pics/projects/online-sport/online-sports-retail.webp",
    color: "#14B8A6"
  }
];

// 3D Project Card
const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1000px' }}
      className="h-full"
    >
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex flex-col h-full bg-white rounded-3xl overflow-hidden border cursor-pointer"
        animate={{
          rotateY: isHovered ? 2 : 0,
          rotateX: isHovered ? -2 : 0,
          scale: isHovered ? 1.02 : 1,
          borderColor: isHovered ? `${project.color}60` : '#f3f4f6',
          boxShadow: isHovered
            ? `0 30px 60px -15px ${project.color}30, 0 15px 30px -15px rgba(0,0,0,0.1)`
            : '0 8px 30px -10px rgba(0,0,0,0.05)'
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Image */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
            loading="lazy"
          />

          {/* Overlay gradient */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: `linear-gradient(180deg, transparent 50%, ${project.color}50 100%)` }}
          />

          {/* Category badge */}
          <motion.div
            className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-sm"
            style={{ background: `${project.color}ee` }}
            animate={{ y: isHovered ? 0 : -5, opacity: isHovered ? 1 : 0.9 }}
          >
            {project.category}
          </motion.div>

          {/* View Project overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center"
              >
                <div className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-xl transform transition-transform hover:scale-105">
                  <ExternalLink size={16} />
                  View Project
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-5 text-left">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{project.title}</h3>
          <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2 flex-grow">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-gray-100">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-md"
                style={{
                  background: `${project.color}10`,
                  color: project.color
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
});
ProjectCard.displayName = 'ProjectCard';

const Works: React.FC = memo(() => {
  return (
    <div className="w-full min-h-full flex flex-col items-center p-4 md:p-6 pb-20 overflow-visible">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center shrink-0 relative z-10 mt-2 mb-8 md:mb-10"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gray-900 tracking-tight flex items-baseline justify-center gap-2">
          My
          <div className="relative inline-block">
            <span className="font-designer font-normal text-3xl md:text-4xl lg:text-5xl relative z-10">Projects</span>
            <svg
              className="absolute w-[120%] -left-[10%] h-[40%] bottom-[10%] -z-10"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              <motion.path
                d="M 2 5 Q 50 10 98 5"
                fill="none"
                stroke="#FCDD00"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mix-blend-multiply opacity-80"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </svg>
          </div>
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-2 text-gray-500 font-medium max-w-lg mx-auto text-xs md:text-sm tracking-wide"
        >
          Results-driven projects showcasing data analytics and BI expertise.
        </motion.p>
      </motion.div>

      {/* Projects Grid */}
      <div className="w-full max-w-[1400px] flex-1 min-h-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* GitHub Link */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="shrink-0 pt-10 pb-6"
      >
        <a
          href="https://github.com/moaz-shaker"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-900 text-sm font-bold border-b-2 border-gray-900 hover:text-blue-600 hover:border-blue-600 transition-colors pb-0.5"
        >
          <Github size={18} />
          View More on Github
        </a>
      </motion.div>
    </div>
  );
});

Works.displayName = 'Works';

export default Works;