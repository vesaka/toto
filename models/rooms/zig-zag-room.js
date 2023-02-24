import Room from './room';
import { Point } from 'pixi.js';
class ZigZagRoom extends Room {
    constructor(options) {
        super(options);
    }
    
    calculatePositionAtSlot(slot) {
        const { rows, columns } = this.items.grid;

        const isOddRow = 0 !== (Number(slot.x) % 2);
        if ((Number(slot.y) === columns-1) && isOddRow) {
            return false;
        }
        
        const point = new Point(slot.ax + slot.width * 0.5, slot.ay + slot.height * 0.5);
        if (isOddRow) {
            point.x += slot.width * 0.5;
        }
        return point;
    }
    
    enter() {
        
    }
}

export default ZigZagRoom;

