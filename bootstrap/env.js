import settings from '$toto/config/settings.json';
window.env = settings;
export default {
    install(app) {
        app.config.globalProperties.$env = settings;
        
    }
};

