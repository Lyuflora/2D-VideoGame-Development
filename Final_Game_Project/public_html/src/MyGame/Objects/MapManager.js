/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MapManager(spriteTexture,camera) {
    this.kCamera = camera;
    this.kspriteTexture = spriteTexture;
    this.kWidth = 10;
    this.kHeight = 10;
    this.kMapArray = new Array();//这个是二维数组
    
    this.mDrawLine = false;
    
}

MapManager.prototype.update = function(){
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.X)){
        this.mDrawLine = !this.mDrawLine;
    }
};

MapManager.prototype.initialize = function(){
    var i,j,l;
    for(i=0;i<this.kHeight;i++){
        this.kMapArray[i] = new Array(this.kWidth);
        for(j=0;j<this.kWidth;j++){
            var tmp;
            if(i % 2 === 0){
                if(j % 2 === 0){
                    tmp = new Grass(this.kspriteTexture,i,j,this.kCamera);
                }else{
                    tmp = new Sand(this.kspriteTexture,i,j,this.kCamera);
                }
            }else{
                if(j % 2 === 0){
                    tmp = new Sand(this.kspriteTexture,i,j,this.kCamera);
                }else{
                    tmp = new Grass(this.kspriteTexture,i,j,this.kCamera);
                }
            }
            
            this.kMapArray[i][j] = tmp;
            tmp.initialize();
        }
    }

};

MapManager.prototype.draw = function () {
    var i,j,l;
    for(i=0;i<this.kHeight;i++){
        for(j=0;j<this.kWidth;j++){
            l = this.kMapArray[i][j];
            l.draw(this.kCamera);
            if(this.mDrawLine){
                l.drawLine();
            }
            
        }
    }
};