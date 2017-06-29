/**
 * Created by manika on 6/28/17.
 */
module.exports= function (app){

    app.get('/api/project/users', findUsers)
    app.get('/api/project/user/:userId', findUserById);
    app.get('/api/project/user', findUserByCredentials);
    app.post('/api/project/user', createUser);
    app.put('/api/project/user/:userId', updateUser);
    app.delete('/api/project/user/:userId', deleteUser);
    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
        {_id: "100", username: "a", password: "a", firstName: "a", lastName: "a", email: "a@gmail.com"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charles@bing.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@neu.com"}
    ];

    function findUserById(req, res) {
        var userId= req.params['userId'];
        var user = users.find(function (user) {
            return user._id === userId;
        });

        res.send(user);
    }
    function findUsers(req,res) {
        res.send(users)
    }

    function findUserByCredentials(req,res) {
        var username= req.query['username'];
        var password= req.query['password'];
        for(var u in users){
            var user=users[u];
            if(user.username===username && user.password===password){
                res.json(user);
                return;
            }
        }

        res.sendStatus(404);
    }

    function createUser(req,res) {
        var user=req.body;
        user._id = (new Date()).getTime()+"";
        users.push(user);
        res.send(user);

    }

    function updateUser(req,res) {
        var user=req.body;
        var userId=req.params.userId;



        for(var u in users){
            if(userId=== users[u]._id){
                users[u]= user;
                res.sendStatus(200);
                return;
            }

        }
        res.sendStatus(404);
    }

    function deleteUser(req,res) {
        var userId=req.params.userId;
        var user= users.find(function (user) {
            return user._id=== userId;
        });
        var index= users.indexOf(user);
        users.splice(index,1);
        res.sendStatus(200);
    }

}