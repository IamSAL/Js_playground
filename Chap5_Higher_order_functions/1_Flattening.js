let arr = [[1], [2], [3], [4, 5], [6, [9, [3, [9, [8, [1, 7, [1]]]]]], [7, [8], 9], [10, [11, [12]]]]];
let singleArr = arr.reduce((a, b) => {

    return deepFlatten(a).concat(deepFlatten(b));
});

//function to go deep into inner elements to check if there are more arrays inside. flatten them if found.
function deepFlatten(a) {
    let tempArr, flattenedArr;
    tempArr = [];
    flattenedArr = deepFlat(a);

    function deepFlat(a) {
        for (let i = 0; i < a.length; i++) {
            if (typeof a[i] === "object") {
                deepFlat(a[i])
            } else {
                tempArr.push(a[i]);
            }
        }
        return tempArr;
    }

    return flattenedArr;
}

console.log(singleArr);