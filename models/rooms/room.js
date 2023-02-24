import Model from '$core/2d/models/matter-model';

import { Graphics, Point } from 'pixi.js';
import { Bodies, Rectangle, Composite, Common } from 'matter-js';
import { hex2dec } from '$core/utils/colors';
import { raw, extend, isObject } from '$core/utils/object';
import Objects from '$toto/models/objects/objects';
import Wall from './wall';
import ItemsCollection from './items/items-collection';
import Matrix from '$core/2d/grids/matrix';

import Circle from './items/circle-item';
import Rect from './items/rect-item';
import Collection from '$core/models/collection';
import Planks from '$toto/models/planks/planks';

import StateMixin from '$core/mixins/states-mixin';

export const ACTIVE = 'active';

class Room extends Model {
    walls = {}
    constructor(options) {
        options.mixins = [StateMixin];
        super(options);
        this.$listen({
            room: ['enter', 'leave', 'selected']
        });
        
        this.createWalls();
        this.createItems();
        
        this.threshold = this.lots.min(item => item.position.y + item.radius/2);
        const line = new Graphics();
        line.lineStyle(5, 0xFFFFFF).moveTo(0, this.threshold).lineTo(this.app.screen.width, this.threshold);
        this.scene.addChild(line);
    }
    
    createThresholds() {
        
    }
    
    filter_lots() {
        const { lots, $lots, size, position } = this;
        const { item } = lots;
        
        const lotSpace = size.width / lots.count;
        const list = new Collection({items: []});
        for (let i = 0; i < lots.count; i++) {
            const _item = raw(item);
            _item.position = {
                x: position.x + (lotSpace * i) + ((lotSpace / 2) - _item.radius),
                y: size.height - _item.radius*2
            };
            const lot = $lots.createItem(item.type, _item);
            list.add(lot);
            
        }
        
        
        
        return list;
    }
    
    createWalls() {
        const { walls, style, matter, size, position } = this;
        
        const options = { style, matter, size };
        const edges = ["top", "right", "bottom", "left"];
        
        edges.forEach(edge => {
            walls[edge] = new Wall(extend(options, { at: edge, position, is: edge }))
        });

    }
    
    eachWall(callback) {
        for (let edge in this.walls) {
            callback(this.walls[edge]);
        }
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
    
    filter_style(style) {
        style.color = hex2dec(style.color);        
        return style;
    }
    
    filter_objects(objects) {
        const { size, position } = this;
        objects.bounds = raw(size); 
        objects.grid.offset = position;
        return new Objects(objects);
    }
    
    filter_items(items) {
        const { size, position, objects } = this;
        items.bounds = raw(size); 
        items.grid.width *= size.width;
        items.grid.height *= size.height;
        items.grid.offset.x = objects.grid.offset.x;
        items.grid.offset.y = 100;
        items.grid.height += size.height / 2;
        return new ItemsCollection(items);
    }
    
    filter_plank(plank) {
        return this.$planks.create(plank);
    }
    
    createModel() {
        const { style, size, position, app} = this;
        const room = new Graphics();

        room.lineStyle(style.width, style.color);
        room.drawRect(position.x, position.y, size.width, size.height);
        room.pivot.set(app.screen.width/2, app.screen.height/2);
        return room;
    }
    
    createBody() {
        return Composite.create();    
    }
    
    createItems() {
        const { items } =  this;
        const matrix = new Matrix(items.grid);
        const type = Object.keys(MAP)[0];
        const FirstItemClass = MAP[type];
        
        const itemOptions = extend(items.def, items.types[type]);
        itemOptions.type = type;
        
        matrix.eachSlot(slot => {
            const point = this.calculatePositionAtSlot(slot);
            if (point instanceof Point) {
                const item = new FirstItemClass(raw(itemOptions));
                item.setPosition(point.x, point.y);
                items.add(item);
            }
        });

    }
    
    calculatePositionAtSlot(slot) {
        return new Point(slot.ax + slot.width / 2, slot.ay + slot.height / 2);
    }
    
    activate() {
        this.setState(ACTIVE);
        return this;
    }
    
    deactivate() {
        this.removeState(ACTIVE);
        return this;
    }
    
    room_selected(room) {
        if (this.type === room.type) {
            this.setState(ACTIVE);
            this.plank.activate();
            this.enter();
        } else {
            if (this.is(ACTIVE)) {
                this.removeState(ACTIVE);
                this.leave();
            }
        }
    }
    
    enter() {
        
    }
    
    leave() {
        
    }
    
    update(delta) {
        const { threshold, lots } = this;
        this.objects.each(item => item.update());
        this.items.each(item => {
            item.update();
            this.lots.each(lot => {
                
            });
        });
        
    }
}

const MAP = {
    circle: Circle,
    rect: Rect
};

export default Room;

