(async function() {
  const [error, fooResult] = await safeErrorData(foo("simulateError"));
  if (error) console.log("error", error);
  if (!error) console.log("fooResult", fooResult);
  const [error2, fooResult2] = await safeErrorData(foo());
  if (error2) console.log("error2", error2);
  if (!error2) console.log("fooResult", fooResult2);
})();

function foo(simulateError) {
  return new Promise((resolve, reject) => {
    if (simulateError) {
      return reject("error happened");
    }
    return resolve("data here");
  });
}

function safeErrorData(promise) {
  return promise
    .then(data => {
      return [undefined, data];
    })
    .catch(error => {
      return [error, undefined];
    });
}
