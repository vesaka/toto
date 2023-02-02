import BaseGame2D from '$core/2d/game-matter';
import { Texture, Container, TilingSprite } from 'pixi.js';
import { Bounds, Vertices, Runner } from 'matter-js';

import Rooms from '$toto/models/rooms/rooms';

class TotoGame extends BaseGame2D {
    
    constructor(options) {
        super(options);
        
        this.$listen({
            game: ['loaded', 'start', 'over', 'reset', 'pause'],
            locale: ['loaded'],
            window: ['resize', 'orientationchange']
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
        const { rooms } = this.options.models;
        this.$rooms = new Rooms(rooms);
        this.$rooms.select().then(room => {
            this.add(room);
            room.objects.each(obj => this.add(obj));
        });
        //.$rooms.select();
        
    }
    
    createUI() {
        
    }
    
    enterRoom() {
        //this.$rooms.
    }
    
    build() {
        this.enterRoom();
    }
    
}

export default TotoGame;

