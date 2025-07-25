// Elements
const browserContent = document.getElementById('siteContent');
const addressBar = document.getElementById('fakeAddressBar');
let historyStack = [];

// Homepage HTML

let browserHistory = [];
let currentPage = null;

let infectionStepZoomTimer = null;

const homepageHTML = `
  <div class="site-list">
    <a href="#" onclick="navigateTo('seized')">othersight.onion</a><br>
    <a href="#" onclick="navigateTo('seized')">nullbyte.exchange</a><br>
    <a href="#" onclick="navigateTo('seized')">ashenmirror.net</a><br>
    <a href="#" onclick="navigateTo('seized')">echoesofvoid.io</a><br>
    <a href="#" onclick="navigateTo('seized')">obscuretruths.org</a><br>
    <a href="#" onclick="navigateTo('seized')">dollhouse.onion</a><br>
    <a href="#" onclick="navigateTo('seized')">dsgbahkfgjsa.onion</a><br>
    <a href="#" onclick="navigateTo('seized')">alleyhookup.exchange</a><br>
    <a href="#" onclick="navigateTo('seized')">gravemistakes.io</a><br>
    <a href="#" onclick="navigateTo('seized')">secretcam53r12.io</a><br>
    <a href="#" onclick="navigateTo('seized')">june6.1953</a><br>
    <a href="#" onclick="navigateTo('seized')">[REDACTED]</a><br>
    <a href="#" onclick="navigateTo('seized')">crimsonveil.link</a><br>
    <a href="#" onclick="navigateTo('seized')">neveragain.net</a><br>
    <a href="#" onclick="navigateTo('seized')">caughtcards.onion</a><br>
    <a href="#" onclick="navigateTo('seized')">ratkiller.onion</a><br>
    <a href="#" onclick="navigateTo('seized')">[REDACTED]</a><br>
    <a href="#" onclick="navigateTo('seized')">[REDACTED]</a><br>
    <a href="#" onclick="navigateTo('seized')">beastfulnight.net</a><br>
    <a href="#" onclick="navigateTo('seized')">chestnut.exchange</a><br>
    <a href="#" onclick="navigateTo('seized')">glorytoavku.org</a><br>
    <a href="#" onclick="navigateTo('seized')">[REDACTED]</a><br>
    <a href="#" onclick="navigateTo('seized')">creepcave.net</a><br>
    <a href="#" onclick="navigateTo('seized')">silkroad.onion</a><br>
    <a href="#" onclick="navigateTo('seized')">[REDACTED]</a><br>
    <a href="#" onclick="navigateTo('seized')">[REDACTED]</a><br>
    <a href="#" onclick="navigateTo('seized')">[REDACTED]</a><br>
    <a href="#" onclick="navigateTo('seized')">[REDACTED]</a><br>
  </div>
  <!-- Hidden Infection Link -->
  <a href="#" class="hidden-infection-link" onclick="startInfection(event)" title="???"></a>
`;


const infectionSteps = [
  { img: "images/locust.gif", pause: 3000,   clickAdvances: true, size: "15%" },
  { img: "images/hole.jpg", pause: 3000,   clickAdvances: true, size: "20%" },
  { img: "images/forest.jpeg", pause: 3000, clickAdvances: true, size: "20%" },
  { img: "images/house.jpg", pause: 3000, clickAdvances: true, size: "30%" },
  { img: "images/down.jpg", pause: 3000,   clickAdvances: true, size: "20%" },
  { img: "images/stairs.jpg", pause: 3000,   clickAdvances: true, size: "40%" },
  { img: "images/door.png", pause: 1500,   clickAdvances: true, size: "30%" },
  { img: "images/Dud.png", pause: 5000, clickAdvances: false, finalFade: true, size: "10%" }
];

function requestFullscreen() {
  const element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

let infectionIndex = 0;

function startInfection(e) {
  if (e) e.preventDefault();

  requestFullscreen();

  document.getElementById('desktop').style.display = 'none';
  document.getElementById('taskbar').style.display = 'none';
  document.getElementById('browser').style.display = 'none';
  document.getElementById('notepad').style.display = 'none';

  const overlay = document.getElementById('infectionOverlay');
  const imgEl = document.getElementById('infectionImage');
  overlay.classList.remove('hidden');

  infectionIndex = 0;
  showInfectionStep(imgEl);
}

function showInfectionStep(imgEl) {
  const step = infectionSteps[infectionIndex];
  if (!step) return;

  imgEl.classList.remove('first-fade', 'final-start', 'final-show', 'fade-hidden');
  imgEl.style.display = '';
  imgEl.style.width = step.size || '100%';
  imgEl.style.opacity = '';
  imgEl.src = step.img;

  if (infectionIndex === 0) {
    void imgEl.offsetWidth;
    imgEl.classList.add('first-fade');
  }

  if (step.finalFade) {
    imgEl.onclick = null;

    imgEl.style.display = 'none';

    setTimeout(() => {
      imgEl.style.display = '';
      imgEl.classList.add('final-start');

      void imgEl.offsetWidth;

      imgEl.classList.add('final-show');
    }, step.pause);

    return;
  }

  if (step.clickAdvances) {
    imgEl.onclick = () => advanceInfection(imgEl, step.pause);
  } else {
    imgEl.onclick = null;
  }
}

function advanceInfection(imgEl, pause) {
  if (pause && pause > 0) {
    imgEl.style.display = 'none';
    setTimeout(() => {
      infectionIndex++;
      showInfectionStep(imgEl);
    }, pause);
  } else {
    infectionIndex++;
    showInfectionStep(imgEl);
  }
}

// Seized Page HTML
const seizedHTML = `
  <div style="
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
  ">
    <img src="images/seized.png" alt="FBI Seized" style="
      width: 100%;
      height: 100%;
      object-fit: cover;
    ">
  </div>
`;

// Open Browser App
function openApp(appId) {
  document.getElementById(appId).style.display = 'block';

  if (appId === 'browser') {
    browserContent.innerHTML = homepageHTML;
    addressBar.value = "homepage";
  }
}

// Navigation Function
function navigateTo(pageKey) {
  historyStack.push(browserContent.innerHTML);

  // Show loading screen
  browserContent.innerHTML = `
    <div class="loading-screen">
      <p>Loading site...</p>
      <div class="loading-bar">
        <div class="loading-progress"></div>
      </div>
    </div>
  `;

  // Fake URL change
  addressBar.value = pageKey === 'seized' ? "federal-seizure.gov" : "homepage";

  setTimeout(() => {
    if (pageKey === 'seized') {
      browserContent.innerHTML = seizedHTML;
    }
  }, 1500);
}

// Back Button
function goBack() {
  if (historyStack.length > 0) {
    browserContent.innerHTML = historyStack.pop();
    addressBar.value = "homepage";
  }
}

// Close Window
function closeWindow(id) {
  document.getElementById(id).style.display = 'none';
}

// Dragging Function
function dragWindow(event, windowElement) {
  let shiftX = event.clientX - windowElement.getBoundingClientRect().left;
  let shiftY = event.clientY - windowElement.getBoundingClientRect().top;

  function moveAt(pageX, pageY) {
    windowElement.style.left = pageX - shiftX + 'px';
    windowElement.style.top = pageY - shiftY + 'px';
    windowElement.style.transform = 'none';
  }

  function onMouseMove(e) {
    moveAt(e.pageX, e.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  windowElement.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    windowElement.onmouseup = null;
  };
}
