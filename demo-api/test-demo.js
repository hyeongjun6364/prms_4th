const express = require('express')
const { json } = require('express/lib/response')
const app = express()

// GET + "/"

app.get('/hello',(req,res)=>{
    res.json({
        say : '안녕하세요'
    })
})
app.get('/bye',(req,res)=>{
    res.json({say :'bye!!'})
})




app.get('/products/1',(req,res)=>{
    res.json(nodejsBook)
})
app.listen(3001)