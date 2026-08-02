var audio = document.querySelector("audio");

var lyricsData = [
  { text: "You know", time: 6 },
  { text: "I've always been collected, calm and chill", time: 8 },
  { text: "And you know", time: 13 },
  { text: "I never look for conflict for the thrill", time: 15 },
  { text: "But if I'm feeling", time: 18 },
  { text: "Someone stepping towards you, can't describe", time: 21 },
  { text: "Just what I'm feeling", time: 24 },
  { text: "For you, I'd go", time: 28 },
  { text: "Step to a dude much bigger than me", time: 31 },
  { text: "For you, I know", time: 34 },
  { text: "I would get messed up, weigh 153", time: 37 },
  { text: "For you", time: 40 },
  { text: "I would get beat to smithereens", time: 43 },
  { text: "You know", time: 57 },
  { text: "I'll be in the corner taking notes", time: 59 },
  { text: "And you know", time: 64 },
  { text: "I got your six while you're working votes", time: 66 },
  { text: "But if I'm feeling", time: 69 },
  { text: "Someone stepping towards you, can't describe", time: 72 },
  { text: "Just what I'm feeling", time: 75 },
  { text: "For you, I'd go", time: 79 },
  { text: "Step to a dude much bigger than me", time: 82 },
  { text: "For you, I know", time: 85 },
  { text: "I would get messed up, weigh 153", time: 88 },
  { text: "For you", time: 91 },
  { text: "I would get beat to smithereens", time: 93 },
  { text: "I would get beat to", time: 103 },
  { text: "You know I had to do one", time: 105 },
  { text: "You know I had to do one", time: 107 },
  { text: "You know I had to do one on the record for you", time: 108 },
  { text: "You know I had to do one on the record for her like this", time: 111 },
  { text: "You know I had to do one on the record for her like this", time: 115 },
  { text: "You know I had to do one on the record for her like this", time: 118 },
  { text: "You know I had to do one on the record for her", time: 121 },
  { text: "If I'm feeling", time: 124 },
  { text: "Someone stepping towards you, can't describe", time: 126 },
  { text: "Just what I'm feeling", time: 129 },
  { text: "For you, I'd go", time: 133 },
  { text: "Write a slick song just to show you the world", time: 136 },
  { text: "For you, I know", time: 139 },
  { text: "They think it's messed up to sell out for your girl", time: 142 },
  { text: "For you, I'd go", time: 145 },
  { text: "Step to a dude much bigger than me", time: 148 },
  { text: "For you, I know", time: 152 },
  { text: "I would get messed up, weigh 153", time: 155 },
  { text: "For you", time: 158 },
  { text: "I would get beat to smithereens", time: 160 },
];

var prevEl = document.getElementById("lyric-prev");
var currentEl = document.getElementById("lyric-current");
var nextEl = document.getElementById("lyric-next");
var currentIndex = -1;

function updateLyrics() {
  if (!audio) return;
  var time = audio.currentTime;

  var newIdx = -1;
  for (var i = 0; i < lyricsData.length; i++) {
    if (time >= lyricsData[i].time) {
      newIdx = i;
    } else {
      break;
    }
  }

  if (newIdx === currentIndex) return;
  currentIndex = newIdx;

  if (newIdx < 0) {
    prevEl.textContent = "";
    currentEl.textContent = "";
    nextEl.textContent = "";
    return;
  }

  currentEl.textContent = lyricsData[newIdx].text;
  prevEl.textContent = newIdx > 0 ? lyricsData[newIdx - 1].text : "";
  nextEl.textContent =
    newIdx < lyricsData.length - 1 ? lyricsData[newIdx + 1].text : "";
}

audio.addEventListener("timeupdate", updateLyrics);
audio.addEventListener("loadedmetadata", updateLyrics);
audio.addEventListener("play", updateLyrics);

// Frases amorosas, halagos y piropos
var phrases = [
  "Eres mi lugar favorito",
  "Tu sonrisa es mi debilidad",
  "Cada día te quiero más",
  "Eres la mejor parte de mi día",
  "Mi corazón late por ti",
  "Eres perfecta tal y como eres",
  "Contigo todo es mejor",
  "Eres mi sueño hecho realidad",
  "No hay nadie como tú",
  "Me haces inmensamente feliz",
  "Eres la novia más hermosa",
  "Tu amor es mi refugio",
  "Pienso en ti cada momento",
  "Eres mi todo",
  "Contigo el tiempo se detiene",
  "Eres mi persona favorita",
  "Tu mirada me enamora",
  "Eres la razón de mi sonrisa",
  "No puedo dejar de mirarte",
  "Eres mi cielo y mi estrellas",
  "A tu lado nada me falta",
  "Eres la dueña de mi corazón",
  "Haces que todo valga la pena",
  "Eres simplemente increíble",
  "Mi vida tiene color gracias a ti",
  "Eres la melodía más bonita",
  "No imaginas cuánto te extraño",
  "Eres mi para siempre",
  "Tu voz es mi canción favorita",
  "Eres el amor de mi vida",
];

var phrasesContainer = document.getElementById("floatingPhrases");
var phraseIndex = 0;
var activePhrases = [];

function shufflePhrases() {
  for (var i = phrases.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = phrases[i];
    phrases[i] = phrases[j];
    phrases[j] = temp;
  }
}
shufflePhrases();

function findFreePosition() {
  // Zona central excluida (donde aparece la letra) — banda horizontal en el centro
  var centerLeft = 20;
  var centerRight = 80;
  var centerTop = 32;
  var centerBottom = 68;

  var maxAttempts = 40;
  var minDist = 22;

  for (var attempt = 0; attempt < maxAttempts; attempt++) {
    var x = 4 + Math.random() * 88;
    var y = 5 + Math.random() * 85;

    var inCenter =
      x > centerLeft && x < centerRight && y > centerTop && y < centerBottom;
    if (inCenter) continue;

    var tooClose = false;
    for (var i = 0; i < activePhrases.length; i++) {
      var dx = x - activePhrases[i].x;
      var dy = y - activePhrases[i].y;
      if (Math.sqrt(dx * dx + dy * dy) < minDist) {
        tooClose = true;
        break;
      }
    }
    if (!tooClose) return { x: x, y: y };
  }
  return null;
}

function showFloatingPhrase() {
  if (!audio || audio.paused || audio.ended) return;

  var pos = findFreePosition();
  if (!pos) return;

  var phrase = phrases[phraseIndex % phrases.length];
  phraseIndex++;

  var el = document.createElement("div");
  el.className = "floating-phrase";
  el.textContent = phrase;
  el.style.left = pos.x + "%";
  el.style.top = pos.y + "%";

  phrasesContainer.appendChild(el);

  var record = { x: pos.x, y: pos.y, el: el };
  activePhrases.push(record);

  setTimeout(function () {
    if (el.parentNode) el.parentNode.removeChild(el);
    var idx = activePhrases.indexOf(record);
    if (idx !== -1) activePhrases.splice(idx, 1);
  }, 6000);
}

var phraseInterval = setInterval(showFloatingPhrase, 2800);
