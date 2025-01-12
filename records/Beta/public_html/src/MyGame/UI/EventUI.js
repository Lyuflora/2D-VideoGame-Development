/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function EventUI(spriteTexture,player,camera) {
    this.mPlayer = player;
    this.mCamera = camera;
    
    this.lightColor = [0,0,0,0];
    this.darkColor = [0.7,0.7,0.7,0.7];
    
    this.mSpeedUpUI = new SpriteRenderable(spriteTexture);
    this.mSpeedUpUI.setColor([0, 0, 0, 0]);
    this.mSpeedUpUI.getXform().setPosition(30, 15);
    this.mSpeedUpUI.getXform().setSize(5,5);
    this.mSpeedUpUI.setElementPixelPositions(513, 640, 384, 512);
    
    this.mSprayFireUI = new SpriteRenderable(spriteTexture);
    this.mSprayFireUI.setColor([0, 0, 0, 0]);
    this.mSprayFireUI.getXform().setPosition(25, 15);
    this.mSprayFireUI.getXform().setSize(5,5);
    this.mSprayFireUI.setElementPixelPositions(640, 768, 384, 512);
    
        
}

EventUI.prototype.update = function(){
    if(this.mPlayer.isSpeedUp){
        this.mSpeedUpUI.setColor(this.lightColor);
    }else{
        this.mSpeedUpUI.setColor(this.darkColor);
    }
    if(this.mPlayer.isSprayFire){
        this.mSprayFireUI.setColor(this.lightColor);
    }else{
        this.mSprayFireUI.setColor(this.darkColor);
    }
//    console.log("fire: " + this.mPlayer.isSprayFire);
//    console.log("speed up: " + this.mPlayer.isSpeedUp);
};

EventUI.prototype.draw = function(){
    this.mSpeedUpUI.draw(this.mCamera);
    this.mSprayFireUI.draw(this.mCamera);
    
};

    


