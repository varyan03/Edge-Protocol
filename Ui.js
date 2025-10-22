export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
    }

    draw(context){
       context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;

        //score
        context.fillText("SCORE : " + this.game.score, 20, 50);

        //timer 
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        // game over msg
        if(this.game.gameOver) {
            context.textAlign = 'left';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            if(this.game.score > 5){
                context.fillText('OVERRRRR', this.game.width * 0.3,this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText("Spooky Creatures AHead!!!", this.game.width * 0.35, this.game.height * 0.5 +20);
            } else {
                context.fillText('Love at first Bite           ', this.game.width * 0.3,this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText(" Better luck next time!!!", this.game.width * 0.4, this.game.height * 0.5 +20);
            }
           
        
        }
        context.restore();
    }
}