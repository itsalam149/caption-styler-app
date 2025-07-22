export interface ASSStyle {
  name: string;
  fontName: string;
  fontSize: number;
  primaryColor: string;
  secondaryColor: string;
  outlineColor: string;
  backColor: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikeOut: boolean;
  scaleX: number;
  scaleY: number;
  spacing: number;
  angle: number;
  borderStyle: number;
  outline: number;
  shadow: number;
  alignment: number;
  marginL: number;
  marginR: number;
  marginV: number;
  encoding: number;
}

export interface ASSEvent {
  layer: number;
  start: number;
  end: number;
  style: string;
  name: string;
  marginL: number;
  marginR: number;
  marginV: number;
  effect: string;
  text: string;
}

export interface ASSFile {
  styles: ASSStyle[];
  events: ASSEvent[];
}

export class ASSParser {
  static parse(content: string): ASSFile {
    const lines = content.split("\n").map((line) => line.trim());
    const styles: ASSStyle[] = [];
    const events: ASSEvent[] = [];

    let currentSection = "";
    let styleFormat: string[] = [];
    let eventFormat: string[] = [];

    for (const line of lines) {
      if (line.startsWith("[") && line.endsWith("]")) {
        currentSection = line.slice(1, -1).toLowerCase();
        continue;
      }

      if (line.startsWith("Format:")) {
        const format = line.substring(7).split(",").map((s) => s.trim());
        if (currentSection === "v4+ styles") styleFormat = format;
        if (currentSection === "events") eventFormat = format;
        continue;
      }

      if (line.startsWith("Style:") && currentSection === "v4+ styles") {
        const values = line.substring(6).split(",").map((s) => s.trim());
        const style = this.parseStyle(styleFormat, values);
        if (style) styles.push(style);
      }

      if (line.startsWith("Dialogue:") && currentSection === "events") {
        const values = this.parseDialogueLine(line);
        const event = this.parseEvent(eventFormat, values);
        if (event) events.push(event);
      }
    }

    return { styles, events };
  }

  private static parseDialogueLine(line: string): string[] {
    const parts = line.substring(9).split(",");
    const result: string[] = [];

    for (let i = 0; i < 9 && i < parts.length; i++) {
      result.push(parts[i].trim());
    }

    if (parts.length > 9) {
      result.push(parts.slice(9).join(",").trim());
    }

    return result;
  }

  private static parseStyle(format: string[], values: string[]): ASSStyle | null {
    if (format.length !== values.length) return null;
    const style: Partial<ASSStyle> = {};

    for (let i = 0; i < format.length; i++) {
      const key = format[i].toLowerCase();
      const value = values[i];

      switch (key) {
        case "name": style.name = value; break;
        case "fontname": style.fontName = value; break;
        case "fontsize": style.fontSize = parseFloat(value); break;
        case "primarycolour": style.primaryColor = this.parseColor(value); break;
        case "secondarycolour": style.secondaryColor = this.parseColor(value); break;
        case "outlinecolour": style.outlineColor = this.parseColor(value); break;
        case "backcolour": style.backColor = this.parseColor(value); break;
        case "bold": style.bold = value === "1" || value === "-1"; break;
        case "italic": style.italic = value === "1" || value === "-1"; break;
        case "underline": style.underline = value === "1" || value === "-1"; break;
        case "strikeout": style.strikeOut = value === "1" || value === "-1"; break;
        case "scalex": style.scaleX = parseFloat(value); break;
        case "scaley": style.scaleY = parseFloat(value); break;
        case "spacing": style.spacing = parseFloat(value); break;
        case "angle": style.angle = parseFloat(value); break;
        case "borderstyle": style.borderStyle = parseInt(value); break;
        case "outline": style.outline = parseFloat(value); break;
        case "shadow": style.shadow = parseFloat(value); break;
        case "alignment": style.alignment = parseInt(value); break;
        case "marginl": style.marginL = parseInt(value); break;
        case "marginr": style.marginR = parseInt(value); break;
        case "marginv": style.marginV = parseInt(value); break;
        case "encoding": style.encoding = parseInt(value); break;
      }
    }

    return style as ASSStyle;
  }

  private static parseEvent(format: string[], values: string[]): ASSEvent | null {
    if (format.length > values.length) return null;
    const event: Partial<ASSEvent> = {};

    for (let i = 0; i < format.length && i < values.length; i++) {
      const key = format[i].toLowerCase();
      const value = values[i];

      switch (key) {
        case "layer": event.layer = parseInt(value) || 0; break;
        case "start": event.start = this.parseTime(value); break;
        case "end": event.end = this.parseTime(value); break;
        case "style": event.style = value; break;
        case "name": event.name = value; break;
        case "marginl": event.marginL = parseInt(value) || 0; break;
        case "marginr": event.marginR = parseInt(value) || 0; break;
        case "marginv": event.marginV = parseInt(value) || 0; break;
        case "effect": event.effect = value; break;
        case "text": event.text = this.parseInlineText(value); break;
      }
    }

    return event as ASSEvent;
  }

  private static parseInlineText(text: string): string {
    let cleanText = text.replace(/\{[^}]*\}/g, "");
    cleanText = cleanText.replace(/\\N/g, "\n");
    return cleanText.trim();
  }

  private static parseColor(color: string): string {
    if (!color) return "rgb(255, 255, 255)";
    color = color.trim();
    if (color.startsWith("&H")) {
      const hex = color.slice(2).padStart(8, "0");
      const bb = parseInt(hex.slice(2, 4), 16);
      const gg = parseInt(hex.slice(4, 6), 16);
      const rr = parseInt(hex.slice(6, 8), 16);
      return `rgb(${rr}, ${gg}, ${bb})`;
    }
    const num = parseInt(color);
    const r = num & 0xff;
    const g = (num >> 8) & 0xff;
    const b = (num >> 16) & 0xff;
    return `rgb(${r}, ${g}, ${b})`;
  }

  private static parseTime(time: string): number {
    const parts = time.split(":");
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const secondsParts = parts[2].split(".");
    const seconds = parseInt(secondsParts[0]);
    const centiseconds = parseInt(secondsParts[1] || "0");
    return hours * 3600 + minutes * 60 + seconds + centiseconds / 100;
  }

  private static convertASSColor(assColor: string): string {
    if (!assColor) return "#ffffff";
    const match = assColor.match(/&H([0-9A-Fa-f]{6,8})/);
    if (!match) return "#ffffff";
    const hex = match[1].padStart(8, "0");
    const bb = parseInt(hex.slice(2, 4), 16);
    const gg = parseInt(hex.slice(4, 6), 16);
    const rr = parseInt(hex.slice(6, 8), 16);
    return `rgb(${rr}, ${gg}, ${bb})`;
  }

  private static extractInlineStyle(text: string) {
    const style: any = {};
    const fontMatch = text.match(/\\fn([^\\}]+)/);
    if (fontMatch) style.fontFamily = fontMatch[1].trim();

    const sizeMatch = text.match(/\\fs(\d+)/);
    if (sizeMatch) style.fontSize = parseInt(sizeMatch[1]);

    const colorMatch = text.match(/\\c&H([0-9A-Fa-f]{6,8})/);
    if (colorMatch) style.color = this.convertASSColor(`&H${colorMatch[1]}`);

    if (/\\b1/.test(text)) style.fontWeight = "bold";
    if (/\\i1/.test(text)) style.fontStyle = "italic";
    if (/\\shad0/.test(text)) style.shadow = false;
    if (/\\shad1/.test(text)) style.shadow = true;

    return style;
  }

  static convertToCaption(assFile: ASSFile) {
    return assFile.events.map((event, index) => {
      const style = assFile.styles.find((s) => s.name === event.style) || assFile.styles[0];
      const inlineStyle = this.extractInlineStyle(event.text);

      return {
        id: index + 1,
        text: this.parseInlineText(event.text),
        startTime: event.start,
        endTime: event.end,
        x: 50,
        y: 85,
        fontSize: inlineStyle.fontSize || style?.fontSize || 40,
        color: inlineStyle.color || this.convertASSColor(style?.primaryColor) || "#ffffff",
        backgroundColor: inlineStyle.backgroundColor || "rgba(0, 0, 0, 0.8)",
        fontFamily: inlineStyle.fontFamily || style?.fontName || "Poppins",
        fontWeight: inlineStyle.fontWeight || (style?.bold ? "bold" : "normal"),
        fontStyle: inlineStyle.fontStyle || (style?.italic ? "italic" : "normal"),
        shadow: inlineStyle.shadow !== undefined ? inlineStyle.shadow : true,
      };
    });
  }
}
