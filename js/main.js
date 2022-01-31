import TRACKS from "./tracks.js"; 

const APP = {
  audio: document.getElementById('player-audio'),
  currentTrack: 0,
  init : () => { 
    /* Adding event listeners */
    APP.audio.addEventListener('durationchange', TIME.changeTotalTime) 
    
    PLAYING.trackPlaying()
  }
}

/* For anything related to Track playing */
const PLAYING = {
  trackPlaying(){
    APP.audio.src = TRACKS[APP.currentTrack].src
  }
}

/* For anything related to Time */
const TIME = {
  changeTotalTime(ev){
    let totalTime = document.querySelector('.total-length')
    let totalSec = ev.target.duration
    totalTime.innerHTML = TIME.convertTime(totalSec)
  },
  convertTime(time){
    let minutes = Math.floor(time / 60).toString()
    let seconds = Math.floor(time % 60).toString()
    return`${minutes.padStart(2,0)}:${seconds.padStart(2,0)}`
  }
}

document.addEventListener('DOMContentLoaded', APP.init);
