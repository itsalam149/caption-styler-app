import { UploadForm } from "@/components/upload/upload-form"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Upload Your Videos</h1>
            <p className="text-xl text-gray-600">
              Provide a reference video with styled captions and your input video to get started
            </p>
          </div>
          <UploadForm />
        </div>
      </div>
    </div>
  )
}
