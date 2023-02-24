import List from '$core/models/list';

import StartButton from './start-button';
import PauseButton from './pause-button';
import ResumeButton from './resume-button';
import LevelButton from './level-button';
import FullscreenButton from './fullscreen-button';
import HomeButton from './home-button';
import LeaderboardButton from './leaderboard-button';
class Buttons extends List {
    
    constructor(options) {
        super(options);
        this.$listen({
            buttons: ['loaded']
        });
    }
    
    buttons_loaded(asset) {
        this.textures = asset.textures;
        
        this.ui.addChild(this.create('fullscreen').view);
    }
    
    hasTexture(name) {
        return !!this.textures[name];
    }
    
    filter_map() {
        return {
            home: HomeButton,
            start: StartButton,
            pause: PauseButton,
            resume: ResumeButton,
            level: LevelButton,
            fullscreen: FullscreenButton,
            leaderboard: LeaderboardButton
        };
    }
}

export default Buttons;

