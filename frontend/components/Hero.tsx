"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useApi } from '@/hooks/use-api'

const Hero = () => {
    const { data: settingsByGroup } = useApi('/settings')
    
    const getSetting = (key: string, defaultValue: string) => {
        if (!settingsByGroup) return defaultValue
        const allSettings = Object.values(settingsByGroup).flat() as any[]
        const setting = allSettings.find(s => s.key === key)
        return setting?.value || defaultValue
    }

    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 800], [0, 200])
    const opacity = useTransform(scrollY, [0, 600], [1, 0])
    const scale = useTransform(scrollY, [0, 600], [1, 1.1])

    const tagline = 'TENA | Airbnb Consultancy for Repeat Bookings & Guest Retention'
    const dynamicTitle = getSetting('hero_title', 'The system for Airbnb hosts prioritizing direct bookings.')
    const dynamicSubtitle = getSetting('hero_subtitle', 'We help you launch and optimize your Airbnb — then plug you into TENA to drive repeat bookings, direct revenue, and long-term profitability.')
    const dynamicCtaText = getSetting('hero_cta_text', 'Book Strategy Call')

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Full-screen Background with Parallax + Zoom on Scroll */}
            <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
                <div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1920&q=80)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.1)_0%,transparent_70%)]" />
            </motion.div>


            {/* Dot Grid */}
            <div className="absolute inset-0 z-[1] opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                    backgroundSize: '60px 60px',
                }} />

            {/* Content */}
            <motion.div className="container relative z-10 mx-auto px-6 pt-32 pb-20" style={{ opacity }}>
                <div className="max-w-5xl mx-auto text-center">
                    {/* Pill Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 bg-foreground/10 backdrop-blur-md border border-foreground/20 rounded-full px-6 py-2 mb-10"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-foreground/80 text-sm font-medium">{tagline}</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-[4.5rem] font-bold tracking-tight mb-8 leading-[1.05] text-foreground"
                    >
                        {dynamicTitle}
                    </motion.h1>

                    {/* Divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="w-32 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"
                    />

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-xl md:text-2xl text-foreground/60 mb-14 font-medium max-w-3xl mx-auto leading-relaxed whitespace-pre-line"
                    >
                        {dynamicSubtitle}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-5"
                    >
                        <Button
                            size="lg"
                            className="h-14 px-10 text-base font-bold rounded-none bg-primary hover:bg-primary/90 text-white border-none transition-all hover:scale-[1.03] active:scale-[0.98] group shadow-xl shadow-primary/20"
                            asChild
                        >
                            <Link href="/contact">
                                {dynamicCtaText}
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="h-14 px-10 text-base font-bold rounded-none border-foreground/20 text-foreground hover:bg-foreground/10 backdrop-blur-sm transition-all group"
                            asChild
                        >
                            <Link href="#packages">
                                See Packages
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                        className="mt-20"
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className="text-foreground/30 text-xs uppercase tracking-widest">Scroll to explore</span>
                            <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center pt-2">
                                <motion.div
                                    animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-1.5 h-1.5 bg-primary rounded-full"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}

export default Hero
