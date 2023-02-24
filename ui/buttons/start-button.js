import Button from './button';

class StartButton extends Button {
    
    onClick() {
        this.$emit('screen_change', 'play');
        //this.$scree('');
    }
}

export default StartButton;

