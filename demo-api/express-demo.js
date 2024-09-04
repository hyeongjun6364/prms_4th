const express = require('express')
const { json } = require('express/lib/response')
const app = express()

app.listen(3001)
// GET + "/"
app.get('/', function (req, res) {
  res.send('Hello World')
})

let nodejsBook = {
  title: 'Node.js를 배워보자 (책)',
  price: 20000,
  description: '이 책 좋음',
}

app.get('/products/1', (req, res) => {
  res.json(nodejsBook)
})
