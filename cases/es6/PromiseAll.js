Promise.myAll = function (proms) {
    let res, rej;
    const p = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
    })
    let count = 0;
    let fulFilledCount = 0;
    const result = [];
    for (const prom of proms) {
        const i = count;
        count++
        Promise.resolve(prom).then((data) => {
            result[i] = data;
            fulFilledCount++
            if(fulFilledCount === count) {
                res(result)
            }      
        },rej)
    }
    if(count === 0) {
        res(result)
    }
    return p
};

Promise.myAll([2,Promise.resolve(1)]).then(res => {
    console.log('res :>> ', res);
})