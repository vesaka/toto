import Model from '$core/2d/models/matter-model';
import { Graphics } from 'pixi.js';
import { Bodies, Body } from 'matter-js';
import { hex2dec } from '$core/utils/colors';
class Line extends Model {
    constructor(options) {
        super(options);
        
        this.halfWidth = this.size.width/2;
        this.updatePosition();
        
    }
    
    createModel() {
        const { style, size, position, type } = this;
        const model = new Graphics;
        model.beginFill(hex2dec(style.fill), 0.7);
        model.drawRect(0, 0, size.width, size.height);
        model.lineStyle(style.line.width, hex2dec(style.line.color), style.line.alpha || 0.5);
        model.endFill();
        return model;
    }
    
    createBody() {
        const { matter, size, position, direction } = this;
//console.log({size, position});
        return Bodies.rectangle(position.x, position.y, size.width, size.height, matter);
    } 
    
    filter_size(size) {
        const { width, height } = this.app.screen;
        size.width *= width;
        size.height *= height;

        return size;
    }
    
    filter_position(position) {
        const { width, height } = this.app.screen;
        position.x *= width;
        position.y *= height;
        return position;
    }
    
    moveTo(x) {
        const { body, model, type, size, halfWidth } = this;
        if ('left' === type) {
            x -= size.width;
        }
        
        Body.setPosition(body, { x: x+halfWidth, y: body.position.y});
        model.position.x = body.position.x - halfWidth;
        
    }
//    
//    updatePosition(delta) {
//        this.model.position.x = this.body.position.x;
//        this.model.position.y = this.body.position.y;
//        return this;
//    }
}

export default Line;
