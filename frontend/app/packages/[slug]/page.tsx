"use client"

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
    CheckCircle2, 
    ArrowRight, 
    Zap, 
    ShieldCheck, 
    TrendingUp, 
    CreditCard,
    ChevronDown,
    Play,
    Star
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApi } from '@/hooks/use-api'
import api from '@/lib/api'
import { getMediaUrl } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import Script from 'next/script'

export default function PackageDetailPage() {
    const { slug } = useParams()
    const router = useRouter()
    const { toast } = useToast()
    const { data: service, isLoading, isError: error } = useApi<any>(slug ? `/services/${slug}` : null)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
        )
    }

    if (!service || error) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Package Not Found</h1>
                    <Button onClick={() => router.push('/')}>Return Home</Button>
                </div>
            </div>
        )
    }

    const handlePayment = () => {
        // @ts-ignore
        const handler = window.PaystackPop.setup({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxx',
            email: 'guest@tenaconsultancy.com', // In a real app, use logged in user's email
            amount: (service.price || 0) * 100, // Paystack expects amount in kobo/cents
            currency: 'USD',
            ref: 'TENA_' + Math.floor((Math.random() * 1000000000) + 1), 
            callback: async (response: any) => {
                toast({
                    title: "Payment Successful",
                    description: "Verifying your transaction...",
                })
                
                try {
                    await api.post('/payments/verify', {
                        reference: response.reference,
                        service_id: service.id
                    })
                    toast({
                        title: "Transaction Confirmed",
                        description: "Your package is now active. Redirecting to your portal...",
                    })
                    setTimeout(() => router.push('/portal'), 2000);
                } catch (err) {
                    toast({
                        variant: "destructive",
                        title: "Verification Error",
                        description: "Payment was successful but we couldn't verify it. Please contact support.",
                    })
                }
            },
            onClose: () => {
                toast({
                    title: "Payment Cancelled",
                    description: "You closed the payment window.",
                })
            }
        });
        handler.openIframe();
    }

    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            <Navbar />
            <Script src="https://js.paystack.co/v1/inline.js" strategy="beforeInteractive" />

            {/* Cinematic Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
                {/* Background Media */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
                    <img 
                        src={getMediaUrl(service.image || 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=1600&q=80')} 
                        alt={service.title}
                        className="w-full h-full object-cover scale-105 animate-slow-zoom"
                    />
                </div>

                <div className="max-w-[1400px] mx-auto w-full relative z-30">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Badge className="mb-6 bg-primary text-black font-bold uppercase tracking-widest px-4 py-2 rounded-none">
                                {service.category}
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                                {service.title}
                            </h1>
                            <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-xl">
                                {service.description}
                            </p>

                            <div className="flex flex-wrap gap-6 mb-12">
                                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-3">
                                    <ShieldCheck className="text-primary h-5 w-5" />
                                    <span className="text-white text-sm font-medium">Verified Strategy</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-3">
                                    <TrendingUp className="text-primary h-5 w-5" />
                                    <span className="text-white text-sm font-medium">Conversion Optimized</span>
                                </div>
                            </div>

                            <motion.div 
                                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
                                whileHover={{ scale: 1.02 }}
                            >
                                <Button 
                                    size="lg" 
                                    onClick={handlePayment}
                                    className="h-16 px-10 text-lg uppercase tracking-widest font-bold rounded-none bg-primary hover:bg-primary/90 text-black shadow-2xl shadow-primary/20 flex-1 sm:flex-none"
                                >
                                    Purchase Package — ${service.price || '0.00'}
                                </Button>
                                <Button 
                                    size="lg" 
                                    variant="outline"
                                    className="h-16 px-10 text-lg uppercase tracking-widest font-bold rounded-none border-white/20 text-white hover:bg-white/10 backdrop-blur-md flex-1 sm:flex-none"
                                >
                                    Book Strategy Call
                                </Button>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 100 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="hidden lg:block relative"
                        >
                            <div className="relative aspect-video bg-black/40 backdrop-blur-2xl border border-white/10 p-4 shadow-3xl">
                                <div className="absolute inset-x-0 -bottom-10 flex justify-center">
                                    <div className="bg-primary/10 backdrop-blur-xl border border-primary/20 p-8 flex items-center gap-8 shadow-2xl">
                                        <div className="flex -space-x-3">
                                            {[1,2,3,4].map(i => (
                                                <div key={i} className="w-10 h-10 rounded-full border-2 border-primary/50 bg-secondary" />
                                            ))}
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-lg">150+ Successes</p>
                                            <p className="text-white/50 text-xs uppercase tracking-widest">Active TENA Hosts</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-full border border-white/5 bg-secondary/20 flex items-center justify-center relative overflow-hidden group">
                                    {/* Placeholder for service highlight video */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50" />
                                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center cursor-pointer transition-transform group-hover:scale-110">
                                        <Play className="fill-black text-black ml-1" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <motion.div 
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <ChevronDown className="text-white/50 w-8 h-8" />
                </motion.div>
            </section>

            {/* Detailed Content */}
            <section className="py-32 bg-background relative border-t border-border/10">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                        {/* Summary Column */}
                        <div className="lg:col-span-2 space-y-24">
                            <div>
                                <h3 className="text-3xl font-bold mb-8 flex items-center gap-4">
                                    <span className="w-12 h-1 bg-primary" />
                                    The Core Insight
                                </h3>
                                <div className="prose prose-invert prose-xl max-w-none text-muted-foreground leading-relaxed">
                                    {service.content || "Experience a transformative shift in your Airbnb performance. Our process is designed to eliminate friction and maximize direct-to-host revenue."}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="bg-secondary/10 border border-border/50 p-10">
                                    <Zap className="h-8 w-8 text-primary mb-6" />
                                    <h4 className="text-xl font-bold mb-4 uppercase tracking-widest">Suited For</h4>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {service.suited_for || "Hosts looking to scale beyond single properties and build a sustainable direct-booking brand."}
                                    </p>
                                </div>
                                <div className="bg-secondary/10 border border-border/50 p-10">
                                    <TrendingUp className="h-8 w-8 text-primary mb-6" />
                                    <h4 className="text-xl font-bold mb-4 uppercase tracking-widest">Expected Results</h4>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {service.expected_results || "A 40% increase in repeat guest conversion and complete independence from OTA algorithm changes."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar / CTA Sticky */}
                        <div className="space-y-8">
                            <div className="bg-card border border-border p-8 sticky top-32">
                                <h4 className="text-xl font-bold mb-6">What's Included</h4>
                                <ul className="space-y-4 mb-10">
                                    {(service.includes || ['1-on-1 Strategy Session', 'Market Risk Assessment', 'TENA Integration Support', 'Post-Consultancy Audit']).map((item: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button 
                                    onClick={handlePayment}
                                    className="w-full bg-primary text-black font-bold h-12 uppercase tracking-widest text-xs"
                                >
                                    Proceed to Payment
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
