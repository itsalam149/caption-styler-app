"use client";

import { forwardRef, useRef } from "react";
import { motion } from "framer-motion";

interface Caption {
  id: number;
  text: string;
  startTime: number;
  endTime: number;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  backgroundColor: string;
  fontFamily: string;
  fontWeight?: string;
  shadow?: boolean;
}

interface VideoCanvasProps {
  captions: Caption[];
  currentTime: number;
  onTimeUpdate: () => void;
  onLoadedMetadata: () => void;
  onCaptionSelect: (id: number | null) => void;
  onCaptionUpdate: (id: number, updates: Partial<Caption>) => void;
  videoUrl?: string;
}

export const VideoCanvas = forwardRef<HTMLVideoElement, VideoCanvasProps>(
  (
    {
      captions,
      currentTime,
      onTimeUpdate,
      onLoadedMetadata,
      onCaptionSelect,
      onCaptionUpdate,
      videoUrl,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const fallbackSrc =
      "";

    return (
      <div ref={containerRef} className="relative bg-black rounded-lg overflow-hidden">
        <video
          ref={ref}
          className="w-full h-auto"
          crossOrigin="anonymous"
          src={videoUrl ?? fallbackSrc}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onClick={() => onCaptionSelect(null)}
        />

        <div className="absolute inset-0">
          {captions
            .filter(
              (caption) =>
                currentTime >= caption.startTime &&
                currentTime <= caption.endTime
            )
            .map((caption) => {
              const x = (caption.x / 100) * (containerRef.current?.clientWidth ?? 0);
              const y = (caption.y / 100) * (containerRef.current?.clientHeight ?? 0);

              return (
                <motion.div
                  key={caption.id}
                  drag
                  dragConstraints={containerRef}
                  onDragEnd={(event, info) => {
                    const newX =
                      (info.point.x / (containerRef.current?.clientWidth ?? 1)) * 100;
                    const newY =
                      (info.point.y / (containerRef.current?.clientHeight ?? 1)) * 100;
                    onCaptionUpdate(caption.id, { x: newX, y: newY });
                  }}
                  onMouseDown={() => onCaptionSelect(caption.id)}
                  initial={{ x, y }}
                  className={`absolute select-none px-4 py-1 rounded pointer-events-auto transition-all duration-200 ease-in-out ${caption.shadow ? "shadow-lg" : ""
                    } hover:scale-105`}
                  style={{
                    fontSize: `${caption.fontSize}px`,
                    color: caption.color,
                    backgroundColor: caption.backgroundColor,
                    fontFamily: caption.fontFamily,
                    fontWeight: caption.fontWeight ?? "normal",
                    cursor: "grab",
                  }}
                >
                  {caption.text}
                </motion.div>
              );
            })}
        </div>

        <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {Math.floor(currentTime)}s / {Math.floor(currentTime)}s
        </div>
      </div>
    );
  }
);

VideoCanvas.displayName = "VideoCanvas";
