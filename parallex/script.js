const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let gameSpeed = 15;
const backgroundLayer1 = new Image();
backgroundLayer1.src = 'backgroundLayers/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'backgroundLayers/layer-2.png';

const backgroundLayer3 = new Image();
backgroundLayer3.src = './backgroundlayers/layer-3.png';

const backgroundLayer4 = new Image();
backgroundLayer4.src = './backgroundLayers/layer-4.png';

const backgroundLayer5 = new Image();
backgroundLayer5.src = './backgroundLayers/layer-5.png';

let x = 0;// initial x coordinate
let x2 = 2400; // second image x coordinate
(function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(backgroundLayer4, x, 0); // first image
    ctx.drawImage(backgroundLayer4, x2, 0); // first image
    if(x < -2400) x = 2400 + x2 - gameSpeed; // we are doing + x2 to avoid gap and - gameSpeed to avoid flicker and how is it working? the ans is is when we reset x to 2400, at that exact frame x2 is also moving left by game speed so to avoid flicker we subtract game speed
    else x-= gameSpeed; // move to left by game speed
    if(x2 < -2400) x2 = 2400 + x - gameSpeed; // we are doing + x to avoid gap and - gameSpeed to avoid flicker and how is it working? the ans is is when we reset x2 to 2400, at that exact frame x is also moving left by game speed so to avoid flicker we subtract game speed
    else x2 -= gameSpeed; // move to left by game speed
    requestAnimationFrame(animate);
     
})();
