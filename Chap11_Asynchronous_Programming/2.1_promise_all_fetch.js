/*
    Promise_all:
    takes an array of promises, tries to resolve each of them. return a new promise
    that resolves an array of results when all the given promises
    are resolved, rejects with the error if any of them gets rejected.
 */

let fetch=require(`node-fetch`);

function promise_all(promise_arr) {
    return new Promise((resolve, reject) => {
        let results = {};
        promise_arr.forEach((promise, index) => {
            promise
                .then(async (result) => {
                    if(result.status==200){
                    results[index + 1] =await result.json();
                    if (Object.keys(results).length === promise_arr.length) {
                        resolve(Array.from(Object.values(results)));
                    }}else{
                        reject(new Error(`${index + 1}: Failed -${result.status}`));
                    }
                })
                .catch(e => {
                    reject(new Error(`${index + 1}:${e.message}`));
                })
        })
    })
}

promise_all([fetch('https://reqres.in/api/users/2'),fetch('https://reqres.in/api/users/3'),fetch('https://reqres.in/api/users/4')])
    .then(res=>res.forEach(res=>console.log(res.data.email)))
    .catch(e=>console.log(e.message))


