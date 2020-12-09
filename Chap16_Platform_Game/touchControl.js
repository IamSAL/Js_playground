
ubtn=document.getElementById('ubtn');
ubtn.addEventListener('touchstart', e=>{
    window.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: "ArrowUp",
            keyCode: 38, // example values.
        })
    );
});

ubtn.addEventListener('touchend', e=>{
    window.dispatchEvent(
        new KeyboardEvent("keyup", {
            key: "ArrowUp",
            keyCode: 38, // example values.
        })
    );
});


Rbtn=document.getElementById('rbtn');
Rbtn.addEventListener('touchstart', e=>{
    window.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: "ArrowRight",
            keyCode: 39, // example values.
        })
    );
});

Rbtn.addEventListener('touchend', e=>{
    window.dispatchEvent(
        new KeyboardEvent("keyup", {
            key: "ArrowRight",
            keyCode: 39, // example values.
        })
    );
});


Lbtn=document.getElementById('lbtn');
Lbtn.addEventListener('touchstart', e=>{
    console.log(e.target)
    window.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: "ArrowLeft",
            keyCode: 37, // example values.
        })
    );
});

Lbtn.addEventListener('touchend', e=>{
    window.dispatchEvent(
        new KeyboardEvent("keyup", {
            key: "ArrowLeft",
            keyCode: 37, // example values.
        })
    );
});

