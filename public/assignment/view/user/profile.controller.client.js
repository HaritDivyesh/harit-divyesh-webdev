(function(){

    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);


    function ProfileController($location, $routeParams, UserService) {
        var vm=this;
        vm.updateUser = updateUser;
        vm.unRegister= unRegister;

        var id=$routeParams.id;

        function init() {
            UserService
                .findUserById(id)
                .then(function(response){
                vm.user=response.data;
            });

        }

        init();

        function unRegister() {


            UserService
                .deleteUser(id)
                .then(
                    function() {
                        $location.url("/login");
                    },
                    function() {
                        vm.error = "Unable to remove user";
                    }
                );

        }

        function updateUser(newUser) {

            UserService
                .updateUser(id, newUser)
                .then(
                    function(response)
                    {
                        vm.success="Updated successfully"
                    },
                    function(error){
                    vm.error="Unable to update";
                    }
                    );


        }
    }
})();
