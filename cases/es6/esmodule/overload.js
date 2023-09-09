function createOverload() {
  const callMap = new Map();

  function overload(...args) {
    const types = args.map((arg) => typeof arg).join(',');
    const fn = callMap.get(types);
    if (fn) {
      return fn.apply(this, args);
    }
    throw new Error("No matching function found");
  }
  overload.addImpl = function (...args) {
    const fn = args.pop();
    if (typeof fn !== "function") {
      return;
    }
    const types = args;
    console.log(typeof types, types);
    callMap.set(types.join(","), fn);
  };
  return overload;
}

export default createOverload;
