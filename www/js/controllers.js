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
	
	console.log("el id del personaje es: "+characterId);

       	Character.comicsByID(characterId).then(function(result){
				var data = result.data.results[0];
				// $scope.heroName = data.name;
				// $scope.heroImg = data.thumbnail.path+'.'+data.thumbnail.extension;
				// $scope.attributionText = result.attributionText;

				// var desc = data.description;

				// if(desc.length <=0){
				// 	desc = "No description for this character >:C";
				// }

				// $scope.heroDescription = desc;

				// console.log('El nombre es: '+ data.name);
				// console.log('Descripcion: '+ data.description);

				console.log(data);
			});

	});
