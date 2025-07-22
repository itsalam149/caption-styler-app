"use client"

import { useState, useCallback } from "react"

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

export function useCaptionEditor(initialCaptions: Caption[] = []) {
  const [captions, setCaptions] = useState<Caption[]>(initialCaptions)
  const [selectedCaption, setSelectedCaption] = useState<number | null>(null)

  const updateCaption = useCallback((id: number, updates: Partial<Caption>) => {
    setCaptions((prev) => prev.map((cap) => (cap.id === id ? { ...cap, ...updates } : cap)))
  }, [])

  const addCaption = useCallback(
    (caption: Omit<Caption, "id">) => {
      const newId = Math.max(...captions.map((c) => c.id), 0) + 1
      setCaptions((prev) => [...prev, { ...caption, id: newId }])
    },
    [captions],
  )

  const removeCaption = useCallback(
    (id: number) => {
      setCaptions((prev) => prev.filter((cap) => cap.id !== id))
      if (selectedCaption === id) {
        setSelectedCaption(null)
      }
    },
    [selectedCaption],
  )

  const duplicateCaption = useCallback(
    (id: number) => {
      const caption = captions.find((c) => c.id === id)
      if (caption) {
        const newCaption = { ...caption, id: Math.max(...captions.map((c) => c.id)) + 1 }
        setCaptions((prev) => [...prev, newCaption])
      }
    },
    [captions],
  )

  return {
    captions,
    selectedCaption,
    setSelectedCaption,
    updateCaption,
    addCaption,
    removeCaption,
    duplicateCaption,
  }
}
