/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function FireManager(spriteTexture,camera,iceCreamManager) {
    this.kspriteTexture = spriteTexture;
    this.kIceCreamManager = iceCreamManager;
    this.kCamera = camera;
    this.mFireArray = [];
    
}

FireManager.prototype.update = function(){
    var i,l;
    for(i=0;i<this.mFireArray.length;i++){
        l = this.mFireArray[i];
        if(l !== null){
            if(l.isDead || l.mFire.getXform().getXPos() > 200 || l.mFire.getXform().getXPos() < -200){
                l = null;
                this.mFireArray[i] = null;
            }else{
                l.update();
            }
            
        }
    }
};

FireManager.prototype.draw = function(){
    var i,l;
    for(i=0;i<this.mFireArray.length;i++){
        l = this.mFireArray[i];
        if(l !== null){
            l.draw(this.kCamera);
        }
    }
};

FireManager.prototype.createFire = function(player){
    var fire = new Fire(this.kspriteTexture,player,this.kIceCreamManager);
    this.mFireArray.push(fire);
};

