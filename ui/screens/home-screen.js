import Screen from './screen';

class HomeScreen extends Screen {
    constructor(options) {
        super(options);
    }
    
    enter() {
        this.createButton('start');
    }
}

export default HomeScreen;

