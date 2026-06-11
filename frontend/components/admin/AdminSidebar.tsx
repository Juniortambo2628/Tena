"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { 
    LayoutDashboard, 
    Briefcase, 
    FileText, 
    BarChart3, 
    Settings, 
    LogOut,
    ExternalLink,
    Quote,
    Building2,
    FolderOpen,
    PenTool,
    Users,
    MessageSquare,
    UserCircle,
    Zap,
    Mail,
    ShieldCheck,
    Rocket,
    Globe
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { useAuth } from '@/components/AuthProvider'
import { useApi } from '@/hooks/use-api'
import { useTheme } from 'next-themes'
import { AdminThemeToggle } from './AdminThemeToggle'

const AdminSidebar = () => {
    const pathname = usePathname()
    const { logout } = useAuth()
    const { data: settingsByGroup } = useApi('/settings')

    // Helper to get setting value
    const getSetting = (key: string, defaultValue: string) => {
        if (!settingsByGroup) return defaultValue
        const allSettings = Object.values(settingsByGroup).flat() as any[]
        const setting = allSettings.find(s => s.key === key)
        return setting?.value || defaultValue
    }

    const { theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const logoWhiteBg = getSetting('logo_light', '/logos/tena-landscape-white.png')
    const logoBlackBg = getSetting('logo_dark', '/logos/tena-landscape-black.png')
    
    const logo = theme === 'light' ? logoWhiteBg : logoBlackBg

    const menuItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Inquiries', href: '/admin/requests', icon: MessageSquare },
        { name: 'Consulting Process', href: '/admin/pillars', icon: Zap },
        { name: 'Blog Articles', href: '/admin/insights', icon: FileText },
        { name: 'Site Settings', href: '/admin/settings', icon: Settings },
    ]

    const quickLinks = [
        { name: 'View Website', href: '/', icon: ExternalLink }
    ]

    return (
        <aside className="w-64 h-screen bg-secondary/10 border-r border-border/50 flex flex-col fixed left-0 top-0">
            <div className="p-6 border-b border-border/50">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Image 
                            src={mounted ? logo : logoBlackBg} 
                            alt="TENA Consultancy Logo" 
                            width={140} 
                            height={35} 
                            className="h-8 w-auto object-contain"
                        />
                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                    </Link>
                    <AdminThemeToggle />
                </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-4">
                    <h5 className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 mb-4">Main Menu</h5>
                    <nav className="space-y-1 overflow-y-auto custom-scrollbar">
                        {menuItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href
                            return (
                                <Link 
                                    key={item.name} 
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all text-nowrap",
                                        isActive 
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                                            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                    )}
                                >
                                    <Icon size={16} />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                <div className="p-4 pt-0">
                    <h5 className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 mb-4">Quick Links</h5>
                    <nav className="space-y-1">
                        {quickLinks.map((item) => {
                            const Icon = item.icon
                            return (
                                <Link 
                                    key={item.name} 
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all"
                                >
                                    <Icon size={16} />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>

            <div className="p-4 border-t border-border/50">
                <button 
                    onClick={() => logout()}
                    className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all font-bold uppercase tracking-wider text-[11px]"
                >
                    <LogOut size={16} />
                    Secure Logout
                </button>
            </div>
        </aside>
    )
}

export default AdminSidebar
