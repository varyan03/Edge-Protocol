import {Player} from './player.js';
import {InputHandler} from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, ClimbingEnemy, GroundEnemy} from './enemy.js';
import {UI} from './Ui.js';
window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 500;

    // Game contructor to initialize all the objects
    // this will serve as an entry point for all the methods and objs
    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 80; // to make sure player is at the right position
            this.speed = 0;
            this.maxSpeed = 5;
            this.background = new Background(this);
            // for player state
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.particles = [];
            this.enemies = []; // to manage enemies states
            this.collisions = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.maxParticles = 50;
            this.debug = false;
            this.score = 0;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = 10000;
            this.gameOver = false;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }

        update(deltaTime){
            this.time += deltaTime;
            if(this.time > this.maxTime) this.gameOver = true;
            // Update game state
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            // enemies
            if(this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            }else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
            })

            // hamdles dust
            this.particles.forEach((particle, index) =>  {
                particle.update();
                if(particle.markedForDeletion) this.particles.splice(index, 1);
            });
            if(this.particles.length > this.maxParticles) {
                this.particles = this.particles.splice(0, this.maxParticles);
            }

            //handles coll sprites
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
                if(collision.markedForDeletion) this.collisions.splice(index, 1);
            })

        }

        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            })

            this.particles.forEach(particle => {
                particle.draw(context);
            })

            this.collisions.forEach(collision => {
                collision.draw(context);
            })

            this.UI.draw(context);
        }

        addEnemy() {
            if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            else if(this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
            // console.log(this.enemies);
        }

    }

    const game = new Game(canvas.width, canvas.height);
    // console.log(game);
    let lastTime = 0;
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        // console.log(deltaTime);
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if(!game.gameOver)requestAnimationFrame(animate);   // 2 special features auto adjust fps auto adj time stamps
    }
    animate(0);

});