import createOverload from "./overload.js";
const getUsers = createOverload();

getUsers.addImpl(() => console.log("查询空参数的fn"));
getUsers.addImpl("string", (a) => { console.log("查询一个字符串的fn", a); });
getUsers.addImpl("string", "string", (a, b = "tip") => { console.log("查询两个字符串的fn", a, b); });
getUsers.addImpl("number", "string", (a, b) => { console.log("查询数字，字符串的fn", a, b); });
getUsers.addImpl("number", (a) => { console.log("查询一个数字的fn", a); });

getUsers();
getUsers(1);
getUsers("1","dd");
// getUsers("1","dd",123,123);
