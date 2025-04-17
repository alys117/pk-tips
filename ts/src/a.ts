interface User {
  id: number
  name?: string
  [a:string]: any
}
const user: User = {
  id: 1
}
user.name = 'Jack'
user.name ??= 'Tom'
console.log(user.name); // Tom