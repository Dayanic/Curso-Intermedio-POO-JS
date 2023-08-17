function deepFreeze(obj) {
    //Se valida si entrada es distinto de obj para salir de la función
    if (typeof obj != "object")
        return obj;

    //En caso de ser un objeto se freeze
    Object.freeze(obj);

    //Se recorre obj para procesar keys internas y aplicar freeze en el caso de corresponder
    for (let value in obj) {
        deepFreeze(obj[value]);
    }

    return obj;
}

/*SOLUCION PLATZI*/
// export function deepFreeze(obj) {
//     Object.keys(obj).forEach(prop => {
//         if (typeof obj[prop] === 'object') deepFreeze(obj[prop]);
//     });
//     return Object.freeze(obj);
// }

//Dado un objeto como el siguiente:
const juan = {
  name: "Juanito",
  approvedCourses: ["Curso 1","Curso 2"],
  caracteristicas: {
    age: 18,
    colorCabello: 'Negro',
    gustos: {
      musica: ['rock', 'punk', 'ska'],
      peliculas: ['drama', 'horros', 'comedia'],
    },
  },
  addCourse(newCourse) {
    console.log("This", this);
    console.log("This.approvedCourses", this.approvedCourses);
    this.approvedCourses.push(newCourse);
  }
};

//Tu reto es crear una función que aplique Object.freeze a todos los objetos anidados de forma recursiva 
//para así realmente lograr bloquear todo el objeto. A esto se le conoce comunmente como deepFreeze.