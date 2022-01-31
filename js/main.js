import TRACKS from "./tracks.js"; 

const APP = {
  audio: document.getElementById('player-audio'),
  currentTrack: 0,
  init : () => { 
    PLAYING.trackPlaying()
  }
}

/* For anything related to Track playing */
const PLAYING = {
  trackPlaying(){
    APP.audio.src = TRACKS[APP.currentTrack].src
  }
}

document.addEventListener('DOMContentLoaded', APP.init);
