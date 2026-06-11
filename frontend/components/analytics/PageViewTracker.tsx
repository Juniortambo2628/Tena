"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import api from '@/lib/api'

export default function PageViewTracker() {
    const pathname = usePathname()

    useEffect(() => {
        const trackPageView = async () => {
            try {
                // Only track in production or if needed
                // We'll hit the /api/track endpoint
                await api.post('/track', { path: pathname })
            } catch (error) {
                // Silently fail to not interrupt user experience
                console.error('Analytics tracking failed:', error)
            }
        }

        trackPageView()
    }, [pathname])

    return null
}
