//var api = apimock;
var api = apiclient;
var app = (function() {
	
	var blueprint ={author:null , name: null, points:[]}
    var memory=[];
    var nameAuthor;
    
    var map = function (list){
    	return mapping = list.map(function(blueprint){
    		return {name:blueprint.name, pointsCount:blueprint.points.length};
    		})
    }

    var totalPoints = function(blueprints){
        var result = blueprints.reduce(function(cont,pos)
        { return cont +pos.pointsCount;},0);
        $("#totalPoints > h2").text("Puntos Totales: " + result);
    }

    var getBlueprintsByAuthor = function (author){

            if(author == null || author == "" ){
                alert("invalid author");
            } else {
            	nameAuthor=author;
                api.getBlueprintsByAuthor(author, createTable);
            }
    }
    
    var getBlueprintsByNameAndAuthor = function(author,name){
        memory = [];
        nameAuthor=author;
        api.getBlueprintsByNameAndAuthor(name,author,draw);
    }
    
    var createTable = function(blueprints) {
    	blueprints = map(blueprints);
        totalPoints(blueprints);
        $("#table > tbody").empty();
        blueprints.map(function(bp){
        	$("#table > tbody").append(
        			"<tr> <td>" +
                    bp.name +
                    "</td>" +
                    "<td>" +
                    bp.pointsCount +
                    "</td> " +
                    "<td><form><button type='button' onclick='app.getBlueprintsByNameAndAuthor( \"" +
                    nameAuthor +
                    '" , "' +
                    bp.name +
                    "\")' >Open</button></form></td>" +
                    "</tr>"
                    );
        	});
        }
    
    var draw= function(blueprints){

        blueprint = blueprints;
        
        var start = blueprint.points[0];
        $("#myCanvas").text("Blueprint:" +blueprint.name);
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0,0,500,300);
        ctx.beginPath();
        ctx.strokeStyle= 'red';
        ctx.moveTo(start.x,start.y);
        blueprint.points.map(function(point){
            ctx.lineTo(point.x,point.y);
        })
        ctx.stroke();
        ctx.closePath();
    }

    return{
    	init:function(){
    		var canvas = document.getElementById("myCanvas"),
    		context = canvas.getContext("2d")
            nameAuthor=null;
    		
    		if(window.PointerEvent) {
                canvas.addEventListener("pointerdown", function(event){
                    var rect= canvas.getBoundingClientRect();
                    var puntos = {
                    	x : event.pageX-rect.left,
                    	y : event.pageY-rect.top
                    }
                   
                    blueprint.points.push(puntos);
                    memory.push(puntos);
                    draw(blueprint);

                    });

            }
            else {
                canvas.addEventListener("mousedown", function(event){
                	var rect= canvas.getBoundingClientRect();
                	var puntos = {
                        	x : event.pageX-rect.left,
                        	y : event.pageY-rect.top
                    }

                alert('mousedown at '+x+','+y);
                });
            }


    		
        },
        getBlueprintsByAuthor : getBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor :getBlueprintsByNameAndAuthor
    };

})();