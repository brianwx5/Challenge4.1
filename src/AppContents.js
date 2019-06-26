import Browse from "./browse/Browse.js";
import Background from "./components/Background.js";
import Menu from "./components/Menu.js";
import Tools from "../lib/Tools.js";
import Loader from "./loader/Loader.js";
import Details from "./details/Details.js";

export default class AppContents extends lng.Component {
    static _template(){
        return {
            y: 30,
            Background: {
                type: Background
            },
            Menu: {
                type: Menu, signals:{select:"_select"}
            },
            Movie:{
                type: Browse, alpha: 0
            },
            Tv:{
                type: Browse, alpha: 0
            },
            Details:{

            },
            Loader:{

            }
        };
    }

    _init() {
        this._setState("Movies");
    }

    _focus() {
        this.patch({
            smooth: {y: [0, {duration: .6}]}
        });
    }

    _unfocus() {
        this.patch({
            smooth: {y: [30, {duration: .6}]}
        });
    }

    syncHomeData(data){
        data.forEach((data)=>{
            this.tag(Tools.ucFirst(data.type)).data = data;
        });
    }

    $onItemSelect({item}){
        const api = this.fireAncestors("$api");
        /*

        @todo:
        - make fetchDetails call
        - set app to loading state
        - show Loading component
        - hand over details to details view
        - add details state
        - show details view
         */
    }

    static _states() {
        return [
            class Menu extends this{
                $enter({prevState}){
                    this._menuReturnState = prevState;
                }
                _getFocused(){
                    return this.tag("Menu");
                }
                _handleDown(){
                    this._setState(this._menuReturnState);
                }
                _select({state}){
                    // inspect state
                    // set app in correct state
                }
            },
            class Loading extends this{
                $enter(args){

                }
                $exit(args,data){

                }
            },
            class Details extends this{
                $enter(args){

                }
                $exit(args,data){

                }
                _handleBack(){

                }
                _getFocused(){

                }
            },
            class Movies extends this {
                $enter(){
                    this.tag("Movie").setSmooth("alpha",1);
                }
                $exit({newState}){
                    if(newState === "Menu"){
                        this._stored = "Movie";
                        return;
                    }
                    this.tag("Movie").setSmooth("alpha",0);
                }
                _handleUp(){
                    this._setState("Menu");
                }
                _getFocused() {
                    return this.tag("Movie");
                }
                _updatePreview(item){
                    this.tag("Movie").setContent(item);
                }
            },
            class Series extends this {
                $enter(){
                    this.tag("Tv").setSmooth("alpha",1);
                }
                $exit({newState}){
                    if(newState === "Menu"){
                        this._stored = "Tv";
                        return;
                    }
                    this.tag("Tv").setSmooth("alpha",0);
                }
                _handleUp(){
                    this._setState("Menu");
                }
                _getFocused() {
                    return this.tag("Tv");
                }
                _updatePreview(item){
                    this.tag("Tv").setContent(item);
                }
            }
        ]
    }

    $onItemFocus({item}) {
        this.tag("Background").item = item;
        this._updatePreview(item);
    }

    $toggleMenu({visible}){
        this.patch({
            Menu:{
                smooth:{
                    alpha:visible?1:0,
                    y:visible?0:-30
                }
            }
        })
    }

    get default(){
        return "Movies";
    }
}