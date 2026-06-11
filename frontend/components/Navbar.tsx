"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './ThemeToggle'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const navLinks = [
        { name: 'Packages', href: '#packages' },
        { name: 'How It Works', href: '#insights' },
        { name: 'Our Track Record', href: '#stats' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '/contact' },
    ]

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6",
                isScrolled 
                    ? "bg-background/95 backdrop-blur-md border-b border-border/50 py-3" 
                    : "bg-transparent py-5"
            )}
        >
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 relative z-50 shrink-0">
                    <span className="text-2xl font-bold tracking-tight text-foreground">
                        TENA
                    </span>
                    <span className="hidden sm:inline text-xs text-muted-foreground uppercase tracking-widest">
                        Consultancy
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[13px] font-bold uppercase tracking-widest hover:text-primary transition-colors text-foreground/90"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="h-6 w-[1px] bg-border/50" />
                    <ThemeToggle />
                    <div className="h-6 w-[1px] bg-border/50" />
                    <Button
                        variant="default"
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-white rounded-none px-4 font-bold uppercase tracking-wider text-xs"
                        asChild
                    >
                        <Link href="/contact">
                            Book Strategy Call
                            <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-2 text-foreground"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border p-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium py-2 text-foreground"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button className="w-full rounded-none mt-2" asChild>
                        <Link href="/contact">Book Strategy Call</Link>
                    </Button>
                </div>
            )}
        </nav>
    )
}

export default Navbar
