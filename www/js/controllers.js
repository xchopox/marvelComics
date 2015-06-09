angular.module('marvelComics.controllers',['marvelComics.services'])

	.controller('ComicListCtrl', function($scope, Comics){
		$scope.searchText = "";
		$scope.clearSearch = function(){
			$scope.searchText = "";
			$scope.comics = Comics.findByQuery();
		}

		$scope.search = function(){
			//$scope.comics = Comics.findByQuery($scope.searchText);

			Comics.findByQuery($scope.searchText).then(function(result){
				var data = result.data.results[0];

				$scope.heroName = data.name;
				$scope.heroImg = data.thumbnail.path+'.'+data.thumbnail.extension;
				$scope.attributionText = result.attributionText;

				var desc = data.description;

				if(desc.length <=0){
					desc = 'No description for this character >:(';
				}

				$scope.heroDescription = desc;

				console.log('El nombre es: '+ data.name);
				console.log('Descripcion: '+ data.description);
			});
			
		}
	})
