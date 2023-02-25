import settings from '$toto/config/settings.json';
export default {
    install(app) {
        app.config.globalProperties.$env = settings;
        window.env = settings;
    }
};

