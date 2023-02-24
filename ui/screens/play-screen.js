import Screen from './screen';
import StateMixin from '$core/mixins/states-mixin';
import { Runner }  from 'matter-js';

export const PAUSED = 'paused';
export const ACTIVE = 'active';
class PlayScreen extends Screen {
    constructor(options) {
        options.mixins = [StateMixin];
        super(options);
        this.$listen({
            game: ['pause', 'resume']
        });
    }

    enter() {
        const {app, runner, engine, $rooms} = this;

        if (this.isNot(PAUSED)) {
            $rooms.select();
            app.ticker.add(delta => {
                $rooms.activeRoom.update(delta);
            });
            Runner.start(runner, engine);
            this.createButtons();
        } else {
            //this.removeState(PAUSED);
        }


    }

    leave() {
        const {card, app, runner} = this;

        this.removeState(ACTIVE);
        Runner.stop(runner);
    }

    game_pause() {
        const {card, app, runner} = this;
        this.setState(PAUSED);
        Runner.stop(runner);
        console.log(runner.enabled);

    }

    game_resume() {
        const {card, app, runner, engine} = this;
        if (this.is(PAUSED)) {
            Runner.start(runner, engine);
        }
        //app.ticker.start();
    }
}

export default PlayScreen;

