### postman

---

api를 테스트 할 때 유용하게 사용가능하다.

vsc에서 api를 설계하고 서버를 키고 postman에서 테스트를 할 수 있다

> 테스트결과
> 

![image](https://github.com/user-attachments/assets/39063f1d-97e6-4cf6-8c81-a4ee6f3ace36)

> **req, res 구현 & 테스트**
> 

(**express.json)라는 미들웨어**를 사용하게 되면 requset로 날아오는 데이터를 json으로 읽어볼 수 있다.

```jsx
app.use(express.json())
```

![image](https://github.com/user-attachments/assets/2979bb40-04d8-43de-af63-0cc3acfb392b)


> 서버에서 받아올 때
> 

```jsx
app.post('/test', function (req, res) {
  console.log(req.body.message)
  res.json(req.body)
})
```

requset 데이터를 받아올 때 미들웨어를 통해 이미 json으로 읽어오기 때문에 req.body만으로 클라이언트에게 응답해줄 수 있다.

### API설계

---

1. **GET**
    - 상품 개별 정보를 받아올 때
        - req : [params.id](http://params.id) map에 저장된 key값을 전달
        - res: map에서 id 객체를 조회해서 전달.
    - 상품 전체조회
        - req : X
        - res : db를 전체조회해서 데이터 뿌려주면 됨
2. **POST**
    - 상품 등록
        - req : body << channelTitles, sub = 0 , videoNum = 0 과 같은 데이터를 전달
        - res : “ channelTitle님, 유튜버 생활을 응원합니다! “

- **예시 코드 POST**

```jsx
app.use(express.json())
app.post('/youtuber', (req, res) => {
  console.log(req.body)
  db.set(4, req.body)
  res.json({
    message: `${req.body.channelTitle}님, 유튜버 생활을 응원합니다.`,
  })
  console.log(db)
})
```

1. 우선 request값을 json으로 읽을 수 있어야 하기에 express.json미들웨어를 불러와 사용.
2. 이후 post시 request 데이터를 받아와 콘솔에 제대로 나오는지 확인.
3. json으로 성공 메세지 클라이언트에게 보여줌.
