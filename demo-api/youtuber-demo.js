//express 모듈 셋팅
const express = require('express')
const app = express()
let db = new Map() // key - value
let id = 1
app.listen(1234)

//객체 셋팅
let youtuber1 = {
  channelTitle: '십오야',
  sub: '593만명',
  videoNum: '993개',
}

let youtuber2 = {
  channelTitle: '침착맨',
  sub: '227만명',
  videoNum: '6600개',
}
let youtuber3 = {
  channelTitle: '태오',
  sub: '54.8만명',
  videoNum: '726개',
}

app.get('/youtuber/:id', function (req, res) {
  let { id } = req.params
  id = parseInt(id)
  const youtuber = db.get(id)

  if (db.get(id)) {
    res.json(youtuber)
  } else {
    res.json({
      id: id,
      message: '유튜버 정보를 찾을 수 없습니다.',
    })
  }
})

app.get('/youtubers', (req, res) => {
  res.json({
    message: 'test',
  })
})

app.use(express.json())
app.post('/youtuber', (req, res) => {
  console.log(req.body)
  db.set(id++, req.body)
  res.json({
    message: `${req.body.channelTitle}님, 유튜버 생활을 응원합니다.`,
  })
  console.log(db)
})
db.set(id++, youtuber1)
db.set(id++, youtuber2)
db.set(id++, youtuber3)
console.log(db)
