export interface ASSStyle {
  name: string
  fontName: string
  fontSize: number
  primaryColor: string
  secondaryColor: string
  outlineColor: string
  backColor: string
  bold: boolean
  italic: boolean
  underline: boolean
  strikeOut: boolean
  scaleX: number
  scaleY: number
  spacing: number
  angle: number
  borderStyle: number
  outline: number
  shadow: number
  alignment: number
  marginL: number
  marginR: number
  marginV: number
  encoding: number
}

export interface ASSEvent {
  layer: number
  start: number
  end: number
  style: string
  name: string
  marginL: number
  marginR: number
  marginV: number
  effect: string
  text: string
}

export interface ASSFile {
  styles: ASSStyle[]
  events: ASSEvent[]
}

export class ASSParser {
  static parse(content: string): ASSFile {
    const lines = content.split("\n").map((line) => line.trim())
    const styles: ASSStyle[] = []
    const events: ASSEvent[] = []

    let currentSection = ""
    let styleFormat: string[] = []
    let eventFormat: string[] = []

    for (const line of lines) {
      if (line.startsWith("[") && line.endsWith("]")) {
        currentSection = line.slice(1, -1).toLowerCase()
        continue
      }

      if (line.startsWith("Format:")) {
        const format = line
          .substring(7)
          .split(",")
          .map((s) => s.trim())
        if (currentSection === "v4+ styles") {
          styleFormat = format
        } else if (currentSection === "events") {
          eventFormat = format
        }
        continue
      }

      if (line.startsWith("Style:") && currentSection === "v4+ styles") {
        const values = line
          .substring(6)
          .split(",")
          .map((s) => s.trim())
        const style = this.parseStyle(styleFormat, values)
        if (style) styles.push(style)
      }

      if (line.startsWith("Dialogue:") && currentSection === "events") {
        const values = this.parseDialogueLine(line)
        const event = this.parseEvent(eventFormat, values)
        if (event) events.push(event)
      }
    }

    return { styles, events }
  }

  private static parseDialogueLine(line: string): string[] {
    // Handle dialogue lines with inline formatting
    const parts = line.substring(9).split(",")
    const result: string[] = []

    // Take first 9 parts as they are (Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect)
    for (let i = 0; i < 9 && i < parts.length; i++) {
      result.push(parts[i].trim())
    }

    // Join the rest as the text part (may contain commas)
    if (parts.length > 9) {
      result.push(parts.slice(9).join(",").trim())
    }

    return result
  }

  private static parseStyle(format: string[], values: string[]): ASSStyle | null {
    if (format.length !== values.length) return null

    const style: Partial<ASSStyle> = {}

    for (let i = 0; i < format.length; i++) {
      const key = format[i].toLowerCase()
      const value = values[i]

      switch (key) {
        case "name":
          style.name = value
          break
        case "fontname":
          style.fontName = value
          break
        case "fontsize":
          style.fontSize = Number.parseInt(value)
          break
        case "primarycolour":
          style.primaryColor = this.parseColor(value)
          break
        case "secondarycolour":
          style.secondaryColor = this.parseColor(value)
          break
        case "outlinecolour":
          style.outlineColor = this.parseColor(value)
          break
        case "backcolour":
          style.backColor = this.parseColor(value)
          break
        case "bold":
          style.bold = value === "1" || value === "-1"
          break
        case "italic":
          style.italic = value === "1" || value === "-1"
          break
        case "underline":
          style.underline = value === "1" || value === "-1"
          break
        case "strikeout":
          style.strikeOut = value === "1" || value === "-1"
          break
        case "scalex":
          style.scaleX = Number.parseFloat(value)
          break
        case "scaley":
          style.scaleY = Number.parseFloat(value)
          break
        case "spacing":
          style.spacing = Number.parseFloat(value)
          break
        case "angle":
          style.angle = Number.parseFloat(value)
          break
        case "borderstyle":
          style.borderStyle = Number.parseInt(value)
          break
        case "outline":
          style.outline = Number.parseFloat(value)
          break
        case "shadow":
          style.shadow = Number.parseFloat(value)
          break
        case "alignment":
          style.alignment = Number.parseInt(value)
          break
        case "marginl":
          style.marginL = Number.parseInt(value)
          break
        case "marginr":
          style.marginR = Number.parseInt(value)
          break
        case "marginv":
          style.marginV = Number.parseInt(value)
          break
        case "encoding":
          style.encoding = Number.parseInt(value)
          break
      }
    }

    return style as ASSStyle
  }

  private static parseEvent(format: string[], values: string[]): ASSEvent | null {
    if (format.length > values.length) return null

    const event: Partial<ASSEvent> = {}

    for (let i = 0; i < format.length && i < values.length; i++) {
      const key = format[i].toLowerCase()
      const value = values[i]

      switch (key) {
        case "layer":
          event.layer = Number.parseInt(value) || 0
          break
        case "start":
          event.start = this.parseTime(value)
          break
        case "end":
          event.end = this.parseTime(value)
          break
        case "style":
          event.style = value
          break
        case "name":
          event.name = value
          break
        case "marginl":
          event.marginL = Number.parseInt(value) || 0
          break
        case "marginr":
          event.marginR = Number.parseInt(value) || 0
          break
        case "marginv":
          event.marginV = Number.parseInt(value) || 0
          break
        case "effect":
          event.effect = value
          break
        case "text":
          event.text = this.parseInlineText(value)
          break
      }
    }

    return event as ASSEvent
  }

  private static parseInlineText(text: string): string {
    // Parse inline ASS formatting and extract clean text
    // Remove ASS override tags like {\fnPoppins SemiBold\fs40\c&HFFFFFF\shad1}
    let cleanText = text.replace(/\{[^}]*\}/g, "")

    // Replace \\N with actual line breaks
    cleanText = cleanText.replace(/\\N/g, "\n")

    return cleanText.trim()
  }

  private static parseColor(color: string): string {
    // ASS colors are in BGR format (Blue-Green-Red) as decimal or hex
    if (color.startsWith("&H")) {
      // Hex format: &H00BBGGRR
      const hex = color.substring(2)
      const b = Number.parseInt(hex.substring(2, 4), 16)
      const g = Number.parseInt(hex.substring(4, 6), 16)
      const r = Number.parseInt(hex.substring(6, 8), 16)
      return `rgb(${r}, ${g}, ${b})`
    } else {
      // Decimal format
      const num = Number.parseInt(color)
      const r = num & 0xff
      const g = (num >> 8) & 0xff
      const b = (num >> 16) & 0xff
      return `rgb(${r}, ${g}, ${b})`
    }
  }

  private static parseTime(time: string): number {
    // Format: H:MM:SS.CC
    const parts = time.split(":")
    const hours = Number.parseInt(parts[0])
    const minutes = Number.parseInt(parts[1])
    const secondsParts = parts[2].split(".")
    const seconds = Number.parseInt(secondsParts[0])
    const centiseconds = Number.parseInt(secondsParts[1] || "0")

    return hours * 3600 + minutes * 60 + seconds + centiseconds / 100
  }

  private static cleanText(text: string): string {
    // Remove ASS formatting tags
    return text.replace(/\{[^}]*\}/g, "").replace(/\\N/g, "\n")
  }

  static convertToCaption(assFile: ASSFile) {
    return assFile.events.map((event, index) => {
      const style = assFile.styles.find((s) => s.name === event.style) || assFile.styles[0]

      // Extract styling from inline formatting if available
      const inlineStyle = this.extractInlineStyle(event.text)

      return {
        id: index + 1,
        text: this.parseInlineText(event.text),
        startTime: event.start,
        endTime: event.end,
        x: 50, // Center by default
        y: 85, // Bottom by default
        fontSize: inlineStyle.fontSize || style?.fontSize || 40,
        color: inlineStyle.color || this.convertASSColor(style?.primaryColor) || "#ffffff",
        backgroundColor: inlineStyle.backgroundColor || "rgba(0, 0, 0, 0.8)",
        fontFamily: inlineStyle.fontFamily || style?.fontName || "Poppins",
        fontWeight: inlineStyle.fontWeight || (style?.bold ? "bold" : "normal"),
        fontStyle: inlineStyle.fontStyle || (style?.italic ? "italic" : "normal"),
        shadow: inlineStyle.shadow || true,
      }
    })
  }

  private static extractInlineStyle(text: string) {
    const style: any = {}

    // Extract font name
    const fontMatch = text.match(/\\fn([^\\}]+)/)
    if (fontMatch) {
      style.fontFamily = fontMatch[1].trim()
    }

    // Extract font size
    const sizeMatch = text.match(/\\fs(\d+)/)
    if (sizeMatch) {
      style.fontSize = Number.parseInt(sizeMatch[1])
    }

    // Extract color
    const colorMatch = text.match(/\\c&H([0-9A-Fa-f]{6})/)
    if (colorMatch) {
      style.color = this.convertASSColor(colorMatch[1])
    }

    // Extract bold
    const boldMatch = text.match(/\\b1/)
    if (boldMatch) {
      style.fontWeight = "bold"
    }

    // Extract italic
    const italicMatch = text.match(/\\i1/)
    if (italicMatch) {
      style.fontStyle = "italic"
    }

    // Extract shadow
    const shadowMatch = text.match(/\\shad([01])/)
    if (shadowMatch) {
      style.shadow = shadowMatch[1] === "1"
    }

    return style
  }

  private static convertASSColor(assColor: string): string {
    if (!assColor) return "#ffffff"

    // ASS colors are in BGR format
    if (assColor.length === 6) {
      const b = Number.parseInt(assColor.substring(0, 2), 16)
      const g = Number.parseInt(assColor.substring(2, 4), 16)
      const r = Number.parseInt(assColor.substring(4, 6), 16)
      return `rgb(${r}, ${g}, ${b})`
    }

    return "#ffffff"
  }
}
