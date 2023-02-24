import Item from './item';
import { Graphics, Point } from 'pixi.js';
import { Body, Bodies, Vector } from 'matter-js';
import { between } from '$core/utils/math';

class CircleItem extends Item {
    constructor(options) {
        super(options);
    }
    
    filter_radius(radius) {
        if (Array.isArray(radius)) {
            radius = bewteen(radius[0], radius[1]);
        }
        
        return radius;
    }
    
    createModel() {
        const { style, radius } = this;
        const circle = new Graphics();
        circle.lineStyle(style.width, style.color);
        circle.drawCircle(0, 0, this.radius);
        return circle;
    }

    createBody() {
        return Bodies.circle(0, 0, this.radius, this.matter);
    }
    
}

export default CircleItem;

