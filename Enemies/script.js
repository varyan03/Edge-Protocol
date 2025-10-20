const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;


// enemy1 = {
//     x: 10,
//     y: 50,
//     width: 200,
//     height: 200
// }


class Enemy {
    constructor(x, y, width, height) {
        this.x = 10;
        this.y = 10;
        this.width = 100;
        this.height = 100;
    }


}

const enemy1 = new Enemy();
const enemy2 = new Enemy();

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemy1.x += 0.5;
    enemy1.y++;

    enemy2.x += 1;
    enemy2.y += 0.5;
    ctx.fillRect(enemy1.x, enemy1.y, enemy1.width, enemy1.height);
    ctx.fillRect(enemy2.x, enemy2.y, enemy2.width, enemy2.height);
    requestAnimationFrame(animate);
}
animate();