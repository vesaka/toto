import Collection from '$core/models/collection';
import { extend } from '$core/utils/object';
import ZigZagRoom from './zig-zag-room';

class Rooms extends Collection {
    activeRoom = null;
    constructor(options) {
        super(options);
    }
    
    select(type = null, options = {}) {
        const { def, types } = this;
        const keys = Object.keys(MAP);
        
        type = keys.includes(type) ? type : keys[0];
        
        const roomItem = this.first(room => {
            return type === room.type;
        });
        const roomOptions = extend(def, types[type] || {});
        roomOptions.type = type; 
        const room = roomItem || new MAP[type](roomOptions);
        
        this.add(room);
        this.activeRoom = room;
        this.$emit('room_selected', room);
    }
    
    load() {}
    
}

const MAP = {
    zig_zag: ZigZagRoom
};

export default Rooms;

