import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';
const PORT = 8000;

//Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename, __dirname);

const server = http.createServer(async (req, res)=> {
// res.write('Hello world');
// res.setHeader('Content-Type', 'text/html');

// console.log(req.url);
// console.log(req.method);

// res.writeHead(200, {'Content-type': 'text/html'});
// res.end('<h1>Hello world</h1>');
try{
//check if GET request
if (req.method ==='GET'){
    let filePath;
if (req.url =='/'){
    filePath = path.join(__dirname, 'public', 'index.html');
}else if (req.url ==='/about'){
    filePath = path.join(__dirname, 'public', 'about.html');
}else{
   throw new Error('Page not found');
}
}else{
    throw new Error('Method not allowed');
}

const data = await fs.readFile(filePath);
res.setHeader('Content-Type', 'text/html');
res.write(data);
res.end();

}catch (error){
res.writeHead(500, {'Content-Type': 'text/html'});
res.end('<h1>Server Error</h1>');
}
});

server.listen(PORT, ()=> {
console.log(`Server running on port ${PORT}`)
});