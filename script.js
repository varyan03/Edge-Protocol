 const canvas = document.getElementById('canvas1');
        const ctx = canvas.getContext('2d');

        // --- FIX: Set width and height on the canvas element ---
        // These dimensions are large enough to contain your drawing
        // by default canvas is 300x150
        const CANVAS_WIDTH = canvas.width = 600;
        const CANVAS_HEIGHT = canvas.height = 600;

        const img = new Image();
        img.src = 'shadow_dog.png';
        
        let pos = 0;
        const spriteWidth = 575;
        const spriteHeight = 523;

        let frameX = 0; // total frames are 6 if 7 it will show white space
        let frameY = 1; // for different animation rows

        

        // to control animation speed
        let gameFrame = 0;
        const staggerFrames = 5; // Animation will now update every 10 frames instead of 5; higher the number slower the animation

      
        function animate(){
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            let position = Math.floor(gameFrame / staggerFrames) % 11; // total frames are 6; we using math.floor to round down(we only need integer values)
            frameX = spriteWidth * position; 
            ctx.drawImage(img, frameX , frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
            
            gameFrame++;
            requestAnimationFrame(animate);
        }

        animate();

        