status="";
img="";
objects=[];
objectDetector="";
function preload(){
   img=loadImage("Fruit-basket.png"); 
}
function setup(){
    canvas=createCanvas(300,300);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects...";
}
function modelLoaded(){
    console.log("Model loaded");
    status=true;
    objectDetector.detect(img, gotResults);
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}
function draw(){
    if(status!=undefined){
        image(img,0,0,350,350);
        for(var i=0;i<objects.length;i++){
            r=random(0,255);
            g=random(0,255);
            b=random(0,255);
            document.getElementById("status").innerHTML="Status: Object detected...";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are: "+objects.length;
            stroke(r,g,b);
            fill(r,g,b);
            noFill();
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"% ",objects[i].x,objects[i].y);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
