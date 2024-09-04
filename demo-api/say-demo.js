const express = require('express')
const { json } = require('express/lib/response')
const app = express()

// GET + "/"

// GET + "/test"
app.get('/test',(req,res)=>{
    res.send('TEST SUCCESS')
})

// GET + "/test/1"
app.get('/test/1',(req,res)=>{
    res.send('One!!')
})

app.get('/hello',(req,res)=>{
    res.json({
        say : '안녕하세요'
    })
})
app.get('/bye',(req,res)=>{
    res.json({say :'bye!!'})
})
app.get('/nicetomeetyou',(req,res)=>{
    res.json({say : 'nice to meet you!!'})
})

let nodejsBook = {
    title: 'Node.js를 배워보자 (책)',
    price : 20000,
    description : '이 책 좋음'
}

app.get('/products/1',(req,res)=>{
    res.json(nodejsBook)
})
app.listen(3001)