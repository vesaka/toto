import Collection from '$core/models/collection';
import { extend, raw } from '$core/utils/object';
import Circle from './circle-item';
import Rect from './rect-item';

class ItemsCollection extends Collection {
    constructor(options = {}) {
        super(options);

//        this.createItems();
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


    }
}

const MAP = {
    circle: Circle,
    rect: Rect
};

export default ItemsCollection;

