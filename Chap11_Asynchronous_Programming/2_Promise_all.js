/*
    Promise_all:
    takes an array of promises, tries to resolve each of them. return a new promise
    that resolves an array of results when all the given promises
    are resolved, rejects with the error if any of them gets rejected.
 */

function promise_all(promise_arr) {
    return new Promise((resolve, reject) => {
        let results = {};
        promise_arr.forEach((promise, index) => {
            resolver(promise)
                .then((result) => {
                    results[index + 1] = `${index + 1}:${result}`;
                    if (Object.keys(results).length === promise_arr.length) {
                        resolve(Array.from(Object.values(results)));
                    }
                })
                .catch(e => {
                    reject(new Error(`${index + 1}:${e.message}`));
                })
        })
    })
}
//helper function for promise_all
function resolver(promise) {
    return new Promise((resolve, reject) => {
        promise()
            .then(res => {
                resolve(`SUCCESS: ${res}`)
            })
            .catch(e => reject(new Error(`FAILED : ${e.message}`)));
    })
}
/*
    random promises that resolves if takes less than 8 seconds, rejects otherwise.
    Success rate is higher.
 */
let dummyPromise = () => {
    return new Promise((resolve, reject) => {
        let time = Math.random() * 1000;
        setTimeout(() => {
            if (time < 800) {
                resolve(`${(time / 100).toString().substr(0, 3)}s`)
            } else {
                reject(new Error(`${(time / 100).toString().substr(0, 3)}s`))
            }
        }, time)
    })
}
// dummy promise testing:
promise_all([dummyPromise, dummyPromise, dummyPromise, dummyPromise, dummyPromise])
    .then(console.log)
    .catch(e => console.log(e.message));

