"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Card } from "@/components/ui/card"
import { Upload, type File, X, CheckCircle, AlertCircle, Video } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileDropzoneProps {
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
}

export function FileDropzone({ onFileSelect, selectedFile }: FileDropzoneProps) {
  const [dragError, setDragError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setDragError(null)

      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0]
        if (error.code === "file-too-large") {
          setDragError("File is too large. Maximum size is 100MB.")
        } else if (error.code === "file-invalid-type") {
          setDragError("Invalid file type. Please upload a video file.")
        } else {
          setDragError("Invalid file. Please try again.")
        }
        return
      }

      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0])
      }
    },
    [onFileSelect],
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".mkv", ".webm"],
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024, // 100MB
  })

  const removeFile = () => {
    onFileSelect(null)
    setDragError(null)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const video = document.createElement("video")
      video.preload = "metadata"
      video.onloadedmetadata = () => {
        resolve(video.duration)
      }
      video.src = URL.createObjectURL(file)
    })
  }

  if (selectedFile) {
    return (
      <Card className="card-sky p-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-sky rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <p className="font-semibold text-sky-900">{selectedFile.name}</p>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center space-x-4 text-sm text-sky-600">
                <span>{formatFileSize(selectedFile.size)}</span>
                <span>•</span>
                <span>{selectedFile.type}</span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={removeFile}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 bg-transparent"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="mt-4 bg-sky-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 text-sm text-sky-700">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>File uploaded successfully and ready for processing</span>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card
        {...getRootProps()}
        className={`p-12 border-2 border-dashed cursor-pointer transition-all duration-300 ${
          isDragActive && !isDragReject
            ? "border-sky-400 bg-sky-50 scale-105"
            : isDragReject || dragError
              ? "border-red-400 bg-red-50"
              : "border-sky-300 hover:border-sky-400 hover:bg-sky-50 card-sky"
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <div
            className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
              isDragActive && !isDragReject ? "bg-sky-100" : isDragReject || dragError ? "bg-red-100" : "bg-sky-100"
            }`}
          >
            {isDragReject || dragError ? (
              <AlertCircle className="w-8 h-8 text-red-500" />
            ) : (
              <Upload className={`w-8 h-8 ${isDragActive ? "text-sky-600 animate-bounce" : "text-sky-500"}`} />
            )}
          </div>

          {isDragActive && !isDragReject ? (
            <div className="space-y-2">
              <p className="text-xl font-semibold text-sky-700">Drop your video here!</p>
              <p className="text-sky-600">Release to upload</p>
            </div>
          ) : isDragReject || dragError ? (
            <div className="space-y-2">
              <p className="text-xl font-semibold text-red-700">Invalid file</p>
              <p className="text-red-600">{dragError || "Please upload a valid video file"}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-xl font-semibold text-sky-800 mb-2">Drag & drop your video file here</p>
                <p className="text-sky-600">or click to browse</p>
              </div>

              <div className="inline-flex items-center px-4 py-2 bg-sky-100 rounded-full text-sm text-sky-700">
                <Video className="w-4 h-4 mr-2" />
                Supports MP4, MOV, AVI, WebM up to 100MB
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* File requirements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 text-center">
          <Video className="w-5 h-5 text-sky-500 mx-auto mb-2" />
          <p className="font-medium text-sky-800">Video Formats</p>
          <p className="text-sky-600">MP4, MOV, AVI, WebM</p>
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 text-center">
          <Upload className="w-5 h-5 text-sky-500 mx-auto mb-2" />
          <p className="font-medium text-sky-800">Max File Size</p>
          <p className="text-sky-600">100MB per file</p>
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 text-center">
          <CheckCircle className="w-5 h-5 text-sky-500 mx-auto mb-2" />
          <p className="font-medium text-sky-800">Best Quality</p>
          <p className="text-sky-600">1080p or higher</p>
        </div>
      </div>
    </div>
  )
}
