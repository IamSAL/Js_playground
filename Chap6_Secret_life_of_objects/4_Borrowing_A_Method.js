// let contacts={
//     Abba:1234,
//     Amma:2345,
// }
// console.log(contacts.hasOwnProperty("Abba"))
// //different property with the same name
// hasOwnProperty=Symbol("ownProp")
// contacts[hasOwnProperty]=function(prop){
//     return prop in contacts;
// };
// console.log(contacts[hasOwnProperty]("toString"))//true

let map = {one: true, two: true, hasOwnProperty: true};

console.log(Object.prototype.hasOwnProperty.call(map, "one"));
