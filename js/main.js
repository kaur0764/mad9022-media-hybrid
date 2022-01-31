import TRACKS from "./tracks.js"; 

const APP = {
  audio: document.getElementById('player-audio'),
  player: document.getElementById('player'),
  btnPlay: document.getElementById('btnPlayArrow'),
  btnPause: document.getElementById('btnPause'),
  btnStop: document.getElementById('btnStop'),
  currentTrack: 0,

  init : () => { 
    /* Adding event listeners */
    APP.audio.addEventListener('durationchange', TIME.changeTotalTime) 
    APP.btnPlay.addEventListener('click', PLAY.playTrack);  
    APP.btnPause.addEventListener('click', PAUSE.pauseTrack);
    APP.btnStop.addEventListener('click', STOP.stopTrack);

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

/* For anything related to play button and playing track */
const PLAY = {
  playTrack(ev) {
    if (!APP.audio.paused) return
    APP.audio.play()
  }
}

/* For anything related to pause button and pausing track */
const PAUSE = {
  pauseTrack(ev) {
    APP.audio.pause()
  }
}

/* For anything related to stop button and stopping track */
const STOP = {
  stopTrack(ev) {
    APP.audio.pause()
    APP.audio.currentTime = 0
  }
}

document.addEventListener('DOMContentLoaded', APP.init);
