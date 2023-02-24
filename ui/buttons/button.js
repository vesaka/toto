import UI from '$core/2d/display/ui';

import { Graphics, Text, Sprite } from 'pixi.js';
import { t } from '$core/utils/i18n';
import { raw, extend } from '$core/utils/object';

class Button extends UI {
    view = null;
    constructor(options) {
        super(options);

        this.view = this.createView();
        
        if (this.view instanceof Graphics) {
            this.text = this.createText();
            this.view.addChild(this.text);
        }

        this.toggleEvents();

    }

    createView() {
        const {$buttons, type, style, size, position, icon} = this;
        const iconType = icon || type;
        let view;
        if ($buttons.hasTexture(iconType)) {
            view = this.createSprite(iconType);
        } else {
            view = new Graphics;
            view.beginFill(style.fill, style.alpha);
            view.drawRoundedRect(position.x, position.y, size.width, size.height, size.radius);
            view.endFill();
            view.pivot.set(size.width / 2, size.height / 2);
        }


        
        view.buttonMode = true;
        view.interactive = true;
        return view;
    }

    createText() {
        const {type, style, position, view} = this;
        const styles = raw(style);
        styles.alight = 'center';
        styles.fill = styles.color;
        delete styles.color;

        const text = new Text(t(`ui.button.${type}`), styles);
        text.anchor.set(0.5);
        text.position.set(position.x + view.width / 2, position.y + view.height / 2);
        return text;
    }

    createTexture() {
        const {type} = this;

    }

    toggleEvents(bind = true) {

        const {type, view} = this;
        const action = true === bind ? 'on' : 'off';
        for (let event in MAP_EVENTS) {
            const method = MAP_EVENTS[event];
            if (typeof this[method] === 'function') {
                view[action](event, this[method], this);
            }
        }
    }
    
    createSprite(name) {
        const view = new Sprite(this.$buttons.textures[name]);
        view.position.set(this.position.x, this.position.y);
        view.scale.set(0.25);
        view.anchor.set(0.5);
        return view;
    }
}

export const MAP_EVENTS = {
    pointertap: 'onClick',
    pointerdown: 'onHold',
    pointerup: 'onRelease',
    pointermove: 'onMove',
};

export default Button;

