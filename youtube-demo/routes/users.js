const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { body, param, validationResult } = require('express-validator');

const router = express.Router();

const conn = require('../mariadb');

router.use(express.json());

const validate = (req, res, next) => {
  const err = validationResult(req);
  if (err.isEmpty()) {
    return next(); //다음 할 일 (미들웨어, 함수)
  } else {
    console.log(err.array());
    return res.status(400).json(err.array());
  }
};
//로그인
router.post(
  '/login',
  [
    body('email')
      .notEmpty()
      .isEmail()
      .withMessage('email 형식 제대로 갖춰주세요'),
    body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
    validate,
  ],
  (req, res) => {
    const { email, password } = req.body;
    let sql = `SELECT * FROM users where email = ?`;
    conn.query(sql, email, function (err, results) {
      let loginUser = results[0];
      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      if (loginUser && loginUser.password === password) {
        const token = jwt.sign(
          {
            email: loginUser.email,
            name: loginUser.name,
          },
          process.env.PRIVATE_KEY,
          {
            expiresIn: '30m',
            issuer: 'lhj',
          }
        );
        res.cookie('token', token, {
          httpOnly: true,
        });
        console.log(token);
        res.status(200).json({
          message: `${loginUser.name}님 로그인 되었습니다.`,
        });
      } else {
        res.status(403).json({
          message: '이메일 또는 비밀번호가 틀렸습니다.',
        });
      }
    });
  }
);

router.post(
  '/join',
  [
    body('email')
      .notEmpty()
      .isEmail()
      .withMessage('email 형식 제대로 갖춰주세요'),
    body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
    body('name').notEmpty().isString().withMessage('이름 확인 필요'),
    validate,
  ],
  (req, res) => {
    const { email, name, password } = req.body;
    let sql = `INSERT INTO users (email, name, password) VALUES (?, ?, ?)`;
    let values = [email, name, password];
    conn.query(sql, values, function (err, results) {
      if (err) {
        console.error('쿼리 실행 중 오류 발생:', err);
        return res
          .status(500)
          .json({ message: '데이터베이스 삽입 실패', error: err });
      }
      res.status(201).json(results);
    });
  }
);
//회원개별조회
router
  .route('/users')
  .get(
    [
      body('email')
        .notEmpty()
        .isEmail()
        .withMessage('email 형식 제대로 갖춰주세요'),
      validate,
    ],
    (req, res) => {
      let { email } = req.body;
      let sql = `SELECT * FROM users where email = ?`;

      conn.query(sql, email, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }

        res.status(200).json(results);
      });
    }
  )
  .delete(
    //회원 개별 삭제
    body('email')
      .notEmpty()
      .isEmail()
      .withMessage('email 형식 제대로 갖춰주세요'),
    validate,
    (req, res) => {
      let { email } = req.body;

      let sql = `DELETE FROM users where email = ?`;
      conn.query(sql, email, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        if (results.affectedRows === 0) {
          return res.status(400).end();
        }
        res.status(200).json(results);
      });
    }
  );

module.exports = router;
