import Model from '$core/2d/models/matter-model';
import { Graphics, Bounds } from 'pixi.js';

class Lot extends Model {
    constructor(options) {
        super(options);
    }
    
    contains(body) {
        return Bounds.overlaps(body.bounds, this.body.bounds);
    }
    
    isAbove(body) {
        return this.body.position.y < body.position.y;
    }
    
    isBellow(body) {
        return this.body.position.y > body.position.y;
    }
    
    getThresholds() {
        const { size, position } = this;
        return [position.y, position.y + size.height];
    }
    
//    createModel() {
//        
//    }
}

export default Lot;