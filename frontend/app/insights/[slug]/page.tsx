"use client"

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
    Clock, 
    ChevronLeft, 
    Share2, 
    Quote, 
    ArrowRight,
    Zap,
    TrendingUp
} from 'lucide-react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useApi } from '@/hooks/use-api'
import { getMediaUrl } from '@/lib/utils'
import Link from 'next/link'

export default function InsightDetailPage() {
    const { slug } = useParams()
    const router = useRouter()
    const { data: insight, isLoading } = useApi<any>(slug ? `/insights/${slug}` : null)
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
        )
    }

    if (!insight) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
                    <Button onClick={() => router.push('/insights')}>Back to Intelligence</Button>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            <Navbar />

            {/* Reading Progress Bar */}
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left" style={{ scaleX }} />

            {/* Back Button Overlay */}
            <div className="fixed top-24 left-6 z-50">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => router.push('/insights')}
                    className="gap-2 bg-background/50 backdrop-blur-md border border-border/50 hover:bg-background text-foreground"
                >
                    <ChevronLeft size={16} />
                    Back to Insights
                </Button>
            </div>

            {/* Article Hero */}
            <section className="relative h-[80vh] min-h-[600px] w-full pt-20">
                <div className="absolute inset-0">
                    <img 
                        src={getMediaUrl(insight.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80')} 
                        alt={insight.title}
                        className="w-full h-full object-cover grayscale opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>

                <div className="max-w-[1000px] mx-auto h-full flex flex-col justify-end pb-20 px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Badge className="mb-6 bg-primary text-black font-bold uppercase tracking-widest px-4 py-2">
                            {insight.category || 'Consulting Intelligence'}
                        </Badge>
                        <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-tight tracking-tighter">
                            {insight.title}
                        </h1>
                        <div className="flex items-center gap-8 text-muted-foreground font-bold uppercase tracking-widest text-[11px]">
                            <div className="flex items-center gap-2">
                                <Clock size={14} className="text-primary" />
                                <span>5 Minute Read</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Share2 size={14} className="text-primary cursor-pointer hover:text-white transition-colors" />
                                <span>Share Insight</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Article Body */}
            <article className="py-24 px-6 relative z-10">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-16">
                        {/* Summary Soundbite */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="p-8 md:p-12 bg-secondary/10 border-l-4 border-primary italic relative"
                        >
                            <Quote size={40} className="absolute -top-6 -left-6 text-primary opacity-20" />
                            <p className="text-2xl md:text-3xl text-foreground font-medium leading-relaxed">
                                {insight.overview || "In the luxury short-term rental market, the transaction is just the introduction. Longevity is built on the repeat booking."}
                            </p>
                        </motion.div>

                        {/* Rich Content */}
                        <div 
                            className="prose prose-invert prose-xl max-w-none text-muted-foreground/80 leading-relaxed font-serif"
                            dangerouslySetInnerHTML={{ __html: insight.content || "<p>Detailed strategy content goes here...</p>" }}
                        />

                        {/* Soundbite Highlight 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10">
                            <div className="p-10 bg-primary/5 border border-primary/20 flex flex-col justify-between group cursor-default">
                                <Zap className="text-primary h-8 w-8 mb-6" />
                                <div>
                                    <h4 className="text-white font-bold text-lg mb-2">The Velocity Insight</h4>
                                    <p className="text-sm text-muted-foreground">Properties with a direct booking engine recover 3x faster after algorithm shifts.</p>
                                </div>
                            </div>
                            <div className="p-10 bg-secondary/10 border border-border/50 flex flex-col justify-between group cursor-default">
                                <TrendingUp className="text-primary h-8 w-8 mb-6" />
                                <div>
                                    <h4 className="text-white font-bold text-lg mb-2">The Multiplier Effect</h4>
                                    <p className="text-sm text-muted-foreground">A single repeat guest costs 80% less to acquire than a new one on Airbnb.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Sidebar / CTA */}
                    <aside className="lg:col-span-4 h-fit sticky top-32">
                        <div className="p-8 bg-card border border-border/50 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
                            
                            <h4 className="text-xl font-bold mb-6 relative z-10">Ready to execute?</h4>
                            <p className="text-muted-foreground mb-10 text-sm leading-relaxed relative z-10">
                                Apply these strategies to your rental portfolio with a 1-on-1 Strategy Session.
                            </p>
                            
                            <div className="space-y-4 relative z-10">
                                <Button 
                                    className="w-full h-12 rounded-none font-bold uppercase tracking-widest text-xs bg-primary text-black"
                                    onClick={() => router.push('/packages')}
                                >
                                    Explore Packages
                                </Button>
                                <Button 
                                    variant="outline"
                                    className="w-full h-12 rounded-none font-bold uppercase tracking-widest text-xs border-white/10 hover:bg-white/5"
                                    onClick={() => router.push('/contact')}
                                >
                                    Book Strategy Call
                                </Button>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/5 relative z-10">
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-4">You might also like</p>
                                <ul className="space-y-4">
                                    <li className="group/item">
                                        <Link href="/insights" className="text-sm text-white/50 group-hover/item:text-primary transition-colors flex items-center justify-between">
                                            The Airbnb Direct Strategy
                                            <ArrowRight size={14} className="opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </aside>
                </div>
            </article>

            <Footer />
        </main>
    )
}
