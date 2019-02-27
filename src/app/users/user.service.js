const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('src/app/helpers/role');
var userFunctions = require('backend/DB/Functions/Users_Functions')
// users hardcoded for simplicity, store in a db for production applications
users = [
    /*
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
    */
];

userFunctions.getAllUsers(function (res){
    users = res;
    // console.log(users)
})

module.exports = {
    authenticate,
    getAll,
    getById
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }

    /*
    User.find({username:username,password:password},function(err,res){
        if (!err) {
            const user = res;
            const token = jwt.sign({ sub: user[0].id, role: user[0].role }, config.secret);
            const { password, ...userWithoutPassword } = user[0];
            console.log(user[0])
            return {
                ...userWithoutPassword,
                token
            };
        }
    })
    */
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}