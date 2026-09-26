export function buildThumbnailPrompt(
  title: string,
  description: string,
  style: string
) {
  return `
Create a professional YouTube thumbnail.

Title: ${title}

Description:
${description}

Style:
${style}

Requirements:
- 1280x720
- 16:9
- High contrast
- Cinematic lighting
- Bold composition
- Vibrant colors
- No watermark
- Leave space for large title text
`;
}