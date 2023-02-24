import UI from '$core/2d/display/ui';
import { Container, Graphics, Text } from 'pixi.js';
class Screen extends UI {
    
    constructor(options) {
        super(options);
        this.__buttons = {};
        this.view = new Container;
        this.view.visible = false;
        this.card = this.createCard();
        
        this.view.addChild(this.card);
        this.ui.addChild(this.view);
        this.active = false;
        
        this.$listen({
            screen: ['enter']
        });
        
        
    }
    
    isSame(screen) {
        return screen.type === this.type;
    }
    
    screen_enter(screen) {
        if (screen.type === this.type) {
            this.view.active = true;
            this.view.visible = true;
            this.enter();
        } else {
            
            if (true === this.view.active) {
                this.view.active = false;
                this.leave();
            }
            this.view.visible = false;            
        }
    }
    
    enter() {
       
        this.createButtons();
    }
    
    leave() {
        this.clearButtons();
    }
    
    addButton(name) {
        const { $buttons, view } = this;
        view.addChild($buttons.get(name).view);
        return this;
    }
    
    createButtons() {
        const { buttons } = this;
        console.log(buttons);
        for (let name in buttons) {
            this.createButton(name, buttons[name]);
        }
    }
    
    createButton(name, options) {
        const { $buttons, view } = this;
        const button = $buttons.create(name, options);
        this.__buttons[name] = button;

        view.addChild(button.view);
        return this;
    }
    
    clearButtons() {
        const { view, __buttons } = this;
        for (let key in __buttons) {
            this.removeButton(__buttons[key]);
        }
    }
    
    removeButton(button) {
        if (typeof button === 'string') {
            button = this.__buttons(button);
        }

        button.toggleEvents(false);
        this.view.removeChild(button.view);
    }
    
    createCard() {
        const { style, size, position, visible } = this;
        const card = new Graphics;
        
        card.beginFill(style.fill, style.alpha || 1);
        card.drawRoundedRect(position.x, position.y, size.width, size.height, style.rounded);
        card.endFill();
        card.pivot.set(size.width/2, size.height/2);
        card.visible = visible;
        const text = new Text(this.type);
        card.addChild(text);
        return card;
    }
}

export default Screen;

