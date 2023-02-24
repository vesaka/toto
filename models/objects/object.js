import Model from '$core/2d/models/matter-model';
import { rand } from '$core/utils/math';
import StateMixin from '$core/mixins/states-mixin';
class Object extends Model {
    constructor(options) {
        options.mixins = [StateMixin];
        super(options);
        
        this.label = this.body.label = `${this.type}_${this.index}`;
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
    
    update() {
        super.update();
        const { body } = this;
        if ((body.position.y > 500) && body.speed < 0.3 && this.isNot('landed')) {
            this.addState('landed');
          //console.log(body.label, body.speed);
        }
        //console.log()
    }
    
    
}

export default Object;


