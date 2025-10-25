import {Player} from './player.js';
import {InputHandler} from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, ClimbingEnemy, GroundEnemy} from './enemy.js';
import {UI} from './Ui.js';
import { ScoreManager } from './score.js';

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const usernamePrompt = document.getElementById('usernamePromptOverlay');
    const usernameInput = document.getElementById('usernameInput');
    const saveButton = document.getElementById('saveUsernameButton');
    const restartButton = document.getElementById('restartButton');

    canvas.width = 800;
    canvas.height = 500;


    const USERNAME_KEY = 'endlessRunnerUsername';
    let game = null;
    // Game contructor to initialize all the objects
    // this will serve as an entry point for all the methods and objs
    class Game {
        constructor(width, height,username){
            this.width = width;
            this.height = height;
            this.username = username;

            this.groundMargin = 80; // to make sure player is at the right position
            this.speed = 0;
            this.maxSpeed = 5;
            this.background = new Background(this);
            // for player state
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.scoreManager = new ScoreManager();
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
            this.maxTime = 30000;
            this.gameOver = false;
            
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }

        update(deltaTime){
            this.time += deltaTime;
            if(this.time > this.maxTime) {
                this.gameOver = true;
                this.scoreManager.updateHighScore(this.score);
            }

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

    let lastTime = 0;
     function animate(timeStamp){
     let deltaTime = timeStamp - lastTime; // Change to 'let'
     lastTime = timeStamp;

        // --- THIS IS THE FIX ---
        // If deltaTime is huge (first frame, or tabbed away),
        // cap it to a normal frame's length (e.g., ~60fps)
        if (deltaTime > 100) {
            deltaTime = 16.67; 
        }
        // --- END FIX ---

     ctx.clearRect(0, 0, canvas.width, canvas.height);

         if (game) {
            game.update(deltaTime); // Will now use the capped value
            game.draw(ctx);
            if (game.gameOver) {
                restartButton.style.display = 'block'; // Show the button
            }
            if(!game.gameOver) requestAnimationFrame(animate);
        }
     }
    // animate(0);


    // --- Main Startup Function ---
    function startGame(username) {
        // This function now starts the game
        usernamePrompt.style.display = 'none'; // Hide the prompt
        restartButton.style.display = 'none';
        game = new Game(canvas.width, canvas.height, username); // Create game with username
        lastTime = 0;
        animate(0);
    }

    // --- !!! THIS IS THE NEW LOGIC !!! ---

    // 1. Check local storage for the username
    const storedUsername = localStorage.getItem(USERNAME_KEY);

    if (storedUsername) {
        // 2. If user exists, start the game immediately
        startGame(storedUsername);
    } else {
        // 3. If no user, show the prompt
        usernamePrompt.style.display = 'flex';
    }

    // 4. Add listener for the "Start Game" button
    saveButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            localStorage.setItem(USERNAME_KEY, username);
            startGame(username); // Start the game with the new username
        } else {
            alert('Please enter a name!');
        }
    });

    restartButton.addEventListener('click', () => {
        startGame(this.username); // Restart the game with the same user
    });

});