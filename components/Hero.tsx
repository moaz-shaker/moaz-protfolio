import React, { useEffect, useRef, memo } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { ShimmerButton } from './ShimmerButton';
import { motion } from 'framer-motion';

interface HeroProps {
    onNavigate: (view: string) => void;
    onContactClick: () => void;
}



const PenSVG = memo(() => (
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 40 40"
        className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g fill="none" strokeMiterlimit="10">
            <path
                fill="#fcdd00"
                stroke="#231f20"
                d="M21.29 6.83c-4 4-8.27 9.25-8.67 10.64a2.7 2.7 0 0 0-.34.88c-2.55-.28-5.19.71-7.69 3.22C0 26.15-.32 36.3 1.64 38.27s12.12 1.64 16.7-3c2.51-2.5 3.5-5.14 3.22-7.69a3.1 3.1 0 0 0 .88-.34c1.39-.4 6.67-4.7 10.64-8.67C40.93 10.77 40.8 7 36.87 3S28.53-.41 21.29 6.83Z"
                strokeWidth="1.5"
            />
            <path
                stroke="#231f20"
                strokeLinecap="round"
                d="M15.1 20a14 14 0 0 1 2.67 2.2A13.8 13.8 0 0 1 20 24.87"
                strokeWidth="1.5"
            />
            <path
                fill="#fff"
                stroke="#231f20"
                d="M8.69 28.44a2.78 2.78 0 1 0 5.56 0a2.78 2.78 0 0 0-5.56 0Z"
                strokeWidth="1.5"
            />
            <path
                stroke="#231f20"
                strokeLinecap="round"
                d="m9.5 30.41l-3.93 3.93"
                strokeWidth="1.5"
            />
            <path
                stroke="#fff"
                strokeLinecap="round"
                d="M28.28 5c2.85-2 3.17-1.94 4.6-1.17"
                strokeWidth="1.5"
            />
        </g>
    </svg>
));

PenSVG.displayName = 'PenSVG';

const Hero: React.FC<HeroProps> = memo(({ onNavigate, onContactClick }) => {
    const sketchRef = useRef<SVGPathElement>(null);
    const sparkleRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        // @ts-ignore
        const gsap = window.gsap;
        // @ts-ignore
        const MotionPathPlugin = window.MotionPathPlugin;

        if (gsap && MotionPathPlugin) {
            gsap.registerPlugin(MotionPathPlugin);
        }

        if (gsap && sketchRef.current && sparkleRef.current) {
            const length = sketchRef.current.getTotalLength();

            gsap.set(sketchRef.current, {
                strokeDasharray: length,
                strokeDashoffset: length,
                opacity: 0.7
            });

            gsap.set(sparkleRef.current, {
                opacity: 0,
                scale: 0.8,
                xPercent: -15,
                yPercent: -95
            });

            const tl = gsap.timeline({ delay: 1.5 });

            tl.to(sparkleRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            });

            tl.to(sketchRef.current, {
                strokeDashoffset: 0,
                duration: 1.2,
                ease: "power2.inOut",
            }, "<")
                .to(sparkleRef.current, {
                    motionPath: {
                        path: sketchRef.current,
                        align: sketchRef.current,
                        alignOrigin: [0, 1],
                        offsetX: -5,
                        offsetY: 5
                    },
                    duration: 1.2,
                    ease: "power2.inOut",
                }, "<")
                .to(sparkleRef.current, {
                    x: "+=5",
                    y: "-=5",
                    duration: 0.5,
                    ease: "power2.out"
                });

            return () => {
                tl.kill();
            };
        }
    }, []);

    return (
        <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-center text-center md:text-left relative z-10 min-h-0 h-full gap-8 md:gap-16">
            <div className="flex-1 flex flex-col items-center md:items-start pt-4 md:pt-0">
                <div className="shrink-0 flex flex-col items-center md:items-start relative z-20 mt-2 md:mt-0 mb-6 md:mb-0">
                    <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-black mb-1 leading-[1.1] drop-shadow-sm">
                        <motion.span
                            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="block mb-1 font-display font-bold"
                        >
                            Hi, I'm Moaz.

                        </motion.span>
                        <motion.div
                            initial={{ opacity: 0, filter: 'blur(5px)', y: 15 }}
                            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                            className="text-black pt-2 sm:pt-2"
                        >
                            <span className="font-display font-bold">A Data </span>
                            <span className="relative inline-flex items-center">
                                <span className="relative inline-block px-2">
                                    <svg
                                        className="absolute inset-0 w-[110%] -left-[5%] h-[120%] top-[-10%] -z-10"
                                        viewBox="0 0 150 50"
                                        preserveAspectRatio="none"
                                        fill="none"
                                    >
                                        <path
                                            ref={sketchRef}
                                            d="M15,25 C40,18 75,32 110,22 C130,16 140,25 140,25"
                                            stroke="#8B5CF6"
                                            strokeWidth="20"
                                            strokeLinecap="round"
                                            className="opacity-70"
                                            style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                                        />
                                    </svg>

                                    <span className="font-designer font-normal text-gray-900 relative">
                                        Analyst
                                    </span>

                                    <span
                                        ref={sparkleRef}
                                        className="absolute top-0 left-0 w-8 h-8 md:w-20 md:h-20 pointer-events-none z-20 origin-bottom-left gpu-accelerated"
                                        style={{ opacity: 0 }}
                                    >
                                        <PenSVG />
                                    </span>
                                </span>
                            </span>
                        </motion.div>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                        className="text-gray-500 text-xs sm:text-sm md:text-base max-w-[90%] md:max-w-xl mb-6 mt-4 leading-relaxed font-medium tracking-wide"
                    >
                        I transform data into actionable insights. Specializing in Business Intelligence, ETL Development, Dashboard Creation, and Data Visualization.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row items-center justify-start gap-3 sm:gap-4 w-full max-w-lg mb-0"
                    >
                        <ShimmerButton
                            className="shadow-2xl px-6 py-2.5"
                            onClick={() => onNavigate('Projects')}
                        >
                            <span className="relative z-10 flex items-center gap-2 text-sm font-bold font-sans">
                                <ArrowRight size={16} className="text-white/90 group-hover:translate-x-0.5 transition-transform" />
                                View Projects
                            </span>
                        </ShimmerButton>

                        <div className="relative inline-flex overflow-hidden rounded-full p-[1px]">
                            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#06b6d4_0%,#10b981_33%,#f59e0b_66%,#06b6d4_100%)]" />
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    onContactClick();
                                }}
                                className="relative z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white/90 px-6 py-2.5 text-sm font-bold text-gray-800 backdrop-blur-3xl hover:bg-white transition-all gap-2"
                            >
                                <Mail size={18} className="text-black" />
                                Get In Touch
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Profile Picture */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="relative z-10 w-[280px] sm:w-[320px] md:w-[350px] lg:w-[450px] mt-8 md:mt-0"
            >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <img
                        src="https://www.moaz.solutions/pics/profile-pic.jpeg"
                        alt="Moaz Shaker"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Floating Elements */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 bg-white p-3 rounded-xl shadow-lg border border-gray-100"
                >
                    <div className="text-2xl">📊</div>
                </motion.div>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-8 -left-8 bg-white p-3 rounded-xl shadow-lg border border-gray-100"
                >
                    <div className="text-2xl">💡</div>
                </motion.div>
            </motion.div>
        </main>
    );
});

Hero.displayName = 'Hero';

export default Hero;
