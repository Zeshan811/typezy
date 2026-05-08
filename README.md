````md id="x9k2ab"
# TypeZy – Typing Speed Test (React SPA)

TypeZy is a single-page application (SPA) built with React that helps users test and improve their typing speed. It generates random words and paragraphs using an API and provides real-time typing performance tracking such as WPM (Words Per Minute), accuracy, and time tracking.

---

## 🚀 Features

- ⚡ Real-time typing speed test (WPM calculation)
- 🎯 Accuracy tracking
- ⏱️ Timer-based and continuous mode
- 🔄 Dynamic paragraph generation using API
- 🧠 Random word/paragraph generator
- 📊 Live performance updates
- 🔁 Restart test anytime
- 📱 Responsive UI (mobile + desktop)
- 🧩 Single Page Application (SPA)

---

## 🛠️ Tech Stack

- React.js (SPA architecture)
- JavaScript (ES6+)
- HTML5
- CSS3
- External API (for random words / paragraphs)
- React Hooks (useState, useEffect)

---

## 📁 Project Structure

```bash
typezy-typing-test/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── TypingBox.jsx
│   │   ├── Timer.jsx
│   │   ├── Stats.jsx
│   │
│   ├── pages/
│   │   └── Home.jsx
│   │
│   ├── api/
│   │   └── wordsApi.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
└── README.md
````

---

## ⚙️ Installation

Clone the repository:

```bash id="c1"
git clone <repository-url>
```

Move into project:

```bash id="c2"
cd typezy-typing-test
```

Install dependencies:

```bash id="c3"
npm install
```

Run development server:

```bash id="c4"
npm run dev
```

---

## 🌐 API Integration

The project uses an external API to generate random words/paragraphs dynamically.

Example API flow:

* Request random words
* Display paragraph on screen
* Refresh on restart
* Continuously update text for practice

---

## 🧠 How It Works

1. API generates random paragraph/words
2. User starts typing in input box
3. Timer starts automatically
4. System calculates:

   * Words Per Minute (WPM)
   * Accuracy %
   * Mistakes count
5. Results displayed in real-time
6. User can restart test anytime

---

## 📊 Metrics Calculated

* WPM (Words Per Minute)
* Accuracy percentage
* Total typed words
* Error count
* Time elapsed

---

## 🎯 Future Improvements

* Login system for saving progress
* Global leaderboard
* Difficulty levels (Easy / Medium / Hard)
* Dark mode
* Custom text input mode
* AI-based typing analysis

---

## 👨‍💻 Author

* ذیشان حیدر

---

## 📄 License

This project is created for learning and portfolio purposes.

```
```
