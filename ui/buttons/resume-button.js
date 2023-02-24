import Button from './button';

class ResumeButton extends Button {
    
    onClick() {
        
        this.$emit('screen_change', 'play');
        this.$emit('game_resume');
    }
}

export default ResumeButton;

