const jsonServer = require("json-server");
const path = require("path");
const fs = require("fs");

const server = jsonServer.create();

const db = JSON.parse(fs.readFileSync(path.join("json-server/db.json")));

const router = jsonServer.router(db);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 200);
  });
  next();
});

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

server.use(router);

// запуск сервера
server.listen(8000, () => {
  console.log("server is running on 8000 port");
});
