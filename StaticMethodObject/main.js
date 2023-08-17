//Definición de nuestro objeto
const juan = {
    name: "Juanito",
    age: 18,
    approvedCourses: ["Curso1"],
    addCourse(newCourse) {
        console.log("This", this);
        console.log("This.approvedCourses", this.approvedCourses);
        this.approvedCourses.push(newCourse);
    }
};

// console.log(Object.keys(juan));//Esta opción me lista las keys de mi objeto
// console.log(Object.getOwnPropertyNames(juan));//Esta opción también me lista las keys de mi objeto
// console.log(Object.entries(juan));//Esta opción me crea arrays dentro de un arrays con las keys y values
//console.log(Object.getOwnPropertyDescriptors(juan));//Esta opcion me devuelve las keys de forma independiente, pero con 3 nuevas propiedades

//De esta forma se pueden crear nuevas propiedades a mi objeto y editar sus valores (enumerable, writable y configurable)
// Object.defineProperty(juan, "pruebaNASA",{
//     value: "extraterrestre",
//     enumerable: true,
//     writable: true,
//     configurable: true
// })

/*Object.defineProperty(juan, "navigator",{
    value: "Chrome",
    enumerable: false,//esto hace que no se liste método si lo llamamos por Object.keys si se lista con Object.getOwnPropertyNames
    writable: true,
    configurable: true
})

Object.defineProperty(juan, "editor",{
    value: "VSCode",
    enumerable: true,
    writable: false,//no permite editar el valor, pero si es posible borrarlo
    configurable: true
})

Object.defineProperty(juan, "terminal",{
    value: "WSL",
    enumerable: true,
    writable: true,
    configurable: false//no permite borrar propiedades de nuestro objeto
})

Object.defineProperty(juan, "pruebaNASA",{
    value: "extraterrestre",
    enumerable: false,
    writable: false,
    configurable: false
})*/

Object.seal(juan);//me pone todos mis atributos como configurable: false --> no permite que los atributos sean eliminados
Object.freeze(juan);//me pone todos mis atributos como configurable y writable: false --> no se pueden eliminar ni sobreescribir los atributos

console.log(Object.getOwnPropertyDescriptors(juan));