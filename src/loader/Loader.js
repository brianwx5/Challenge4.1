import App from "../App.js";

export default class Loader extends lng.Component{

    // @todo: add spinner image
    static _template(){
        return {
            w: 1920, h: 1080, rect: true, color: 0xff000000,
            Spinner:{

            }
        }
    }

    _init(){
        // @todo: create spinning animation
    }

    _active(){
        // @todo: start spinner
    }

    _inactive(){
        // @todo: stop spinner
    }
}