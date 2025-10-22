import { Dust } from './particles.js';
const states = {
    SITTING : 0,
    RUNNING : 1,
    JUMPING : 2,
    FALLING : 3,
    ROLLING : 4,
    DIVINING : 5,
    HITTING : 6,
}

class State {
    constructor(state,game){
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends State{
    constructor(player,game) {
        super('SITTING',game);
        // this.game.player = player;
    }

    enter() {
        this.game.player.frameX = 0; // to remove occasional blinking
        this.game.player.maxFrame = 4;
        this.game.player.frameY = 5;
    }

    handleInput(input){
        if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.game.player.setState(states.RUNNING,1);
        }else if (input.includes('Enter')) {
            this.game.player.setState(states.ROLLING,2);
        }
    }
}
export class Running extends State{
    constructor(player,game) {
        super('RUNNING', game);
        // this.game.player = player;
    }

    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 3;
        this.game.player.maxFrame = 6;
    }

    handleInput(input){
        this.game.particles.push(new Dust(
            this.game, 
            this.game.player.x + this.game.player.width * 0.5, // Center of player
            this.game.player.y + this.game.player.height      // Bottom of player
        ));
        if(input.includes('ArrowDown')){
            this.game.player.setState(states.SITTING, 0);
        }

        else if (input.includes('ArrowUp') || input.includes(' ')) {
            this.game.player.setState(states.JUMPING,1);
        }else if (input.includes('Enter')) {
            this.game.player.setState(states.ROLLING,2);
        }
    }
}
export class Jumping extends State{
    constructor(player,game) {
        super('JUMPING', game);
        // this.game.player = player;
    }

    enter() {
        if(this.game.player.onGround()){
            this.game.player.vy -= 30;
        }
        this.game.player.frameX = 0;
        this.maxFrame = 6;
        this.game.player.frameY = 1;

    }

    handleInput(input){
        if(this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING, 1);
        }else if (input.includes('Enter')) {
            this.game.player.setState(states.ROLLING,2);
        }
    }
}

export class Falling extends State{
    constructor(player,game) {
        super('FALLING', game);
        // this.game.player = player;
    }

    enter() {
        if(this.game.player.onGround()){
            this.game.player.vy -= 30;
        }
        this.game.player.frameX = 0; 
        this.maxFrame = 6;
        this.game.player.frameY = 2;
    }

    handleInput(input){
        if(this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        }
    }
}
export class Rolling extends State{
    constructor(player,game) {
        super('ROLLING', game);
        // this.game.player = player;
    }

    enter() {
       
        this.game.player.frameX = 0; 
        this.maxFrame = 7;
        this.game.player.frameY = 6;
    }

    handleInput(input){
        if(!input.includes('Enter') && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        }else if (!input.includes('Enter') && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 1);
        }
        else if(input.includes('Enter') && 
        (input.includes('ArrowUp') || input.includes(' ')) &&
        this.game.player.onGround()
        ){
            this.game.player.vy = -27;
        }
    }
}