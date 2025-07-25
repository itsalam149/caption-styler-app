import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CaptionCraft - AI-Powered Video Caption Styling",
  description: "Transform your videos with beautifully styled captions using AI-powered styling transfer",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
