function isObject(subject) {
    return typeof subject == "object";
}

function isArray(subject) {
    return Array.isArray(subject);
}

function deepCopy(subject) {
    let copySubject;

    const subjectIsObject = isObject(subject);
    const subjectIsArray = isArray(subject);

    if (subjectIsArray) {
        copySubject = [];
    } else if(subjectIsObject) {
        copySubject = {};
    } else {
        return subject;
    }

    for (key in subject) {
        const keyIsObject = isObject(subject[key]);

        if (keyIsObject) {
            copySubject[key] = deepCopy(subject[key]);
        } else {
            if (subjectIsArray) {
                copySubject.push(subject[key]);
            } else {
                copySubject[key] = subject[key];
            }
        }
    }

    return copySubject;{}
}

const studentBase = {
    name: undefined,
    email: undefined,
    age: undefined,
    approvedCourses: undefined,
    learningPaths: undefined,
    socialMedia: {
        twitter: undefined,
        instagram: undefined,
        facebook: undefined,
    },
};

const juan = deepCopy(studentBase);
//Con esta opción editamos los valores de las propiedades heredadas
/*Object.defineProperty(juan, "name", {
    value: "Juanito",
    configurable: false, //De esta forma evitamos que se pueda borrar las propiedades
});*/

Object.seal(juan);//Con esta opción protegemos que no se puedan borrar las propiedades (atajo del código anterior para aplicarlo a todo el objeto)
juan.name = "Juan"//Con el sela luego podemos editar los valores de esta forma

Object.isSealed(juan);//Con esta línea de código podemos saber si mi objeto esta seguro de que no se puedan borrar sus propiedades
Object.isFrozen(juan);//Con esta línea de código podemos saber si mi objeto esta protegido de edición