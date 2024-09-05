const arr = [1, 2, 3, 4, 5]

const mapArr = arr.map((item, index) => {
  return item * 2
})
const foreachArr = arr.forEach((item, index) => {
  return item * 2
})

console.log(foreachArr)
console.log(mapArr)
