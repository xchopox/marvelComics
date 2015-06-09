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
				console.log('El nombre es: '+ data.name);
			});
			
		}
	})
