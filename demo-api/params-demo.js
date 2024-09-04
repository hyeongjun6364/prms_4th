const express = require('express')
const { json, type } = require('express/lib/response')
const app = express()

app.listen(3001)

app.get('/products/:n', (req, res) => {
  if (req.params.n > 10) {
    console.log('url로 전달받은 숫자가 10보다 크네요')
  }
  res.json({
    num: parseInt(req.params.n),
  })
})

app.get('/watch', function (req, res) {
  const q = req.query // json형태로 q에 담긴다.
  console.log(q.name)
  const { name, age } = req.query
  console.log(name)
  console.log(age)

  res.json({
    name: name,
    age: age,
  })
})
