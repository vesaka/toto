import List from '$core/models/list';
import Cup from './cup';
import Bowl from './bowl';
import {randFromArray} from '$core/utils/math';

class Lots extends List {
    constructor(options) {
        super(options);
        
    }
    
    filter_map(map) {
        
        return {
            bowl: Bowl,
            cup: Cup
        };
    }
    
    filter_count(count) {
        return randFromArray(count);
    }
    
    filter_distance(distance) {
        return randFromArray(distance);
    }
    
    filter_scores(scores) {
        if (Array.isArray(scores)) {
            return scores;
        }
        const scoresArr = [];
        if (typeof scores === 'object' ) {
            const {min, max} = scores;
            const step = scores.step || 1;
            
            for (let it = min; it <= max; it+=step) {
                scoresArr.push(it);
            }
            
            return scoresArr;
        }
        
        return [5, 10, 15, 20, 25];
    }
}

export default Lots;