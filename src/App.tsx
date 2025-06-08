import { useState, useCallback, useMemo, lazy, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { processText } from '@/lib/textProcessing'
import { copyToClipboard } from '@/lib/clipboard'
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
  const [removeSectionBreaks, setRemoveSectionBreaks] = useState(true)

  const handleProcessText = useCallback(() => {
    const result = processText(inputText, removeEmoji, removeSectionBreaks)
    setOutputText(result)
  }, [inputText, removeEmoji, removeSectionBreaks])

  // Memoize button disabled states
  const isProcessDisabled = useMemo(() => !inputText.trim(), [inputText])
  const isCopyDisabled = useMemo(() => !outputText, [outputText])

  const handleCopyToClipboard = useCallback(async () => {
    const success = await copyToClipboard(outputText)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
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
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remove-section-breaks" 
                  checked={removeSectionBreaks}
                  onCheckedChange={(checked) => setRemoveSectionBreaks(checked === true)}
                />
                <Label 
                  htmlFor="remove-section-breaks" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Replace section breaks (⸻) with hyphens
                </Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleProcessText}
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
              Click to replace dashes, smart quotes, clean up whitespace, and optionally remove emoji or section breaks
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
              onClick={handleCopyToClipboard}
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
          <div className="grid gap-4 md:grid-cols-6 text-sm text-gray-600">
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
              <h3 className="font-medium mb-1">Section Breaks</h3>
              <p>Three-em dashes (⸻) used for section breaks - optionally replaced with hyphens</p>
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