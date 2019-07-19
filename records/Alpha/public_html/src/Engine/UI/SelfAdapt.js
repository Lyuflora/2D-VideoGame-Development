function selfAdapt(){
    var ratio=10/8;
    var div=document.getElementById("LoadingIconParent");
    var canvas=document.getElementById("GLCanvas");
    var r=5/3;
    var length=(window.innerHeight*r<window.innerWidth?window.innerHeight:window.innerWidth/r)/ratio;
    div.style.height=length+"px";
    div.style.width=length*r+"px";
    canvas.style.height=length+"px";
    canvas.style.width=length*r+"px";
    //document.getElementById("rule").style.width=(window.innerWidth-length*r)+"px";
    //div.style.left=((window.innerWidth-length*r)/2)+"px";
}