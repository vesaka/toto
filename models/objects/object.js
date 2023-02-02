import Model from '$core/2d/models/matter-model';
import { rand } from '$core/utils/math';
class Object extends Model {
    constructor(options) {
        super(options)
    }
    
    filter_radius(radius) {
        if (Array.isArray(radius)) {
            return rand(radius[0], radius[1]);
        }
        
        return radius;
    }
    
    drawShape(droplet) {

    }
    
    getMaxSize() {
        const size = this.model.getBounds();
        return Math.round(Math.max(size.width, size.height));
    }
}

export default Object;


