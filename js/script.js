'use strict';
/*---------------------------------*/
/*------HTML Global Variables------*/
/*---------------------------------*/
let imgContainer = document.querySelector('section');
let resultButton = document.querySelector('button');
let results = document.querySelector('ul');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
/*---------------------------------*/
/*------Math Global Variables------*/
/*---------------------------------*/
let clicks = 0;
let maxClicksAllowed = 25;
let uniqueImageCount = 3;
let roundImgArray = [];
CreateImg.allImgArray = [];
/*---------------------------------*/
/*--------Image Constructor--------*/
/*---------------------------------*/
function CreateImg(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
  CreateImg.allImgArray.push(this);
}
/*---------------------------------*/
/*-----------RNG Function----------*/
/*---------------------------------*/
function getRandomNumber() {
  return Math.floor(Math.random() * CreateImg.allImgArray.length);
}
/*---------------------------------*/
/*-----------Image Render----------*/
/*---------------------------------*/
function renderImg() {
  // Adds random images that are to be shown that round.
  while (roundImgArray.length < uniqueImageCount) {
    let randomNumber = getRandomNumber();
    // If the Index Array does not have the random number, add that number to the index array.
    if (!roundImgArray.includes(randomNumber)) {
      roundImgArray.push(randomNumber);
    }
  }
  //console.log(roundImgArray);
  let vote1 = roundImgArray[0];
  let vote2 = roundImgArray[1];
  let vote3 = roundImgArray[2];
  //console.log(roundImgArray);
  // Adds the image's path to our img elements
  image1.src = CreateImg.allImgArray[vote1].src;
  image2.src = CreateImg.allImgArray[vote2].src;
  image3.src = CreateImg.allImgArray[vote3].src;
  // Adds the image's name as alt text to our img elements
  image1.alt = CreateImg.allImgArray[vote1].name;
  image2.alt = CreateImg.allImgArray[vote2].name;
  image3.alt = CreateImg.allImgArray[vote3].name;
  // Adds a view to each of the shown images.
  CreateImg.allImgArray[vote1].views++;
  CreateImg.allImgArray[vote2].views++;
  CreateImg.allImgArray[vote3].views++;
  // Resets the round array
  roundImgArray = [];
}
/*---------------------------------*/
/*----------Event Handler----------*/
/*---------------------------------*/
function handleImgClick(event) {
  clicks++;
  let clickImg = event.target.alt;
  // For loop that goes through all the images we have created
  for (let i = 0; i < CreateImg.allImgArray.length; i++) {
    // Add a 'click' point to the image in our array that matches the clicked image's alt.
    if (clickImg === CreateImg.allImgArray[i].name) {
      CreateImg.allImgArray[i].clicks++;
      break;
    }
  }
  // Check if we have reached 25 clicks
  if (clicks === maxClicksAllowed) {
    imgContainer.removeEventListener('click', handleImgClick);
    imgContainer.className = 'no-voting';
    resultButton.addEventListener('click', handleBtnClick);
    resultButton.className = 'voting';
  } else {
    renderImg();
  }
}
/*---------------------------------*/
/*-----------Button Click----------*/
/*---------------------------------*/
function handleBtnClick() {
  renderResults();
}
/*---------------------------------*/
/*----------Results Render---------*/
/*---------------------------------*/
function renderResults() {
  for (let i = 0; i < CreateImg.allImgArray.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${CreateImg.allImgArray[i].name} had ${CreateImg.allImgArray[i].views} views and ${CreateImg.allImgArray[i].clicks} votes`;
    results.appendChild(li);
  }
}
new CreateImg('Bag', './assets/bag.jpeg');
new CreateImg('Banana', './assets/banana.jpeg');
new CreateImg('Bathroom', './assets/bathroom.jpeg');
new CreateImg('Boots', './assets/boots.jpeg');
new CreateImg('Breakfast', './assets/breakfast.jpeg');
new CreateImg('Bubblegum', './assets/bubblegum.jpeg');
new CreateImg('Chair', './assets/chair.jpeg');
new CreateImg('Cthluhu', './assets/cthulhu.jpeg');
new CreateImg('Dog Duck', './assets/dog-duck.jpeg');
new CreateImg('Dragon', './assets/dragon.jpeg');
new CreateImg('Pen', './assets/pen.jpeg');
new CreateImg('Pet Sweep', './assets/pet-sweep.jpeg');
new CreateImg('Scissors', './assets/scissors.jpeg');
new CreateImg('Shark', './assets/shark.jpeg');
new CreateImg('Sweep', './assets/sweep.png');
new CreateImg('Tauntaun', './assets/tauntaun.jpeg');
new CreateImg('Unicorn', './assets/unicorn.jpeg');
new CreateImg('Water Can', './assets/water-can.jpeg');
new CreateImg('Wine Glass', './assets/wine-glass.jpeg');
renderImg();
imgContainer.addEventListener('click', handleImgClick);
