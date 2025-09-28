import { createServer } from 'http';
const PORT = 8000;

const users = [
    {id: 1, name: 'John Doe'},
    {id: 2, name: 'Jane Doe'},
    {id: 3, name: 'Jim Doe'}
];

//Logger Middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

//JSON Middleware
const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
} ;

//Route handler for Get /api/users
const getUsersHandler = (req, res) => {
    res.write(JSON.stringify(users));
        res.end();
};

//Route Handler for GET /api/users/id
const getUserByIdHandler = (req, res) => {
     console.log(id);
        const user = users.find((user) => user.id === parseInt(id));

    if (user){
             res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(user));
        res.end();
        }else{
            res.setHeader('Content-Type', 'application/json');
          res.statusCode = 404;
        res.write(JSON.stringify({message: 'user not found'}));
        res.end(); 
        }
}

//Not Found Handler
const notFoundHandler = (req, res) => {
      res.statusCode = 404;
        res.write(JSON.stringify({message: 'Route not found'}));
        res.end();
}

const server = createServer((req, res) => { 
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            if (req.url === '/api/users' && req.method === 'GET'){
                getUsersHandler();
            }else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET'){
                const id = req.url.split('/')[3];
                const user = users.find((user) => user.id === parseInt(id));
                if (user) {
                    res.setHeader('Conset-Type', 'applicatio/json');
                    res.write(JSON.stringify(user));
                    res.end();
                }else{
                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = 404;
                    res.write(JSON.stringify({message: 'User Not Found'}))
                    res.end();
                }
            }else{
                res.setHeader('Content-Type', 'application/json');
                    res.statusCode = 404;
                    res.write(JSON.stringify({message: 'Route Not Found'}))
                    res.end();
            }
        })
    });
});
server.listen(PORT, ()=> {
console.log(`Server running on port ${PORT}`)
});