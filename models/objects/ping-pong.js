import Object2D from './object';
import { Graphics } from 'pixi.js';
import { Bodies } from 'matter-js';

class PingPong extends Object2D {
    constructor(options) {
        super(options);
    }

    createModel() {
        const model = new Graphics();
        model.lineStyle(2, 0x888822);
        model.drawCircle(0, 0, this.radius);
        return model;
    }
    
    createBody() {
        return Bodies.circle(0, 0, this.radius, this.matter);
    }
}

export default PingPong;


