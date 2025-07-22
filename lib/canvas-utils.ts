export class CanvasUtils {
  static drawVideoFrame(canvas: HTMLCanvasElement, video: HTMLVideoElement, captions: any[], currentTime: number) {
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Get visible captions
    const visibleCaptions = captions.filter(
      (caption) => currentTime >= caption.startTime && currentTime <= caption.endTime,
    )

    // Draw captions
    visibleCaptions.forEach((caption) => {
      this.drawCaption(ctx, caption, canvas.width, canvas.height)
    })
  }

  static drawCaption(ctx: CanvasRenderingContext2D, caption: any, canvasWidth: number, canvasHeight: number) {
    const x = (caption.x / 100) * canvasWidth
    const y = (caption.y / 100) * canvasHeight

    // Set font
    ctx.font = `${caption.fontSize}px ${caption.fontFamily}`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Measure text
    const textMetrics = ctx.measureText(caption.text)
    const textWidth = textMetrics.width
    const textHeight = caption.fontSize

    // Draw background
    ctx.fillStyle = caption.backgroundColor
    ctx.fillRect(x - textWidth / 2 - 10, y - textHeight / 2 - 5, textWidth + 20, textHeight + 10)

    // Draw text
    ctx.fillStyle = caption.color
    ctx.fillText(caption.text, x, y)
  }

  static exportFrame(canvas: HTMLCanvasElement): string {
    return canvas.toDataURL("image/png")
  }

  static async exportVideo(
    canvas: HTMLCanvasElement,
    video: HTMLVideoElement,
    captions: any[],
    duration: number,
  ): Promise<Blob> {
    const stream = canvas.captureStream(30) // 30 FPS
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm;codecs=vp9",
    })

    const chunks: Blob[] = []

    return new Promise((resolve) => {
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" })
        resolve(blob)
      }

      mediaRecorder.start()

      // Simulate video playback and recording
      let currentTime = 0
      const interval = setInterval(() => {
        if (currentTime >= duration) {
          clearInterval(interval)
          mediaRecorder.stop()
          return
        }

        video.currentTime = currentTime
        this.drawVideoFrame(canvas, video, captions, currentTime)
        currentTime += 1 / 30 // 30 FPS
      }, 1000 / 30)
    })
  }
}
