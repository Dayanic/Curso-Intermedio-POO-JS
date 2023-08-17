

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

function createLearningPath({
    name = requiredParam("name"),
    courses = [],
}) {
    const private = {
        "_name": name,
        "_courses": courses,
    };
    const public = {
        get name() {
            return private["_name"];
        },
        set name(newName) {
            if (newName.length != 0) {
                private["_name"] = newName;
            } else {
                console.warn("Tu nombre debe tener al menos 1 carácter");
            }
        },
        get courses() {
            return private["_courses"];
        },
    };

    return public;
}

function createStudent({
    name = requiredParam("name"),
    email = requiredParam("email"),
    age,
    twitter,
    instagram,
    facebook,
    approvedCourses = [],
    learningPaths = [],
} = {}) {
    const private = {
        "_name": name,
        "_learningPaths": learningPaths,
    };
    const public = {
        age,
        email,
        approvedCourses,
        socialMedia: {
            twitter,
            instagram,
            facebook,
        },
        get name() {
            return private["_name"];
        },
        set name(newName) {
            if (newName.length != 0) {
                private["_name"] = newName;
            } else {
                console.warn("Tu nombre debe tener al menos 1 carácter");
            }
        },
        get learningPaths() {
            return private["_learningPaths"];
        },
        set learningPaths(newLearningPaths) {
            if (!newLearningPaths.name) {
                console.warn("Tu learningPath no tiene la propiedad name");
                return;
            }

            if(!newLearningPaths.courses) {
                console.warn("Tu learningPath no tiene courses");
                return;
            }

            if(!isArray(newLearningPaths.courses)) {
                console.warn("Tu learningPath no es una lista (*de cursos)");
                return;
            }

            private["_learningPaths"].push(newLearningPaths);
            
        }
    };

    return public;
}

const juan = createStudent({
    name: "Juan",
    email: "juan@platzi.com"
})