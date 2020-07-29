class MultiplicatorUnitFailure extends Error{};

function primitiveMultiply(n1,n2){
    if((Number.isNaN(n1)||Number.isNaN(n2))){
        throw new MultiplicatorUnitFailure("Multiplicator Unit Failure:");
    }else{
        return n1*n2;
    }
}

for (;;) {
    try {
        let res = primitiveMultiply(5,parseInt(prompt("Enter a number:")));
        console.log(res);
        break;
    } catch (e) {
        if (e instanceof MultiplicatorUnitFailure){
            console.log("Not a number. Try again.");
        }else{
            throw e;
        }
    }
}
