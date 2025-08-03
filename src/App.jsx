import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [theme, setTheme] = useState('light');
  const [paragraph, setParagraph] = useState('');
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [duration, setDuration] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef();

  const fetchParagraph = async () => {
    try {
      const response = await fetch('https://baconipsum.com/api/?type=all-meat&paras=1&format=text');
      const data = await response.text();
      setParagraph(data.trim());
      reset(data.trim());
    } catch (error) {
      console.error("Error fetching paragraph:", error);
      setParagraph("Could not load paragraph. Check your internet.");
    }
  };

  useEffect(() => {
    fetchParagraph();
  }, []);

  useEffect(() => {
    if (!startTime || finished) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          calculateResults();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime, finished]);

  const calculateResults = () => {
    const timeTakenMinutes = (duration - timeLeft) / 60;

    let correctChars = 0;
    const minLen = Math.min(input.length, paragraph.length);
    for (let i = 0; i < minLen; i++) {
      if (input[i] === paragraph[i]) correctChars++;
    }

    // Monkeytype-style WPM
    const wpm = timeTakenMinutes > 0 ? (correctChars / 5) / timeTakenMinutes : 0;

    // Monkeytype-style Accuracy
    const accuracy = input.length > 0 ? (correctChars / input.length) * 100 : 0;

    setWpm(wpm.toFixed(2));
    setAccuracy(accuracy.toFixed(2));
    setFinished(true);
  };

  const reset = (newParagraph = paragraph) => {
    setInput('');
    setStartTime(null);
    setTimeLeft(duration);
    setWpm(0);
    setAccuracy(100);
    setFinished(false);
    setParagraph(newParagraph);
    inputRef.current?.focus();
  };

  const handleInputChange = (e) => {
    if (!startTime) setStartTime(Date.now());
    setInput(e.target.value);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleDurationChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0 && val <= 600) {
      setDuration(val);
      setTimeLeft(val);
      reset();
    }
  };

  return (
    <div className={`min-vh-100 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <title>TypeZY - Typing Speed Test</title>
          <h1 className="fw-bold">TypeZY</h1>
          <button className="btn btn-secondary" onClick={toggleTheme}>
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>

        <div
          className="card shadow p-4 mb-3"
          style={{
            backgroundColor: theme === 'dark' ? '#2c2c2c' : 'white',
            color: theme === 'dark' ? '#f1f1f1' : '#000'
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div style={{ fontSize: '1.1rem' }}>
              <strong style={{ color: theme === 'dark' ? '#bbb' : '#333' }}>
                Time Left:
              </strong>{' '}
              {timeLeft}s
            </div>
            <div className="d-flex align-items-center">
              <label
                className="me-2"
                style={{ color: theme === 'dark' ? '#bbb' : '#333', fontWeight: '500' }}
              >
                Set Time (sec):
              </label>
              <input
                type="number"
                min="15"
                max="600"
                value={duration}
                onChange={handleDurationChange}
                className="form-control form-control-sm me-2"
                style={{
                  width: '80px',
                  backgroundColor: theme === 'dark' ? '#444' : 'white',
                  color: theme === 'dark' ? '#f1f1f1' : '#000',
                  borderColor: theme === 'dark' ? '#666' : '#ccc'
                }}
                disabled={startTime !== null}
              />
              <button className="btn btn-outline-info btn-sm" onClick={fetchParagraph}>
                New Paragraph
              </button>
            </div>
          </div>

          <div
            className="border rounded p-3 mb-3"
            style={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f8f9fa',
              fontSize: '1rem',
              lineHeight: '1.5rem',
              minHeight: '100px'
            }}
          >
            {paragraph.split('').map((char, idx) => {
              let color = '';
              if (idx < input.length) {
                color = input[idx] === char ? 'green' : 'red';
              }
              return (
                <span key={idx} style={{ color }}>
                  {char}
                </span>
              );
            })}
          </div>

          <textarea
            ref={inputRef}
            className="form-control mb-3"
            rows="4"
            value={input}
            onChange={handleInputChange}
            disabled={finished || paragraph === ''}
            placeholder="Start typing here..."
            style={{
              backgroundColor: theme === 'dark' ? '#1e1e1e' : 'white',
              color: theme === 'dark' ? '#f1f1f1' : '#000',
              fontSize: '1rem',
              lineHeight: '1.5rem'
            }}
          />

          {finished && (
            <div className="alert alert-success">
              <p><strong>WPM:</strong> {wpm}</p>
              <p><strong>Accuracy:</strong> {accuracy}%</p>
            </div>
          )}

          <div>
            <button className="btn btn-primary me-2" onClick={reset}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
