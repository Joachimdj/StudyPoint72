var app = angular.module('App', ['ngRoute']);


    var cars = [
    { id: 1, year: 1997,registered: new Date(1999,3,15), make: 'Ford',model: 'E350', description: 'ac, abs, moon', price: 3000 }
    ,{ id: 2, year: 1999,registered: new Date(1996,3,12), make: 'Chevy', model: 'Venture', description: 'None', price: 4900 }
    ,{ id: 3, year: 2000,registered: new Date(199,12,22), make: 'Chevy', model: 'Venture', description: '', price: 5000 }
    ,{ id: 4, year: 1996,registered: new Date(2002,3,15), make: 'Jeep', model: 'Grand Cherokee',description: 'Moon roof',price: 4799 }];



var persons = [
    {id: 1, name: "Jens", age: 18},
    {id: 2, name: "Peter", age: 23},
    {id: 3, name: "Hanne", age: 23}
];

var selected;
var users=[];
app.controller("UserController", function ($scope, $http, $routeParams) {
    if (users.length === 0) { $http.get("data.json").success(function (data) {
        users = data.users;
        $scope.users = users; })
    }
    else{ //We could use the cache property on the http request instead
        $scope.users = users; }
    if (users != null) {
        $scope.user = users[$routeParams.id];
    } });

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/allPersons', {
            templateUrl: 'Views/PersonTable.html',
            controller: 'personController'
        }).
        when('/allcars', {
            templateUrl: 'Views/CarTable.html',
            controller: 'carController'
        }).
        when('/newperson', {
            templateUrl: 'Views/newPerson.html',
            controller: 'newController'
        }).
        when('/details/:id', {
            templateUrl: 'Views/personDetail.html',
            controller: 'personDetails'
        }).
        when('/JsonUsers', {
            templateUrl: 'Views/JsonUsers.html',
            controller: 'UserController'
        }).
        otherwise({
            redirectTo: 'allPersons'
        });
}]);
app.controller("personController", function($scope){
    $scope.persons =  persons

    $scope.totalPersons = function() {
        return $scope.persons.length;
    }
});

app.controller("carController", function($scope){
    $scope.cars =  cars

    $scope.totalcars = function() {
        return $scope.persons.length;
    }
});

app.controller("newController", function($scope){

    $scope.savePerson = function(){
        if($scope.formPerson.id == null) {
            $scope.persons.push({id:  $scope.persons.length+1,name: $scope.formPerson.name, age: $scope.formPerson.age});
            $scope.formPerson = "";
            $scope.formPerson = "";
        }
        else
        {
            for(i in $scope.persons) {
                if($scope.persons[i].id == $scope.formPerson.id) {
                    $scope.persons[i] = $scope.formPerson;
                }
            }
            $scope.formPerson = "";
            $scope.formPerson = "";
        }
    }


});

app.controller("newController", function($scope){

    $scope.savePerson = function(){
        if($scope.formPerson.id == null) {
            $scope.persons.push({id:  $scope.persons.length+1,name: $scope.formPerson.name, age: $scope.formPerson.age});
            $scope.formPerson = "";
            $scope.formPerson = "";
        }
        else
        {
            for(i in $scope.persons) {
                if($scope.persons[i].id == $scope.formPerson.id) {
                    $scope.persons[i] = $scope.formPerson;
                }
            }
            $scope.formPerson = "";
            $scope.formPerson = "";
        }
    }


});

app.controller('personDetails', ['$scope', '$routeParams', function ($scope, $routeParams) {

    if($routeParams.id){
        $scope.selected = $scope.persons.filter(function(person){
            return person.id == $routeParams.id;
        })[0];
    }

}]);


