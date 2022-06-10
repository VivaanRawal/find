status="";
objects=[];
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    object_name=document.getElementById("object").value;
}
function modelLoaded(){
    console.log("Model Loaded");
    status=true;
   
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
        console.log(results);
        objects=results;    
}
function draw(){
    image(video,0,0,480,380);
    if(status !=""){
        objectDetector.detect(video,gotResults);
        for(i=0; i< objects.length;i++) {
            document.getElementById("status").innerHTML="Staus: Objects Detected";
           
            fill("red");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+ percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(object_name==objects[i].label){
                document.getElementById("number_of_objects").innerHTML="object found-"+object_name;
            }
            else{
                document.getElementById("number_of_objects").innerHTML="object not found-"+object_name;
            }
        }

    }
}