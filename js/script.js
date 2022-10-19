'use strict';
/*---------------------------------*/
/*------Page Global Variables------*/
/*---------------------------------*/
let imgContainer = document.querySelector('section');
let resultButton = document.querySelector('button');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
/*---------------------------------*/
/*------Math Global Variables------*/
/*---------------------------------*/
let clicks = 0;
let maxClicksAllowed = 25;
let uniqueImageCount = 6;
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

  // Removes the first 3 values in the array (ie: the previous round's images)
  let vote1 = roundImgArray.shift();
  let vote2 = roundImgArray.shift();
  let vote3 = roundImgArray.shift();
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
  renderChart();
}
/*---------------------------------*/
/*----------ChartJS Render---------*/
/*---------------------------------*/
function renderChart() {
  let imgNames = [];
  let imgLikes = [];
  let imgViews = [];
  for (let i = 0; i < CreateImg.allImgArray.length; i++) {
    imgNames.push(CreateImg.allImgArray[i].name);
    imgLikes.push(CreateImg.allImgArray[i].clicks);
    imgViews.push(CreateImg.allImgArray[i].views);
  }

  const data = {
    labels: imgNames,
    datasets: [
      {
        label: 'Times Clicked',
        data: imgLikes,
        //Blue
        backgroundColor: ['rgba(255, 255, 255, 0.3)'],
        borderColor: ['rgb(255, 255, 255)'],
        borderWidth: 1,
      },
      {
        label: 'Times Seen',
        data: imgViews,
        //Red
        backgroundColor: ['rgba(255, 134, 156, 0.3)'],
        borderColor: ['rgb(255, 39, 104)'],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  const myChart = new Chart(document.getElementById('myChart'), config);
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
