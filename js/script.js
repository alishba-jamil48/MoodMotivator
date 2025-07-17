// 🌙 Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? '🌞' : '🌓';
});

// 🎭 Mood-Based Quotes
const quotes = {
  motivational: [
    "Push yourself, because no one else is going to do it for you.",
    "The only way to achieve the impossible is to believe it is possible.",
    "Don't watch the clock; do what it does. Keep going."
  ],
  happy: [
    "Happiness is a direction, not a place.",
    "Choose happiness, not because everything is good, but because you see the good in everything.",
    "A smile is happiness you'll find right under your nose."
  ],
  sad: [
    "Tears come from the heart, not from the brain.",
    "Sadness flies away on the wings of time.",
    "It's okay to cry. It means you care deeply."
  ]
};

// 🔄 Elements
const moodButtons = document.querySelectorAll('.mood-button');
const customInput = document.getElementById('custom-mood');
const suggestBtn = document.getElementById('suggest-btn');
const generateBtn = document.getElementById('generate-btn');
const quoteCard = document.getElementById('quote-card');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');

// 🎲 Surprise Button
document.getElementById('surprise-btn').addEventListener('click', () => {
  const moods = Object.keys(quotes);
  const randomMood = moods[Math.floor(Math.random() * moods.length)];
  displayRandomQuote(randomMood, "Surprise");
});

// 📌 Mood Button Clicks
moodButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const mood = btn.dataset.mood;
    if (mood) {
      displayRandomQuote(mood, capitalize(mood));
    }
  });
});

// 💬 Suggest Button (Custom Mood)
suggestBtn.addEventListener('click', () => {
  const mood = customInput.value.trim();
  if (!mood) {
    alert("Please enter a mood!");
    return;
  }

  displayCustomQuote(mood);
  customInput.value = "";
});

// 🎉 Generate Quote (Uses last mood)
let lastMood = null;

generateBtn.addEventListener('click', () => {
  if (lastMood) {
    displayRandomQuote(lastMood.key, lastMood.label);
    launchConfetti();
  } else {
    alert("Select or enter a mood first!");
  }
});

// 📦 Display Random Quote
function displayRandomQuote(moodKey, label) {
  const list = quotes[moodKey];
  const quote = list[Math.floor(Math.random() * list.length)];
  quoteText.textContent = `"${quote}"`;
  quoteAuthor.textContent = `— ${label} Mood`;
  quoteCard.classList.remove("hidden");
  lastMood = { key: moodKey, label };
}

// 🧠 Display Custom Mood Quote
function displayCustomQuote(mood) {
  const msg = `You're feeling "${mood}". Embrace it and keep going! 🌟`;
  quoteText.textContent = `"${msg}"`;
  quoteAuthor.textContent = `— Custom Mood`;
  quoteCard.classList.remove("hidden");
  lastMood = { key: 'custom', label: mood };
}

// 🔤 Capitalize helper
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 🎉 Confetti on Generate
function launchConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// 🖼️ Download Quote Poster
document.getElementById('download-btn').addEventListener('click', () => {
  html2canvas(document.getElementById('quote-card')).then(canvas => {
    const link = document.createElement('a');
    link.download = 'quote.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});





