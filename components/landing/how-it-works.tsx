import { Card, CardContent } from "@/components/ui/card"
import { Upload, Wand2, Edit, Download } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload Videos",
    description: "Upload your reference video with styled captions and your input video",
    step: "01",
  },
  {
    icon: Wand2,
    title: "AI Processing",
    description: "Our AI analyzes the reference video and extracts caption styling",
    step: "02",
  },
  {
    icon: Edit,
    title: "Edit & Customize",
    description: "Fine-tune positioning, timing, and styling in our intuitive editor",
    step: "03",
  },
  {
    icon: Download,
    title: "Export & Share",
    description: "Download your video with perfectly styled captions ready for sharing",
    step: "04",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Transform your videos in just four simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="border-0 shadow-lg relative">
              <CardContent className="p-6 text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 mt-4">
                  <step.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
