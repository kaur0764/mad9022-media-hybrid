import TRACKS from "./tracks.js"; 

const APP = {
  audio: null, 
  player: null, 
  btnPlay: null, 
  btnPause: null, 
  currentTrack: 0,

  init : () => { 
    APP.audio = document.getElementById('player-audio')  
    APP.player = document.getElementById('player') 
    APP.btnPlay = document.getElementById('btnPlayArrow')
    APP.btnPause = document.getElementById('btnPause')

    APP.addEventListeners()
    APP.addPlaylist()
    PLAYING.trackPlaying()
  },
  addEventListeners: () => {
    APP.audio.addEventListener('durationchange', TIME.changeTotalTime) 
    APP.audio.addEventListener('timeupdate', TIME.changeCurrentTime)
    APP.audio.addEventListener('ended', NEXT.nextTrack)
    document.querySelector('#controls').addEventListener('click',APP.handleButtons)
    document.querySelector('#playlist-area').addEventListener('click',APP.handleListItems)
  },
  handleButtons: (ev) => {
    let target = ev.target
    let btn = target.closest('.buttons')
    if(btn){
      if(btn.id==='btnPlayArrow'){
        PLAY.playTrack()
      }
      if(btn.id==='btnPause'){
        PAUSE.pauseTrack()
      }
      if(btn.id==='btnStop'){
        STOP.stopTrack()
      }
      if(btn.id==='btnSkipPrevious'){  
        PREV.prevTrack()  
      }
      if(btn.id==='btnSkipNext'){  
        NEXT.nextTrack()
      }
      if(btn.id==='btnReplay10'){ 
        REPLAY.replayTenTrack()  
      }
      if(btn.id==='btnForward10'){
        FORWARD.forwardTenTrack()
      }
    }
  },

  handleListItems: (ev) =>{
    let target = ev.target
    let li = target.closest('li')
    if(li){
    ANIMATION.addActive(li)
    APP.currentTrack = li.dataset.number
    PLAYING.trackPlaying()
    PLAY.playTrack()
    }
  },

  addPlaylist: () => {
    let ol = document.querySelector('ol')
    let html = TRACKS.map( (track, index)=> {
    let li = document.createElement('li')
    let img = document.createElement('img')
    let p = document.createElement('p')
    img.src = track.img 
    img.alt = track.title
    p.innerHTML=`${track.title}<br>${track.artist}`
    li.append(img)
    li.append(p)
    li.setAttribute('data-number', index)
    return li
    })
    ol.append(...html)
    let firstLi = document.querySelector('#playlist-area li')
    firstLi.classList.add('active')
  }
}

/* For anything related to Track playing */
const PLAYING = {
  trackPlaying(){
    APP.audio.src = TRACKS[APP.currentTrack].src
    VISUAL.changeThumbnail()
    VISUAL.changeTrackInfo()
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

/* For anything related to skip_previous button */
const PREV = {
  prevTrack(ev) {
    STOP.stopTrack()
    PREV.decrementCurrentTrack()
    let li = document.querySelector(`li[data-number = "${APP.currentTrack}"]`)
    ANIMATION.addActive(li)
    PLAYING.trackPlaying()
    PLAY.playTrack()
  },
  decrementCurrentTrack(){
    APP.currentTrack--
    if(APP.currentTrack<0)
    {
      APP.currentTrack = TRACKS.length-1
    } 
  }
}

/* For anything related to skip_next button */
const NEXT = {
  nextTrack(ev) {
    STOP.stopTrack()
    NEXT.incrementCurrentTrack()
    let li = document.querySelector(`li[data-number = "${APP.currentTrack}"]`)
    ANIMATION.addActive(li)
    PLAYING.trackPlaying()
    PLAY.playTrack()
  },
  incrementCurrentTrack(){
    APP.currentTrack++
    if(APP.currentTrack>=TRACKS.length)
    {
      APP.currentTrack = 0
    }
  }
}

/* For anything related to replay10 button */
const REPLAY = {
  replayTenTrack(ev) {
    APP.audio.currentTime -= 10
    if(APP.audio.currentTime<0){
      APP.audio.currentTime = 0
    }
  }
}

/* For anything related to forward10 button */
const FORWARD = {
  forwardTenTrack(ev) {
    APP.audio.currentTime += 10
    let totalTime = APP.audio.totalTime
    if(APP.audio.currentTime> totalTime){
      APP.audio.currentTime = totalTime
    }
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
  addActive(li){
    let activeLi = document.querySelector('.active')
    activeLi.classList.remove('active')
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
