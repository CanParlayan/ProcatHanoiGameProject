const playButton = document.getElementById("playButton");
const howToPlay = document.getElementById("howToPlay");
const contributors = document.getElementById("contributors");
const github = document.getElementById("github");
const singlePlayer = document.getElementById("singlePlayer");
const backdrop = document.getElementById("backdrop");


function githubButton() {
  document.location.href = "https://github.com/CanParlayan/ProcatHanoiGameProject"
}

function contributorsButton() {
  const modalDiv = document.querySelector(".contributorsPopUp");
  const backdrop = document.querySelector(".backdrop");
  const contributorList = document.querySelector(".contributors");
  modalDiv.classList.toggle("show");
  backdrop.classList.toggle("show");
  contributorList.classList.toggle("show");
}

function playSinglePlayer() {
  document.location.href = "index.html";
}

function howToPlayButton() {
  const modalDiv = document.querySelector(".howToPlayPopUp");
  const backdrop = document.querySelector(".backdrop");
  const howToPlayScreen = document.querySelector(".howToPlay");
  modalDiv.classList.toggle("show");
  backdrop.classList.toggle("show");
  howToPlayScreen.classList.toggle("show");
}


function playMenu() {
  const modalDiv = document.querySelector(".popUpGame");
  const backdrop = document.querySelector(".backdrop");
  const contributorList = document.querySelector(".contributors");
  modalDiv.classList.toggle("show");
  backdrop.classList.toggle("show");
}
playButton.addEventListener("click", playMenu);
singlePlayer.addEventListener("click", playSinglePlayer);
howToPlay.addEventListener("click", howToPlayButton);
contributors.addEventListener("click", contributorsButton);
github.addEventListener("click", githubButton);
