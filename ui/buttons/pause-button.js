import Button from './button';

class PauseButton extends Button {
    
    onClick() {
        this.$emit('game_pause');
        this.$emit('screen_change', 'pause');
    }
}

export default PauseButton;

