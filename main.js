const songTitleDisplay = document.getElementById("song-title");
const songArtistDisplay = document.getElementById("song-artist");
const songCoverDisplay = document.getElementById("album-cover");
const songDetContainer = document.querySelector(".song-details-container");
const expandBtn = document.getElementById("expand-btn");

const playingBox = document.querySelector(".playing-box");
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");

let isCoverOpen= true;
let isMusicPlaying = false;
let presentIndex= 0;

const allTracks=[
  {
    title: "Whatever",
    artist: "ASQ",
    songCover: "./covers/albumCover.jpg",
    song: "./songs/whatever.mp3"
  },
  {
    title: "Betty",
    artist: "Charles Monroe",
    songCover: "./covers/cover2.jpg",
    song: "./songs/betty.mp3"
  },
]

let presentTrack ={
  title: "Whatever",
  artist: "ASQ",
  songCover: "./covers/albumCover.jpg",
  song: "./songs/whatever.mp3"
}
const mainPlayer = new Audio(presentTrack.song);

// changes the song title and artist to the currently playing song
function displayPresentDetails(){
  songTitleDisplay.innerText = presentTrack.title;
  songArtistDisplay.innerText = presentTrack.artist;
  songCoverDisplay.src = presentTrack.songCover;
}

displayPresentDetails();

expandBtn.addEventListener('click', toggleAlbumShowing)

function toggleAlbumShowing(){
  if(isCoverOpen){
    // closes the album cover and rotates the expand arrow
    songDetContainer.classList.add("closed")
  }else{
    // opens the album cover and rotates the expand arrow
    songDetContainer.classList.remove("closed")
  }

  isCoverOpen= !isCoverOpen;
}

// MUSIC CONTROLS
playingBox.addEventListener('click', initiateMusicProcess);
nextBtn.addEventListener('click', moveToNextSong);
backBtn.addEventListener('click', moveToPreviousSong)

function initiateMusicProcess(){
  if(isMusicPlaying){
    mainPlayer.pause();
    playingBox.classList.remove("playing")
  }else{
    mainPlayer.play();
    playingBox.classList.add("playing");
  }

  isMusicPlaying = !isMusicPlaying
}

function moveToNextSong(){
  isMusicPlaying=false;

  if(presentIndex === allTracks.length-1){
    // if the user has gotten to the last track
    presentIndex= 0
  }else{
    presentIndex++
  }

  changeProcess()
  
}

function moveToPreviousSong(){
  isMusicPlaying=false;

  if(presentIndex === 0){
    presentIndex = allTracks.length -1;
  }else{
    presentIndex--
  }

  changeProcess()
}

function changeProcess(){
  presentTrack= allTracks[presentIndex];
  mainPlayer.src = presentTrack.song;
  displayPresentDetails();
  initiateMusicProcess()
}