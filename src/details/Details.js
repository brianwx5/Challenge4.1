import Tools from "../../lib/Tools.js";

export default class Details extends lng.Component{

    static _template(){
        return {
            w:1920, h:1080, rect: true, color: 0xff000000,
            Wrapper:{ x: 200, y: 300,
                flex: {direction: "row"},
                Image:{
                    flexItem:{marginRight:100}
                },
                Content:{
                    flex: {direction: "column"},
                    Title:{
                        text: {fontSize: 50, fontFace: "Bold"}
                    },
                    Info:{
                        text: {fontSize: 36, wordWrapWidth: 1200, lineHeight: 70, fontFace: "Regular"}
                    }
                }
            }
        }
    }

    set data(v){
        const {title, info, image} = v;
        // todo: patch data
        // use image helper from toold
    }
}