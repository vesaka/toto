import Screen from './screen';

import ProgressBar from '$toto/ui/elements/progress-bar';

class LoadingScreen extends Screen {    
    enter() {
        const { progress, view, card } = this;
        this.bar = new ProgressBar(this.progress);
        view.addChild(this.bar.view);
        
        card.visible = false;
    }
    
    leave() {
        const { bar, view, progress } = this;
        view.removeChild(bar.view);
    }
}

export default LoadingScreen;

