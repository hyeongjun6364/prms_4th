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
// REST API 설계
app.get('/youtubers', (req, res) => {
  let jsonObject = {}
  if (db.size !== 0) {
    db.forEach((value, key) => {
      jsonObject[key] = value
    })
    res.json(jsonObject)
  } else {
    res.json({
      message: '조회할 데이터가 없습니다.',
    })
  }
})

app.use(express.json())
app.post('/youtuber', (req, res) => {
  const channelTitle = req.body.channelTitle
  console.log(req.body)
  if (channelTitle) {
    db.set(id++, req.body)
    res.json({
      message: `${channelTitle}님, 유튜버 생활을 응원합니다.`,
    })
  } else {
    res.status(400).json({
      message: '요청 값을 제대로 보내주세요',
    })
  }

  console.log(db)
})
// 개별 유튜버 삭제
app.delete('/youtuber/:id', (req, res) => {
  let { id } = req.params
  id = parseInt(id)

  let youtuber = db.get(id)
  if (youtuber) {
    const name = youtuber.channelTitle
    res.json({
      message: `${name}님 아쉽지만 다음에 또 뵙겠습니다.`,
    })
    db.delete(id)
  } else {
    res.json({
      message: `${id}등록된 유튜버가 없습니다.`,
    })
  }
})
//전체삭제
app.delete('/youtubers', (req, res) => {
  let msg = ''
  if (db.size >= 1) {
    msg = '모든 유튜버가 삭제되었습니다.'
    db.clear()
  } else {
    msg = '삭제 할 유튜버가 없습니다.'
  }
  res.json({
    message: msg,
  })
})

app.put('/youtubers/:id', (req, res) => {
  let { id } = req.params
  id = parseInt(id)
  let youtuber = db.get(id)
  if (youtuber) {
    const newTitle = req.body.channelTitle
    youtuber.channelTitle = newTitle
    db.set(id, youtuber)
    res.json(youtuber)
  } else {
    res.json({
      message: `${id}등록된 유튜버가 없습니다.`,
    })
  }
})
db.set(id++, youtuber1)
db.set(id++, youtuber2)
db.set(id++, youtuber3)
console.log(db)
