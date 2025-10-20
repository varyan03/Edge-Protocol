   // added options to dropdown
   
   const animationOptions = [
        {value : 'idle', text: 'Idle'},
        {value : 'jump', text: 'Jump'},
        {value : 'fall', text: 'Fall'},
        {value : 'run', text: 'Run'},
        {value : 'dizzy', text: 'Dizzy'},
        {value : 'sit', text: 'Sit'},
        {value : 'roll', text: 'Roll'},
        {value : 'bite', text: 'Bite'},
        {value : 'ko', text: 'KO'},
        {value : 'getHit', text: 'Get Hit'},
    ]

    const controlDev = document.querySelector('.control-dev');

    const label = document.createElement('label');
    label.htmlFor = 'animations';
    label.textContent = 'Choose Animation: ';


    const select = document.createElement('select');
    select.name = 'animations';
    select.id = 'animations';
    

    animationOptions.forEach(optionData => {
        const option = document.createElement('option');
        option.value = optionData.value;
        option.textContent = optionData.text;
        select.appendChild(option);
    });

    controlDev.appendChild(label);
    controlDev.appendChild(select);
   
   
   // main code for character animation
   let playerState = 'idle';
    const dropdown = document.getElementById('animations');
    dropdown.addEventListener('change', function(e){
        playerState = e.target.value;
    });
    
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    // by default canvas is 300x150
    const CANVAS_WIDTH = canvas.width = 600;
    const CANVAS_HEIGHT = canvas.height = 600;

    const img = new Image();
    img.src = 'shadow_dog.png';
        
    let pos = 0;
    const spriteWidth = 575;
    const spriteHeight = 523;
        

    // to control animation speed
    let gameFrame = 0;
    const spriteAnimations = [];
    const animationStates = [
        {
            name: 'idle',   
            frames: 7,
        },
        {
            name: 'jump',
            frames: 7,
        },
        {
            name: 'fall',
            frames: 7,
        },
        {
            name: 'run',    
            frames: 9,
        },
        {
            name: 'dizzy',
            frames: 11,
        },
        {
            name: 'sit',
            frames: 5,
        },
        {
            name: 'roll',
            frames: 7,
        },
        {
            name: 'bite',
            frames: 7,
        },
        {
            name: 'ko',
            frames: 12,
        },
        {
            name: 'getHit',
            frames: 4,
        }
    ];  

    // creating custom forEach for animations
    animationStates.forEach((state, index) => {
        let frames = {
            loc: [],
        } 
        for(let j = 0; j < state.frames; j++){
            let positionX = j * spriteWidth;
            let positionY = index * spriteHeight;
            frames.loc.push({x: positionX, y: positionY});
        }   
        spriteAnimations[state.name] = frames;
    });

    console.log(spriteAnimations);
      
    function animate(){
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length; // total frames are number of frames for the state; we using math.floor to round down(we only need integer values)
            
        let frameX = spriteWidth * position;
        let frameY = spriteAnimations[playerState].loc[position].y;
        console.log(frameX, frameY); // debugging purpose
        ctx.drawImage(img, frameX , frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
            
        gameFrame++;
        requestAnimationFrame(animate);
    }

    animate();

        