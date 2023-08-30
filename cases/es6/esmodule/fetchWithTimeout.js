import fetch from "node-fetch";

function createFetchWithTimeout(timeout = 5000) {
  return function (url, options) {
    return new Promise((resolve, reject) => {
      const signalController = new AbortController();
      fetch(url, { ...options, signal: signalController.signal }).then(
        resolve,
        reject
      );
      const timeoutId = setTimeout(() => {
        reject(new Error("fetch timeout"));
        signalController.abort();
      }, timeout)
    });
  };
}

const fetchWithTimeout = createFetchWithTimeout(5000);
fetchWithTimeout("http://127.0.0.1:5502/package.json", {})
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });