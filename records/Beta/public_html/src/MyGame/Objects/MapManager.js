/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MapManager(spriteTexture,camera,mapIndex) {
    this.mapIndex=mapIndex;
    this.kCamera = camera;
    this.kspriteTexture = spriteTexture;
    this.kWidth = 10;
    this.kHeight = 10;
    this.MapArray = new Array();//这个是二维数组
    this.mMapDesign =[ 
        [// The Lost World 迷失之境
            [1, 1, 1, 0, 1, 1, 0, 1, 1, 1],//10 * 10
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 0, 1, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 1, 0, 1],
            [0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
            [1, 1, 1, 0, 1, 1, 1, 0, 0, 0],
            [1, 0, 0, 1, 0, 0, 1, 1, 1, 1]
        ],
        [// Doughnut 甜甜圈
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        [// Strips 条纹衬衫
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        [// Spiral Way 旋路
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        [// Tai Ji 太极
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
            [1, 0, 0, 1, 1, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 0, 0, 1, 1, 1, 1],
            [0, 1, 0, 0, 0, 0, 1, 1, 1, 0],
            [0, 0, 1, 0, 0, 1, 1, 1, 0, 0],
            [1, 0, 0, 1, 1, 1, 1, 0, 0, 0]
        ],
        [// Meaning 意味
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
            [0, 0, 1, 1, 1, 0, 1, 1, 1, 0],
            [1, 1, 1, 0, 0, 0, 1, 0, 1, 0],
            [1, 0, 1, 1, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 0, 1, 1, 1, 0],
            [1, 1, 1, 0, 0, 0, 1, 0, 1, 0],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0]
        ],
        [// Code Life 码上人生
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 1, 0, 1, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 1, 0, 0],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 0, 1, 1, 0]
        ],
        [// Plait 格子衬衫
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
        ],
        [// Sparkles 星火 无尽模式
            [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
            [0, 1, 1, 0, 0, 1, 0, 0, 1, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
            [0, 1, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [1, 1, 0, 0, 1, 1, 0, 0, 1, 0],
            [1, 0, 0, 1, 0, 0, 1, 1, 0, 1]
        ],
        [// Jumping Master 跳跃高手
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 1, 1, 0, 1, 0, 1]
        ]
    ];
    this.mapNames=[
        "The Lost World",
        "Doughnut",
        "Strips",
        "Spiral Way",
        "Tai Ji",
        "Meaning",
        "Code Life",
        "Plaid",
        "Sparkle",
        "Jumping Master"
    ];
    this.mapChineseNames=[
        "迷失之境",
        "甜甜圈",
        "条纹衬衫",
        "旋路",
        "太极",
        "意味",
        "码上人生",
        "格子衬衫",
        "星火",
        "跳跃高手"
    ];
    this.mDrawLine = false;
    
}

MapManager.prototype.update = function(){
//    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.X)){
//        this.mDrawLine = !this.mDrawLine;
//    }
};

MapManager.prototype.initialize = function(){
    var i,j,l;
    for(i=0;i<this.kWidth;i++){
         this.MapArray[i] = new Array(this.kHeight);
    }
    for(i=0;i<this.kHeight;i++){
        for(j=0;j<this.kWidth;j++){
            var temp;
            console.log(this.mapIndex);
            if(this.mMapDesign[this.mapIndex][i][j]===1){
                temp = new Grass(this.kspriteTexture,j,this.kHeight - 1 - i,this.kCamera);
                temp.initialize();
            }else if(this.mMapDesign[this.mapIndex][i][j]===0){
                temp = new Sand(this.kspriteTexture,j,this.kHeight - 1 - i);
            }
            this.MapArray[j][this.kHeight - 1 - i]=temp;
        }
    }

};

MapManager.prototype.draw = function () {
    var i,j,l;
    for(i=0;i<this.kHeight;i++){
        for(j=0;j<this.kWidth;j++){
            l = this.MapArray[i][j];
            l.draw(this.kCamera);
            if(l.kTag === "Grass" && this.mDrawLine){
                l.drawLine();
            }
            
        }
    }
};