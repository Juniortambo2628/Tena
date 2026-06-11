"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
    CreditCard, 
    Calendar, 
    CheckCircle2, 
    ArrowUpRight,
    MessageCircle,
    Package
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useApi } from '@/hooks/use-api'

export default function ClientPortalDashboard() {
    const { data: payments } = useApi<any[]>('/payments/history')
    
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Client Portal</h1>
                    <p className="text-muted-foreground">Manage your consultancy sessions, billing, and progress.</p>
                </div>
                <Button className="bg-primary text-black font-bold">
                    Schedule New Session
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-secondary/10 border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Active Packages</CardTitle>
                        <Package className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{payments?.length ?? 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">Across all properties</p>
                    </CardContent>
                </Card>
                <Card className="bg-secondary/10 border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Upcoming Sessions</CardTitle>
                        <Calendar className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground mt-1">Next: Not scheduled</p>
                    </CardContent>
                </Card>
                <Card className="bg-secondary/10 border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Total Invested</CardTitle>
                        <CreditCard className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${payments?.reduce((acc: number, p: any) => acc + parseFloat(p.amount), 0).toFixed(2) ?? '0.00'}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Lifetime value</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Billing */}
                <Card className="lg:col-span-2 bg-secondary/10 border-border/50">
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!payments || payments.length === 0 ? (
                            <div className="text-center py-10 opacity-50">
                                <CreditCard size={40} className="mx-auto mb-4 opacity-20" />
                                <p>No transactions found.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {payments.map((payment) => (
                                    <div key={payment.id} className="flex items-center justify-between p-4 border border-border/50 bg-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-primary/10 rounded">
                                                <ArrowUpRight className="text-primary h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-bold">{payment.service?.title ?? 'Consultancy Package'}</p>
                                                <p className="text-xs text-muted-foreground">{new Date(payment.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">${payment.amount}</p>
                                            <Badge variant="outline" className="text-[10px] uppercase border-emerald-500/20 text-emerald-400 bg-emerald-500/5">
                                                {payment.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Support/Chat */}
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-lg">Need Assistance?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Your dedicated TENA advisor is available for priority support. Reach out regarding your active packages.
                        </p>
                        <Button className="w-full bg-primary text-black font-bold gap-2">
                            <MessageCircle size={16} />
                            Start Consultation Chat
                        </Button>
                        <div className="pt-6 border-t border-primary/10">
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-4">Milestones</p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 opacity-50">
                                    <CheckCircle2 size={14} className="text-primary" />
                                    <span className="text-xs">Capacity Building Phase</span>
                                </div>
                                <div className="flex items-center gap-3 opacity-50">
                                    <div className="w-3 h-3 rounded-full border border-primary/30" />
                                    <span className="text-xs">Market Entry Strategy</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
