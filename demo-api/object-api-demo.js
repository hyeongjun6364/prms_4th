const express = require('express')
const { json, type } = require('express/lib/response')
const app = express()

app.listen(3001)

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

app.get('/:nickname', (req, res) => {
  const { nickname } = req.params
  if (nickname === '@15ya.fullmoon') {
    console.log(youtuber1)
    res.json(youtuber1)
  } else if (nickname === '@ChimChakMan_Official') {
    res.json(youtuber2)
  } else if (nickname === '@TEO_universe') {
    res.json(youtuber3)
  } else {
    res.json({
      message: '저희가 모르는 유튜버입니다..',
    })
  }
})
