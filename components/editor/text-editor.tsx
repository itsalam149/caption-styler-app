"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Type } from "lucide-react"

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

interface TextEditorProps {
  selectedCaption: number | null
  captions: Caption[]
  onCaptionUpdate: (id: number, updates: Partial<Caption>) => void
}

export function TextEditor({ selectedCaption, captions, onCaptionUpdate }: TextEditorProps) {
  const caption = selectedCaption ? captions.find((c) => c.id === selectedCaption) : null

  if (!caption) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Type className="w-5 h-5 mr-2" />
            Text Editor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-center py-8">Select a caption to edit its text</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Type className="w-5 h-5 mr-2" />
          Text Editor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="caption-text" className="text-gray-300">
            Caption Text
          </Label>
          <Textarea
            id="caption-text"
            value={caption.text}
            onChange={(e) => onCaptionUpdate(caption.id, { text: e.target.value })}
            className="bg-gray-700 border-gray-600 text-white"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="start-time" className="text-gray-300">
              Start Time (s)
            </Label>
            <Input
              id="start-time"
              type="number"
              step="0.1"
              value={caption.startTime}
              onChange={(e) => onCaptionUpdate(caption.id, { startTime: Number.parseFloat(e.target.value) })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label htmlFor="end-time" className="text-gray-300">
              End Time (s)
            </Label>
            <Input
              id="end-time"
              type="number"
              step="0.1"
              value={caption.endTime}
              onChange={(e) => onCaptionUpdate(caption.id, { endTime: Number.parseFloat(e.target.value) })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
