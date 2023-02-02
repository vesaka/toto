import Model from '$core/2d/models/matter-model';
import { Graphics } from 'pixi.js';
import { Bodies, Rectangle, Composite } from 'matter-js';
import { hex2dec } from '$core/utils/colors';
import Objects from '$toto/models/objects/objects';
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
        border.color = hex2dec(border.color);        
        return border;
    }
    
    filter_objects(objects) {
        objects.bounds = this.size;
        return new Objects(objects);
    }
    
    createModel() {
        const { border, size, position } = this;
        const room = new Graphics();

        room.lineStyle(border.width, border.color);
        room.drawRect(position.x, position.y, size.width, size.height);

        return room;
    }
    
    createBody() {
        const {position, model, size, matter, border} = this;
        const { x, y } = model.position;
        const { width, height } = model;
        
        const walls = Composite.create();
        
        const left = Bodies.rectangle(x, y, x + border.width, height, matter);
        const top  = Bodies.rectangle(x, y, x, height + border.width, matter);
        const right = Bodies.rectangle(x + width, y, x + border.width, height, matter);
        const bottom = Bodies.rectangle(x, y + height, x, height + border.width, matter);
        
        Composite.add(walls, left);
        Composite.add(walls, top);
        Composite.add(walls, right);
        Composite.add(walls, bottom);
        return walls;
        
    }
    
    createItems() {
        
    }
    
    enter() {
        
    }
    
    leave() {
        
    }
}

export default Room;

