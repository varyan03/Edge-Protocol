 const canvas = document.getElementById('canvas1');
        const ctx = canvas.getContext('2d');

        // --- FIX: Set width and height on the canvas element ---
        // These dimensions are large enough to contain your drawing
        // by default canvas is 300x150
        const CANVAS_WIDTH = canvas.width = 600;
        const CANVAS_HEIGHT = canvas.height = 600;

        const img = new Image();
        img.src = 'shadow_dog.png';
        // let x = 0;
        let pos = 0;
        const spriteWidth = 575;
        const spriteHeight = 523;

        // function animate(){
        //     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);   
            
        //         ctx.drawImage(img,1*575,0,575,523,0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
                
        //         requestAnimationFrame(animate);
            
            
        // }
        const staggerFrames = 0; // Animation will now update every 10 frames instead of 5
        function animate(){
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            
            let posFrame = pos * spriteWidth;
            ctx.drawImage(img, posFrame,  0* spriteHeight, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            if(pos < 5) pos++;
            else pos = 0;
            
            requestAnimationFrame(animate);
        }

        animate();

        // --- Your Drawing Code (Unchanged) ---

        // Hut Base (Rectangle)
        // ctx.lineWidth = 10;
        // ctx.strokeStyle = 'saddlebrown';
        // ctx.strokeRect(75, 140, 150, 110);
        
        // Door (Filled Rectangle)
        // ctx.fillStyle = 'darkgoldenrod';
        // ctx.fillRect(130, 190, 40, 60);

        // Roof (Triangle)
        // ctx.strokeStyle = 'darkred';
        // ctx.beginPath();
        // ctx.moveTo(50, 140);
        // ctx.lineTo(150, 60);
        // ctx.lineTo(250, 140);
        // ctx.closePath();
        // ctx.stroke();