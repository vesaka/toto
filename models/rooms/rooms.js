import Collection from '$core/models/collection';
import { extend } from '$core/utils/object';
import ZigZagRoom from './zig-zag-room';

class Rooms extends Collection {
    activeRoom = null;
    constructor(options) {
        super(options);
    }
    
    select(type = null, options = {}) {
        const { def, types, scene } = this;
        const keys = Object.keys(MAP);
        
        type = keys.includes(type) ? type : keys[0];
        
        const roomItem = this.first(room => {
            return type === room.type;
        });

        types[type].type = type; 
        const room = roomItem || new MAP[type](extend(def, types[type] || {}));
        this.add(room);
        this.activeRoom = room;
        
        return new Promise((done, fail) => {
            if (room) {
                done(room)
            } else {
                fail();
            }
            
        });
    }
    
    load() {}
    
}

const MAP = {
    zig_zag: ZigZagRoom
};

export default Rooms;

