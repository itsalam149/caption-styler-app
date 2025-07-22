"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Settings } from "lucide-react"

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

interface ControlsPanelProps {
  selectedCaption: number | null
  captions: Caption[]
  onCaptionUpdate: (id: number, updates: Partial<Caption>) => void
}

const fontFamilies = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Verdana",
  "Courier New",
  "Impact",
  "Comic Sans MS",
]

export function ControlsPanel({ selectedCaption, captions, onCaptionUpdate }: ControlsPanelProps) {
  const caption = selectedCaption ? captions.find((c) => c.id === selectedCaption) : null

  if (!caption) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Settings className="w-5 h-5 mr-2" />
            Style Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-center py-8">Select a caption to edit its style</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Settings className="w-5 h-5 mr-2" />
          Style Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Font Size */}
        <div>
          <Label className="text-gray-300">Font Size: {caption.fontSize}px</Label>
          <Slider
            value={[caption.fontSize]}
            onValueChange={([value]) => onCaptionUpdate(caption.id, { fontSize: value })}
            min={12}
            max={72}
            step={1}
            className="mt-2"
          />
        </div>

        {/* Font Family */}
        <div>
          <Label className="text-gray-300">Font Family</Label>
          <Select
            value={caption.fontFamily}
            onValueChange={(value) => onCaptionUpdate(caption.id, { fontFamily: value })}
          >
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((font) => (
                <SelectItem key={font} value={font}>
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="text-color" className="text-gray-300">
              Text Color
            </Label>
            <Input
              id="text-color"
              type="color"
              value={caption.color}
              onChange={(e) => onCaptionUpdate(caption.id, { color: e.target.value })}
              className="bg-gray-700 border-gray-600 h-10"
            />
          </div>
          <div>
            <Label htmlFor="bg-color" className="text-gray-300">
              Background
            </Label>
            <Input
              id="bg-color"
              type="color"
              value={caption.backgroundColor}
              onChange={(e) => onCaptionUpdate(caption.id, { backgroundColor: e.target.value })}
              className="bg-gray-700 border-gray-600 h-10"
            />
          </div>
        </div>

        {/* Position */}
        <div>
          <Label className="text-gray-300">Position X: {caption.x.toFixed(1)}%</Label>
          <Slider
            value={[caption.x]}
            onValueChange={([value]) => onCaptionUpdate(caption.id, { x: value })}
            min={0}
            max={100}
            step={0.1}
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-gray-300">Position Y: {caption.y.toFixed(1)}%</Label>
          <Slider
            value={[caption.y]}
            onValueChange={([value]) => onCaptionUpdate(caption.id, { y: value })}
            min={0}
            max={100}
            step={0.1}
            className="mt-2"
          />
        </div>
      </CardContent>
    </Card>
  )
}
