var api = apimock;
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
	
	var getBlueprintsByNameAndAuthor = function (author, name)
	{
		if(author == null || author == "" || name == null || name == "")
		{
			alert("Invalid data");
		}else 
		{
			nameAuthor = author;
			nameBlueprint = name;
			api.getBlueprintsByNameAndAuthor(nameBlueprint, nameAuthor);
		}
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
                    "</tr>"
                    );
        	});
        }

     return{
         init:function(){
            var valor = document.getElementById("name"),

            nameAuthor=null;

         },
         getBlueprintsByAuthor : getBlueprintsByAuthor,
     };

})();