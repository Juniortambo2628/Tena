"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useApi } from '@/hooks/use-api'

const ValueProposition = () => {
    const { data: settingsByGroup } = useApi('/settings')
    
    const getSetting = (key: string, defaultValue: string) => {
        if (!settingsByGroup) return defaultValue
        const allSettings = Object.values(settingsByGroup).flat() as any[]
        const setting = allSettings.find(s => s.key === key)
        return setting?.value || defaultValue
    }

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const { scrollY } = useScroll()
    const sectionScale = useTransform(scrollY, [200, 900], [0.95, 1])
    const sectionOpacity = useTransform(scrollY, [200, 600], [0.7, 1])

    const tagline = getSetting('process_subtitle', 'What Makes TENA Different')
    const title = getSetting('process_title', "We don't just help you get bookings.\nWe help you keep your guests.")
    const subtitle = Object.keys(settingsByGroup || {}).length ? 'Our approach focuses on launching your Airbnb, building a high-performing listing, and setting up a system for repeat bookings through TENA.' : 'Our approach focuses on launching your Airbnb, building a high-performing listing, and setting up a system for repeat bookings through TENA.'
    // Note: To make subtitle fully dynamic we could add another seed, but for now we'll stick to typical text.

    const { data: dynamicPillars } = useApi<any[]>('/pillars')

    const pillars = dynamicPillars?.length ? dynamicPillars.map((p, i) => ({
        title: p.title,
        description: p.content,
        image: p.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80',
        href: `/packages`, // Link to package overview or relevant category
        stats: `Step ${i + 1}`,
        tag: 'Our Approach',
    })) : [
        {
            title: 'Capacity Building',
            description: 'Laying the foundation for short-term rental excellence.',
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80',
            href: '#packages',
            stats: 'Step 1',
            tag: 'Our Approach',
        },
        {
            title: 'Market Entry & Support',
            description: 'Strategic launch and listing optimization.',
            image: 'https://images.unsplash.com/photo-1502672260266-1c1e53841a1a?w=900&q=80',
            href: '#packages',
            stats: 'Step 2',
            tag: 'Our Approach',
        },
        {
            title: 'Growth & Optimization',
            description: 'Scaling direct bookings and guest loyalty.',
            image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=900&q=80',
            href: '#packages',
            stats: 'Step 3',
            tag: 'Our Approach',
        },
    ]


    return (
        <motion.section className="w-full py-0 bg-background relative overflow-hidden" style={{ scale: sectionScale, opacity: sectionOpacity }}>
            {/* Section Header */}
            <div className="max-w-[1400px] mx-auto px-6 pt-24 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row items-end justify-between gap-6"
                >
                    <div>
                        <span className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-4 block">
                            {tagline}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground whitespace-pre-line">
                            {title}
                        </h2>
                    </div>
                    <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
                        {subtitle}
                    </p>
                </motion.div>
            </div>

            {/* Full-Width Image Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 min-h-[600px]">
                {pillars.map((pillar, index) => (
                    <motion.div
                        key={pillar.title}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.15 }}
                        className="relative group cursor-pointer overflow-hidden"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <Link href={pillar.href} className="block relative h-full min-h-[500px] md:min-h-[600px]">
                            {/* Background Image */}
                            <Image
                                src={pillar.image}
                                alt={pillar.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 transition-all duration-500" />
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-500" />

                            {/* Tag */}
                            <div className="absolute top-6 left-6 z-10">
                                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-2">
                                    {pillar.tag}
                                </span>
                            </div>

                            {/* Content - Pinned Bottom */}
                            <div className="absolute inset-x-0 bottom-0 p-8 z-10">
                                {/* Stats Pill */}
                                <motion.span
                                    className="inline-block text-primary text-xs font-bold uppercase tracking-widest mb-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                                >
                                    {pillar.stats}
                                </motion.span>

                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 transition-transform duration-300 group-hover:-translate-y-1">
                                    {pillar.title}
                                </h3>

                                {/* Description - reveals on hover */}
                                <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500 ease-out">
                                    <p className="text-white/70 leading-relaxed mb-6">
                                        {pillar.description}
                                    </p>
                                </div>

                                {/* CTA */}
                                <span className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-3 group-hover:text-primary transition-colors">
                                    See Packages
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                                </span>

                                {/* Bottom Accent Line */}
                                <div className="w-0 group-hover:w-full h-[2px] bg-primary mt-6 transition-all duration-700" />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    )
}

export default ValueProposition
