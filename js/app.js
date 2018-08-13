//Problem: No user interaction capability
//Solution: When user interacts, cause changes appropriately
var color = $(".selected").css("background-color");;
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;
var points = new Object();
points.red=[];
points.blue=[];
points.yellow=[];
points.orange=[];
points.purple=[];
points.green=[];

//When clicking on control list items
$(".controls").on("click", "li", function(){
  //Deselect sibling elements
  $(this).siblings().removeClass("selected");
  //Select clicked element
  $(this).addClass("selected");
  //cache current color
  color = $(this).css("background-color");
});


//When "New Color" is pressed
$("#revealColorSelect").click(function(){
  //Show color select or hide the color select
  changeColor();
  $("#colorSelect").toggle();
});

//update the new color span
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  var o = $("#orange").val();
  var y = $("#yellow").val();
  var p = $("#purple").val();


}

function getXY(e, canvas) {
  var r = canvas.getBoundingClientRect();
  return {x: e.clientX - r.left, y: e.clientY - r.top}
}


function store_points(pos) {
  var color = $('#colors li.selected').attr('id');
  switch(color) {
    case 'blue':
      points.blue.push(pos);
      break;
    case 'red':
      points.red.push(pos);
      break;
    case 'green':
      points.green.push(pos);
      break;
    case 'purple':
      points.purple.push(pos);
      break;
    case 'yellow':
      points.yellow.push(pos);
      break;
    case 'orange':
      points.orange.push(pos);
      break;
}}



//On mouse events on the canvas
$canvas.mousedown(function(e){
  lastEvent = e;
   mouseDown = true;
   var pos = getXY(e, this);
   store_points(pos);

  
}).mousemove(function(e){
  var pos = getXY(e, this);
  
  
  //Draw lines
  if(mouseDown) {
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.stroke();
    lastEvent = e;
    store_points(pos);
  }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function(){
  $canvas.mouseup();
});
/*
function exportJson(el) {

  //var data = "text/json;charset=utf-8," + encodeURIComponent((points));
  console.log(points)
  var data = "text/json;charset=utf-8," + JSON.stringify(points);
  el.setAttribute("href", "data:"+data);
  el.setAttribute("download", "data.json");    
  context.clearRect(0, 0, canvas.width, canvas.height);
  var lastEvent;
  var mouseDown = false;
  var points = new Object();
  points.red=[];
  points.blue=[];
  points.yellow=[];
  points.orange=[];
  points.purple=[];
  points.green=[];
}

$( "#exportJSON2" ).click(function() {
  exportJson(el)
}
);
*/

function get_data() {
  return points;
}

function delete_data() {
  points.red=[];
  points.blue=[];
  points.yellow=[];
  points.orange=[];
  points.purple=[];
  points.green=[];
}

$("#exportJSON2").click(function() {
  //var data = "text/json;charset=utf-8," + encodeURIComponent((points));
  var p = get_data();
  console.log(p);
  var data = "text/json;charset=utf-8," + JSON.stringify(p);
  this.setAttribute("href", "data:"+data);
  this.setAttribute("download", "data.json");
  context.clearRect(0, 0, canvas.width, canvas.height);
  var lastEvent;
  var mouseDown = false;
  delete_data();
});