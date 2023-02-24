import Button from './button';
import { toggleFullscreen, isFullscreen } from '$core/utils/fullscreen';

class FullscreenButton extends Button {
    
    onClick() {
        const { app, ui } = this;
        const container = this.app.view.parentNode;
        const texture = isFullscreen() ? 'fullscreen' : 'smallscreen';
        this.toggleEvents(false);
        ui.removeChild(this.view);
        
        this.view = this.createSprite(texture);
        this.view.buttonMode = true;
        this.view.interactive = true;
        this.toggleEvents();
        ui.addChild(this.view);
        toggleFullscreen(container);
        
    }
    
}

export default FullscreenButton;

