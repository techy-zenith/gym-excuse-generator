import React, { useState, useRef, useEffect, useCallback } from 'react';

// Shadcn/ui components
// Combobox for category selection
const Combobox = ({ value, onChange, options, placeholder }) => {
  const [open, setOpen] = useState(false);

  return (
    // Added a high z-index to ensure the dropdown is on top
    <div className="relative w-full z-50">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-white dark:bg-slate-800 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
      >
        <span className="text-slate-900 dark:text-slate-50">{options.find((option) => option.value === value)?.label || placeholder}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 opacity-50"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-md outline-none animate-in fade-in-80">
          <div className="max-h-96 overflow-y-auto overflow-hidden p-1">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Button component
const Button = ({ children, onClick, disabled, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 ${className}`}
  >
    {children}
  </button>
);

// Input component
const Input = ({ placeholder, value, onChange, disabled }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    disabled={disabled}
    // Added text and background color classes to ensure text is always visible
    className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-slate-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900 dark:text-slate-50"
  />
);

// Card components
const Card = ({ children, className = '' }) => (
  <div className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="flex flex-col space-y-1.5 p-6">{children}</div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-2xl font-semibold leading-none tracking-tight">{children}</h3>
);

const CardDescription = ({ children }) => (
  <p className="text-sm text-muted-foreground">{children}</p>
);

const CardContent = ({ children }) => (
  <div className="p-6 pt-0">{children}</div>
);

const CardFooter = ({ children }) => (
  <div className="flex items-center p-6 pt-0">{children}</div>
);

const Textarea = ({ placeholder, value, rows, readOnly, className = '' }) => (
  <textarea
    placeholder="Your over-the-top excuse will appear here..."
    value={value}
    rows={rows}
    readOnly={readOnly}
    // Added text and background color classes to ensure text is always visible
    className={`flex min-h-[80px] w-full rounded-md border border-input bg-white dark:bg-slate-800 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900 dark:text-slate-50 ${className}`}
  />
);

// Custom hook for typewriter effect
const useTypewriter = (text, speed = 25) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (text) {
      setIsTyping(true);
      setDisplayedText(text?.[0]); // Reset the text when a new text prop is received
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }
  }, [text, speed]);

  return { displayedText, isTyping };
};

// Main App component
const App = () => {
  const [excuse, setExcuse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState('scientific');
  const [userPrompt, setUserPrompt] = useState('');
  const [copyStatus, setCopyStatus] = useState('Copy to Clipboard');

  const { displayedText } = useTypewriter(excuse);

  const categories = [
    { value: 'scientific', label: 'Scientific & Nerdy' },
    { value: 'drama', label: 'Emotional Drama' },
    { value: 'conspiracy', label: 'Conspiracy Theory' },
  ];

  const getAIPrompt = (selectedCategory, customPrompt) => {
    let basePrompt;
    switch (selectedCategory) {
      case 'scientific':
        basePrompt = "Generate a single, highly detailed, and completely absurd pseudoscience-based excuse for skipping the gym. The excuse must sound technical but be completely ridiculous. Include a fitness-related term and a random, unrelated scientific phenomenon. The response should be a single paragraph.";
        break;
      case 'drama':
        basePrompt = "Write a single, dramatic, over-the-top excuse for skipping the gym. It should involve a personal, emotional situation with an inanimate object or a pet. The response should be a single paragraph.";
        break;
      case 'conspiracy':
        basePrompt = "Create a single, bizarre conspiracy theory-based excuse for missing a workout. It should involve a piece of gym equipment and a secret government plot or a similar bizarre theory. The response should be a single paragraph.";
        break;
      default:
        basePrompt = "Generate a funny and ridiculous excuse for skipping the gym today.";
    }
    return customPrompt ? `${basePrompt} Additionally, incorporate the following idea: ${customPrompt}` : basePrompt;
  };

  const generateExcuse = async () => {
    setIsLoading(true);
    setExcuse('');
    setCopyStatus('Copy to Clipboard');

    const prompt = getAIPrompt(category, userPrompt);
    const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = "AIzaSyBgz6GPAPjDBWJFESruSdsazEyIiT0puSk";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    let retries = 0;
    const maxRetries = 5;

    const executeFetch = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }

        const result = await response.json();
        const generatedText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (generatedText) {
          setExcuse(generatedText.trim());
        } else {
          setExcuse('Failed to generate an excuse. Please try again.');
        }

      } catch (error) {
        console.error('Error fetching from API:', error);
        if (retries < maxRetries) {
          retries++;
          const delay = Math.pow(2, retries) * 1000;
          console.log(`Retrying in ${delay / 1000} seconds...`);
          setTimeout(executeFetch, delay);
        } else {
          setExcuse('Failed to generate an excuse after multiple retries. Please check your network connection.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    executeFetch();
  };

  const copyToClipboard = () => {
    if (!excuse) return;
    const el = document.createElement('textarea');
    el.value = excuse;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopyStatus('Copied!');
    setTimeout(() => setCopyStatus('Copy to Clipboard'), 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <div className="w-full max-w-2xl">
        <Card className="flex flex-col w-full bg-slate-100 dark:bg-slate-900 shadow-2xl">
          <CardHeader>
            <CardTitle>Gym Excuse Generator</CardTitle>
            <CardDescription>
              Generate an absurdly elaborate excuse for skipping the gym.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Added relative and z-20 to fix dropdown/input field being covered */}
            <div className="relative z-20 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                  Excuse Category
                </label>
                <Combobox
                  value={category}
                  onChange={setCategory}
                  options={categories}
                  placeholder="Select a category"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                  Add Your Own Twist (Optional)
                </label>
                <Input
                  placeholder="e.g., 'involving a pet capybara and a kettlebell'"
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              onClick={generateExcuse}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Generate Excuse'
              )}
            </Button>

            <div className="relative">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                Your Excuse
              </label>
              <Textarea
                placeholder="Your over-the-top excuse will appear here..."
                className={`text-slate-900 dark:text-slate-50`}
                value={displayedText}
                rows={5}
                readOnly
              />
              {excuse && (
                <Button
                  onClick={copyToClipboard}
                  className="absolute bottom-4 right-4 text-xs h-8 px-3 py-1"
                  disabled={copyStatus === 'Copied!'}
                >
                  {copyStatus}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default App;
