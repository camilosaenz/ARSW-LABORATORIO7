var apiclient = (function() {

	return {
		getBlueprintsByAuthor : function(author, callback) {
			$.get("http://localhost:8080/blueprints/" + author, function(answ) {
				callback(answ);
			});
		},
		getBlueprintsByNameAndAuthor : function(name, author, callback) {
			$.get("http://localhost:8080/blueprints/" + author + "/" + name,
					function(answ) {
						callback(answ);
					});
		},
		saveUpdate : function(blueprint, callback) {
			var accion = $.ajax({
				type : "PUT",
				url : "http://localhost:8080/blueprints/" + blueprint.author + "/" + blueprint.name,
				data : JSON.stringify(blueprint),
				contentType : "application/json",
			});
			accion.then(function() {
				apiclient.getBlueprintsByAuthor(blueprint.author, callback);
				console.info("OK");
				callback(blueprint.author);
			}, function() {
				alert("No fue posible realizar la actualizacion");
			});
		},
		createBlueprint : function(author, name, callback) {
			var blueprint = {
				author : author,
				name : name,
				points : []
			};
			var accion = $.post({
				url : "http://localhost:8080/blueprints/",
				data : JSON.stringify(blueprint),
				contentType : "application/json"
			});
			accion.then(function() {
				console.info("OK");
				callback(blueprint.author);
			});
		},
		deleteBlueprint : function(blueprint, callback) {
			var accion = $.ajax({
				type : "DELETE",
				url : "http://localhost:8080/blueprints/" + blueprint.author + "/" + blueprint.name,
				data : JSON.stringify(blueprint),
				contentType : "application/json",
			});
			accion.then(function() {
				alert("Se ha eliminado el blueprint: " + blueprint.name + ", del author: " + blueprint.author);
				console.info("OK");
				callback(blueprint.author);
			}, function() {
				console.info("ERROR");
			});
		}
	}

})();