/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Thermometer(spriteTexture,camera) {
    this.kCamera = camera;
    this.mThermometer = new SpriteRenderable(spriteTexture);
    this.mThermometer.setColor([1, 0.7, 0.1, 0]);
    this.mThermometer.getXform().setPosition(-25,23);
    this.mThermometer.getXform().setSize(50,3);
    this.mThermometer.setElementPixelPositions(0, 1790, 1658, 1757);
   GameObject.call(this, this.mThermometer);
}
gEngine.Core.inheritPrototype(Thermometer, GameObject);