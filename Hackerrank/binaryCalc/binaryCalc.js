class Display {
    constructor(divID) {
        this.display = document.getElementById(divID);
    }

    clear() {
        this.display.innerHTML = "";
    }

    add(text) {
        this.display.innerHTML += text;
    }

    set(text) {
        this.display.innerHTML = text;
    }

    get() {
        return this.display.innerHTML
    }
}

function calculate(expr) {
    let [pre, post] = expr.split(/[+|\-|\*|\/]/).map(binary => parseInt(parseInt(binary, 2).toString(10).trim()));
    let sign = expr.match(/[+|\-|\*|\/]/)[0];
    let res = eval(pre + sign + post);
    return res.toString(2);
}

let display = new Display('res');

const buttonFunc = (e) => {
    e.preventDefault();
    if (e.target.tagName.toLowerCase() === 'button') {
        if (e.target.id === "btnClr") {
            display.clear();
        } else if (e.target.id === "btnEql") {
            display.set(calculate(display.get()));
        } else {
            display.add(e.target.innerHTML.trim());
        }

    }
    e.stopPropagation();
}

document.getElementById('btns').addEventListener('click', buttonFunc);