function isObject(subject) {
    return typeof subject == "object";
}

function isArray(subject) {
    return Array.isArray(subject);
}

function requiredParam(param) {
    throw new Error(param + " es obligatorio");
}

class LearningPath {
    constructor({
        name = requiredParam("name"),
        courses = [],
    }) {
        this.name = name;
        this.courses = courses;
    }

    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName;
    }

    get courses() {
        return this._courses;
    }
    set courses(newCourses) {
        this._courses = newCourses;
    }
}

//Como ya no es una fabrica, si no un prototipo se quita del nombre el "create"
class Student {
    constructor ({
        name = requiredParam("name"),
        email = requiredParam("email"),
        age,
        twitter,
        instagram,
        facebook,
        approvedCourses = [],
        learningPaths = [],
    }) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.approvedCourses = approvedCourses;
        this.socialMedia = {
            twitter,
            instagram,
            facebook,
        };
        this.learningPaths = learningPaths;
    }

    get learningPaths() {
        return this._learningPaths;
    }

    set learningPaths(newValue) {
        if (this._learningPaths == undefined) this._learningPaths = [];
        
        if (!isArray(newValue)) {
            if (newValue instanceof LearningPath) {
                this._learningPaths.push(newValue);
            } else {
                console.warn("Esta intentando agregar un valor que no es instancia de LearningPath");
            }
        } else {
            for (let index in newValue) {
                if (newValue[index] instanceof LearningPath) {
                    this._learningPaths.push(newValue[index]);
                } else {
                    console.warn("Esta intentando agregar un valor que no es instancia de LearningPath");
                }
            }
        }
    }
}

const escuelaWeb = new LearningPath({ name: "Escuela de Desarrollo Web"})
const escuelaData = new LearningPath({ name: "Escuela de Data Science"})
const juan = new Student({ 
    name: "Juan",
    email: "juan@platzi.com",
    learningPaths: [
        escuelaWeb,
        escuelaData,
    ]
 })