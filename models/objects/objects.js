import Collection from '$core/models/collection';
import { extend, raw } from '$core/utils/object';
import { between } from '$core/utils/math';
import Matrix from '$core/2d/grids/matrix'
import Ball from './ball';
import PingPong from './ping-pong';

import { Graphics } from 'pixi.js';

class Objects extends Collection {
    constructor(options) {
        super(options);

        this.createItems();
    }

    filter_grid(grid) {
        const {width, height} = this.bounds;
        grid.width *= Math.round(width);
        grid.height *= Math.round(height);
        return grid;
    }

    createItems() {
        const {def, types, bounds} = this;

        for (let type in types) {
            if (!MAP[type]) {
                continue;
            }

            const options = extend(def, types[type]);
            options.type = type;


            const count = options.count || 5;
            delete options.count;

            for (let i = 0; i < count; i++) {
                this.add(new MAP[type](raw(options)));
            }
        }
        this.shuffle();
        this.createGrid();

    }

    createGrid() {
        const {grid, bounds} = this;
        let maxSize = null;
        this.each(item => {
            const itemSize = item.getMaxSize();

            if (null === maxSize || maxSize < itemSize) {
                maxSize = itemSize;
            }
        });
        
        maxSize /= 2;
        const count = this.count();
        
      
        grid.rows = Math.ceil(((bounds.width / maxSize) * count) / bounds.width) ;
        grid.columns = Math.floor(count / grid.rows);

        const matrix = new Matrix(grid);
        matrix.eachSlot(slot => {
            const index = (matrix.columns * slot.x) + slot.y;
            const item = this.items[index];
            if (item) {
                item.setPosition(
                        between(slot.ax + maxSize, slot.bx - maxSize),
                        between(slot.ay + maxSize, slot.cy - maxSize)
                );
            }
            const cell = new Graphics;
            cell.lineStyle(2,0xAA7700);
            cell.drawRect(slot.ax, slot.ay, slot.width, slot.height);
            
            this.scene.addChild(cell);
        });
        this.grid = matrix;

    }

}

const MAP = {
    ball: Ball,
    ping_pong: PingPong
}

export default Objects;

