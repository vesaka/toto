import Model from '$core/2d/models/matter-model';
import { Graphics } from 'pixi.js';
import { Bodies, Rectangle, Composite, Common, Constraint } from 'matter-js';

class Wall extends Model {
    constructor(options) {
        super(options);
        
        
//        Constraint.create({
//            bodyA: this.body,
//            pointA: this.body.position
//        });
    }
    
    filter_at(at) {
        const { position: { x, y }, style, size: {width, height} } = this;
        const options = {};
        switch(at) {
            case 'top':
                options.x = x;
                options.y = y;
                options.width = width;
                options.height = style.width;
                break;
            case 'right': 
                options.x = x + width - style.width;
                options.y = y + style.width;
                options.width = style.width;
                options.height = height - style.width;
                break;
            case 'bottom':
                options.x = x;
                options.y = y + height - style.width;
                options.width = width - style.width;
                options.height = style.width;
                break;
            case 'left': 
                options.x = x;
                options.y = y + style.width;
                options.width = style.width;
                options.height = height - style.width*2;
                break;
            default:
                break;
        }
        
        return options;
    }
    
    createModel() {
        const wall = new Graphics;
        const { at, style } = this;

        wall.lineStyle(style.width, style.color);
        wall.drawRect(at.x, at.y, at.width, at.height);
        //wall.pivot.set(app.screen.width/2, app.screen.height/2);
        return wall;
    }
    
    createBody() {
        const { at, matter } = this;
        return Bodies.rectangle(at.x + at.width / 2, at.y + at.height/2, at.width, at.height, matter);
    }
} 

export default Wall;

