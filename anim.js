// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
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

// Animar las letras
function updateLyrics() {
  if (!audio || !lyrics) return;

  var time = audio.currentTime;
  var currentLine = [...lyricsData].reverse().find((line) => time >= line.time);
  var nextLine = lyricsData.find((line) => line.time > time);

  if (currentLine && (!nextLine || time < nextLine.time)) {
    lyrics.innerHTML = currentLine.text;
    lyrics.style.opacity = 1;
  } else {
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

audio.addEventListener("timeupdate", updateLyrics);
audio.addEventListener("loadedmetadata", updateLyrics);
audio.addEventListener("play", updateLyrics);

//funcion titulo
// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation =
    "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000); // Espera 3 segundos antes de ocultar completamente
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);