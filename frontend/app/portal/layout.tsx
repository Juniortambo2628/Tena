"use client"

import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { 
    LayoutDashboard, 
    CreditCard, 
    Settings, 
    LogOut,
    MessageCircle,
    Package
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    
    const navItems = [
        { name: 'Overview', href: '/portal', icon: LayoutDashboard },
        { name: 'My Packages', href: '/portal/packages', icon: Package },
        { name: 'Billing', href: '/portal/billing', icon: CreditCard },
        { name: 'Support', href: '/portal/support', icon: MessageCircle },
        { name: 'Settings', href: '/portal/settings', icon: Settings },
    ]

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            
            <div className="pt-24 pb-20 px-6">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Sidebar */}
                        <aside className="lg:col-span-3 space-y-2">
                            <div className="p-6 bg-secondary/10 border border-border/50 mb-8">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Authenticated as</p>
                                <p className="font-bold truncate text-foreground">TENA Client</p>
                            </div>

                            <nav className="space-y-1">
                                {navItems.map((item) => {
                                    const Icon = item.icon
                                    const isActive = pathname === item.href
                                    return (
                                        <Link 
                                            key={item.name} 
                                            href={item.href}
                                        >
                                            <div className={`
                                                flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all
                                                ${isActive 
                                                    ? 'bg-primary text-black' 
                                                    : 'text-muted-foreground hover:text-white hover:bg-white/5'}
                                            `}>
                                                <Icon size={18} />
                                                {item.name}
                                            </div>
                                        </Link>
                                    )
                                })}
                                
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-400/10 mt-8 transition-all">
                                    <LogOut size={18} />
                                    Sign Out
                                </button>
                            </nav>
                        </aside>

                        {/* Main Content */}
                        <main className="lg:col-span-9">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {children}
                            </motion.div>
                        </main>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
