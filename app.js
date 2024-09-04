const express = require('express')
const app = express()

const port = 1234

app.get('/', (req, res) => {
  res.send('Hello World')
})
app.use(express.json())
app.post('/test', function (req, res) {
  console.log(req.body.message)
  res.json(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
