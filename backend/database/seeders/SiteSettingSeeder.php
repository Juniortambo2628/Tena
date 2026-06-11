<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            ['key' => 'site_name', 'value' => 'Nissi Insights', 'type' => 'text', 'group' => 'general'],
            ['key' => 'logo_light', 'value' => '/assets/logos/logo-light.png', 'type' => 'image', 'group' => 'branding'],
            ['key' => 'logo_dark', 'value' => '/assets/logos/logo-dark.png', 'type' => 'image', 'group' => 'branding'],
            ['key' => 'favicon', 'value' => '/assets/favicons/favicon.png', 'type' => 'image', 'group' => 'branding'],
            ['key' => 'dashboard_favicon', 'value' => '/assets/favicons/dashboard-favicon.png', 'type' => 'image', 'group' => 'branding'],
            ['key' => 'hero_title', 'value' => 'Intelligence for the future of energy', 'type' => 'text', 'group' => 'homepage'],
            
            // About Page
            ['key' => 'about_title', 'value' => 'Intelligence for the Future', 'type' => 'text', 'group' => 'about'],
            ['key' => 'about_tagline', 'value' => 'Our Mission & Vision', 'type' => 'text', 'group' => 'about'],
            ['key' => 'about_story', 'value' => 'Nissi Insights was founded on the principle that market intelligence should be accessible, actionable, and rigorous. We connect decision-makers with the data they need to navigate the world\'s most complex energy and financial landscapes.', 'type' => 'textarea', 'group' => 'about'],
            ['key' => 'about_image', 'value' => '/NI-Digital-Assets/international-diplomacy.jpg', 'type' => 'image', 'group' => 'about'],

            // Contact Page
            ['key' => 'contact_email', 'value' => 'info@nissi-insights.com', 'type' => 'text', 'group' => 'contact'],
            ['key' => 'contact_phone', 'value' => '+44 20 7946 0000', 'type' => 'text', 'group' => 'contact'],
            ['key' => 'contact_address', 'value' => 'One Canary Wharf, London, E14 5AB', 'type' => 'text', 'group' => 'contact'],
            ['key' => 'contact_map_url', 'value' => 'https://www.google.com/maps/embed?...', 'type' => 'text', 'group' => 'contact'],

            // Widgets
            ['key' => 'nissi_assistant_enabled', 'value' => '1', 'type' => 'boolean', 'group' => 'widgets'],
            ['key' => 'nissi_assistant_id', 'value' => 'cl-...', 'type' => 'text', 'group' => 'widgets'],
            ['key' => 'whatsapp_enabled', 'value' => '1', 'type' => 'boolean', 'group' => 'widgets'],
            ['key' => 'whatsapp_number', 'value' => '+447000000000', 'type' => 'text', 'group' => 'widgets'],
            ['key' => 'whatsapp_message', 'value' => 'Hello, I have a question about Nissi Insights.', 'type' => 'text', 'group' => 'widgets'],

            // Pre-launch RSVP
            ['key' => 'rsvp_active', 'value' => '1', 'type' => 'boolean', 'group' => 'launch'],
            ['key' => 'rsvp_date', 'value' => '2026-03-20 19:00:00', 'type' => 'text', 'group' => 'launch'],
            ['key' => 'rsvp_title', 'value' => 'The Future of Energy Intelligence', 'type' => 'text', 'group' => 'launch'],
            ['key' => 'rsvp_description', 'value' => 'We are preparing to launch a revolutionary market intelligence platform. Register your interest below to be notified when we go live.', 'type' => 'textarea', 'group' => 'launch'],
            ['key' => 'rsvp_media', 'value' => '/assets/videos/hero.mp4', 'type' => 'image', 'group' => 'launch'],
            ['key' => 'rsvp_bg_light', 'value' => '', 'type' => 'image', 'group' => 'launch'],
            ['key' => 'rsvp_bg_dark', 'value' => '', 'type' => 'image', 'group' => 'launch'],
            
            // RSVP Event Details
            ['key' => 'rsvp_venue', 'value' => 'The Sage Delicacy, Gigiri', 'type' => 'text', 'group' => 'launch'],
            ['key' => 'rsvp_address', 'value' => 'Corner of, 183 Gigiri Close, United Nations Cresent, Nairobi', 'type' => 'text', 'group' => 'launch'],
            ['key' => 'rsvp_time', 'value' => '7:00-9:00 P.M.', 'type' => 'text', 'group' => 'launch'],
            ['key' => 'rsvp_menu_file', 'value' => '', 'type' => 'file', 'group' => 'launch'],

            // Landing Page Text
            ['key' => 'hero_title', 'value' => 'The system for Airbnb hosts prioritizing direct bookings.', 'type' => 'textarea', 'group' => 'homepage'],
            ['key' => 'hero_subtitle', 'value' => 'We help you launch and optimize your Airbnb — then plug you into TENA to drive repeat bookings, direct revenue, and long-term profitability.', 'type' => 'textarea', 'group' => 'homepage'],
            ['key' => 'hero_cta_text', 'value' => 'Book Strategy Call', 'type' => 'text', 'group' => 'homepage'],
            
            ['key' => 'advantage_title', 'value' => 'The TENA Advantage', 'type' => 'text', 'group' => 'homepage'],
            ['key' => 'advantage_subtitle', 'value' => 'Beyond the Booking.', 'type' => 'text', 'group' => 'homepage'],
            
            ['key' => 'stats_title', 'value' => 'Our Track Record', 'type' => 'text', 'group' => 'homepage'],
            
            ['key' => 'process_title', 'value' => 'Our Process', 'type' => 'text', 'group' => 'homepage'],
            ['key' => 'process_subtitle', 'value' => 'How It Works', 'type' => 'text', 'group' => 'homepage'],
            
            ['key' => 'packages_title', 'value' => 'Consulting Packages', 'type' => 'text', 'group' => 'homepage'],
            ['key' => 'packages_subtitle', 'value' => 'Simple, premium, session-based — no retainers', 'type' => 'text', 'group' => 'homepage'],
            
            ['key' => 'cta_banner_title', 'value' => 'Ready to build your own repeat guest machine?', 'type' => 'text', 'group' => 'homepage'],
            ['key' => 'cta_banner_subtitle', 'value' => 'Let\'s talk strategy.', 'type' => 'text', 'group' => 'homepage'],
            ['key' => 'cta_banner_button', 'value' => 'Get in touch', 'type' => 'text', 'group' => 'homepage'],

            // Pillar Heros & General Media
            ['key' => 'hero_pillar_energy_advisory', 'value' => '/NI-Digital-Assets/energy-advisory.jpg', 'type' => 'image', 'group' => 'hero-media'],
            ['key' => 'hero_pillar_fintech', 'value' => '/NI-Digital-Assets/financial-technology.jpg', 'type' => 'image', 'group' => 'hero-media'],
            ['key' => 'hero_pillar_international_diplomacy', 'value' => '/NI-Digital-Assets/international-diplomacy.jpg', 'type' => 'image', 'group' => 'hero-media'],
            // Legal Pages
            ['key' => 'terms_of_service', 'value' => '<h2>1. Acceptance of Terms</h2><p>By accessing and using TENA Consultancy services, you accept and agree to be bound by the terms and provision of this agreement.</p><h2>2. Services Provided</h2><p>TENA provides consultancy specifically geared towards Airbnb hosts, seeking to increase repeat bookings...</p>', 'type' => 'textarea', 'group' => 'legal'],
            ['key' => 'privacy_policy', 'value' => '<h2>1. Information Collection</h2><p>We collect information from you when you register on our site, place an order, subscribe to our newsletter or fill out a form.</p><h2>2. Information Use</h2><p>Any of the information we collect from you may be used to personalize your experience or improve customer service.</p>', 'type' => 'textarea', 'group' => 'legal'],
            ['key' => 'cookie_policy', 'value' => '<h2>1. What Are Cookies</h2><p>As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer.</p><h2>2. How We Use Cookies</h2><p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases there are no industry standard options for disabling cookies without completely disabling the functionality.</p>', 'type' => 'textarea', 'group' => 'legal'],
        ];

        foreach ($settings as $setting) {
            \App\Models\SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
