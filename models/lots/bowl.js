import Lot from './lot';
import { Graphics } from 'pixi.js';
import { Bodies, Vector } from 'matter-js';
import { radians, round } from '$core/utils/math';

const HALF_PI = (Math.PI / 2).toFixed(2);
class Bowl extends Lot {
    #vertices = [];
    constructor(options) {
        options.vertices = [];
        super(options);
        this.updatePosition();

    }

    getVertices() {
        if (!this.vertices.length) {
            const {radius, sides, width} = this;
            let last = null;
            let vertices = [];

            const round = width / 2;
            const outerRadius = radius + round;
            const innerRadius = radius - round;


            vertices = vertices.concat(this.createHalfCircle(outerRadius, outerRadius, outerRadius, sides));
            last = vertices[vertices.length - 1];
            //console.log(last);
            //vertices = vertices.concat(this.createHalfCircle(last.x + round + 0.1, last.y, round, 8, -180));
//            
            vertices = vertices.concat(this.createHalfCircle(outerRadius, outerRadius, innerRadius, sides, 0, true));
//            last = vertices[vertices.length - 1];
//            vertices = vertices.concat(this.createHalfCircle(last.x + round - 0.1, last.y, round, 8, -180, true));
                    ;

            this.vertices = vertices;
        }
        return this.vertices;


    }

    createHalfCircle(x, y, radius, sides, startAngle = 0, reverse = false) {
        const vertices = [];
        const fromAngle = radians(startAngle);

        if (!reverse) {
            for (let i = 0; i < sides; i++) {
                const angle = fromAngle + ((i / (sides - 1)) * Math.PI);
                vertices.push({
                    x: radius * Math.cos(angle),
                    y: radius * Math.sin(angle)
                });
            }
        } else {
            for (let i = sides-1; i >= 0; i--) {
                const angle = fromAngle + ((i / (sides - 1)) * Math.PI);
                vertices.push({
                    x: radius * Math.cos(angle),
                    y: radius * Math.sin(angle)
                });
            }
        }

        return vertices;
    }

    createModel() {
        const model = new Graphics();
        const vertices = this.getVertices();

        model.lineStyle(2, 0xFF8800);
        model.drawPolygon(vertices);
        return model;
    }

    createBody() {
        const {position: {x, y}, radius} = this;
        return Bodies.fromVertices(x + radius, y + radius, this.getVertices(), this.matter);
    }

    updatePosition() {
        this.model.position.x = this.body.position.x;
        this.model.position.y = this.body.position.y-this.radius/2;

        return this;
    }
    
    contains(body) {
        const distance = Vector.magnitude(Vector.sub(body.position, this.body.position));
        return distance < this.radius;
    }
    
    doNotContain(body) {
        return !this.contains(body);
    }
    
    getThresholds() {
        const { radius, position } = this;
        return [position.y - radius, position.y, position.y + radius];
    }
}

export default Bowl;