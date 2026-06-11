"use client"

import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VideoHero from '@/components/VideoHero'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { useApi } from '@/hooks/use-api'
import api from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

export default function ContactPage() {
    const { data: settingsByGroup } = useApi('/settings')
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Helper to get setting value
    const getSetting = (key: string, defaultValue: string) => {
        if (!settingsByGroup) return defaultValue
        const allSettings = Object.values(settingsByGroup).flat() as any[]
        const setting = allSettings.find(s => s.key === key)
        return setting?.value || defaultValue
    }

    const contactEmail = getSetting('contact_email', 'advisory@nissi-insights.com')
    const contactPhone = getSetting('contact_phone', '+44 (0) 20 7123 4567')
    const contactAddress = getSetting('contact_address', 'Level 32, One Canada Square\nCanary Wharf, London, E14 5AB')
    const mapUrl = getSetting('contact_map_url', 'https://www.google.com/maps/embed?...')

    const heroMedia = getSetting('hero_contact_media', 'https://cdn.pixabay.com/video/2019/02/10/21262-316279619_large.mp4')

    return (
        <main className="flex min-h-screen flex-col bg-background">
            <Navbar />

            <VideoHero
                tagline="Get in Touch"
                title="Ready to build a <br />repeat guest machine?"
                subtitle="Whether you're booking a strategy call or have a specific inquiry, our team is ready to connect you with the right expertise."
                videoSrc={heroMedia.endsWith('.mp4') ? heroMedia : undefined}
                bgImage={!heroMedia.endsWith('.mp4') ? heroMedia : undefined}
            />

            <section className="py-24 bg-background relative overflow-hidden">
                {/* Background flare */}
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-foreground mb-8">Contact Information</h2>
                            <p className="text-muted-foreground mb-12 leading-relaxed max-w-md">
                                Fill out the form to request a strategy call or consulting package. We aim to respond to all inquiries within 24 hours.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/5 flex items-center justify-center rounded-none border border-primary/20 shrink-0">
                                        <Mail className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground mb-1">Email Us</h4>
                                        <p className="text-muted-foreground">{contactEmail}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/5 flex items-center justify-center rounded-none border border-primary/20 shrink-0">
                                        <Phone className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground mb-1">Call Us</h4>
                                        <p className="text-muted-foreground">{contactPhone}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/5 flex items-center justify-center rounded-none border border-primary/20 shrink-0">
                                        <MapPin className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground mb-1">Headquarters</h4>
                                        <p className="text-muted-foreground whitespace-pre-line">{contactAddress}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 p-8 bg-card border border-border/50 italic text-muted-foreground flex items-start gap-4">
                                <MessageSquare className="h-6 w-6 text-primary shrink-0 opacity-50" />
                                <p>"TENA removed our dependence on OTA algorithms and helped us achieve 40% direct bookings within 3 months."</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-card border border-border/50 p-8 md:p-12 shadow-2xl rounded-sm relative"
                        >
                            <div className="mb-10">
                                <h2 className="text-3xl font-bold text-foreground mb-4">Send a Message</h2>
                                <p className="text-muted-foreground">Please provide your details and select your desired package.</p>
                            </div>

                            <form 
                                className="space-y-8 relative z-10"
                                onSubmit={async (e) => {
                                    e.preventDefault()
                                    const form = e.target as HTMLFormElement
                                    const formData = new FormData(form)
                                    const data = {
                                        first_name: formData.get('first_name'),
                                        last_name: formData.get('last_name'),
                                        email: formData.get('email'),
                                        subject: formData.get('subject'),
                                        message: formData.get('message'),
                                    }

                                    try {
                                        setIsSubmitting(true)
                                        await api.post('/consultation-requests', data)
                                        toast({
                                            title: "Submission Received",
                                            description: "Your inquiry has been successfully sent. We will contact you shortly.",
                                        })
                                        form.reset()
                                    } catch (err: any) {
                                        toast({
                                            variant: "destructive",
                                            title: "Submission Failed",
                                            description: err.response?.data?.message || "Something went wrong. Please try again.",
                                        })
                                    } finally {
                                        setIsSubmitting(false)
                                    }
                                }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label htmlFor="first_name" className="text-xs font-bold text-primary uppercase tracking-widest">First Name</Label>
                                        <Input 
                                            id="first_name" 
                                            name="first_name" 
                                            required 
                                            placeholder="John" 
                                            className="rounded-none border-border/50 bg-secondary/50 h-14 focus:bg-secondary focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground/50" 
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="last_name" className="text-xs font-bold text-primary uppercase tracking-widest">Last Name</Label>
                                        <Input 
                                            id="last_name" 
                                            name="last_name" 
                                            required 
                                            placeholder="Doe" 
                                            className="rounded-none border-border/50 bg-secondary/50 h-14 focus:bg-secondary focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground/50" 
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="email" className="text-xs font-bold text-primary uppercase tracking-widest">Email Address</Label>
                                    <Input 
                                        id="email" 
                                        name="email" 
                                        type="email" 
                                        required 
                                        placeholder="john@example.com" 
                                        className="rounded-none border-border/50 bg-secondary/50 h-14 focus:bg-secondary focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground/50" 
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="subject" className="text-xs font-bold text-primary uppercase tracking-widest">Select Package / Inquiry</Label>
                                    <select 
                                        id="subject" 
                                        name="subject" 
                                        required
                                        className="w-full h-14 px-4 py-2 text-sm bg-secondary/50 border border-border/50 rounded-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground appearance-none"
                                    >
                                        <option value="" className="bg-card text-foreground">Select an option</option>
                                        <optgroup label="Consulting Packages" className="bg-card text-muted-foreground font-semibold">
                                            <option value="Strategy Call" className="bg-card text-foreground py-2">Strategy Call ($100)</option>
                                            <option value="Starter Package" className="bg-card text-foreground py-2">Starter Package ($250)</option>
                                            <option value="Growth Package" className="bg-card text-foreground py-2">Growth Package ($1,000)</option>
                                            <option value="Premium Launch" className="bg-card text-foreground py-2">Premium Launch ($1,500)</option>
                                        </optgroup>
                                        <optgroup label="Other" className="bg-card text-muted-foreground font-semibold">
                                            <option value="General Inquiry" className="bg-card text-foreground py-2">General Inquiry</option>
                                        </optgroup>
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="message" className="text-xs font-bold text-primary uppercase tracking-widest">Message</Label>
                                    <textarea 
                                        id="message" 
                                        name="message"
                                        required
                                        placeholder="Tell us about your property and goals..." 
                                        className="w-full min-h-[160px] px-4 py-3 text-sm bg-secondary/50 border border-border/50 rounded-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none text-foreground placeholder:text-muted-foreground/50"
                                    />
                                </div>

                                <Button 
                                    size="lg" 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-14 rounded-none font-bold text-xs uppercase tracking-[0.2em] bg-primary hover:bg-primary/90 text-black shadow-xl shadow-primary/10 transition-all group"
                                >
                                    {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                                    {!isSubmitting && <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                                </Button>

                                <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest">
                                    By submitting this form, you agree to our privacy policy.
                                </p>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
