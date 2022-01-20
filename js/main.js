let btnPlay = document.querySelector('#btnPlayArrow')
let btnPause = document.querySelector('#btnPause')

btnPlay.addEventListener('click',btnToggle)
btnPause.addEventListener('click',btnToggle)

function btnToggle(ev){
  if(ev.currentTarget===btnPlay){
    btnPause.style.display='inline'
    btnPlay.style.display='none'
  }
  else{
    btnPlay.style.display='inline'
    btnPause.style.display='none'
  }
}