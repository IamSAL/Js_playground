//jump

ubtn=document.getElementById('ubtn');
ubtn.addEventListener('touchstart', e=>{

    e.preventDefault();
    window.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: "ArrowUp",
            keyCode: 38, // example values.
        })
    );

    ubtn.style.transform="scale(0.85)"
});

ubtn.addEventListener('touchend', e=>{

    e.preventDefault();
    window.dispatchEvent(
        new KeyboardEvent("keyup", {
            key: "ArrowUp",
            keyCode: 38, // example values.
        })
    );
    ubtn.style.transform="unset"
});


//right
Rbtn=document.getElementById('rbtn');
Rbtn.addEventListener('touchstart', e=>{
    e.preventDefault();
    window.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: "ArrowRight",
            keyCode: 39, // example values.
        })
    );
    Rbtn.style.transform="scale(0.85)"
});

Rbtn.addEventListener('touchend', e=>{
    e.preventDefault();
    window.dispatchEvent(
        new KeyboardEvent("keyup", {
            key: "ArrowRight",
            keyCode: 39, // example values.
        })
    );
    Rbtn.style.transform="unset"
});

//left
Lbtn=document.getElementById('lbtn');
Lbtn.addEventListener('touchstart', e=>{
    e.preventDefault();
    console.log(e.target)
    window.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: "ArrowLeft",
            keyCode: 37, // example values.
        })
    );
    Lbtn.style.transform="scale(0.85)"
});

Lbtn.addEventListener('touchend', e=>{
    e.preventDefault();
    window.dispatchEvent(
        new KeyboardEvent("keyup", {
            key: "ArrowLeft",
            keyCode: 37, // example values.
        })
    );
    Lbtn.style.transform="unset"
});

