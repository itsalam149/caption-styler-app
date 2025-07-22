import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Zap, Palette, MousePointer, Clock, Download } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Styling",
    description: "Automatically extract and apply caption styles from reference videos using advanced AI",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process your videos in seconds with our optimized rendering engine",
  },
  {
    icon: Palette,
    title: "Style Transfer",
    description: "Transfer fonts, colors, animations, and positioning from any reference video",
  },
  {
    icon: MousePointer,
    title: "Drag & Drop Editor",
    description: "Intuitive editor with drag-and-drop positioning and real-time preview",
  },
  {
    icon: Clock,
    title: "Timeline Control",
    description: "Precise timing control with visual timeline and caption markers",
  },
  {
    icon: Download,
    title: "Export Ready",
    description: "Export in multiple formats optimized for social media platforms",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Powerful Features for Content Creators</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to create professional-looking captions for your videos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
