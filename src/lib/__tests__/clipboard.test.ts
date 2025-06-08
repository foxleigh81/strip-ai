import { describe, it, expect, vi, beforeEach } from 'vitest'
import { copyToClipboard } from '../clipboard'

// Mock the clipboard API
const mockWriteText = vi.fn()

beforeEach(() => {
  // Reset mocks before each test
  mockWriteText.mockReset()
  
  // Mock navigator.clipboard
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: mockWriteText,
    },
    writable: true,
  })
})

describe('copyToClipboard', () => {
  it('should copy text to clipboard successfully', async () => {
    mockWriteText.mockResolvedValue(undefined)
    
    const text = 'Hello, world!'
    const result = await copyToClipboard(text)
    
    expect(mockWriteText).toHaveBeenCalledWith(text)
    expect(result).toBe(true)
  })

  it('should handle clipboard write failure', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    mockWriteText.mockRejectedValue(new Error('Clipboard access denied'))
    
    const text = 'Hello, world!'
    const result = await copyToClipboard(text)
    
    expect(mockWriteText).toHaveBeenCalledWith(text)
    expect(result).toBe(false)
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to copy text: ', expect.any(Error))
    
    consoleErrorSpy.mockRestore()
  })

  it('should handle empty string', async () => {
    mockWriteText.mockResolvedValue(undefined)
    
    const result = await copyToClipboard('')
    
    expect(mockWriteText).toHaveBeenCalledWith('')
    expect(result).toBe(true)
  })

  it('should handle long text', async () => {
    mockWriteText.mockResolvedValue(undefined)
    
    const longText = 'Lorem ipsum '.repeat(1000)
    const result = await copyToClipboard(longText)
    
    expect(mockWriteText).toHaveBeenCalledWith(longText)
    expect(result).toBe(true)
  })

  it('should handle special characters', async () => {
    mockWriteText.mockResolvedValue(undefined)
    
    const specialText = 'Special chars: 🎉 — " \n\t'
    const result = await copyToClipboard(specialText)
    
    expect(mockWriteText).toHaveBeenCalledWith(specialText)
    expect(result).toBe(true)
  })
}) 