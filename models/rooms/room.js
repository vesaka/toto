import Model from '$core/2d/models/matter-model';
import { Graphics } from 'pixi.js';
import { Bodies, Rectangle} from 'matter-js';
import { hex2bin, hex2base } from '$core/utils/colors';
class Room extends Model {
    constructor(options) {
        super(options);
        this.$listen({
            room: ['enter', 'leave']
        });
        
        
    }
    
    filter_size(size) {
        const { width, height } = this.app.screen;
        size.width *= width;
        size.height *= height;

        return size;
    }
    
    filter_position(position) {
        const { width, height } = this.app.screen;
        const { size } = this;
        
        position.x = (width - size.width) / 2;
        position.y = (height - size.height) / 2;
        return position;
    }
    
    filter_border(border) {
        border.color = hex2bin(border.color);
        return border;
    }
    
    createModel() {
        const { border, size, position } = this;
        const room = new Graphics();

        room.lineStyle(border.width, border.color);
        room.drawRect(position.x, position.y, size.width, size.height);
console.log(border.colo);
        return room;
    }
    
    createBody() {
        const {position, model, size, matter} = this;
        
        matter.chamfer = { radius: this.rounded};
        
        return Bodies.rectangle(
                model.position.x,
                model.position.y,
                model.width,
                model.height,
                matter
        );
    }
    
    createItems() {
        
    }
    
    enter() {
        
    }
    
    leave() {
        
    }
}

export default Room;

