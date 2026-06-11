"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useApi } from '@/hooks/use-api'

const caseStudies = [
    {
        id: 1, 
        title: 'What Happens After Consulting?', 
        client_name: 'The Transition', 
        significant_figure: 'Next Steps',
        problem: 'Most consultants stop at setup, leaving you dependent on their ongoing help or leaving you to figure out retention yourself.',
        outcome: 'You transition into using TENA to capture guest data, build relationships, and drive repeat bookings. No ongoing consulting required.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80', 
        slug: '#'
    },
    {
        id: 2, 
        title: 'Why This Model Works', 
        client_name: 'The Model', 
        significant_figure: 'proven system',
        problem: 'Top consultants globally use paid strategy calls and tiered packages, but they stop at the setup phase. You still rely fully on OTA algorithms.',
        outcome: 'We go further by enabling repeat revenue. We help you build a system that guarantees your guests return to book directly.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80', 
        slug: '#'
    },
    {
        id: 3, 
        title: 'Our Philosophy', 
        client_name: 'The Philosophy', 
        significant_figure: 'Core Belief',
        problem: 'Many hosts believe getting more bookings is the goal. But dependency on Airbnbs algorithm destroys potential profit margins.',
        outcome: '"Don\'t just get bookings. Build a repeat guest machine." Build long term asset value with your very own guest book.',
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80', 
        slug: '#'
    },
    {
        id: 4, 
        title: 'Who This Is For', 
        client_name: 'Your Profile', 
        significant_figure: 'Target Audience',
        problem: 'Hosts stuck below potential, first-time hosts making crucial setup errors, and developers launching new units without a clear strategy.',
        outcome: 'Designed for First-time Airbnb hosts, Property investors, Developers launching units, and Hosts looking to scale repeat revenue.',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1e53841a1a?w=900&q=80', 
        slug: '#'
    }
]

interface AdvantageContentProps {
    dynamicTitle: string
    dynamicSubtitle: string
}

const AdvantageContent = ({ dynamicTitle, dynamicSubtitle }: AdvantageContentProps) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const { scrollYProgress } = useScroll({
        target: contentRef,
        offset: ["start start", "end end"]
    })

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const index = Math.min(
            Math.floor(latest * caseStudies.length),
            caseStudies.length - 1
        )
        if (index !== activeIndex && index >= 0) {
            setActiveIndex(index)
        }
    })

    const activeItem = caseStudies[activeIndex]

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full h-full pb-40"
        >
            {/* Header Row */}
            <div className="max-w-[1400px] mx-auto px-6 pt-32 pb-8 sticky top-0 bg-secondary/20 z-20 backdrop-blur-sm border-b border-border/10">
                <div>
                    <span className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-2 block">
                        {dynamicTitle}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                        {dynamicSubtitle}
                    </h2>
                </div>
            </div>

            {/* Scroll Content wrapper */}
            <div ref={contentRef} className="max-w-[1400px] mx-auto px-6 relative mt-16">
                
                {/* Mobile Layout (Static Grid) */}
                <div className="lg:hidden flex flex-col gap-10">
                    {caseStudies.map((cs) => (
                        <div key={cs.id} className="bg-card border-l-4 border-primary p-10 flex flex-col">
                            <div className="relative aspect-video mb-8 overflow-hidden">
                                <Image
                                    src={cs.image}
                                    alt={cs.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="text-white text-xs font-bold uppercase tracking-widest bg-primary px-3 py-1">
                                        {cs.client_name}
                                    </span>
                                </div>
                            </div>
                            <span className="text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
                                {cs.significant_figure}
                            </span>
                            <h3 className="text-2xl font-bold leading-tight text-foreground mb-4">
                                {cs.title}
                            </h3>
                            <div className="mb-8">
                                <span className="text-red-400 font-bold text-xs uppercase tracking-widest block mb-2">The Challenge</span>
                                <p className="text-sm text-muted-foreground leading-relaxed italic">
                                    "{cs.problem}"
                                </p>
                            </div>
                            <div className="bg-primary/5 border border-primary/20 p-8 mb-8">
                                <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-4 border-l-2 border-primary/50 pl-4">The Solution</span>
                                <p className="text-2xl text-foreground font-semibold leading-relaxed italic">
                                    "{cs.outcome}"
                                </p>
                            </div>
                            <Button className="w-full rounded-none font-bold uppercase tracking-widest py-6" asChild>
                                <Link href="/contact">Learn More</Link>
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Desktop Layout (Sticky Scroll) */}
                <div className="hidden lg:grid grid-cols-12 gap-10 items-start">
                    
                    {/* Scroll Progress Indicator */}
                    <div className="hidden lg:block absolute left-8 top-[30vh] h-[40vh] w-[2px] bg-border/20 z-20">
                        <motion.div 
                            className="w-full bg-primary"
                            style={{ height: useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { stiffness: 100, damping: 30 }) }}
                        />
                    </div>

                    {/* Left Column: Scroll Sequence */}
                    <div className="col-span-5 pl-12 pr-6">
                        {caseStudies.map((cs, idx) => {
                            const isActive = activeIndex === idx
                            return (
                                <div key={cs.id} className="h-screen flex flex-col justify-center">
                                    <motion.div
                                        animate={{
                                            opacity: isActive ? 1 : 0.2,
                                            scale: isActive ? 1 : 0.95,
                                            x: isActive ? 0 : -20
                                        }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className={`w-full text-left p-10 border-l-4 transition-all relative overflow-hidden flex flex-col justify-center ${
                                            isActive
                                                ? 'border-primary bg-primary/5 shadow-2xl shadow-primary/5'
                                                : 'border-border/30 bg-transparent'
                                        }`}
                                    >
                                        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-4 transition-colors ${
                                            isActive ? 'text-primary' : 'text-muted-foreground'
                                        }`}>
                                            {cs.significant_figure}
                                        </span>
                                        <h3 className={`text-2xl font-bold leading-tight mb-6 transition-colors ${
                                            isActive ? 'text-foreground' : 'text-muted-foreground'
                                        }`}>
                                            {cs.title}
                                        </h3>
                                        
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <span className="text-red-400 font-bold text-xs uppercase tracking-widest block mb-2 mt-4">The Challenge</span>
                                                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                                                        "{cs.problem}"
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Right Column: Sticky Detail View */}
                    <div className="col-span-7 sticky top-52 h-[calc(100vh-220px)] min-h-[500px] max-h-[600px]">
                        <div className="relative w-full h-full bg-card border border-border/50 shadow-2xl overflow-hidden group">
                            {/* Background Image Layer */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`bg-img-${activeIndex}`}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="absolute inset-0 z-0"
                                >
                                    <Image
                                        src={activeItem.image}
                                        alt={activeItem.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    {/* Multi-layered Overlay for Depth and Legibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 z-10" />
                                    <div className="absolute inset-0 bg-black/30 z-10" />
                                </motion.div>
                            </AnimatePresence>

                            {/* Content Layer */}
                            <div className="relative h-full flex flex-col justify-end p-10 z-20">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`content-${activeIndex}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-full"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="mb-4"
                                        >
                                            <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em] bg-primary px-3 py-1.5 inline-block">
                                                {activeItem.client_name}
                                            </span>
                                        </motion.div>

                                        <div className="mb-8 max-w-xl">
                                            <span className="text-primary font-bold text-[10px] uppercase tracking-widest block mb-4 border-l-2 border-primary/50 pl-4">The Solution</span>
                                            <h3 className="text-xl md:text-2xl font-bold text-white leading-relaxed italic">
                                                "{activeItem.outcome}"
                                            </h3>
                                        </div>

                                        <div className="pt-2">
                                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-none px-4 font-bold uppercase tracking-wider text-xs border-none group/btn" asChild>
                                                <Link href="/contact">
                                                    Learn More <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const CaseStudiesPreview = () => {
    const { data: settingsByGroup } = useApi('/settings')
    
    const getSetting = (key: string, defaultValue: string) => {
        if (!settingsByGroup) return defaultValue
        const allSettings = Object.values(settingsByGroup).flat() as any[]
        const setting = allSettings.find(s => s.key === key)
        return setting?.value || defaultValue
    }

    const dynamicTitle = getSetting('advantage_title', 'The TENA Advantage')
    const dynamicSubtitle = getSetting('advantage_subtitle', 'Beyond the Booking.')

    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
    const [showContent, setShowContent] = useState(false)
    const [typedText, setTypedText] = useState('')

    const fullText = 'Tena..na Tena...na Tena'

    // Typing animation triggered on visibility
    useEffect(() => {
        if (!isInView) return

        let charIndex = 0
        const typingInterval = setInterval(() => {
            if (charIndex <= fullText.length) {
                setTypedText(fullText.slice(0, charIndex))
                charIndex++
            } else {
                clearInterval(typingInterval)
            }
        }, 60)

        // Reveal content after delay
        const revealTimer = setTimeout(() => {
            setShowContent(true)
        }, 2200)

        return () => {
            clearInterval(typingInterval)
            clearTimeout(revealTimer)
        }
    }, [isInView])

    return (
        <section id="advantage" ref={sectionRef} className="w-full relative bg-secondary/20 min-h-[900px] flex flex-col items-center justify-center">
            {/* Intro animation layer */}
            <AnimatePresence>
                {!showContent && (
                    <motion.div
                        key="intro"
                        initial={{ x: '-50%', opacity: 0 }}
                        animate={isInView ? { x: '0%', opacity: 1 } : { x: '-50%', opacity: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} 
                        className="absolute inset-x-0 inset-y-0 flex items-center justify-center z-20 pointer-events-none"
                    >
                        <h2 className="text-4xl md:text-7xl font-bold text-foreground tracking-tight px-10 text-center">
                            {typedText}
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                                className="text-primary"
                            >
                                |
                            </motion.span>
                        </h2>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main content layer */}
            <AnimatePresence>
                {showContent && (
                    <AdvantageContent 
                        dynamicTitle={dynamicTitle}
                        dynamicSubtitle={dynamicSubtitle}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}

export default CaseStudiesPreview
