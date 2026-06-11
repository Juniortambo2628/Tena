"use client"

import React from 'react'
import BackToTop from '@/components/BackToTop'
import PageViewTracker from '@/components/analytics/PageViewTracker'

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <PageViewTracker />
            {children}
            <BackToTop />
        </>
    )
}

export default ClientLayout
