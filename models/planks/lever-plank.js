import Plank, { OPENED, CLOSED} from './plank';
import gsap, { Back } from 'gsap';

class LeverPlank extends Plank {
    
    constructor(options) {
        super(options);
    }

    open(ev) {
        this.setState(OPENED);
        const gap = this.maxOpenDistance;
        
        const point = ev.data.global;
        this.each(item => {
            item.moveTo(point.x + gap*item.direction);
            
        });
//        this.slideSide('left', -gap);
//        this.slideSide('right', gap);
    }
    
    close(ev) {
        this.setState(CLOSED);
        const gap = this.maxOpenDistance;
        const point = ev.data.global;
        
        this.each(item => {
            item.moveTo(point.x);
        });
//        this.slideSide('left', gap);
//        this.slideSide('right', -gap);
    }
    
    move(ev) {
        if (this.isNot(OPENED)) {
            return;
        }
        
        const gap = this.maxOpenDistance;
        const point = ev.data.global;
        this.each(item => {
            item.moveTo(point.x + gap*item.direction);
            
        });
    }
    
    slideSide(name, x) {
        const { body } = this.components[name];
        //body.position.x += x;
        gsap.to(body.position, {
            duration: 0.5,
            //ease: Back.easeOut(1.5),
            repeat: 0,
            x 
        });
    }
}

export default LeverPlank;

