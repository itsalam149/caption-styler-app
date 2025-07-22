import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Zap, Palette } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-cyan-50 to-blue-100"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      <div
        className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
        style={{ animationDelay: "4s" }}
      ></div>

      <div className="relative container mx-auto px-4">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Caption Styling
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 animate-fade-in">
            Transform Your Videos with
            <span className="block bg-gradient-sky bg-clip-text text-transparent mt-2">Beautiful Captions</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Upload your reference video with styled captions and your input video. Our AI will automatically apply the
            same beautiful styling to your content with precision and creativity.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in">
            <Button size="lg" className="btn-sky text-lg px-8 py-4" asChild>
              <Link href="/upload">
                Start Creating Free
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 border-sky-300 text-sky-700 hover:bg-sky-50 bg-transparent"
            >
              <Play className="mr-2 h-6 w-6" />
              Watch Demo
            </Button>
          </div>

          {/* Visual Process Representation */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center max-w-6xl mx-auto animate-fade-in">
            {/* Input Video */}
            <div className="text-center group">
              <div className="relative mx-auto w-56 h-96 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-red-400 to-pink-600 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-8 h-8" />
                      </div>
                      <p className="text-lg font-semibold">Your Video</p>
                      <p className="text-sm opacity-75">No Captions</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <div className="card-sky p-4">
                <h3 className="font-bold text-sky-900 mb-2">Input Video</h3>
                <p className="text-sm text-gray-600">Your original content without captions</p>
              </div>
            </div>

            {/* Plus Icon */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-sky rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <span className="text-2xl font-bold text-white">+</span>
              </div>
              <p className="text-sky-700 font-semibold">AI Magic</p>
            </div>

            {/* Reference Video */}
            <div className="text-center group">
              <div className="relative mx-auto w-56 h-96 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-purple-400 to-blue-600 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                        <Palette className="w-8 h-8" />
                      </div>
                      <p className="text-lg font-semibold">Reference</p>
                      <p className="text-sm opacity-75">Styled Captions</p>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-4 right-4 bg-black/80 text-white text-sm p-3 rounded-lg text-center font-bold backdrop-blur-sm">
                    ✨ Beautiful Captions ✨
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="card-sky p-4">
                <h3 className="font-bold text-sky-900 mb-2">Reference Video</h3>
                <p className="text-sm text-gray-600">Video with the styling you want</p>
              </div>
            </div>

            {/* Equals Icon */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-sky rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
                <span className="text-2xl font-bold text-white">=</span>
              </div>
              <p className="text-sky-700 font-semibold">Result</p>
            </div>

            {/* Result Video */}
            <div className="text-center group">
              <div className="relative mx-auto w-56 h-96 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-emerald-400 to-cyan-600 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                        <Zap className="w-8 h-8" />
                      </div>
                      <p className="text-lg font-semibold">Your Video</p>
                      <p className="text-sm opacity-75">With Style!</p>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-4 right-4 bg-gradient-to-r from-purple-600/90 to-pink-600/90 text-white text-sm p-3 rounded-lg text-center font-bold backdrop-blur-sm">
                    🎨 Styled Captions Applied! 🎨
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div className="card-sky p-4">
                <h3 className="font-bold text-sky-900 mb-2">Final Result</h3>
                <p className="text-sm text-gray-600">Your video with beautiful captions</p>
              </div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-fade-in">
            <div className="card-sky p-6 text-center">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="font-bold text-sky-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600">Advanced AI analyzes and transfers caption styles automatically</p>
            </div>
            <div className="card-sky p-6 text-center">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="font-bold text-sky-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Process your videos in seconds with optimized rendering</p>
            </div>
            <div className="card-sky p-6 text-center">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Palette className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="font-bold text-sky-900 mb-2">Perfect Styling</h3>
              <p className="text-gray-600">Precise font, color, and positioning transfer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
