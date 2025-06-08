import { describe, it, expect } from 'vitest'
import { 
  replaceDashesAndQuotes, 
  removeEmoji, 
  cleanupWhitespace, 
  processText 
} from '../textProcessing'

describe('replaceDashesAndQuotes', () => {
  it('should replace em-dash with hyphen', () => {
    const input = 'This is an em-dash — example'
    const expected = 'This is an em-dash - example'
    expect(replaceDashesAndQuotes(input)).toBe(expected)
  })

  it('should replace en-dash with hyphen', () => {
    const input = 'Pages 10–20 are important'
    const expected = 'Pages 10-20 are important'
    expect(replaceDashesAndQuotes(input)).toBe(expected)
  })

  it('should replace three-em dash with hyphen', () => {
    const input = 'Section break ⸻ new section'
    const expected = 'Section break - new section'
    expect(replaceDashesAndQuotes(input)).toBe(expected)
  })

  it('should replace smart quotes with regular quotes', () => {
    const input = '"Hello world" and "another quote"'
    const expected = '"Hello world" and "another quote"'
    expect(replaceDashesAndQuotes(input)).toBe(expected)
  })

  it('should replace smart apostrophes with regular apostrophes', () => {
    const input = "It's a beautiful day and won't rain"
    const expected = "It's a beautiful day and won't rain"
    expect(replaceDashesAndQuotes(input)).toBe(expected)
  })

  it('should handle multiple replacements in one string', () => {
    const input = '"This is a test" — with em-dash – and en-dash'
    const expected = '"This is a test" - with em-dash - and en-dash'
    expect(replaceDashesAndQuotes(input)).toBe(expected)
  })

  it('should handle empty string', () => {
    expect(replaceDashesAndQuotes('')).toBe('')
  })
})

describe('removeEmoji', () => {
  it('should remove basic emoticons', () => {
    const input = 'Hello 😊 world 🎉'
    const expected = 'Hello world '
    expect(removeEmoji(input)).toBe(expected)
  })

  it('should remove complex emoji with skin tones', () => {
    const input = 'Hi 👋🏽 there 👨🏻‍💻'
    const expected = 'Hi there '
    expect(removeEmoji(input)).toBe(expected)
  })

  it('should remove numbered emoji', () => {
    const input = 'Step 1️⃣ then step 2️⃣'
    const expected = 'Step then step '
    expect(removeEmoji(input)).toBe(expected)
  })

  it('should remove flags', () => {
    const input = 'Visit 🇺🇸 and 🇬🇧'
    const expected = 'Visit and '
    expect(removeEmoji(input)).toBe(expected)
  })

  it('should remove object emoji', () => {
    const input = 'I need 🧠 power and 🔋 energy'
    const expected = 'I need power and energy'
    expect(removeEmoji(input)).toBe(expected)
  })

  it('should clean up spaces around punctuation after emoji removal', () => {
    const input = 'Hello 😊, world 🎉!'
    const expected = 'Hello, world!'
    expect(removeEmoji(input)).toBe(expected)
  })

  it('should preserve line breaks', () => {
    const input = 'Line 1 😊\nLine 2 🎉\nLine 3'
    const expected = 'Line 1 \nLine 2 \nLine 3'
    expect(removeEmoji(input)).toBe(expected)
  })

  it('should handle empty string', () => {
    expect(removeEmoji('')).toBe('')
  })

  it('should handle text with no emoji', () => {
    const input = 'Just regular text here'
    expect(removeEmoji(input)).toBe(input)
  })
})

describe('cleanupWhitespace', () => {
  it('should replace multiple spaces with single space', () => {
    const input = 'Hello     world'
    const expected = 'Hello world'
    expect(cleanupWhitespace(input)).toBe(expected)
  })

  it('should replace tabs with single space', () => {
    const input = 'Hello\t\t\tworld'
    const expected = 'Hello world'
    expect(cleanupWhitespace(input)).toBe(expected)
  })

  it('should preserve line breaks', () => {
    const input = 'Line 1\nLine 2\nLine 3'
    const expected = 'Line 1\nLine 2\nLine 3'
    expect(cleanupWhitespace(input)).toBe(expected)
  })

  it('should clean spaces around line breaks', () => {
    const input = 'Line 1   \n   Line 2'
    const expected = 'Line 1\nLine 2'
    expect(cleanupWhitespace(input)).toBe(expected)
  })

  it('should trim leading and trailing whitespace', () => {
    const input = '   Hello world   '
    const expected = 'Hello world'
    expect(cleanupWhitespace(input)).toBe(expected)
  })

  it('should handle Unicode spaces', () => {
    const input = 'Hello\u00A0\u2000\u2001world'
    const expected = 'Hello world'
    expect(cleanupWhitespace(input)).toBe(expected)
  })

  it('should handle empty string', () => {
    expect(cleanupWhitespace('')).toBe('')
  })

  it('should handle string with only whitespace', () => {
    const input = '   \t\t   '
    const expected = ''
    expect(cleanupWhitespace(input)).toBe(expected)
  })
})

describe('processText', () => {
  it('should process text without emoji removal', () => {
    const input = '"Hello world" — this is a test   with extra spaces'
    const expected = '"Hello world" - this is a test with extra spaces'
    expect(processText(input, false)).toBe(expected)
  })

  it('should process text with emoji removal', () => {
    const input = '"Hello 😊 world" — this is a test 🎉   with extra spaces'
    const expected = '"Hello world" - this is a test with extra spaces'
    expect(processText(input, true)).toBe(expected)
  })

  it('should handle complex text with all features', () => {
    const input = `"Smart quotes" and 'apostrophes' — em-dash – en-dash ⸻ three-em
    Multiple    spaces and 🧠 emoji 🎉
    Line breaks should be preserved`
    
    const expectedWithoutEmoji = `"Smart quotes" and 'apostrophes' - em-dash - en-dash - three-em
Multiple spaces and 🧠 emoji 🎉
Line breaks should be preserved`

    const expectedWithEmoji = `"Smart quotes" and 'apostrophes' - em-dash - en-dash - three-em
Multiple spaces and emoji
Line breaks should be preserved`

    expect(processText(input, false)).toBe(expectedWithoutEmoji)
    expect(processText(input, true)).toBe(expectedWithEmoji)
  })

  it('should handle empty string', () => {
    expect(processText('', false)).toBe('')
    expect(processText('', true)).toBe('')
  })

  it('should handle whitespace-only string', () => {
    const input = '   \t\t   '
    expect(processText(input, false)).toBe('')
    expect(processText(input, true)).toBe('')
  })

  it('should preserve paragraph structure', () => {
    const input = `Paragraph 1 — with em-dash 😊

Paragraph 2 – with en-dash 🎉

Paragraph 3`

    const expected = `Paragraph 1 - with em-dash

Paragraph 2 - with en-dash

Paragraph 3`

    expect(processText(input, true)).toBe(expected)
  })
}) 