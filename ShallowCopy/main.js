const Obj1 = {
    a: "a",
    b: "b",
    c: {
        d: "d",
        e: "e",
    }
};

const Obj2 = {};

for (prop in Obj1) {
    Obj2[prop] = Obj1[prop];
}

const Obj3 = Object.assign({}, Obj1);
const Obj4 = Object.create(Obj1);