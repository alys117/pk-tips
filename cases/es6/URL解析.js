
const url = new URL(
  'http://192.168.0.113:8987/path/index.html?message=hello&who=world#anchor'
);
console.log(url.origin); // => '?message=hello&who=world'
console.log(url.host);
console.log(url.hostname);
console.log(url.port);
console.log(url.pathname);
console.log(url.search);
console.log(url.hash);
console.log(url.href);
console.log(url.toString());

// url.hostname = '134.80.147.23'
// url.port = '7777'
url.host = 'xxxx:8888' // 上面两步可以合成一步
console.log(url);


try {
  const url = new URL('http://exa mple.com/sdfd?sdf=中国');
} catch (error) {
  console.log(error);
}