import './globals.css'
import type {Metadata, Viewport} from 'next'
import {Inter} from 'next/font/google'
import React from "react";

const inter = Inter({subsets: ['latin'], variable: '--font-inter'})

export const metadata: Metadata = {
    title: 'Secure Contact | Ruben',
    description: 'Send me an encrypted message using PGP encryption',
}

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    ],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="h-full">
            <body className={`${inter.variable} font-sans h-full antialiased`}>
                {children}
            </body>
        </html>
    )
}
