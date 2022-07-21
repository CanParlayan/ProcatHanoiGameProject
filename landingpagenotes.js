const playButton = document.getElementById("playButton");
const howToPlay = document.getElementById("howToPlay");
const contributors = document.getElementById("contributors");
const github = document.getElementById("github");
const singlePlayer = document.getElementById("singlePlayer");
const multiPlayer = document.getElementById("multiPlayer");
const backdrop = document.getElementById("backdrop");


function githubButton() {
  document.location.href = "https://github.com/CanParlayan/ProcatHanoiGameProject"
}

function contributorsButton() {
  const modalDiv = document.querySelector(".contributorsPopUp");
  const backdrop = document.querySelector(".backdrop");
  const contributorList = document.querySelector(".contributors");
  
  document.addEventListener("click", (e) => {
  modalDiv.classList.toggle("show");
  backdrop.classList.toggle("show");
  contributorList.classList.toggle("show");
  howToPlayScreen.classList.toggle("show");
      const isClosest = e.target.closest(modalDiv);
      if (!isClosest && popupEl.classList.contains("show")) {
        popupEl.classList.remove("show");
  }
    });
}

function playSinglePlayer() {
  document.location.href = "index.html";
}

function howToPlayButton() {
  const modalDiv = document.querySelector(".howToPlayPopUp");
  const backdrop = document.querySelector(".backdrop");
  const howToPlayScreen = document.querySelector(".howToPlay");
  
  document.addEventListener("click", (e) => {
  const popupEl = [modalDiv.classList.toggle("show"), backdrop.classList.toggle("show"),
  howToPlayScreen.classList.toggle("show")]
  const isClosest = e.target.closest(popupEl);
      if (!isClosest && popupEl.classList.contains("show")) {
        popupEl.classList.remove("show");
  }
    });
}

function playMultiplayer() {
  document.location.href = "multiplayer.html";
}


function playMenu() {
  const modalDiv = document.querySelector(".popUpGame");
  const backdrop = document.querySelector(".backdrop");
  
  document.addEventListener("click", (e) => {
  modalDiv.classList.toggle("show");
  backdrop.classList.toggle("show");
    const isClosest = e.target.closest(modalDiv);
    if (!isClosest && popupEl.classList.contains("show")) {
      popupEl.classList.remove("show");
}
  });
}
playButton.addEventListener("click", playMenu);
singlePlayer.addEventListener("click", playSinglePlayer);
multiPlayer.addEventListener("click", playMenu);
howToPlay.addEventListener("click", howToPlayButton);
contributors.addEventListener("click", contributorsButton);
github.addEventListener("click", githubButton);
