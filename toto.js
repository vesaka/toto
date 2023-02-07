import BaseGame2D from '$core/2d/game-matter';
import { Texture, Container, Graphics } from 'pixi.js';
import { Bounds, Vertices, Runner } from 'matter-js';

import Rooms from '$toto/models/rooms/rooms';
import Lots from '$toto/models/lots/lots';

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

        this.ui.interactive = false;
        this.scene.interactive = true;
        this.app.stage.addChild(this.scene);
        this.app.stage.addChild(this.ui);
        this.createModels();
    }
    
    createModels() {
        const { models } = this.options;
        for(let name in models) {
            const Model = MODELS[name];
            if (Model) {
                this[name] = new Model(models[name]);
            }
        }
    }
    
    collection_ready(items) {
        items.each(item => this.add(item));
    }
    
    room_selected(room) {
        this.add(room);
        room.objects.each(obj => this.add(obj));
    }
    
    createUI() {
        
    }
    
    enterRoom() {
    }
    
    build() {
        this.rooms.select();
        this.enterRoom();
    }
    
}

const MODELS = {
    rooms: Rooms,
    lots: Lots
};

export default TotoGame;

