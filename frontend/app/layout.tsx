import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TENA | Airbnb Consultancy for Repeat Bookings & Guest Retention",
  description: "We help you launch and optimize your Airbnb — then plug you into TENA to drive repeat bookings, direct revenue, and long-term profitability.",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ClientLayout>
              {children}
              <Toaster />
            </ClientLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
