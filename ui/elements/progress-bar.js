import { Graphics, RoundedRectangle } from 'pixi.js';
import Progress from '$core/2d/display/progress';
import { hex2dec } from '$core/utils/colors'

class ProgressBar extends Progress {
    constructor(setup) {
        super(setup);
        this.createBar();
    }
    
    
    createBar() {
        const {app, screen, position, size, outer, inner, background} = this;
        
        const $outer = new Graphics();
        const border = size.border;
        $outer.beginFill(hex2dec(outer.fill));
        $outer.drawRoundedRect(
                app.screen.width / 2 - size.width/2,
                position.y - border,
                size.width,
                size.height,
                size.radius
        );
        $outer.endFill();

        const $inner =  new Graphics();
        const $size = {
            x: app.screen.width / 2 - size.width/2 + border,
            y: position.y,
            width: size.width - border*2,
            height: size.height - border*2,
            radius: size.radius
            
        };
        $inner.beginFill(hex2dec(background.fill,16));
        $inner.drawRoundedRect(
                $size.x,
                $size.y,
                $size.width,
                $size.height,
                $size.radius
        );
        $inner.endFill();
        

        this.size = $size;
        $outer.addChild($inner);
        //screen.addChild($outer);
        this.view = $outer;
        this.drawProgress(0);
    }
    
    drawProgress(progress) {
        const {screen, setup, size} = this;
        if (this.bar) {
            screen.removeChild(this.bar);
        }
        const width = Math.round(((progress/100) * size.width) * 100) / 100;
        const bar = new Graphics();
        bar.beginFill(1129955);
        bar.drawRoundedRect(
                size.x,
                size.y,
                width,
                size.height,
                size.radius
        );
        bar.endFill();
        screen.addChild(bar);
        this.bar = bar;
        
    }
    
    loader_progress() {
        this.drawProgress(this.loader.progress);
    }
    
    loader_complete() {
        setTimeout(() => {
            this.screen.removeChild(this.bar);
            this.$emit('game_loaded');
            //this.app.stage.removeChild(this.screen);
        }, 300);
        
    }
    
    onLoadStart() {
        
    }
};

export default ProgressBar;