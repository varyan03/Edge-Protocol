import {Sitting, Jumping, Falling, Rolling, Diving, Hit} from './playerStates.js';
import {Running} from './playerStates.js';
import { CollisionAnimation } from './collisionAnimation.js';

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height  - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 5;
        this.states = [new Sitting(this, this.game), new Running(this,this.game), new Jumping(this, this.game), new Falling(this, this.game), new Rolling(this, this.game), new Diving(this, this.game), new Hit(this, this.game)];
        // this.currentState = this.states[0];
        // this.currentState.enter();
        }

    update(input, deltaTime) { 
        this.checkCollision(); // to detect collision
        this.currentState.handleInput(input);
        // horizontal movement
        this.x += this.speed; // becoz 
        if(input.includes('ArrowRight') && this.currentState != this.states[6])  this.speed = this.maxSpeed;
        else if(input.includes('ArrowLeft') && this.currentState != this.states[6]) this.speed = -this.maxSpeed;
        else this.speed = 0;
        
        // horiz boundaries
        if(this.x < 0) this.x = 0;
        if(this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        // vertical movement
        // if(input.includes('ArrowUp') && this.onGround()) this.vy -= 20;
        this.y += this.vy;
        if(!this.onGround())  this.vy += this.weight;
        else this.vy = 0;
        // vert boundaries
        if(this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;

        // sprite animation
        // if(this.frameX < this.maxFrame ) this.frameX++;
        // else this.frameX = 0;
        if(this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame ) this.frameX++;
            else this.frameX = 0;
        }else {
            this.frameTimer += deltaTime;
        }
    }


    draw(context) {
        if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,this.width, this.height, this.x, this.y, this.width, this.height);
    }

    //helper function to check if on ground or not
    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin; // return true if on ground
    }

    // helper function to set the current state
    setState(state,speed) {
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }

    checkCollision() {
        this.game.enemies.forEach( enemy => {
            if((this.x < enemy.x + enemy.width) && 
                (this.x + this.width > enemy.x) &&
                this.y < enemy.y + enemy.height &&
                this.y + this.height > enemy.y
            ){
                // this.game.score++;
                enemy.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                if(this.currentState === this.states[4] || this.currentState === this.states[5]) {
                    this.game.score++;
                } else{
                    this.setState(6,0);
                }
            }

            // else console.log(" No collision")
        });
    }
}