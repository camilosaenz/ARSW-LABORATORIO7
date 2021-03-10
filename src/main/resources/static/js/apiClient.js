var apiclient = (function(){
	
	return{
		getBlueprintsByAuthor : function(author, callback){
			$.get("http://localhost:8080/blueprints/"+author, function(answ){
				callback(answ);
			});
		},
		getBlueprintsByNameAndAuthor : function(name,author,callback){
			$.get("http://localhost:8080/blueprints/"+author+"/"+name, function(answ){
				callback(answ);
			});
		}
	}
	
})();