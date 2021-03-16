//var api = apimock;
var api = apiclient;
var app = (function() {

	var blueprint = {
		author : null,
		name : null,
		points : []
	}
	var memory = [];
	var nameAuthor;

	var map = function(list) {
		return mapping = list.map(function(blueprint) {
			return {
				name : blueprint.name,
				pointsCount : blueprint.points.length
			};
		})
	}

	var totalPoints = function(blueprints) {
		var result = blueprints.reduce(function(cont, pos) {
			return cont + pos.pointsCount;
		}, 0);
		$("#totalPoints > h2").text("Puntos Totales: " + result);
	}

	var getBlueprintsByAuthor = function(author) {
		nameAuthor = author;
		api.getBlueprintsByAuthor(nameAuthor, createTable);
	}

	var getBlueprintsByNameAndAuthor = function(author, name) {
		nameAuthor = author;
		api.getBlueprintsByNameAndAuthor(name, nameAuthor, draw);
	}

	var createTable = function(blueprints) {
		blueprints = map(blueprints);
		totalPoints(blueprints);
		$("#table > tbody").empty();
		blueprints
				.map(function(bp) {
					$("#table > tbody")
							.append(
									"<tr> <td>"
											+ bp.name
											+ "</td>"
											+ "<td>"
											+ bp.pointsCount
											+ "</td> "
											+ "<td><form><button class='btn btn-secondary' type='button' onclick='app.getBlueprintsByNameAndAuthor( \""
											+ nameAuthor + '" , "' + bp.name
											+ "\")' >Open</button></form></td>"
											+ "</tr>");
				});
	}

	var draw = function(blueprints) {

		blueprint = blueprints;

		var start = blueprint.points[0];
		$("#myCanvas").text("Blueprint:" + blueprint.name);
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.clearRect(0, 0, 500, 300);
		ctx.beginPath();
		ctx.strokeStyle = 'red';
		ctx.moveTo(start.x, start.y);
		blueprint.points.map(function(point) {
			ctx.lineTo(point.x, point.y);
		})
		ctx.stroke();
		ctx.closePath();
	}

	var saveUpdate = function() {
		api.saveUpdate(blueprint, getBlueprintsByAuthor)
		
	}

	var createBlueprint = function() {
		if (nameAuthor != null) {
			var name = prompt("Escribe el nombre del blueprint del author: " + nameAuthor);
			api.createBlueprint(nameAuthor, name, openBlueprint)
		} else {
			alert("No se especifico el autor!");
		}
	}

	var openBlueprint = function() {
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		getBlueprintsByAuthor(nameAuthor);
	}
	
	var deleteBlueprint = function(){
		if(blueprint != null){
			api.deleteBlueprint(blueprint, getBlueprintsByAuthor);
		}else{
			alert("No se especifico el autor!");
		}
	}

	return {
		init : function() {
			var canvas = document.getElementById("myCanvas"), context = canvas
					.getContext("2d")
			nameAuthor = null;

			if (window.PointerEvent) {
				canvas.addEventListener("pointerdown", function(event) {
					var rect = canvas.getBoundingClientRect();
					var puntos = {
						x : event.pageX - rect.left,
						y : event.pageY - rect.top
					}

					blueprint.points.push(puntos);
					memory.push(puntos);
					draw(blueprint);

				});

			} else {
				canvas.addEventListener("mousedown", function(event) {
					var rect = canvas.getBoundingClientRect();
					var puntos = {
						x : event.pageX - rect.left,
						y : event.pageY - rect.top
					}

					alert('mousedown at ' + x + ',' + y);
				});
			}

		},
		getBlueprintsByAuthor : getBlueprintsByAuthor,
		getBlueprintsByNameAndAuthor : getBlueprintsByNameAndAuthor,
		saveUpdate : saveUpdate,
		createBlueprint : createBlueprint,
		deleteBlueprint : deleteBlueprint
	};

})();