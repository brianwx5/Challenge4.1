import Api from "../lib/Api.js";
import AppContents from "./AppContents.js";
import Splash from "./splash/Splash.js";

export default class App extends ux.App {
    static getFonts() {
        return [
            {family: 'Black', url: App.getPath('fonts/Roboto-Black.ttf'), descriptors: {}},
            {family: 'Bold', url: App.getPath('fonts/Roboto-Bold.ttf'), descriptors: {}},
            {family: 'Light', url: App.getPath('fonts/Roboto-Light.ttf'), descriptors: {}},
            {family: 'Italic', url: App.getPath('fonts/Roboto-Italic.ttf'), descriptors: {}},
            {family: 'Regular', url: App.getPath('fonts/Roboto-Regular.ttf'), descriptors: {}}
        ]
    }

    static _template() {
        return {
            w: 1920, h: 1080, rect: true, color: 0xff081c24, colorLeft: 0x2001d277, colorBottom: 0xff081c24,
            Splash: {
                type: Splash
            },
            AppContents: {
                type: AppContents, alpha: 0
            }
        };
    }

    _construct() {
        this._api = new Api();
    }

    _init(){
        this._setState("PrepareContent");
    }

    $api() {
        return this._api;
    }

    static _states() {
        return [
            class PrepareContent extends this {
                $enter() {
                    this._timestart = Date.now();
                    this._api.boot().then(response => {
                        this.tag("AppContents").syncHomeData(response);
                        this._onPrepared();
                    })
                }
                _onPrepared(){
                    this._timeend = Date.now();
                    const diff = this._timeend - this._timestart;
                    const timeout =  Math.max(0,2000-diff);

                    setTimeout(()=>{
                        this.tag("Splash").finishSplash();
                    },timeout);
                }
                $finished(){
                    this._setState("AppContents");
                }
            },
            class AppContents extends this {
                $enter() {
                    this.tag("AppContents").setSmooth("alpha", 1)
                }
                $exit() {
                    this.tag("AppContents").setSmooth("alpha", 0)
                }
                _getFocused() {
                    return this.tag("AppContents");
                }
            }
        ];
    }
}