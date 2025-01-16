interface User {
  name?: string
}
const user: User = {}
user.name = 'Jack'
user.name ??= 'Tom'
console.log(user.name); // Tom