const express = require('express')
const app = express()
let db = new Map()

app.listen(3001)
// GET + "/"
app.get('/:id', function (req, res) {
  let { id } = req.params
  id = parseInt(id)

  if (db.get(id)) {
    product = db.get(id)
    product.id = id
    res.json(product)
  } else {
    res.json({
      id: id,
      message: '없는 상품입니다...',
    })
  }
})

let Notebook = {
  productName: 'Notebook',
  price: 2000000,
}
let cup = {
  productName: 'cup',
  price: 3000,
}
let chair = {
  productName: 'chair',
  price: 100000,
}
let poster = {
  productName: 'poster',
  price: 20000,
}

db.set(1, Notebook) // 키로 벨류를 찾을 수 있는 한 쌍을 저장
db.set(2, cup)
db.set(3, chair)
db.set(4, poster)
