const http = require('http')
const url = require('url')
const fs = require('fs')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  //请求路径
  const pathname = url.parse(req.url).pathname
  console.log(pathname, 'pathname')
  //请求后缀
  const ext = /(\.[^.]+|)$/.exec(pathname)[0]
  if (ext === '.css' || ext === '.js') {//public资源
    fs.readFile(`public/${pathname}`, 'utf-8', (err, data) => {
      if (err) {
        throw err
      }
      res.statusCode = 200
      if (ext === '.css') {
        res.setHeader('Content-Type', 'text/css')
      } else if (ext === '.js') {
        res.setHeader('Content-Type', 'application/javascript')
      }
      res.end(data)
    })
  } else if (pathname === '/') {//index.html
    fs.readFile('views/index.html', 'utf-8', (err, data) => {
      if (err) {
        throw err
      }
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      res.end(data)
    })
  } else if (pathname === '/test0') {//ajax请求
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    const a = { status: 0, data: [{ a: 1, b: 2 }] }
    const b = JSON.stringify(a)
    res.end(b)
  } else if (pathname === '/test1') {//fetch请求
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    const a = { status: 0, data: [{ a: 3, b: 4 }] }
    const b = JSON.stringify(a)
    res.end(b)
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});