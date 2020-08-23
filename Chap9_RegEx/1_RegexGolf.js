let poem="there's a cat in the car,its popping so properly. Its like a ferret in a ferrari floating in a ferry, Its ingenious-ferocious-viscous!. It sleeps, time passes . , : ;.Meeewaooooouuu, It wakes up! and again party starts!";

//1.cat and car
console.log(poem.match(/ca[rt]/gi))
//2.pop and prop
console.log(poem.match(/pr?op/gi))
//3.ferret,ferry and ferrari
console.log(poem.match(/fer+(et|y|ari)/gi))
//4.Any  word ending with 'ious'
console.log(poem.match(/\b\w+ious\b/gi))
//5.A whitespace followed by period,comma, semicolon
console.log(poem.match(/(\s(\.|,|;))/gi))
//6.A word longer than 6 letters
console.log(poem.match(/\b\w{7,}\b/gi))
//7. A word without letter e
console.log(poem.match(/\b[^\We]+\b/gi))