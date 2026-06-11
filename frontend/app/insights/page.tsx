"use client"

import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Clock, MessageSquare, Quote, Zap } from 'lucide-react'
import Link from 'next/link'
import { useApi } from '@/hooks/use-api'
import { getMediaUrl } from '@/lib/utils'

export default function InsightsPage() {
    const { data: insights, isLoading } = useApi<any[]>('/insights')
    const { scrollY } = useScroll()
    const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.3])
    const headerScale = useTransform(scrollY, [0, 400], [1, 0.9])

    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            <Navbar />

            {/* Cinematic Page Header */}
            <section className="relative pt-40 pb-20 px-6 overflow-hidden">
                <motion.div 
                    className="max-w-[1400px] mx-auto text-center relative z-10"
                    style={{ opacity: headerOpacity, scale: headerScale }}
                >
                    <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2 uppercase tracking-[0.2em] font-bold">
                        The TENA Library
                    </Badge>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20">
                        Insights & <br />Intelligence.
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Quick, professional perspectives on short-term rental mastery. 
                        No fluff. Just the soundbites that drive revenue.
                    </p>
                </motion.div>

                {/* Background decorative elements */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            </section>

            {/* Insights Grid */}
            <section className="pb-32 px-6">
                <div className="max-w-[1400px] mx-auto">
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="aspect-[4/5] bg-secondary/20 animate-pulse rounded-2xl" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {insights?.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group relative"
                                >
                                    <Link href={`/insights/${item.slug}`} className="block h-full">
                                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary/10 border border-border/50 group-hover:border-primary/30 transition-all duration-500">
                                            {/* Article Image */}
                                            <img 
                                                src={getMediaUrl(item.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80')} 
                                                alt={item.title}
                                                className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110"
                                            />
                                            
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />

                                            {/* Content Layer */}
                                            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
                                                        {item.category || 'Consulting'}
                                                    </span>
                                                    <div className="h-px flex-1 bg-primary/20" />
                                                </div>

                                                <h3 className="text-3xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                                                    {item.title}
                                                </h3>

                                                {/* Soundbite Highlight (Repurposing summary) */}
                                                <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mb-6 transition-all duration-500 ease-out">
                                                    <div className="p-4 bg-primary/5 border-l-2 border-primary/50 flex gap-3">
                                                        <Quote size={16} className="text-primary shrink-0 opacity-50" />
                                                        <p className="text-sm italic text-muted-foreground leading-relaxed">
                                                            {item.overview || "Actionable insight on premium hosting strategies."}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                                                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                                        <Clock size={12} />
                                                        <span>5 Min Read</span>
                                                    </div>
                                                    <ArrowRight size={16} className="text-primary -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    )
}
