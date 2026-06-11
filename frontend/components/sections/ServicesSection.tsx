"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Phone, Rocket, TrendingUp, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useApi } from '@/hooks/use-api'
import Link from 'next/link'

const packages = [
    {
        id: 1,
        title: 'Strategy Call',
        price: '$100',
        duration: '30 minutes',
        icon: Phone,
        includes: ['Property review', 'Revenue potential insights', 'Key mistakes & opportunities', 'Clear next steps'],
        bestFor: 'Quick clarity before committing',
        video: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    },
    {
        id: 2,
        title: 'Starter Package',
        price: '$250',
        duration: '2 × 45-min sessions',
        icon: Rocket,
        includes: ['Market positioning guidance', 'Basic pricing strategy', 'Launch roadmap'],
        bestFor: 'Beginners getting started',
        video: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80',
    },
    {
        id: 3,
        title: 'Growth Package',
        price: '$1,000',
        duration: '3 × 45-min sessions',
        icon: TrendingUp,
        includes: ['Full listing strategy', 'Pricing & revenue optimization', 'Guest experience design', 'Conversion improvements'],
        bestFor: 'Hosts serious about performance',
        video: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
    },
    {
        id: 4,
        title: 'Premium Launch',
        price: '$1,500',
        duration: '8 × 45-min sessions',
        icon: Crown,
        includes: ['End-to-end Airbnb setup or overhaul', 'Advanced pricing strategy', 'Listing optimization (SEO, positioning)', 'Guest experience & operations system', 'Direct booking & repeat guest strategy', '+ TENA Integration'],
        bestFor: 'Investors, developers & serious operators',
        video: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&q=80',
    }
]

const ServicesSection = () => {
    const { data: settingsByGroup } = useApi('/settings')
    
    const getSetting = (key: string, defaultValue: string) => {
        if (!settingsByGroup) return defaultValue
        const allSettings = Object.values(settingsByGroup).flat() as any[]
        const setting = allSettings.find(s => s.key === key)
        return setting?.value || defaultValue
    }

    const dynamicTitle = getSetting('packages_title', 'Consulting Packages')
    const dynamicSubtitle = getSetting('packages_subtitle', 'Simple, premium, session-based — no retainers')

    const containerRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Map scroll progress to package index
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Divide into 4 equal segments
        const index = Math.min(
            Math.floor(latest * packages.length),
            packages.length - 1
        )
        if (index !== activeIndex && index >= 0) {
            setActiveIndex(index)
        }
    })

    const activePkg = packages[activeIndex]

    return (
        <section
            ref={containerRef}
            id="packages"
            className="w-full bg-background relative"
        >
            <div className="max-w-[1400px] mx-auto px-6 relative z-10 pt-32 pb-40">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24 text-center"
                >
                    <span className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-4 block">
                        {dynamicTitle}
                    </span>
                    <h2 className="text-3xl md:text-5xl max-w-3xl mx-auto font-bold text-foreground leading-tight mb-4 whitespace-pre-line">
                        {dynamicSubtitle}
                    </h2>
                    <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
                </motion.div>

                {/* Mobile Layout (Static Grid) */}
                <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {packages.map((pkg) => {
                        const Icon = pkg.icon
                        return (
                            <div key={pkg.id} className="border border-border bg-card p-8 flex flex-col h-full relative overflow-hidden">
                                <div className="absolute top-6 right-6 text-2xl font-bold text-primary/80">
                                    {pkg.price}
                                </div>
                                <div className="mb-6 w-12 h-12 rounded-sm bg-secondary flex items-center justify-center">
                                    <Icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-foreground">{pkg.title}</h3>
                                <p className="text-sm text-muted-foreground mb-6">{pkg.duration}</p>
                                <ul className="space-y-3 mb-8 flex-1">
                                    {pkg.includes.map((item, i) => (
                                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                            <span className="text-primary text-[10px] mt-0.5">✦</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <Button className="w-full rounded-none font-bold uppercase tracking-wider" asChild>
                                    <Link href="/contact">Book Now</Link>
                                </Button>
                            </div>
                        )
                    })}
                </div>

                {/* Desktop Layout (Sticky Scroll) */}
                <div className="hidden lg:grid grid-cols-5 gap-20 items-start">
                    {/* Left: Scroll areas for each package */}
                    <div className="col-span-2">
                        {packages.map((pkg, idx) => {
                            const Icon = pkg.icon
                            const isActive = activeIndex === idx
                            return (
                                <div key={pkg.id} className="h-screen flex flex-col justify-center">
                                    <motion.div
                                        animate={{
                                            opacity: isActive ? 1 : 0.2,
                                            scale: isActive ? 1 : 0.95,
                                            x: isActive ? 0 : -20
                                        }}
                                        transition={{ duration: 0.5 }}
                                        className={`p-10 border-l-4 transition-all ${
                                            isActive ? 'border-primary bg-primary/5' : 'border-border/30 bg-transparent'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`w-12 h-12 flex items-center justify-center rounded-sm ${isActive ? 'bg-primary text-black' : 'bg-secondary text-muted-foreground'}`}>
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className={`text-2xl font-bold transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                                                    {pkg.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">{pkg.duration}</p>
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground mb-8 text-lg font-medium">
                                            Target Outcome: <span className="text-foreground">{pkg.bestFor}</span>
                                        </p>
                                        <div className="text-4xl font-bold dark:text-[#f6f2d9] text-[#d0c043] mb-8">
                                            {pkg.price}
                                        </div>
                                        <Button 
                                            size="lg" 
                                            variant={isActive ? "default" : "outline"}
                                            className="rounded-none font-bold uppercase tracking-widest px-10"
                                            asChild
                                        >
                                            <Link href="/contact">Select Package</Link>
                                        </Button>
                                    </motion.div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Right: Sticky Panel */}
                    <div className="col-span-3 sticky top-40 h-[650px]">
                        <div className="relative w-full h-full rounded-sm border border-border/50 bg-card overflow-hidden">
                            {/* Persistent Background (Transitions inside) */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`bg-${activeIndex}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="absolute inset-0 z-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${activePkg.video})` }}
                                />
                            </AnimatePresence>
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 z-[1]" />

                            {/* Content Panel */}
                            <div className="relative h-full flex flex-col justify-end p-12 z-10">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`content-${activeIndex}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <span className="text-primary font-bold text-sm uppercase tracking-[0.3em] mb-4 block">
                                            {activePkg.duration}
                                        </span>
                                        <h3 className="text-5xl font-bold text-white mb-4 leading-tight">
                                            {activePkg.title}
                                        </h3>
                                        <div className="text-primary text-6xl font-bold mb-10">
                                            {activePkg.price}
                                        </div>

                                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                            {activePkg.includes.map((item, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.3 + i * 0.05 }}
                                                    className="text-white/70 text-sm flex items-start gap-3"
                                                >
                                                    <span className="text-primary mt-1 text-xs">✦</span>
                                                    <span>{item}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                        
                                        <div className="mt-12 pt-8 border-t border-white/10">
                                            <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-3">Best For</p>
                                            <p className="text-white/90 text-xl italic leading-relaxed">
                                                "{activePkg.bestFor}"
                                            </p>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Scroll Progress Indicator for Desktop */}
            <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 h-64 w-[2px] bg-border/20 z-20">
                <motion.div 
                    className="w-full bg-primary"
                    style={{ height: useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { stiffness: 100, damping: 30 }) }}
                />
            </div>
        </section>
    )
}

export default ServicesSection
