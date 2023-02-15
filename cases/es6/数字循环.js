const length = 13
const rs = []
for (let i = 0; i < length;i++) {
  if(!rs[Math.floor(i/5)]){
    rs[Math.floor(i/5)]=[]
  } 
  rs[Math.floor(i/5)][i%5] = i 
}
console.log(rs);
// 13 -> [[0,1,2,3,4],[5,6,7,8,9],[10,11,12]]方法
//给定一个数字，分组，每组5个元素


