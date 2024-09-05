const arr = [1, 2, 3, 4, 5]

arr.forEach((item, index) => {
  console.log(item, index)
})

// map과 foreach의 만남
let map = new Map()
map.set(7, 'seven')
map.set(8, 'eight')
map.set(9, 'nine')
let youtubers = {}
map.forEach((item, index) => {
  youtubers[index] = item
})
console.log(youtubers)
