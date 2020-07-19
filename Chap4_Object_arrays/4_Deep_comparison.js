//compares two different objects
const deepEqual = (obj1, obj2) => {
    //return if any of them is null
    if (obj1 != null && obj2 != null) {

        //confirm both are objects same type
        if ((typeof obj1 == "object") && (typeof obj2=="object")) {
            keys1 = Object.keys(obj1);
            keys2 = Object.keys(obj2);
            //confirm both have same keys
            if (keys1.length == keys2.length) {
                let differenet_key_names = 0;
                for (let i = 0; i <= keys1.length; i++) {
                    if (keys1[i] != keys2[i]) {
                        differenet_key_names = 1;
                    }

                }
                if (differenet_key_names == 1) {
                    return false;
                } else {
                    //confirm all keys as same value
                    let differenet_key_value = 0;
                    for (let i = 0; i <= keys1.length; i++) {
                        if (obj1[`${keys1[i]}`] !== obj2[`${keys2[i]}`]) {
                            differenet_key_value = 1
                        }
                        if (differenet_key_value == 1) {
                            return false;
                        }

                    }
                    return true;

                }

            } else {
                return false;
            }


        } else {
            return false
        }
    } else {
        return false;
    }

};

// some example objects

let lis1 = {
    name: "salman",
    id: '171-15-9398',
    phone: '01705548264',
};

let lis2 = {
    name: "salman",
    id: '171-15-9398',
    phone: '01705548264',
};

let lis3 = {
    name: "sabbir",
    id: '171-15-9398',
    phone: '01705548264',
};

let lis4 = {
    name: "sabbir",
    id: '171-15-9398',
    serial: '017055',
};

console.log(deepEqual(lis1, lis2));