import BaseGame2D from '$core/2d/game-matter';
import { Texture, Container, Graphics } from 'pixi.js';
import { Bounds, Vertices, Runner, Common } from 'matter-js';
import decomp from 'poly-decomp';

import Rooms from '$toto/models/rooms/rooms';
import Lots from '$toto/models/lots/lots';
import Planks from '$toto/models/planks/planks';

import Screens from '$toto/ui/screens/screens';
import Buttons from '$toto/ui/buttons/buttons';

import { useDefaultStyle } from '$core/2d/display/ui';

Common.setDecomp(decomp);

class TotoGame extends BaseGame2D {
    
    constructor(options) {
        super(options);
        
        this.$listen({
            game: ['loaded', 'start', 'over', 'reset', 'pause'],
            locale: ['loaded'],
            window: ['resize', 'orientationchange'],
            collection: ['ready'],
            room: ['selected', 'left']
        });
        
        this.$set('scene', new Container); 
        this.$set('ui', new Container);

        this.app.view.classList.add('mx-auto');
        this.ui.interactive = false;
        this.scene.interactive = true;
        this.app.stage.addChild(this.scene);
        this.app.stage.addChild(this.ui);
        this.createModels();
        this.createUI();
        
        this.$set('paused', true);
    }
    
    createUI() {
        const { style, screens, buttons } = this.options.ui; 
        useDefaultStyle(style);
        
        this.$set('$buttons', new Buttons(buttons));
        const $screens = new Screens(screens);
        
        $screens.select('loading');
    }
    
    createModels() {
        const { models } = this.options;
        for(let name in models) {
            const Model = MODELS[name];
            if (Model) {
                this.$set(`$${name}`, new Model(models[name]));
            }
        }
    }
    
    collection_ready(items) {
        items.each(item => this.add(item));
    }
    
    room_selected(room) {
        room.eachWall(wall => this.add(wall));
        room.objects.each(obj => this.add(obj));
        room.items.each(item => this.add(item));
        room.lots.each(item => this.add(item));
        room.plank.each(item => this.add(item));
        
    }
    
    room_leave(room) {
        room.eachWall(wall => this.remove(wall));
        room.objects.each(obj => this.remove(obj));
        room.items.each(item => this.remove(item));
        room.lots.each(item => this.remove(item));
        room.plank.each(item => this.remove(item));
        
    }
    
}

const MODELS = {
    rooms: Rooms,
    lots: Lots,
    planks: Planks
};

export default TotoGame;

