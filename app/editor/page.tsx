"use client"

import { useState, useRef, useEffect } from "react"
import { VideoCanvas } from "@/components/editor/video-canvas"
import { Timeline } from "@/components/editor/timeline"
import { TextEditor } from "@/components/editor/text-editor"
import { ControlsPanel } from "@/components/editor/controls-panel"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Play, Pause, RotateCcw, Save, Share2, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

export default function EditorPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(45) // Default duration
  const [selectedCaption, setSelectedCaption] = useState<number | null>(null)
  const [captions, setCaptions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined)

  // Load data from sessionStorage
  useEffect(() => {
    const loadData = () => {
      try {
        const storedCaptions = sessionStorage.getItem("captions")
        if (storedCaptions) {
          const parsedCaptions = JSON.parse(storedCaptions)
          setCaptions(parsedCaptions)
          setIsLoading(false)
        } else {
          // Fallback to demo captions if no stored data
          setCaptions([
            {
              id: 1,
              text: "To all my gym girlies",
              startTime: 0.24,
              endTime: 1.0,
              x: 50,
              y: 85,
              fontSize: 40,
              color: "#ffffff",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              fontFamily: "Poppins",
              fontWeight: "600",
              shadow: true,
            },
            {
              id: 2,
              text: "I just found your new gym bestie",
              startTime: 1.4,
              endTime: 3.28,
              x: 50,
              y: 85,
              fontSize: 48,
              color: "#00ffff",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              fontFamily: "Poppins",
              fontWeight: "bold",
              shadow: true,
            },
            {
              id: 3,
              text: "Regular creatine felt like a toxic relationship",
              startTime: 3.36,
              endTime: 6.08,
              x: 50,
              y: 85,
              fontSize: 44,
              color: "#ffffff",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              fontFamily: "Poppins",
              fontWeight: "600",
              shadow: true,
            },
          ])
          setIsLoading(false)
        }

        const storedVideo = sessionStorage.getItem("uploadedVideoUrl")
        setVideoUrl(storedVideo ?? "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4")
      } catch (error) {
        console.error("Error loading data:", error)
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const updateCaption = (id: number, updates: Partial<any>) => {
    setCaptions((prev) => prev.map((cap) => (cap.id === id ? { ...cap, ...updates } : cap)))
  }

  const exportVideo = () => {
    // This would integrate with your backend
    console.log("Exporting video with captions:", captions)
    alert("Export functionality will be integrated with your backend!")
  }

  const saveProject = () => {
    sessionStorage.setItem("captions", JSON.stringify(captions))
    alert("Project saved successfully!")
  }

  const resetToOriginal = () => {
    if (confirm("Are you sure you want to reset all changes?")) {
      const storedCaptions = sessionStorage.getItem("captions")
      if (storedCaptions) {
        setCaptions(JSON.parse(storedCaptions))
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 spinner-sky mx-auto"></div>
          <h2 className="text-xl font-semibold text-sky-900">Loading Editor...</h2>
          <p className="text-sky-600">Preparing your video and captions</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-sky-900 mb-2">Caption Editor</h1>
            <p className="text-sky-600">Fine-tune your captions with precision and style</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={saveProject}
              variant="outline"
              className="border-sky-300 text-sky-700 hover:bg-sky-50 bg-transparent"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Project
            </Button>
            <Button
              onClick={resetToOriginal}
              variant="outline"
              className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={exportVideo} className="btn-sky">
              <Download className="w-4 h-4 mr-2" />
              Export Video
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Video Canvas */}
          <div className="xl:col-span-3 space-y-6">
            <Card className="card-sky p-6">
              <VideoCanvas
                ref={videoRef}
                videoUrl={videoUrl}
                captions={captions}
                currentTime={currentTime}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onCaptionSelect={setSelectedCaption}
                onCaptionUpdate={updateCaption}
              />

              {/* Video Controls */}
              <div className="flex items-center justify-center mt-6 space-x-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={togglePlayPause}
                  className="border-sky-300 text-sky-700 hover:bg-sky-50 w-16 h-16 rounded-full bg-transparent"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>

                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-sky-900">
                    {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(1).padStart(4, "0")}
                  </div>
                  <div className="text-sm text-sky-600">
                    / {Math.floor(duration / 60)}:{(duration % 60).toFixed(0).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="timeline-container">
              <Timeline
                duration={duration}
                currentTime={currentTime}
                captions={captions}
                onSeek={handleSeek}
                onCaptionSelect={setSelectedCaption}
                selectedCaption={selectedCaption}
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Text Editor */}
            <TextEditor selectedCaption={selectedCaption} captions={captions} onCaptionUpdate={updateCaption} />

            {/* Controls Panel */}
            <ControlsPanel selectedCaption={selectedCaption} captions={captions} onCaptionUpdate={updateCaption} />

            {/* Quick Actions */}
            <Card className="control-panel p-4">
              <h3 className="font-semibold text-sky-900 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-sky-300 text-sky-700 hover:bg-sky-50 bg-transparent"
                  onClick={() => alert("Coming soon!")}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Preview
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-sky-300 text-sky-700 hover:bg-sky-50 bg-transparent"
                  onClick={() => router.push("/upload")}
                >
                  Upload New Video
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
