"use client"

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const Footer = () => {
    const serviceLinks = [
        { name: 'Strategy Call', href: '#packages' },
        { name: 'Starter Package', href: '#packages' },
        { name: 'Growth Package', href: '#packages' },
        { name: 'Premium Launch', href: '#packages' },
    ]

    const companyLinks = [
        { name: 'The TENA Advantage', href: '#advantage' },
        { name: 'Our Track Record', href: '#stats' },
        { name: 'Contact Us', href: '/contact' },
    ]

    const legalLinks = [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
    ]

    return (
        <footer className="w-full bg-background border-t border-border/50">
            {/* Main Footer */}
            <div className="max-w-[1400px] mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                    {/* Column 1: Brand */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <span className="text-3xl font-bold tracking-tight text-foreground">TENA</span>
                            <span className="ml-2 text-xs text-muted-foreground uppercase tracking-widest">Consultancy</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                            Airbnb consultancy for repeat bookings and guest retention. We help you launch, optimize, and build a system that guarantees your guests return.
                        </p>
                    </div>

                    {/* Column 2: Packages */}
                    <div>
                        <h4 className="text-foreground font-bold text-sm uppercase tracking-widest mb-6">Packages</h4>
                        <ul className="space-y-3">
                            {serviceLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div>
                        <h4 className="text-foreground font-bold text-sm uppercase tracking-widest mb-6">Company</h4>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="text-foreground font-bold text-sm uppercase tracking-widest mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="text-muted-foreground">
                                <span className="text-foreground font-semibold block mb-1">Email</span>
                                <a href="mailto:hello@tena.co" className="hover:text-primary transition-colors">
                                    hello@tena.co
                                </a>
                            </li>
                        </ul>

                        <div className="mt-8">
                            <Link
                                href="/contact"
                                className="text-primary font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:underline group"
                            >
                                Book a Strategy Call
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border/50">
                <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-muted-foreground/60 text-xs" suppressHydrationWarning>
                        © {new Date().getFullYear()} TENA Consultancy. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {legalLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-muted-foreground/60 hover:text-foreground text-xs transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}


export default Footer
