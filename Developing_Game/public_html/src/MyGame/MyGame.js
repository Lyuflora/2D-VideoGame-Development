/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kUIButton = "assets/UI/button.png";
    this.kUIButton = "assets/UI/SimpleButton.png";
    this.kSprite = "assets/sprite.png";
    this.kMapNames = "assets/mapNames.png";
    this.kBg = "assets/EndlessBackGround.png";
    this.kWelcome_bg = "assets/Welcome_bg.png";
    this.kWelcome_front = "assets/Welcome_front.png";
    this.kSelectSprite = "assets/selectScene.png";
    
    this.kClickButton = "assets/AudioTest/NFF-finger-snap.wav";
    this.kOnButton = "assets/AudioTest/NFF-glued.wav";
    this.kBgClip = "assets/AudioTest/BGClip.mp3";
    
    this.kMyGameBgm = "assets/AudioTest/MyGameBackGround.mp3";
    // The camera to view the scene
    
    this.mCamera = null;
    this.PlaySceneButton = null;
    this.InstructionSceneButton = null;
    this.UITitle = null;
    this.generalUI = null;
    this.selectUI = null;
    this.mBg = null;
    this.isSelecting = false;
    this.LevelSelect = null;
    
    this.mBuyIceCream = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    // loads the audios
    gEngine.AudioClips.loadAudio(this.kClickButton);
    gEngine.AudioClips.loadAudio(this.kOnButton);
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kMyGameBgm);
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kSprite);
    gEngine.Textures.loadTexture(this.kMapNames);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kWelcome_bg);
    gEngine.Textures.loadTexture(this.kWelcome_front);
    gEngine.Textures.loadTexture(this.kSelectSprite);
};

MyGame.prototype.unloadScene = function () {
    // stop the background audio
    gEngine.AudioClips.stopBackgroundAudio();
    
    // unload the loaded resources
    gEngine.AudioClips.unloadAudio(this.kOnButton);
    gEngine.AudioClips.unloadAudio(this.kClickButton);
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kMyGameBgm);
    
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kSprite);
    gEngine.Textures.unloadTexture(this.kMapNames);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kWelcome_bg);
    gEngine.Textures.unloadTexture(this.kWelcome_front);
    gEngine.Textures.unloadTexture(this.kSelectSprite);
    if(this.LevelSelect<12&&this.LevelSelect>=0){
        gEngine.Core.startScene(new PlayScene(this.LevelSelect));
    }else if(this.LevelSelect>=12&&this.LevelSelect<24){
        gEngine.Core.startScene(new EndlessPlayingScene(this.LevelSelect-12));
    }else if(this.LevelSelect === "InstructionScene"){
        gEngine.Core.startScene(new InstructionScene());
    }
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(-15.5, -10), // position of the camera
        140,                     // width of camera
        [0, 0, 1000, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1,234/255,167/255, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.PlaySceneButton = new UIButton(this.PlaySceneSelect,this,[475,250],[400,50],"Start Game",6);
    this.InstructionSceneButton = new UIButton(this.InstructionSceneSelect,this,[475,150],[400,50],"Tutorial",6);
    
    var bgR = new SpriteRenderable(this.kWelcome_bg);
    bgR.setElementPixelPositions(0, 4095, 0, 2047);
    bgR.getXform().setSize(140, 84);
    bgR.getXform().setPosition(-15.5, -10);
    this.mBg = new GameObject(bgR);
    
    var bg = new SpriteRenderable(this.kWelcome_front);
    bg.setColor([0, 0, 0, 0]);
    bg.getXform().setPosition(-15.5,-10);
    bg.getXform().setSize(140, 84);
    bg.setElementPixelPositions(0, 4095, 2047, 4095);
    this.mBuyIceCream = new GameObject(bg);
    
    this.UITitle = new UIText("Haha & Coco (beta)",[475,450],8,1,0,[0,0,0,1]);
    this.generalUI = new GeneralUI(this.kSelectSprite,this.mCamera);
    this.generalUI.initialize();
    this.selectUI = new SelectUI(this.kSelectSprite,this.mCamera,this.kSelectSprite,this);
    this.selectUI.initialize();
    gEngine.AudioClips.playBackgroundAudio(this.kMyGameBgm);
    gEngine.AudioClips.setCueVolume(10);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();   
    this.generalUI.draw(this.mCamera);
    this.mBg.draw(this.mCamera);
    if(!this.selectUI.display){
        this.mBuyIceCream.draw(this.mCamera);
        this.PlaySceneButton.draw(this.mCamera); 
        this.UITitle.draw(this.mCamera);
        this.InstructionSceneButton.draw(this.mCamera);
        
    }else{
        this.selectUI.draw(this.mCamera);
    }
};

MyGame.prototype.update = function () {
    if(!this.selectUI.display){
        this.PlaySceneButton.update();
        this.InstructionSceneButton.update();
    }else{
        this.selectUI.update();
    }
    this.generalUI.update();
    //this.EndlessPlayingSceneButton.update();
    //this.InstructionSceneButton.update();
};

MyGame.prototype.PlaySceneSelect = function(){
    this.selectUI.display=true;
//    this.LevelSelect="PlayScene";    
//    this.clickAudio(this.PlaySceneButton);
//    gEngine.AudioClips.stopBackgroundAudio();
//    gEngine.GameLoop.stop();
};
MyGame.prototype.InstructionSceneSelect = function(){
    this.LevelSelect="InstructionScene";    
    this.clickAudio(this.PlaySceneButton);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.GameLoop.stop();
};

MyGame.prototype.clickAudio = function (button) {
    //console.log('play click');
     gEngine.AudioClips.playACue(this.kClickButton,10);
     button.mPlayClickButtonAudio = false;
};