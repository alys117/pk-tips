var counter = 3;
function incCounter() {
  counter++;
  console.log('counter :>> ', counter);
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};