
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GeneralUI(spriteTexture,camera) {
    this.kspriteTexture=spriteTexture;
    this.mCamera=camera;
    this.fullscreenButton = null;
}

GeneralUI.prototype.update = function(){
    this.fullscreenButton.update();
};

GeneralUI.prototype.initialize = function(){
    //this.fullscreenButton = new UIButton(this.fullscreenSelect,this,[120,550],[200,40],"Fullscreen",4);
    this.fullscreenButton=new NiceButton(this.kspriteTexture,this.fullscreenSelect,this);
    this.fullscreenButton.setPos(-80,26);
    this.fullscreenButton.setSize(5,5);
};

GeneralUI.prototype.draw = function () {
    this.fullscreenButton.draw(this.mCamera);
};

GeneralUI.prototype.fullscreenSelect=function(){
    fullscreenSelect();
};