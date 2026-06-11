"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Star, TrendingUp, Calendar, Users } from 'lucide-react'

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true })
    const [count, setCount] = useState(0)

    const numericValue = parseInt(target.replace(/[^0-9]/g, ''), 10)

    useEffect(() => {
        if (!isInView || isNaN(numericValue)) return
        let start = 0
        const step = Math.max(1, Math.floor(numericValue / 60))
        const timer = setInterval(() => {
            start += step
            if (start >= numericValue) {
                setCount(numericValue)
                clearInterval(timer)
            } else {
                setCount(start)
            }
        }, 25)
        return () => clearInterval(timer)
    }, [isInView, numericValue])

    const prefix = target.match(/^[^0-9]*/)?.[0] || ''
    const originalSuffix = target.match(/[^0-9]*$/)?.[0] || suffix

    return (
        <span ref={ref}>
            {prefix}{isInView ? count.toLocaleString() : '0'}{originalSuffix}
        </span>
    )
}

import { useApi } from '@/hooks/use-api'

const StatsSection = () => {
    const { data: settingsByGroup } = useApi('/settings')
    
    const getSetting = (key: string, defaultValue: string) => {
        if (!settingsByGroup) return defaultValue
        const allSettings = Object.values(settingsByGroup).flat() as any[]
        const setting = allSettings.find(s => s.key === key)
        return setting?.value || defaultValue
    }

    const { scrollY } = useScroll()
    const backgroundY = useTransform(scrollY, [0, 3000], [0, -80])

    const sectionTagline = getSetting('stats_title', 'Our Track Record')
    const sectionTitle = 'We don\'t teach theory — we operate real units.'
    const sectionImage = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1920&q=80'

    const stats = [
        { id: 1, value: "800+", label: "Five-Star Reviews", description: "Consistently highly-rated guest experiences.", icon: Star },
        { id: 2, value: "90%+", label: "Average Occupancy", description: "Maximizing yield year-round across our units.", icon: TrendingUp },
        { id: 3, value: "30-Day", label: "Average Lead Time", description: "Securing bookings well in advance for stability.", icon: Calendar },
        { id: 4, value: "1,000+", label: "Guest Stays Hosted", description: "Vast operational experience with real guests.", icon: Users }
    ]

    return (
        <section id="stats" className="w-full relative overflow-hidden">
            {/* Parallax Background Image */}
            <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
                <Image
                    src={sectionImage}
                    alt="Airbnb interior"
                    fill
                    sizes="100vw"
                    className="object-cover scale-110"
                />
            </motion.div>
            <div className="absolute top-0 left-0 w-full h-full bg-background/85 z-[1]" />

            <div className="max-w-[1400px] mx-auto px-6 py-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <span className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-4 block">
                        {sectionTagline}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        {sectionTitle}
                    </h2>
                    <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15 }}
                                className="text-center p-8 md:p-10 border-r border-border/50 last:border-r-0 relative group"
                            >
                                {/* Hover glow */}
                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-500" />

                                <div className="relative z-10">
                                    {/* Icon with hover fill animation */}
                                    <div className="flex justify-center mb-6">
                                        <Icon 
                                            className="h-10 w-10 text-primary transition-all duration-300 group-hover:fill-primary" 
                                            strokeWidth={1.5}
                                        />
                                    </div>

                                    <div className="text-primary font-bold text-5xl md:text-6xl mb-4 tracking-tight">
                                        <AnimatedCounter target={stat.value} />
                                    </div>
                                    <div className="w-8 h-[2px] bg-primary/40 mx-auto mb-4 transition-all duration-500 group-hover:w-16" />
                                    <div className="text-foreground text-sm font-bold uppercase tracking-[0.2em] mb-3">
                                        {stat.label}
                                    </div>
                                    <div className="text-muted-foreground text-sm max-w-[200px] mx-auto leading-relaxed">
                                        {stat.description}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}


export default StatsSection
