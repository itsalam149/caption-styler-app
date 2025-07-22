"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileDropzone } from "./file-dropzone"
import { Progress } from "@/components/ui/progress"
import { Link2, Upload, ArrowRight, Sparkles, CheckCircle, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { createTempASSFile } from "@/lib/temp-ass-file"
import { ASSParser } from "@/lib/ass-parser"

export function UploadForm() {
  const [referenceUrl, setReferenceUrl] = useState("")
  const [inputFile, setInputFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [validationStatus, setValidationStatus] = useState<{
    url: boolean | null
    file: boolean | null
  }>({ url: null, file: null })
  const router = useRouter()

  // Validate URL in real-time
  useEffect(() => {
    if (referenceUrl) {
      const isValid = /^https?:\/\/.+/.test(referenceUrl)
      setValidationStatus((prev) => ({ ...prev, url: isValid }))
    } else {
      setValidationStatus((prev) => ({ ...prev, url: null }))
    }
  }, [referenceUrl])

  // Validate file
  useEffect(() => {
    if (inputFile) {
      const isValid = inputFile.type.startsWith("video/") && inputFile.size <= 100 * 1024 * 1024 // 100MB
      setValidationStatus((prev) => ({ ...prev, file: isValid }))
    } else {
      setValidationStatus((prev) => ({ ...prev, file: null }))
    }
  }, [inputFile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!referenceUrl || !inputFile) {
      alert("Please provide both reference URL and input video file")
      return
    }

    setIsProcessing(true)

    try {
      // Create temporary ASS file and parse it
      const tempASSFile = createTempASSFile()
      const assContent = await tempASSFile.text()
      const parsedASS = ASSParser.parse(assContent)
      const captions = ASSParser.convertToCaption(parsedASS)

      // Store data in sessionStorage for the editor
      sessionStorage.setItem("referenceUrl", referenceUrl)
      sessionStorage.setItem(
        "inputFile",
        JSON.stringify({
          name: inputFile.name,
          size: inputFile.size,
          type: inputFile.type,
        }),
      )
      sessionStorage.setItem("captions", JSON.stringify(captions))

      // Simulate processing with realistic progress
      const steps = [
        { progress: 20, message: "Analyzing reference video..." },
        { progress: 40, message: "Extracting caption styles..." },
        { progress: 60, message: "Processing input video..." },
        { progress: 80, message: "Applying styling..." },
        { progress: 100, message: "Finalizing..." },
      ]

      for (const step of steps) {
        setProgress(step.progress)
        await new Promise((resolve) => setTimeout(resolve, 800))
      }

      // Redirect to editor
      router.push("/editor")
    } catch (error) {
      console.error("Processing error:", error)
      alert("Error processing videos. Please try again.")
      setIsProcessing(false)
      setProgress(0)
    }
  }

  const isFormValid = validationStatus.url === true && validationStatus.file === true

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Reference Video URL */}
      <Card className="card-sky">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-sky-900">
            <div className="w-10 h-10 bg-gradient-sky rounded-lg flex items-center justify-center mr-3">
              <Link2 className="w-5 h-5 text-white" />
            </div>
            Reference Video URL
            {validationStatus.url === true && <CheckCircle className="w-5 h-5 text-green-500 ml-2" />}
            {validationStatus.url === false && <AlertCircle className="w-5 h-5 text-red-500 ml-2" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label htmlFor="reference-url" className="text-sky-800 font-medium">
            Paste the URL of a video with styled captions (Instagram, TikTok, YouTube, etc.)
          </Label>
          <div className="relative">
            <Input
              id="reference-url"
              type="url"
              placeholder="https://www.instagram.com/reel/..."
              value={referenceUrl}
              onChange={(e) => setReferenceUrl(e.target.value)}
              className={`input-sky text-lg h-12 pr-12 ${validationStatus.url === false ? "border-red-300 focus:border-red-500" : ""
                }`}
            />
            {validationStatus.url === true && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
            )}
            {validationStatus.url === false && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
            )}
          </div>
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
            <p className="text-sm text-sky-700 flex items-start">
              <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-sky-500" />
              This video should have the caption styling you want to apply to your input video. Our AI will analyze the
              fonts, colors, positioning, and animations.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Input Video File */}
      <Card className="card-sky">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-sky-900">
            <div className="w-10 h-10 bg-gradient-sky rounded-lg flex items-center justify-center mr-3">
              <Upload className="w-5 h-5 text-white" />
            </div>
            Input Video File
            {validationStatus.file === true && <CheckCircle className="w-5 h-5 text-green-500 ml-2" />}
            {validationStatus.file === false && <AlertCircle className="w-5 h-5 text-red-500 ml-2" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label className="text-sky-800 font-medium">Upload your video file (MP4, MOV, AVI - Max 100MB)</Label>
          <FileDropzone onFileSelect={setInputFile} selectedFile={inputFile} />
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
            <p className="text-sm text-sky-700 flex items-start">
              <Upload className="w-4 h-4 mr-2 mt-0.5 text-sky-500" />
              This is the video that will receive the styled captions. Make sure it's high quality for the best results.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Processing Progress */}
      {isProcessing && (
        <Card className="card-sky animate-fade-in">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 spinner-sky mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-sky-900 mb-2">Processing Your Videos</h3>
                <p className="text-sky-700">Our AI is analyzing and applying caption styles...</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-sky-800">Progress</span>
                  <span className="text-sm text-sky-600">{progress}%</span>
                </div>
                <Progress value={progress} className="w-full h-3" />
                <div className="text-center">
                  <p className="text-sm text-sky-600">
                    {progress <= 20 && "Analyzing reference video..."}
                    {progress > 20 && progress <= 40 && "Extracting caption styles..."}
                    {progress > 40 && progress <= 60 && "Processing input video..."}
                    {progress > 60 && progress <= 80 && "Applying styling..."}
                    {progress > 80 && "Finalizing..."}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-sky-light rounded-lg p-4">
                <div className="flex items-center justify-center space-x-4 text-sky-800">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">AI Analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <span className="text-sm">Style Transfer</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <span className="text-sm">Optimization</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          size="lg"
          disabled={!isFormValid || isProcessing}
          onClick={handleSubmit}
          className={`btn-sky text-lg px-12 py-4 ${isFormValid ? "animate-glow" : "opacity-50 cursor-not-allowed"}`}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 spinner-sky mr-3"></div>
              Processing...
            </>
          ) : (
            <>
              <Sparkles className="mr-3 h-6 w-6" />
              Process Videos
              <ArrowRight className="ml-3 h-6 w-6" />
            </>
          )}
        </Button>
      </div>

      {/* Help Section */}
      <Card className="card-sky">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-sky-900">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-sky-50 rounded-lg p-4">
                <h4 className="font-medium text-sky-800 mb-2">Supported URLs</h4>
                <p className="text-sky-600">Instagram Reels, TikTok videos, YouTube Shorts, Twitter videos</p>
              </div>
              <div className="bg-sky-50 rounded-lg p-4">
                <h4 className="font-medium text-sky-800 mb-2">File Formats</h4>
                <p className="text-sky-600">MP4, MOV, AVI, WebM up to 100MB</p>
              </div>
              <div className="bg-sky-50 rounded-lg p-4">
                <h4 className="font-medium text-sky-800 mb-2">Best Results</h4>
                <p className="text-sky-600">High quality videos with clear, styled captions</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
