"use client"

import type React from "react"

interface Caption {
  id: number
  text: string
  startTime: number
  endTime: number
  x: number
  y: number
  fontSize: number
  color: string
  backgroundColor: string
  fontFamily: string
}

interface TimelineProps {
  duration: number
  currentTime: number
  captions: Caption[]
  onSeek: (time: number) => void
  onCaptionSelect: (id: number | null) => void
  selectedCaption: number | null
}

export function Timeline({ duration, currentTime, captions, onSeek, onCaptionSelect, selectedCaption }: TimelineProps) {
  const handleTimelineClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    const time = percentage * duration
    onSeek(time)
  }

  const handleCaptionClick = (captionId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    onCaptionSelect(captionId)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Timeline</h3>

      <div className="relative">
        {/* Timeline Track */}
        <div
          className="h-12 bg-gray-700 rounded-lg cursor-pointer relative overflow-hidden"
          onClick={handleTimelineClick}
        >
          {/* Progress */}
          <div
            className="h-full bg-purple-600 rounded-lg transition-all duration-100"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />

          {/* Current Time Indicator */}
          <div
            className="absolute top-0 w-1 h-full bg-white shadow-lg"
            style={{ left: `${(currentTime / duration) * 100}%` }}
          />

          {/* Caption Blocks */}
          {captions.map((caption) => (
            <div
              key={caption.id}
              className={`absolute top-1 h-10 rounded cursor-pointer transition-all ${
                selectedCaption === caption.id
                  ? "bg-yellow-400 border-2 border-yellow-300"
                  : "bg-blue-500 hover:bg-blue-400"
              }`}
              style={{
                left: `${(caption.startTime / duration) * 100}%`,
                width: `${((caption.endTime - caption.startTime) / duration) * 100}%`,
              }}
              onClick={(e) => handleCaptionClick(caption.id, e)}
              title={caption.text}
            >
              <div className="p-1 text-xs text-white truncate">{caption.text}</div>
            </div>
          ))}
        </div>

        {/* Time Markers */}
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>0:00</span>
          <span>
            {Math.floor(duration / 60)}:{(duration % 60).toFixed(0).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  )
}
