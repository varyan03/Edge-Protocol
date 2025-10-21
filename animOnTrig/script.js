const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 700;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect(); //  measuring canvas position
// returns size of an obj and its position relative to the viewport


class Explosion {  
    constructor(x, y) {
        this.spriteWidth = 200;//1000px and 5 frames so one will be 200px  
        this.spriteHeight = 179;//179px height of the sprite
        this.width = this.spriteWidth * 0.7;//keeping the aspect ratio, 
        this.height = this.spriteHeight * 0.7;
        this.x = x - this.width/2; // to center the explosion on click
        this.y = y - this.height/2;
        this.image = new Image();
        this.image.src = 'resources/boom.png';
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2; // random angle between 0 and 2pi (6.28)
        this.sound = new Audio();
        this.sound.src = 'resources/boom.wav';
        
    }

    update() {
        if(this.frame === 0 && this.timer === 0) {
            this.sound.play();
        }
        this.timer++; 
        if(this.timer % 10 === 0) { // to slow down the frame rate of explosion
            this.frame++;
        }
        
    }

    // draw image has 3 version - 3 , 5 and 9
    // the 9 parameters are - image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
    // sx and sy are the source x and y coordinates
    // sWidth and sHeight are the width and height of the source image to be drawn or the area you want to crop out from the sprite sheet
    // dx and dy are the destination x and y coordinates on the canvas // where on canas to be places

    draw() {
    //     ctx.save();
    //     ctx.translate(this.x + this.width/2, this.y + this.height/2); // move to the center of the explosion
    //     ctx.rotate(this.angle); // rotate the canvas
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height); 
        ctx.restore();
    }
}

window.addEventListener('click', function(e) {
   // refers to event object;take info about the event and store it in e 
   createAnimation(e);
   
});

// window.addEventListener('mousemove', function(e) {
//     createAnimation(e);
// });
function createAnimation(e) {
    let positionX = e.x - canvasPosition.left ; // to get the x position relative to the canvas
    let positionY = e.y - canvasPosition.top ; // to get the y position relative to the canvas
    explosions.push(new Explosion(positionX, positionY));
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);   
    for(let i = 0; i < explosions.length; i++) {
        explosions[i].update();
        explosions[i].draw();
        if(explosions[i].frame > 4) { // 4 because there are 5 frames (0-4)
            explosions.splice(i, 1); // to remove the explosion from the array after the animation is done
            i--; // to adjust the index after removing an element from the array
        }   
    }
    requestAnimationFrame(animate);
}

animate();