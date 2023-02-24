import List from '$core/models/list';

import LoadingScreen from './loading-screen';
import HomeScreen from './home-screen';
import PlayScreen from './play-screen';
import PauseScreen from './pause-screen';
import LevelScreen from './level-screen';
import EndScreen from './end-screen';

class Screens extends List {
    
    constructor(options) {
        super(options);
        
        this.$listen({
            loader: ['completed'],
            game: ['loaded', 'start', 'end', 'pause'],
            screen: ['change']
        });
        
        this.createItems();
    }
    
    filter_map() {
        return {
            loading: LoadingScreen,
            home: HomeScreen,
            play: PlayScreen,
            pause: PauseScreen,
            level: LevelScreen,
            end: EndScreen
        };
    }
    
    select(name) { 
        const screen = this.get(name);
        this.$emit('screen_enter', screen);
        this.activeScreen = screen;
    }
    
    screen_change(name) {
        this.select(name);
    }
    
    game_loaded() {
        this.select('play');
    }
    
//    game_pause() {
//        this.select('pause');
//    }
}

export default Screens;

