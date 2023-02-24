import Model from '$core/2d/models/matter-model';
import { Graphics, Point } from 'pixi.js';
import { Body, Bodies, Vector } from 'matter-js';
import { hex2dec } from '$core/utils/colors';

class Item extends Model {
    constructor(options) {
        super(options)
    }
    
    filter_style(style) {
        style.color = hex2dec(style.color);        
        return style;
    }
    
    createModel() {
        return new Graphics();
    }

    createBody() {
        return Bodies.rectangle(0, 0, 20, 20);
    }
}

export default Item;

