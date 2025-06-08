/**
 * Replace em-dash (—), en-dash (–), and optionally three-em dash (⸻) with simple hyphen (-)
 * Replace smart quotes (" ") with regular quotes (")
 * Replace smart apostrophes (' ') with regular apostrophes (')
 */
export function replaceDashesAndQuotes(text: string, removeSectionBreaks: boolean = true): string {
  const dashPattern = removeSectionBreaks ? /[—–⸻]/g : /[—–]/g
  return text
    .replace(dashPattern, '-')
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
}

/**
 * Comprehensive emoji removal covering all Unicode ranges
 */
export function removeEmoji(text: string): string {
  return text
    // Remove emoji with skin tone modifiers and ZWJ sequences first
    .replace(/[\u{1F3FB}-\u{1F3FF}]|[\u{200D}]/gu, '')
    // Main emoji ranges with optional variation selectors
    .replace(/[\u{1F600}-\u{1F64F}][\u{FE0E}\u{FE0F}]?/gu, '') // Emoticons
    .replace(/[\u{1F300}-\u{1F5FF}][\u{FE0E}\u{FE0F}]?/gu, '') // Misc Symbols and Pictographs
    .replace(/[\u{1F680}-\u{1F6FF}][\u{FE0E}\u{FE0F}]?/gu, '') // Transport and Map
    .replace(/[\u{1F700}-\u{1F77F}][\u{FE0E}\u{FE0F}]?/gu, '') // Alchemical Symbols
    .replace(/[\u{1F780}-\u{1F7FF}][\u{FE0E}\u{FE0F}]?/gu, '') // Geometric Shapes Extended
    .replace(/[\u{1F800}-\u{1F8FF}][\u{FE0E}\u{FE0F}]?/gu, '') // Supplemental Arrows-C
    .replace(/[\u{1F900}-\u{1F9FF}][\u{FE0E}\u{FE0F}]?/gu, '') // Supplemental Symbols and Pictographs
    .replace(/[\u{1FA00}-\u{1FA6F}][\u{FE0E}\u{FE0F}]?/gu, '') // Chess Symbols
    .replace(/[\u{1FA70}-\u{1FAFF}][\u{FE0E}\u{FE0F}]?/gu, '') // Symbols and Pictographs Extended-A
    .replace(/[\u{2600}-\u{26FF}][\u{FE0E}\u{FE0F}]?/gu, '')   // Miscellaneous Symbols
    .replace(/[\u{2700}-\u{27BF}][\u{FE0E}\u{FE0F}]?/gu, '')   // Dingbats
    .replace(/[\u{1F1E0}-\u{1F1FF}][\u{FE0E}\u{FE0F}]?/gu, '') // Regional Indicator Symbols (flags)
    // Keycap sequences (0️⃣-9️⃣, #️⃣, *️⃣)
    .replace(/[0-9#*][\u{FE0F}]?[\u{20E3}]/gu, '')
    // Remove any remaining variation selectors and joiners
    .replace(/[\u{FE0E}\u{FE0F}\u{200D}]/gu, '')
    // Clean up multiple spaces that result from emoji removal (but preserve line breaks)
    .replace(/[ \t]{2,}/g, ' ')
    // Clean up spaces around punctuation that might be left
    .replace(/[ \t]+([,.!?;:])/g, '$1')
    .replace(/([,.!?;:])[ \t]+/g, '$1 ')
}

/**
 * Clean up excessive whitespace while preserving line breaks
 */
export function cleanupWhitespace(text: string): string {
  return text
    // Replace multiple spaces/tabs/unicode spaces with single space
    .replace(/[ \t\u00A0\u2000-\u200B\u2028\u2029\u3000]+/g, ' ')
    // Clean up spaces around line breaks
    .replace(/[ \t\u00A0\u2000-\u200B\u2028\u2029\u3000]*\n[ \t\u00A0\u2000-\u200B\u2028\u2029\u3000]*/g, '\n')
    // Remove leading and trailing whitespace
    .trim()
}

/**
 * Main text processing function that orchestrates all transformations
 */
export function processText(
  text: string, 
  shouldRemoveEmoji: boolean = false, 
  shouldRemoveSectionBreaks: boolean = true
): string {
  if (!text.trim()) return ''
  
  // Step 1: Replace dashes and quotes
  let result = replaceDashesAndQuotes(text, shouldRemoveSectionBreaks)
  
  // Step 2: Optionally remove emoji
  if (shouldRemoveEmoji) {
    result = removeEmoji(result)
  }
  
  // Step 3: Clean up whitespace
  result = cleanupWhitespace(result)
  
  return result
} 