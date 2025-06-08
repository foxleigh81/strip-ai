import { useState, useCallback, useMemo, lazy, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import packageJson from '../package.json'

// Lazy load icons to reduce initial bundle size
const Copy = lazy(() => import('lucide-react').then(mod => ({ default: mod.Copy })))
const Wand2 = lazy(() => import('lucide-react').then(mod => ({ default: mod.Wand2 })))
const RotateCcw = lazy(() => import('lucide-react').then(mod => ({ default: mod.RotateCcw })))
const Github = lazy(() => import('lucide-react').then(mod => ({ default: mod.Github })))

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [copied, setCopied] = useState(false)
  const [removeEmoji, setRemoveEmoji] = useState(false)

  const processText = useCallback(() => {
    // Replace em-dash (—), en-dash (–), and three-em dash (⸻) with simple hyphen (-)
    // Replace smart quotes (" ") with regular quotes (")
    let result = inputText
      .replace(/[—–⸻]/g, '-')
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'");
    
    // Optionally remove emoji if checkbox is checked
    if (removeEmoji) {
      // Comprehensive emoji removal covering all Unicode ranges
      result = result
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
    
    // Automatically trim excessive whitespace (preserve line breaks)
    result = result
      .replace(/[ \t\u00A0\u2000-\u200B\u2028\u2029\u3000]+/g, ' ')  // Replace multiple spaces/tabs/unicode spaces with single space
      .replace(/[ \t\u00A0\u2000-\u200B\u2028\u2029\u3000]*\n[ \t\u00A0\u2000-\u200B\u2028\u2029\u3000]*/g, '\n')  // Clean up spaces around line breaks
      .trim()                   // Remove leading and trailing whitespace
    
    setOutputText(result)
  }, [inputText, removeEmoji])

  // Memoize button disabled states
  const isProcessDisabled = useMemo(() => !inputText.trim(), [inputText])
  const isCopyDisabled = useMemo(() => !outputText, [outputText])

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }, [outputText])

  const clearAll = useCallback(() => {
    setInputText('')
    setOutputText('')
    setCopied(false)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img 
              src="./strip-ai-logo.webp" 
              alt="Strip AI Logo" 
              className="w-12 h-12"
            />
            <h1 className="text-4xl font-bold text-gray-800">Strip AI</h1>
          </div>
          <p className="text-lg text-gray-600">
            Replace em-dash, en-dash, smart quotes, clean up whitespace, and optionally remove emoji
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input-text" className="text-base font-semibold">
                Input Text
              </Label>
              <Textarea
                id="input-text"
                placeholder="Paste your text here with em-dashes (—), en-dashes (–), smart quotes, extra whitespace, or emoji..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="min-h-[200px] resize-none"
                aria-describedby="input-help"
              />
              <p id="input-help" className="text-sm text-muted-foreground">
                Paste text containing em-dashes (—), en-dashes (–), smart quotes, extra whitespace, or emoji that you want to process
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remove-emoji" 
                  checked={removeEmoji}
                  onCheckedChange={(checked) => setRemoveEmoji(checked === true)}
                />
                <Label 
                  htmlFor="remove-emoji" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Also remove emoji 🎉 😊 🚀
                </Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={processText}
                disabled={isProcessDisabled}
                className="flex-1"
                aria-describedby="process-help"
              >
                <Suspense fallback={<div className="mr-2 h-4 w-4" />}>
                  <Wand2 className="mr-2 h-4 w-4" />
                </Suspense>
                Process Text
              </Button>
              <Button variant="outline" onClick={clearAll} aria-label="Clear all text">
                <Suspense fallback={<div className="h-4 w-4" />}>
                  <RotateCcw className="h-4 w-4" />
                </Suspense>
              </Button>
            </div>
            <p id="process-help" className="text-xs text-muted-foreground">
              Click to replace dashes, smart quotes, clean up whitespace, and optionally remove emoji
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="output-text" className="text-base font-semibold">
                Output Text
              </Label>
              <Textarea
                id="output-text"
                placeholder="Your processed text will appear here..."
                value={outputText}
                readOnly
                className="min-h-[200px] resize-none bg-muted"
                aria-describedby="output-help"
              />
              <p id="output-help" className="text-sm text-muted-foreground">
                Your text with characters replaced will appear here
              </p>
            </div>

            <Button
              onClick={copyToClipboard}
              disabled={isCopyDisabled}
              variant="secondary"
              className="w-full"
              aria-describedby="copy-help"
            >
              <Suspense fallback={<div className="mr-2 h-4 w-4" />}>
                <Copy className="mr-2 h-4 w-4" />
              </Suspense>
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </Button>
            <p id="copy-help" className="text-xs text-muted-foreground">
              Copy the processed text to your clipboard
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-white/50 p-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">About Strip AI</h2>
          <div className="grid gap-4 md:grid-cols-5 text-sm text-gray-600">
            <div>
              <h3 className="font-medium mb-1">Em-dash (—)</h3>
              <p>The longest dash, typically used for emphasis or to set off clauses</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">En-dash (–)</h3>
              <p>Medium-length dash, often used for ranges (e.g., pages 10–20)</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Smart Quotes</h3>
              <p>Curved quotation marks (" ") often added by word processors</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Whitespace Clean-up</h3>
              <p>Trims leading/trailing spaces, reduces multiple spaces to single (preserves line breaks)</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Emoji Removal</h3>
              <p>Optional removal of emoji characters for text compatibility</p>
            </div>
          </div>
        </div>
        
        <footer className="text-center py-6 border-t border-gray-200/50">
          <div className="flex flex-col items-center gap-4">
            <a 
              href="https://ko-fi.com/foxleigh81" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <img 
                src="./ko-fi-logo.webp" 
                alt="Ko-fi Logo" 
                style={{ width: '30px', height: '24px' }}
              />
              Support me on Ko-fi
            </a>
            <a 
              href="https://github.com/foxleigh81/strip-ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Suspense fallback={<div className="w-4 h-4 mr-2" />}>
                <Github className="w-4 h-4" />
              </Suspense>
              View on GitHub
            </a>
            <a 
              href="https://spacenectar.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <img 
                src="./space-nectar-logo-small.png" 
                alt="SpaceNectar Logo" 
                className="w-5 h-5"
              />
              Built by SpaceNectar
            </a>
            <div className="text-xs text-gray-500 mt-2">
              <p>© {new Date().getFullYear()} <a href="https://www.alexfoxleigh.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors">Alexander Foxleigh</a>. All rights reserved.</p>
              <p>Strip AI v{packageJson.version} • Licensed under MIT</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App