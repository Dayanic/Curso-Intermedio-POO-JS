const Obj1 = {
    a: "a",
    b: "b",
    c: {
        d: "d",
        e: "e",
    }
};

const Obj2Stringify = JSON.stringify(Obj1);//Convierte un objeto en un string, pero no copia métodoss.
const Obj2 = JSON.parse(Obj2Stringify);//Convierte un string en un objeto, pero no copia los métodos



