<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pillar;
use App\Models\Service;
use Illuminate\Support\Str;

class PillarSeeder extends Seeder
{
    public function run(): void
    {
        $pillars = [
            [
                'title' => 'Capacity Building',
                'overview' => 'Laying the foundation for short-term rental excellence.',
                'content' => 'We focus on equipping hosts with the essential knowledge, property standards, and professional operational frameworks needed to compete in the premium Airbnb market.',
                'icon' => 'ShieldCheck',
                'image' => 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
                'is_active' => true,
            ],
            [
                'title' => 'Market Entry and Support',
                'overview' => 'Strategic launch and listing optimization.',
                'content' => 'From high-converting listing copy to dynamic pricing strategies, we ensure your property enters the market with maximum visibility and professional authority.',
                'icon' => 'Rocket',
                'image' => 'https://images.unsplash.com/photo-1502672260266-1c1e53841a1a?w=1200&q=80',
                'is_active' => true,
            ],
            [
                'title' => 'Growth and Optimization',
                'overview' => 'Scaling direct bookings and guest loyalty.',
                'content' => 'The final stage transitions your properties into TENA to capture guest data, drive repeat bookings, and achieve long-term profitability independent of OTA algorithms.',
                'icon' => 'TrendingUp',
                'image' => 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&q=80',
                'is_active' => true,
            ],
        ];

        foreach ($pillars as $pData) {
            $pData['slug'] = Str::slug($pData['title']);
            $pillar = Pillar::updateOrCreate(['slug' => $pData['slug']], $pData);

            // Associate services
            Service::where('category', $pData['title'])->update(['pillar_id' => $pillar->id]);
        }
        
        // Special case for cross-category or mismatched names if any
        // e.g. Service::where('slug', 'some-service')->update(['pillar_id' => $energyPillar->id]);
    }
}
