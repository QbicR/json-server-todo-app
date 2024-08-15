const jsonServer = require("json-server")
const path = require("path")

const server = jsonServer.create()

const router = jsonServer.router(path.resolve(__dirname, "db.json"))

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
  await new Promise(res => {
    setTimeout(res, 800)
  })
  next()
})

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

server.use(router)

// запуск сервера
server.listen(8000, () => {
  console.log("server is running on 8000 port")
})
