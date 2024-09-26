var dotenv = require('dotenv');
var jwt = require('jsonwebtoken');
dotenv.config();

// token 생성
// (payload({foo: 'bar'}) , 나만의 암호키(shhhhh))
var token = jwt.sign({ foo: 'bar' }, process.env.PRIVATE_KEY);
console.log(token);

// // 검증
// // 만약 검증 성공하면, 페이로드값 확인 가능
console.log('--------------------------');
var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decoded);
