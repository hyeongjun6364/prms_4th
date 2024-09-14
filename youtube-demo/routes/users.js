const express = require('express')
const router = express.Router()
router.use(express.json())
let db = new Map() // key - value
let id = 1
const isExist = (Obj) => {
  if (Object.keys(Obj).length === 0) {
    return false
  } else {
    return true
  }
}
router.post('/login', (req, res) => {
  const { userId, password } = req.body
  let loginUser = {}
  db.forEach((user, id) => {
    if (user.userId === userId) {
      console.log('같은거 찾음!!')
      loginUser = user
    }
  })
  if (isExist(loginUser)) {
    //password 비교
    if (loginUser.password === password) {
      res.status(200).json({
        message: `${loginUser.name}님 로그인 되었습니다.`,
      })
    } else {
      res.status(400).json({
        message: '비밀먼호가 틀렸습니다.',
      })
    }
  } else {
    res.status(404).json({
      message: '회원 정보가 없습니다.',
    })
  }
})

router.post('/join', (req, res) => {
  console.log(req.body)
  if (req.body) {
    const { userId } = req.body
    db.set(userId, req.body)
    res.status(201).json({
      message: `${req.body.name}님 환영합니다.`,
    })
  } else {
    res.status(400).json({
      message: '데이터를 잘못 보내셨습니다.',
    })
  }
})

router
  .route('/users')
  .get((req, res) => {
    let { userId } = req.body

    const user = db.get(userId)
    if (user) {
      res.status(200).json({
        userId: user.userId,
        name: user.name,
      })
    } else {
      res.status(404).json({
        message: '회원 정보가 없습니다.',
      })
    }
  })
  .delete((req, res) => {
    let { userId } = req.body

    const user = db.get(userId)
    if (user) {
      db.delete(id)
      res.status(200).json({
        message: '회원이 삭제되었습니다.',
      })
    } else {
      res.status(404).json({
        message: '회원 정보가 없습니다.',
      })
    }
  })

module.exports = router
