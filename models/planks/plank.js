import Group from '$core/2d/models/matter-group';
import { Graphics, Container } from 'pixi.js';
import { Bodies } from 'matter-js';
import { raw, extend } from '$core/utils/object';
import Line from './components/line';
import StateMixin from '$core/mixins/states-mixin';

export const OPENED = 'opened';
export const CLOSED = 'closed';

class Plank extends Group {
        
    constructor(options) {
        options.mixins = [StateMixin];
        super(options);
        this.$name = this.$name.replace(/plank$/i, '');
        this.setState(CLOSED);
    }
    
    
    createComponents() {
        const { def, style, matter, components } = this;
        const items = {};
        for (let name in components) {
            const options = extend(def, components[name]);
            options.type = name;
            items[name] = new Line(options);
        }

        return items;
    }
    
    activate() {
        const { scene, app } = this;
        const control = new Graphics;
        control.beginFill(0x000000, 0.01);
       // control.visible = false;
        control.drawRect(0, 0, app.screen.width, app.screen.height);
        control.endFill();
        control.interactive = true;
        scene.addChild(control);
        this.control = control;
        this.toggleEvents();
    }
    
    deactivate() {
        this.control.interactive = false;
        this.toggleEvents(false);
        this.scene.removeChild(this.control);
    }
    
    toggleEvents(bind = true) {
        const { scene, control } = this;
        const { view } = this.app;
        const action = bind ? 'on' : 'off';
        const domAction = bind ? 'addEventListener' : 'removeEventListener';
        control[action]('pointerdown', this.open, this);
        control[action]('pointerup', this.close, this);
        control[action]('pointermove', this.move, this);
        
    }
    
    onOpen() {
        this.$emit('plank_open', this);
        this.open();
    }
    
    onClose() {
        this.$emit('plank_close', this);
        this.close();
    }
    
    onMove() {
        this.$emit('plank_move', this);
        this.move();
    }
    
    open() {
        console.log('open');
    }
    
    close() {
        
    }
    
    move() {
        
    }
    
    
    
    
}

export default Plank;

