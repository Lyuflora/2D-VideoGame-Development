/* File: Minion.js 
 *
 * Creates and initializes a Minion object
 * overrides the update function of GameObject to define
 * simple sprite animation behavior behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Minion(spriteTexture, atX, atY) {
    this.kDelta = 0.2;
    this.mMinion = new SpriteAnimateRenderable(spriteTexture);
    this.color3=0;
    this.mMinion.setColor([1, 1, 1, this.color3]);
    this.mMinion.getXform().setPosition(atX, atY);
    this.mMinion.getXform().setSize(10, 8);
    this.mMinion.setSpriteSequence(512, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    204, 164,   // widthxheight in pixels
                                    5,          // number of elements in this sequence
                                    0);         // horizontal padding in between
    this.mMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mMinion.setAnimationSpeed(30);
                                // show each element for mAnimSpeed updates
                                
    this.lb=this.mMinion.getXform().getXPos()-5;//left bound
    this.rb=this.lb+10;//right bound
    this.bb=this.mMinion.getXform().getYPos()-4;//bottom bound
    this.tb=this.bb+8;//top bound
    GameObject.call(this, this.mMinion);
}
gEngine.Core.inheritPrototype(Minion, GameObject);

Minion.prototype.update = function (BrainPos,L) {
    // remember to update this.mMinion's animation
    if(L){
        this.mMinion.getXform().setPosition(BrainPos[0]+10,BrainPos[1]-6);
    }else{
        this.mMinion.getXform().setPosition(BrainPos[0]+10,BrainPos[1]+6);
    }
    
    this.lb=this.mMinion.getXform().getXPos()-5;//left bound
    this.rb=this.lb+10;//right bound
    this.bb=this.mMinion.getXform().getYPos()-4;//bottom bound
    this.tb=this.bb+8;//top bound
    this.mMinion.updateAnimation();
};

Minion.prototype.getLb = function(){
    return this.lb;
};
Minion.prototype.getRb = function(){
    return this.rb;
};
Minion.prototype.getBb = function(){
    return this.bb;
};
Minion.prototype.getTb = function(){
    return this.tb;
};
Minion.prototype.in=function(lb,rb,bb,tb,x,y){
    if(x>=lb&&x<=rb&&y>=bb&&y<=tb){
        return true;
    }
    return false;
}
Minion.prototype.collide=function(lb,rb,bb,tb){
    return(this.in(lb,rb,bb,tb,this.lb,this.bb)||
           this.in(lb,rb,bb,tb,this.lb,this.tb)||
           this.in(lb,rb,bb,tb,this.rb,this.bb)||
           this.in(lb,rb,bb,tb,this.rb,this.tb) 
           );
}