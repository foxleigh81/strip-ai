import { useState, useCallback, useMemo, lazy, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

// Lazy load icons to reduce initial bundle size
const Copy = lazy(() => import('lucide-react').then(mod => ({ default: mod.Copy })))
const Wand2 = lazy(() => import('lucide-react').then(mod => ({ default: mod.Wand2 })))
const RotateCcw = lazy(() => import('lucide-react').then(mod => ({ default: mod.RotateCcw })))

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [copied, setCopied] = useState(false)

  const processText = useCallback(() => {
    // Replace em-dash (—) and en-dash (–) with simple hyphen (-)
    // Replace smart quotes (" ") with regular quotes (")
    const result = inputText.replace(/[—–]/g, '-').replace(/[“”]/g, '"').replace(/['']/g, "'");
    setOutputText(result)
  }, [inputText])

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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Strip AI</h1>
          <p className="text-lg text-gray-600">
            Replace em-dash, en-dash, and smart quotes with simple characters
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
                placeholder="Paste your text here with em-dashes (—), en-dashes (–), or smart quotes..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="min-h-[200px] resize-none"
                aria-describedby="input-help"
              />
              <p id="input-help" className="text-sm text-muted-foreground">
                Paste text containing em-dashes (—), en-dashes (–), or smart quotes that you want to
                replace
              </p>
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
              Click to replace all em-dashes, en-dashes, and smart quotes with regular characters
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
          <div className="grid gap-4 md:grid-cols-4 text-sm text-gray-600">
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
              <p>Curved quotation marks (“ ”) often added by word processors</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Regular Characters</h3>
              <p>Standard ASCII characters (- ") for universal compatibility</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App