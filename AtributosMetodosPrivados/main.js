

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

function requiredParam(param) {
    throw new Error(param + " es obligatorio");
}

function LearningPath({
    name = requiredParam("name"),
    courses = [],
}) {
    this.name = name;
    this.courses = courses;

    const private = {
        "_name": name,
        "_courses": courses,
    };
    // const public = {
    //     get name() {
    //         return private["_name"];
    //     },
    //     set name(newName) {
    //         if (newName.length != 0) {
    //             private["_name"] = newName;
    //         } else {
    //             console.warn("Tu nombre debe tener al menos 1 carácter");
    //         }
    //     },
    //     get courses() {
    //         return private["_courses"];
    //     },
    // };

    // return public;
}

//Como ya no es una fabrica, si no un prototipo se quita del nombre el "create"
function Student({
    name = requiredParam("name"),
    email = requiredParam("email"),
    age,
    twitter,
    instagram,
    facebook,
    approvedCourses = [],
    learningPaths = [],
} = {}) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.approvedCourses = approvedCourses;
    this.socialMedia = {
        twitter,
        instagram,
        facebook,
    };

    const private = {
        "_learningPaths": [],
    }

    Object.defineProperty(this, "learningPaths", {
        get() {
            return private["_learningPaths"];
        },
        set(newLearningPath) {
            if (newLearningPath instanceof LearningPath) {
                private["_learningPaths"].push(newLearningPath);
            } else {
                console.warn("Algunos de los LPs no es una instancia del prototipo LearningPath");
            }
        }
    })

    // if (isArray(learningPaths)) {
    //     this._learningPaths = [];

        for (index in learningPaths) {
            this.learningPaths = learningPaths[index];
        }
    // }
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