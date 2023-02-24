import List from '$core/models/list';
import { extend } from '$core/utils/object';

import LeverPlank from './lever-plank';
import DoorPlank from './door-plank';

class Planks extends List {
    activeRoom = null;
    constructor(options) {
        super(options);
    }
    
    filter_map() {
        return {
            lever: LeverPlank,
            door: DoorPlank
        };
    }
    
    create(type = '') {
        const {def, map, types} = this;
        const keys = Object.keys(map);
        type = keys.includes(type) ? type : keys[0];
        
        
        const options = types[type];
        options.type = type;
        return new map[type](extend({def}, options));
    }
        

    
}

export default Planks;

