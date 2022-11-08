
// 控制移动
function mobile(list, i, num) {
    /*
		list.splice(i + num, 1)[0]  把移除的这个元素重新添加到指定位置
    */
    // list.splice(i, 0, list.splice(i + num, 1)[0]);
    list.splice(i + num, 1)[0] 
}
// - list 是送过来的数组
// - i 为下标
// - num  就是用来控制移动的  值为：1和-1
const a = [1,2,3,4,5,6,7,8,9,10]
var b = a.splice(a.length-4, 2)
console.log(b);
console.log(a);
a.splice(5, 0, ...b)
console.log(a);


const abc  = [{value: '选项1',label: '黄金糕'}, { value: '选项2', label: '双皮奶' }, { value: '选项3', label: '蚵仔煎' }, { value: '选项4', label: '龙须面' }, { value: '选项5', label: '北京烤鸭' }]
console.log(JSON.stringify(abc));