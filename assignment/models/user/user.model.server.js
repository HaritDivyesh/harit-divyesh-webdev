
module.exports = function () {

    var mongoose=require('mongoose');

    var UserSchema = require("./user.schema.server")();
    var User= mongoose.model("User", UserSchema);

    var api= {

        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        updateUser: updateUser
    };

    return api;
    
    function findUserByUsername(username) {
        return User.findOne({username:username});
    }
    
    function updateUser(userId, user) {
    delete user._id;
    return User
        .update({_id: userId},{
        $set: {
            firstName: user.firstName,
            lastName: user.lastName
        }
        });

    }

    function deleteUser(userId) {

        return User.remove({_id: userId});
    }
    
    function findUserByCredentials(username, password) {

        return User.findOne({username: username, password: password});

    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function createUser(user) {

        console.log("createUser DB test");
        console.log(user);

        return User.create(user);



    }

};
