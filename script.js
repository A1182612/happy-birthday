// Meme setup
const memes = [
  { url: "images/pic1.webp", caption: "Hi >w<" },
  { url: "images/pic2.webp", caption: "Happy Birthday Princess" },
  { url: "images/pic3.webp", caption: "Birthday Cake" },
  { url: "images/pic4.webp", caption: "For you >:3" },
  { url: "images/pic5.webp", caption: "" },
  { url: "images/jumping.gif", caption: "me for real for real!" },
  { url: "images/pic7.gif", caption: "yoooo" }
];

let memeIndex = 0;

// Web Audio API synth for pop sound effects
function playPopSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
  
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.08);
}

// Countdown setup with midnight surprise trigger
let targetDate = new Date("2026-09-14T00:30:00").getTime();
let celebrated = false;

function updateCountdown() {
  const now = new Date().getTime();
  let diff = targetDate - now;

  // Fire surprise and auto-switch to next year when timer reaches 0
  if (diff <= 0) {
    if (!celebrated) {
      celebrated = true;
      triggerMidnightSurprise();
    }

    const updatedTarget = new Date(targetDate);
    updatedTarget.setFullYear(updatedTarget.getFullYear() + 1);
    targetDate = updatedTarget.getTime();
    
    diff = targetDate - now;
  }

  document.getElementById("days").innerText = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
  document.getElementById("hours").innerText = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
  document.getElementById("minutes").innerText = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
  document.getElementById("seconds").innerText = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Midnight zero-moment celebration effect
function triggerMidnightSurprise() {
  const overlay = document.getElementById("celebration-screen");
  if (overlay) overlay.style.display = "flex";

  triggerConfetti();
  triggerEmojiRain();

  setTimeout(() => {
    if (overlay) overlay.style.display = "none";
  }, 10000);
}

// Reusable effects
function triggerConfetti() {
  if (typeof confetti === "function") {
    confetti({ 
      particleCount: 150, 
      spread: 90, 
      origin: { y: 0.6 } 
    });
  }
}

function triggerEmojiRain() {
  const emojis = ['🎂', '✨', '🎉', '💖', '👑', '🥳'];
  
  for (let i = 0; i < 25; i++) {
    const emojiEl = document.createElement('div');
    emojiEl.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    emojiEl.style.position = 'fixed';
    emojiEl.style.top = '-50px';
    emojiEl.style.left = Math.random() * 100 + 'vw';
    emojiEl.style.fontSize = (Math.random() * 20 + 24) + 'px';
    emojiEl.style.zIndex = '9999';
    emojiEl.style.pointerEvents = 'none';
    emojiEl.style.transition = 'transform 2.5s linear, opacity 2.5s linear';
    
    document.body.appendChild(emojiEl);

    setTimeout(() => {
      emojiEl.style.transform = `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
      emojiEl.style.opacity = '0';
    }, 50);

    setTimeout(() => {
      emojiEl.remove();
    }, 2700);
  }
}

// Event Listeners
document.getElementById("next-meme-btn").addEventListener("click", () => {
  playPopSound();
  triggerConfetti();
  triggerEmojiRain();

  memeIndex = (memeIndex + 1) % memes.length;
  document.getElementById("meme-img").src = memes[memeIndex].url;
  document.getElementById("meme-caption").innerText = memes[memeIndex].caption;
});

document.getElementById("confetti-btn").addEventListener("click", () => {
  playPopSound();
  triggerConfetti();
});

document.getElementById("emoji-rain-btn").addEventListener("click", () => {
  playPopSound();
  triggerEmojiRain();
});

// Music Toggle Handler
const bgMusic = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle");
let isPlaying = false;

musicBtn.addEventListener("click", () => {
  playPopSound();
  if (isPlaying) {
    bgMusic.pause();
    musicBtn.innerText = "🎵 Play Vibe";
  } else {
    bgMusic.play();
    musicBtn.innerText = "⏸️ Pause";
  }
  isPlaying = !isPlaying;
});