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
    APP.audio.addEventListener('timeupdate', TIME.changeCurrentTime)
    APP.btnPlay.addEventListener('click', PLAY.playTrack)
    APP.btnPause.addEventListener('click', PAUSE.pauseTrack)
    APP.btnStop.addEventListener('click', STOP.stopTrack)

    PLAYING.trackPlaying()
  }
}

/* For anything related to Track playing */
const PLAYING = {
  trackPlaying(){
    APP.audio.src = TRACKS[APP.currentTrack].src
    VISUAL.changeThumbnail()
    VISUAL.changeTrackInfo()
    ANIMATION.addActive()
  }
}

/* For anything related to Time */
const TIME = {
  changeTotalTime(ev){
    let totalTime = document.querySelector('.total-length')
    let totalSec = ev.target.duration
    totalTime.innerHTML = TIME.convertTime(totalSec)
  },
  convertTime(time){ //Converts seconds to minutes and seconds
    let minutes = Math.floor(time / 60).toString()
    let seconds = Math.floor(time % 60).toString()
    return`${minutes.padStart(2,0)}:${seconds.padStart(2,0)}`
  },
  changeCurrentTime(){ 
    let currentTime = document.querySelector('.current-time')  
    currentTime.innerHTML=TIME.convertTime(APP.audio.currentTime)
    PROGRESS.progress()
  }
}

/* For anything related to progress bar */
const PROGRESS = { 
  progress(){
    let progressBar = document.querySelector('.progress-bar')
    let value = (APP.audio.currentTime / APP.audio.duration)*100
    progressBar.setAttribute("value", value)
  }
}

/* For anything related to play button and playing track */
const PLAY = {
  playTrack(ev) {
    PLAY.btnToggle() 
    if (!APP.audio.paused) return
    APP.audio.play()
    ANIMATION.startAnimations()
  },
  btnToggle(){ 
    APP.btnPause.style.display='inline'
    APP.btnPlay.style.display='none'
  }
}

/* For anything related to pause button and pausing track */
const PAUSE = {
  pauseTrack(ev) {
    PAUSE.btnToggle() 
    APP.audio.pause()
    ANIMATION.stopAnimations()
  },
  btnToggle(){
    APP.btnPlay.style.display='inline'
    APP.btnPause.style.display='none'
  }
}

/* For anything related to stop button and stopping track */
const STOP = {
  stopTrack(ev) {
    PAUSE.btnToggle()
    APP.audio.pause()
    APP.audio.currentTime = 0
    ANIMATION.stopAnimations()
  }
}

/* For anything related to Visuals */
const VISUAL = {
  changeThumbnail(){
    let img = document.querySelector('#visual img')
    img.src = TRACKS[APP.currentTrack].img 
    img.alt = TRACKS[APP.currentTrack].title
  },
  changeTrackInfo(){
    let trackName = document.querySelector('#visual h2')
    let artistName = document.querySelector('#visual p')
    trackName.innerHTML=TRACKS[APP.currentTrack].title
    artistName.innerHTML=TRACKS[APP.currentTrack].artist
  }
}

/* For anything related to player area and playlist area animation */
const ANIMATION = {
  addActive(){
    let activeLi = document.querySelector('.active')
    activeLi.classList.remove('active')
    let img = document.querySelector(`li img[src="./${TRACKS[APP.currentTrack].img}"]`)
    let li = img.parentElement
    li.classList.add('active')
  },
  startAnimations(){
    if (!APP.audio.paused) {
      APP.player.classList.add('is-playing') 
    }
  },
  stopAnimations(){
    APP.player.classList.remove('is-playing')
  }
}

document.addEventListener('DOMContentLoaded', APP.init);
