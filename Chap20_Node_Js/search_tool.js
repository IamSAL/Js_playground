const {stat, readdir, readFile} = require('fs').promises;
const {resolve, sep} = require('path');
const {statSync, readdirSync, readFileSync} = require('fs')

let files = [];
let fileArgs = process.argv.slice(3);
let matches = [];
let searchString = new RegExp(process.argv[2])

fileArgs.forEach(arg=>deepen2(arg))

files.forEach(file=>{
    let content=readFileSync(file,'utf-8')
    if(searchString.test(content)){
        matches.push(file);
    }
})

console.log("matches:",matches);

function deepen2(file){
    let stats='';
    let path = resolve(file)

        stats = statSync(path);

    if (stats.isDirectory()) {
        let dirs =readdirSync(path);
        dirs.forEach(dir => {
            deepen2(path + sep + dir);
        })
    }else{
        files.push(file)
    }
}


// async function deepen(file) {
//     let stats='';
//     let path = resolve(file)
//     try {
//         stats = await stat(path);
//     } catch (error) {
//        console.log(error.toString())
//     }
//     if (stats.isDirectory()) {
//         let dirs = await readdir(path);
//         dirs.forEach(dir => {
//             deepen(path + sep + dir);
//         })
//     }else{
//         files.push(file)
//     }
// }
//
//
