angular.module('marvelComics.controllers',['marvelComics.services'])

	.controller('ComicSearchCtrl', function($scope, Character){
		$scope.searchText = "";
		$scope.clearSearch = function(){
			$scope.searchText = "";
		}

		$scope.search = function(){
			//$scope.comics = Comics.findByQuery($scope.searchText);

			Character.findByQuery($scope.searchText).then(function(result){
				var data = result.data.results[0];

				$scope.heroName = data.name;
				$scope.heroImg = data.thumbnail.path+'.'+data.thumbnail.extension;
				$scope.attributionText = result.attributionText;
				$scope.cId = data.id; 

				var desc = data.description;

				if(desc.length <=0){
					desc = "No description for this character >:C";
				}

				$scope.heroDescription = desc;

				console.log('El nombre es: '+ data.name);
				console.log('Descripcion: '+ data.description);
			});
			
		}
	})

       .controller('ComicListCtrl', function($scope, $stateParams, Character){

	var characterId = $stateParams.characterID; 
	var characterName = $stateParams.characterName;
	
	console.log("el id del personaje es: "+characterId);
	
	$scope.heroName = characterName; 

       	Character.comicsByID(characterId).then(function(result){
				var data = result.data.results;
				$scope.comics = data;
				console.log(data);
			});

	})


       .controller('ComicDetailCtrl', function($scope, $stateParams, Character){

	var comicId = $stateParams.comicID;
	
	console.log("el id del personaje es: "+ comicId);
	 
       	Character.comicByID(comicId).then(function(result){
				var data = result.data.results[0];
				
				$scope.comicTitle = data.title;
				$scope.diamondCode = data.diamondCode
				$scope.comicImg = data.thumbnail.path+'.'+data.thumbnail.extension;
				$scope.comicDesc = data.description; 
				
				console.log(data);
			});

	});
