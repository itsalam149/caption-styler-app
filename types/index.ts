export interface Caption {
  id: number;
  text: string;
  startTime: number;
  endTime: number;
  x: number; // position percentage from left
  y: number;
  fontSize: number;
  color: string;
  backgroundColor: string;
  fontFamily: string;
  fontWeight?: string;
  shadow?: boolean;
}

export interface VideoFile {
  file: File
  url: string
  duration: number
}

export interface ProcessingStatus {
  status: "idle" | "processing" | "completed" | "error"
  progress: number
  message: string
}

export interface StylePreset {
  name: string
  fontSize: number
  fontFamily: string
  color: string
  backgroundColor: string
  position: { x: number; y: number }
}
