import { Playlist, Song } from './Playlist.js';

const headline = document.getElementById("headline");
const changeTextButton = document.getElementById("changeTextBtn");

// const modal = document.getElementById("imageModal");
// const img = document.getElementsByClassName("img")[0];
// const modalImg = document.getElementById("largeImage");
// const closeBtn = document.getElementsByClassName("close")[0];

changeTextButton.addEventListener('click', () => {
    document.getElementById("hidetxt").classList.toggle('hidden')
})
// img.addEventListener('click', () => {
//     modal.classList.toggle('hidden')
//     modalImg.src=img.getAttribute('src')
// })

// closeBtn.addEventListener('click', () => {
//     modal.classList.toggle('hidden')
// })
// closeBtn.addEventListener('mouseover', () => {
//     document.getElementById('closeHint').classList.toggle('hidden')
// })
// closeBtn.addEventListener('mouseout', () => {
//     document.getElementById('closeHint').classList.toggle('hidden')
// })

// modal.addEventListener('click', (event) => {
//     if (event.target == modal) {
//         modal.classList.toggle('hidden')
//     }
// })

/// MUSIC
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const songTitleEl = document.getElementById("song-title");
const songArtistEl = document.getElementById("song-artist");

const playIcon = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z"
      fill="currentColor" />
    <path d="M16 12L10 16.3301V7.66987L16 12Z" fill="currentColor" />
  </svg>
`;

const pauseIcon = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 9H9V15H15V9Z" fill="currentColor" />
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      fill="currentColor" />
  </svg>
`;


// Create a new playlist
const myPlaylist = new Playlist("My Music");

// Add songs from your `/music/` folder (modify paths as needed)
myPlaylist.addSong(new Song("Stardew Valley Overture", "Stardew Valley", "music/Stardew Valley/01. Stardew Valley Overture.mp3"));
myPlaylist.addSong(new Song("Cloud Country", "Stardew Valley", "music/Stardew Valley/02. Cloud Country.mp3"));
myPlaylist.addSong(new Song("Grandpa's Theme", "Stardew Valley", "music/Stardew Valley/03. Grandpa's Theme.mp3"));

// Set the first song as the current song
let currentSong = myPlaylist.head;
updateUI(currentSong);


playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = pauseIcon;
    } else {
        audio.pause();
        playPauseBtn.innerHTML = playIcon;
    }
});

// Play Next Song
function playNextSong() {
    if (currentSong.next) {
        currentSong = currentSong.next;
        updateUI(currentSong);
        audio.play();
    }
}

// Play Previous Song
function playPreviousSong() {
    if (currentSong.prev) {
        currentSong = currentSong.prev;
        updateUI(currentSong);
        audio.play();
    }
}

// Update UI When Song Changes
function updateUI(song) {
    if (!song) return;
    audio.src = song.filePath;
    songTitleEl.textContent = song.title;
    songArtistEl.textContent = song.artist;
    playPauseBtn.innerHTML = playIcon; // Reset button to play
}

// Auto-play next song when current song ends
audio.addEventListener("ended", playNextSong);

// Progress Bar Updates
audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration)) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
    }
});

// Click on Progress Bar to Seek
progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

// Format Time
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Set total duration when metadata loads
audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
});

// Select Next/Previous buttons
const nextBtn = document.getElementById("next-song");
const prevBtn = document.getElementById("prev-song");

// Next Song
nextBtn.addEventListener("click", playNextSong);

// Previous Song
prevBtn.addEventListener("click", playPreviousSong);
