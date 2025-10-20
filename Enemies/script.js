const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const numberofEnemies = 10;
const enemiesArray = [];
let gameFrame = 0;

class Enemy {
    constructor(x, y, width, height) {
        this.image = new Image();
        this.image.src = 'enemies/enemy1.png';
        
        
        // this.speed = Math.random() * 4  - 2;
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.y = Math.random() * (canvas.height - this.height);
        this.x = Math.random() * (canvas.width - this.width); // to keep the enemy within the canvas
        this.frame = 0; // for flapping wings
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); // to make enemies flap at different speeds
        
    }

    update() {
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5;
        if(gameFrame % this.flapSpeed === 0){  // to control the speed of flapping wings 
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }   

    draw() {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0,this.spriteWidth,this.spriteHeight,this.x, this.y,this.width,this.height);
    }

}

class Enemy2 {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemies/enemy2.png'; 
        this.speed = Math.random() * 4 + 1; 
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.y = Math.random() * (canvas.height - this.height);
        this.x = Math.random() * (canvas.width - this.width);
        this.frame = 0; // for flapping wings
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); // to make enemies flap at different speeds
        this.angle = Math.random() * 2 ; // random starting angle
        this.angleSpeed = Math.random() * 0.2 ; // speed of angle change  
        this.curve = Math.random() * 7;
        }

    update() {
        this.x -= this.speed;
        this.y += this.curve * Math.sin(this.angle) ;
        this.angle += this.angleSpeed;
        if(this.x + this.width < 0) this.x = canvas.width;
        if(gameFrame % this.flapSpeed === 0){  // to control the speed of flapping wings 
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0,this.spriteWidth,this.spriteHeight,this.x, this.y,this.width,this.height);
    }   
}

class Enemy3 {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemies/enemy3.png'; 
        this.speed = Math.random() * 4 + 1; 
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.y = Math.random() * (canvas.height - this.height);
        this.x = Math.random() * (canvas.width - this.width);
        this.frame = 0; // for flapping wings
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); // to make enemies flap at different speeds
        this.angle = Math.random() * 500; // random starting angle
        this.angleSpeed = Math.random() * 0.5 + 0.5; // speed of angle change  
        this.curve = Math.random() * 200 + 50;
        }

    update() {
        this.x = canvas.width / 2 * Math.sin(this.angle * Math.PI / 90) + (canvas.width / 2 - this.width /2);
        this.y = canvas.height * Math.cos(this.angle * Math.PI / 360 ) + (canvas.height / 2 - this.height /2);
        // this.y += this.curve * Math.sin(this.angle) ;
        this.angle += this.angleSpeed;
        if(this.x + this.width < 0) this.x = canvas.width;
        if(gameFrame % this.flapSpeed === 0){  // to control the speed of flapping wings 
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0,this.spriteWidth,this.spriteHeight,this.x, this.y,this.width,this.height);
    }   
}
class Enemy4 {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemies/enemy3.png'; 
        this.speed = Math.random() * 4 + 1; 
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.y = Math.random() * (canvas.height - this.height);
        this.x = Math.random() * (canvas.width - this.width);
         this.newX = Math.random() * (canvas.width - this.width);
        this.newY = Math.random() * (canvas.height - this.height);
        this.frame = 0; // for flapping wings
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); // to make enemies flap at different speeds
        this.interval = Math.floor(Math.random() * 200 + 50);
        }

    update() {
        if(gameFrame % this.interval === 0){
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height);
        }   
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        this.x -= dx/20;
        this.y -= dy/20;
        this.angle += this.angleSpeed;
        if(this.x + this.width < 0) this.x = canvas.width;
        if(gameFrame % this.flapSpeed === 0){  // to control the speed of flapping wings 
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0,this.spriteWidth,this.spriteHeight,this.x, this.y,this.width,this.height);
    }   
}
class Enemy5{
    constructor() {
        this.image = new Image();
        this.image.src = 'enemies/enemy4.png'; 
        this.speed = Math.random() * 4 + 1; 
        this.spriteWidth = 213;
        this.spriteHeight = 213;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.y = Math.random() * (canvas.height - this.height);
        this.x = Math.random() * (canvas.width - this.width);
         this.newX = Math.random() * (canvas.width - this.width);
        this.newY = Math.random() * (canvas.height - this.height);
        this.frame = 0; // for flapping wings
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); // to make enemies flap at different speeds
        this.interval = Math.floor(Math.random() * 200 + 50);
        }

    update() {
        if(gameFrame % this.interval === 0){
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height);
        }   
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        this.x -= dx/20;
        this.y -= dy/20;
        this.angle += this.angleSpeed;
        if(this.x + this.width < 0) this.x = canvas.width;
        if(gameFrame % this.flapSpeed === 0){  // to control the speed of flapping wings 
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0,this.spriteWidth,this.spriteHeight,this.x, this.y,this.width,this.height);
    }   
}
for(let i = 0; i < numberofEnemies; i++){
    enemiesArray.push(new Enemy5());
}

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();