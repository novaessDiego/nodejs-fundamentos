import http from 'node:http'
import { json } from './midllewares/json.js'
import { routes } from './routes.js'

const server = http.createServer( async (req, res) => {
  const {method, url} = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if(route) {
    const routParams = req.url.match(route.path)
    return route.handler(req, res)
  }

  return res.writeHead(404).end("Not Found")
})

server.listen(3333)