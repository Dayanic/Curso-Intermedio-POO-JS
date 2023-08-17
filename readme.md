# ¿Qué hay dentro de los objetos en JavaScript?
Entenderemos cómo funcionan por dentro los objetos de JavaScript, además de cómo podríamos “hackear” a nuestro favor su sistema de prototipos para así sacarle el máximo beneficio y con ello aplicar a la programación orientada a objetos de manera óptima.

## **Cómo puedes entender mejor el curso**
Antes de aventurarte en este curso, te recomendamos tener los conocimientos básicos de los siguientes temas:

1. [Closures y scope](): tener claro que dependiendo de donde escribas tu código, tu programa se puede comportar de manera distinta. No es lo mismo que implementes cierto código dentro o fuera de una función, un prototipo, una clase, etc.
2. [Fundamentos de POO](https://platzi.com/cursos/typescript-poo/): entender la programación orientada a objetos de manera general y agnóstica a lenguajes de programación.
3. [POO Básico en JavaScript](https://platzi.com/cursos/javascript-poo/): conocer las bases y pilares de la programación orientada a objetos, pero con la sintaxis de JavaScript.

Si previamente ya has decido aprender desarrollo web, te recomendamos seguir el orden las rutas de la [Escuela de Desarrollo Web](https://platzi.com/escuela/escuela-web/). Ahí te indicamos qué temas son recomendables que aprendas antes y qué otros después según el perfil profesional que desees desempeñar.

# Static: atributos y métodos estáticos en JavaScript
Si declaramos una propiedad o método de una clase como `static`, **podremos acceder a estos sin la necesidad de instanciar** dicha clase o prototipo.

Este tipo de atributos/métodos no son exclusivos de JavaScript, sino de casi todos los lenguajes que soportan la programación orientada a objetos.

## **Declarando métodos y atributos static en JavaScript**
De la siguiente manera podemos declarar atributos o métodos como `static` dentro de una clase (aplicable también a prototipos):
```javascript
class Patito {
	static sonidito = "cuak!";

	static hacerSonidito() {
		return "cuak! x2";
	}
}

// Por fuera de clase Patito, podemos acceder a lo siguiente sin crear alguna instancia:
// Al atributo `sonidito`
console.log(Patito.sonidito)

// Al método `hacerSonidito`
console.log(Patito.hacerSonidito());
```
## **Métodos static de la superclase Object**
El superprototipo `Object` posee algunos métodos de tipo `static` y como todos los objetos que creamos en JavaScript heredan funcionalidad de `Object`, podemos acceder a una lista de funciones `static` que vendrán por defecto en nuestros objetos creados.

### **Obtener las llaves de un objeto**
El método keys del superprototipo Object nos permite obtener el nombre de las llaves de un objeto en una lista:
```javascript
const objetito = {
    name: "Juanito",
    email: "juanito@frijolitos.io",
    age: 18,
}

console.log(
	Object.keys(objetito)
); // [ 'name', 'email', 'age' ]
```
Podríamos obtener lo mismo con el método getOwnPropertyNames:
```javascript
const objetito = {
    name: "Juanito",
    email: "juanito@frijolitos.io",
    age: 18,
}

console.log(
	Object.getOwnPropertyNames(objetito)
); // [ 'name', 'email', 'age' ]
```
### **Obtener los pares llave-valor de un objeto**
Con el método `entries de Object` conseguimos tener en listas separadas los llave-valor declarados en un objeto. Estas listas serán almacenadas en otra lista:
```javascript
const objetito = {
    name: "Juanito",
    email: "juanito@frijolitos.io",
    age: 18,
}

console.log(
	Object.entries(objetito)
);

/* > Impresión en consola:
[
  [ 'name', 'Juanito' ],
  [ 'email', 'juanito@frijolitos.io' ],
  [ 'age', 18 ]
]
*/
```
### **Conocer el límite de acceso de un objeto**
Existe un método `static` propio de `Object` que es muy interesante: el método `getOwnPropertyDescriptors`.
```javascript
const objetito = {
    name: "Juanito",
    email: "juanito@frijolitos.io",
    age: 18,
}

console.log(
	Object.getOwnPropertyDescriptors(objetito)
);
```
Esto nos devuelve un objeto con los atributos de nuestro objeto inicial. Cada atributo contiene un objeto con el valor correspondiente a dicha propiedad, además de 3 propiedades adicionales: `writable`, `configurable` y `enumerable`.
```javascript
{
  name: {
    value: 'Juanito',
    writable: true,
    enumerable: true,
    configurable: true
  },
  email: {
    value: 'juanito@frijolitos.io',
    writable: true,
    enumerable: true,
    configurable: true
  },
  age: {
		value: 18,
		writable: true,
		enumerable: true,
		configurable: true
	}
}
```
Estas 3 propiedades son usadas por JavaScript internamente para indicar el límite de acceso y modificación que tiene un objeto. Con esto podríamos utilizar ciertas técnicas para **manejar el encapsulamiento** (uno de los pilares de la POO) **de los objetos según lo que deseemos**.

# Métodos estáticos del prototipo Object
Veamos unos ejemplos usando los métodos estáticos del prototipo `Object`. Además, podremos observar que `this` puede comportarse diferente según el contexto en donde se encuentre.

Antes de ello, en una carpeta, crea un archivo `main.js` el cual debe estar vinculado a un `index.html` creado en la misma ruta. Editaremos estos archivos en Visual Studio Code (puedes utilizar tu editor preferido) para realizar nuestras implementaciones y visualizaremos los outputs en la consola del navegador.
```html
<!-- ARCHIVO HTML BASE -->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Curso Intermedio de POO en JS</title>
</head>
<body>
	<h1>Curso Intermedio de POO en JS</h1>

	<script src="./main.js"></script>
</body>
</html>
```
## **Comportamiento de this en métodos estáticos**
Vamos a crear un objeto con los siguientes atributos:
```javascript
const juan = {
  name: "Juanito",
  age: 18,
  approvedCourses: ["Curso 1"],
  addCourse(newCourse) {
		// `this` se usa para hacer referencia a la propiedad `approvedCourses`
		// del objeto en cuestión.
    this.approvedCourses.push(newCourse);
  }
};
```
Ahora, utilicemos el método `entries` del prototipo `Object` pasándole como argumento nuestro objeto juan:
```javascript
console.log(
	Object.entries(juan)
);

/* > En consola obtenemos un output similar a este:
[
  [ 'name', 'Juanito' ],
  [ 'age', 18 ],
  [ 'approvedCourses', [ 'Curso 1' ] ],
  [ 'addCourse', [Function: addCourse] ]
]
*/
```
Como el resultado es un `Array` que contiene a otros del mismo tipo, podemos acceder a sus índices y subíndices respectivamente. Por tanto, si accedemos al índice donde está la función `addCourse` y lo mostramos en consola, obtendríamos lo siguiente:
```javascript
console.log(
	Object.entries(juan)[3][1]
);

/* > Mensaje en consola del navegador:
*f addCourse(newCourse) {
	this.approvedCourses.push(newCourse);
}*
*/
```
Si podemos acceder a la función de esta manera, en principio pensaríamos que es posible añadir un nuevo curso ejecutando la función desde ahí; sin embargo, esto nos produce un error:
```javascript
Object.entries(juan)[3][1]("Curso 2");
```
![](image.png)
Imprimamos en consola qué es `this` en cada ejecución del método `addCourse`. Cambiemos la estructura del objeto `juan`:
```javascript
const juan = {
  name: "Juanito",
  age: 18,
  approvedCourses: ["Curso 1"],
  addCourse(newCourse) {
		// A dónde a punta `this`:
		console.log("This", this);
		// Saber si el contexto de `this` tiene definida la propiedad `approvedCourses`:
    console.log("This.approvedCourses", this.approvedCourses);

    this.approvedCourses.push(newCourse);
  }
};
```
Nuevamente, añadamos un curso accediendo al método `addCourse` desde la ejecución de `Object.entries`:
```javascript
Object.entries(juan)[3][1]('Curso 3');
```
![](image.png)
En el navegador podremos observar que `this` apunta en realidad al subarray `["addCourse", function addCourse]` generado por `entries` y ya no al objeto `juan`. Es por ello que cuando la función `addCourse` intenta ejecutarse no encuentra la propiedad `approvedCourses` en el `subarray ["addCourse", function addCourse]` que es donde ahora `this` hace referencia.

## **Crear propiedades con accesibilidad editable**
Existe un método estático del prototipo `Object` llamado `defineProperty` que no solo nos permite crear un atributo con su respectivo valor en un objeto, sino también nos da la posibilidad de definir las propiedades `writable, enumerable y configurable` a nuestro gusto. Estas propiedades son las que limitan el acceso y modificación en un objeto de JavaScript:
```javascript
const juan = {
  name: "Juanito",
  age: 18,
  approvedCourses: ["Curso 1"],
  addCourse(newCourse) {
		console.log("This", this);
    console.log("This.approvedCourses", this.approvedCourses);

    this.approvedCourses.push(newCourse);
  }
};

Object.defineProperty(juan, "pruebaNASA", {
	value: "extraterrestres",
	writable: true,
	enumerable: true,
	configurable: true
});
```

# Object.defineProperty
El método `defineProperty` de la superclase `Object` no solo nos permite definir nuevos atributos en un objeto, sino también configurar las siguientes propiedades:

* **Configurable**: indica si el nuevo atributo puede ser eliminado.
* **Enumerable**: indica si el nuevo atributo podrá ser mostrado mediante funciones que listen las propiedades de un objeto. Hay excepciones en las que igual puede ser visualizado un atributo que tenga definido como `false` la propiedad `enumerable`.
* **Writable**: indica si el nuevo atributo puede ser modificado de valor.
Normalmente, estas propiedades por defecto son definidas como `true` por JavaScript, sin embargo, si generamos los atributos de un objeto con `Object.defineProperty`, podríamos definirlas a nuestro gusto.
```javascript
const juan = {
  name: "Juanito",
  age: 18,
  approvedCourses: ["Curso 1"],
  addCourse(newCourse) {
    console.log("This", this);
    console.log("This.approvedCourses", this.approvedCourses);
    this.approvedCourses.push(newCourse);
  }
};

Object.defineProperty(juan, "nombreNuevaPropiedad", {
	value: "JavaScript", // Valor que tendrá
	enumerable: false,
	writable: true,
	configurable: false,
});
```
## **Accesibilidad a los atributos de un objeto**
Con `configurable`, `enumerable` y `writable` podemos limitar el acceso y modificación de los atributos de un objeto. Veamos su funcionamiento mediante un par de ejemplos:

### **Atributos que no puedan ser listados**
Definimos `enumerable` como `false`. Este atributo recién creado no se podrá visualizar si por ejemplo intentamos listar las llaves del objeto usando `Object.keys`:
```javascript
// Definimos el objeto
const juan = {
  name: "Juanito",
  age: 18,
  approvedCourses: ["Curso 1"],
  addCourse(newCourse) {
    console.log("This", this);
    console.log("This.approvedCourses", this.approvedCourses);
    this.approvedCourses.push(newCourse);
  }
};

Object.defineProperty(juan, "navigator", { // Creamos un nuevo atributo
	value: "Chrome",
	enumerable: false,
	writable: true,
	configurable: true,
});

console.log( // Imprimimos las llaves del objeto
	Object.keys(juan)
); // [ 'name', 'age', 'approvedCourses', 'addCourse' ]
```
Sin embargo, hay una excepción si usamos `Object.getOwnPropertyNames`:
```javascript
// Definimos el objeto
const juan = {
  name: "Juanito",
  age: 18,
  approvedCourses: ["Curso 1"],
  addCourse(newCourse) {
    console.log("This", this);
    console.log("This.approvedCourses", this.approvedCourses);
    this.approvedCourses.push(newCourse);
  }
};

Object.defineProperty(juan, "navigator", { // Creamos un nuevo atributo
	value: "Chrome",
	enumerable: false, // 👀
	writable: true,
	configurable: true,
});

console.log( // Imprimimos las propiedades del objeto
	Object.getOwnPropertyNames(juan)
); // [ 'name', 'age', 'approvedCourses', 'addCourse', 'navigator' ] 👈 Ya nos aparece
```
### **Atributos que no se puedan eliminar**
Para ello definimos `configurable` como `false` en la nueva propiedad:
```javascript
// Definimos el objeto
const juan = {
  name: "Juanito",
  age: 18,
  approvedCourses: ["Curso 1"],
  addCourse(newCourse) {
    console.log("This", this);
    console.log("This.approvedCourses", this.approvedCourses);
    this.approvedCourses.push(newCourse);
  }
};

Object.defineProperty(juan, "terminal", { // Creamos un nuevo atributo
	value: "WSL",
	enumerable: true,
	writable: true,
	configurable: false, // 👀
});

console.log( // Mostramos las propiedades del objeto previamente... 👁👁
	Object.keys(juan)
); // [ 'name', 'age', 'approvedCourses', 'addCourse', 'terminal' ]

delete terminal; // Intentamos eliminar ❌

console.log( // Listamos los atributos para comprobar si se eliminó `terminal` 🤔
	Object.keys(juan)
); // [ 'name', 'age', 'approvedCourses', 'addCourse', 'terminal' ] 👈 NO se eliminó
```
### **Atributos que no se puedan sobreescribir**
Definimos `writable` como `false`:
```javascript
// Definimos el objeto
const juan = {
  name: "Juanito",
  age: 18,
  approvedCourses: ["Curso 1"],
  addCourse(newCourse) {
    console.log("This", this);
    console.log("This.approvedCourses", this.approvedCourses);
    this.approvedCourses.push(newCourse);
  }
};

Object.defineProperty(juan, "editor", { // Creamos un nuevo atributo
	value: "VSCode",
	enumerable: true,
	writable: false,
	configurable: true,
});

console.log(juan.editor); // "VSCode"

juan.editor = "Atom"; // Intentamos sobreescribirlo

console.log(juan.editor); // "VSCode" 👈 No cambió
```
## Qué es Object.seal y Object.freeze
El método `seal` “sella” un determinado objeto. Es decir:

* Impide que nuevas propiedades sean agregadas.
* Define como `configurable: false` todos los atributos del objeto, con lo que impide que sean borradas.
* Los atributos sí pueden ser modificados, ya que la propiedad `writable` permanece asignado como `true`.
```javascript
// Definimos el objeto
const juan = {
  name: "Juanito",
  age: 18,
  approvedCourses: ["Curso 1"],
  addCourse(newCourse) {
    console.log("This", this);
    console.log("This.approvedCourses", this.approvedCourses);
    this.approvedCourses.push(newCourse);
  }
};

Object.seal(juan); // "Sellamos" el objeto

// Listamos para saber las llaves actuales:
console.log(Object.keys(juan)); // [ 'name', 'age', 'approvedCourses', 'addCourse' ]

delete age; // Intentamos eliminar un atributo del objeto

// Listamos para observar si hubo cambios:
console.log(Object.keys(juan)); // [ 'name', 'age', 'approvedCourses', 'addCourse' ]
```
El método `freeze` “congela” un objeto. Es decir:

* Impide que se le agreguen nuevas propiedades.
* Impide que sean eliminadas propiedades ya existentes.
* Evita que sus propiedades `writable`, `enumerable` y `configurable` sean modificadas.
```javascript
// Definimos el objeto
const juan = {
  name: "Juanito",
  age: 18,
  approvedCourses: ["Curso 1"],
  addCourse(newCourse) {
    console.log("This", this);
    console.log("This.approvedCourses", this.approvedCourses);
    this.approvedCourses.push(newCourse);
  }
};

Object.freeze(juan); // "Congelamos" el objeto

// Listamos para saber las llaves actuales:
console.log(Object.keys(juan)); // [ 'name', 'age', 'approvedCourses', 'addCourse' ]

delete approvedCourses; // Intentamos eliminar un atributo del objeto
juan.name = "Carlitos"; // Intentamos sobreescribir el valor de este atributo

// Listamos para observar si hubo cambios:
console.log(Object.keys(juan)); // [ 'name', 'age', 'approvedCourses', 'addCourse' ]
// Verificamos si cambió el valor de `name`:
console.log(juan.name); // "Juanito"
```
# Cómo funciona la memoria en JavaScript
La memoria en JavaScript funciona de la siguiente manera:

* Las variables son referencias a un espacio en memoria.
* Los navegadores web usan dos tipos de memorias: Stack y Heap.
* La memoria Stack es muy rápida, pero sin tanto espacio. Aquí se guardan los valores primitivos (booleanos, strings, números…).
* La memoria Heap es más lenta, pero permite guardar enormes cantidades de información (son como los tornados: grandes, lentos y desordenados). En esta memoria guardamos los valores de los objetos

## **Cómo es el almacenamiento de objetos en JavaScript**
Cuando creamos variables en JavaScript (aplicable a casi cualquier otro lenguaje), ejecutamos 2 procesos:

1. El primero es la inicialización, es decir, le decimos a JS que vamos a crear una nueva variable con un nombre en específico.
```javascript
let name;
```
2. Lo segundo es la asignación: le indicamos a JavaScript que esa variable que generamos con ese nombre en específico tiene un valor.
```javascript
let name; // Inicialización
name = "pepito"; // Asignación

let age = 28;
```
El nombre de las variables y el valor de estas se almacenan en la memoria **stack**, excepto cuando trabajamos con objetos.

![](https://static.platzi.com/media/articlases/Images/memoria-stack-en-js-curso-intermedio-de-programacion-orientada-a-objetos-en-javascript.jpg)

En memoria, el nombre de las variables apuntan a sus respectivos valores, sin embargo, cuando el valor a almacenar es un objeto, apuntan a otro apuntador (pointer o puntero) y este es el que en realidad apuntará al objeto en sí el cual se encontrará almacenado en la memoria **heap**.

![](https://static.platzi.com/media/articlases/Images/los-objetos-son-almacenados-en-la-memoria-heap-de-javascript-curso-intermedio-de-programacion-orientada-a-objetos-en-javascript.jpg)

## **Cuál es la forma incorrecta de copiar objetos**
Si intentamos copiar un objeto en otra variable de esta manera:
```javascript
const juanita = { // ORIGINAL
	age: 15,
	email: "juanita@juanita.com"
}

const nath = juanita; // COPIA
```
Cuando intentemos editar los valores de los atributos del objeto copia, los atributos del objeto original se verán igualmente afectados:
```javascript
// Objeto original antes
console.log(juanita); // { age: 15, email: 'juanita@juanita.com' }

// Editamos sólo el objeto copia
nath.age = 20;
nath.email = "nath@email.com"
console.log(nath); // { age: 20, email: 'nath@email.com' }

// Objeto original después de editar el objeto copia:
console.log(juanita); // { age: 20, email: 'nath@email.com' }
```
Lo anterior sucede porque cuando copiamos un objeto lo que en realidad estamos copiando es su referencia en la memoria, en otras palabras copiamos a su apuntador o **pointer**. Por ello, al modificar los valores de las propiedades de la copia de un objeto también afectamos al original.

![](https://static.platzi.com/media/articlases/Images/cuando-copiamos-directamente-un-objeto-en-otra-variable-en-realidad-copiamos-su-pointer-o-apuntador-js-curso-intermedio-de-programacion-orientada-a-objetos-en-javascript.jpg)

Entonces, ¿Cómo solucionamos esto? Tenemos 2 formas de hacerlo en JavaScript: el shallow copy y el deep copy. Veamos a continuación cómo aplicar el primero. 
# Shallow copy en JavaScript
El Shallow Copy (copia superficial) se refiere a la forma de **crear un nuevo objeto a partir de las propiedades de otro**. Esta copia solo se hace a un nivel alto, no se hace con objetos dentro de objetos (nested objects), lo que provoca que la modificación de una de sus propiedades, modifique el objeto principal.

## **Shallow copy con el bucle for**
Podemos copiar las propiedades de un objeto en otro haciendo uso del bucle `for`:
```javascript
const obj1 = {
	a: "a",
	b: "b"
}

const obj2 = {}

for (propiedad in obj1) {
	obj2[propiedad] = obj1[propiedad];
}
```
Si deseáramos modificar los valores de los atributos del objeto copia, el objeto original no se ve afectado:
```javascript
obj2.a = "AAA";
obj2.b = "BBB";

console.log(obj2); // { a: 'AAA', b: 'BBB' }
console.log(obj1); // { a: 'AAA', b: 'BBB' }
```
Pero, si hay objetos dentro del objeto original (nested objects) el objeto original sí se vería afectado ante las modificaciones hechas en dichos sub objetos:
```javascript
const obj1 = {
	a: "a",
	b: "b",
	c: {
		d: "d",
		e: "e"
	}
}

const obj2 = {}

for (propiedad in obj1) {
	obj2[propiedad] = obj1[propiedad];
}

obj2.a = "atributo a";
obj2.b = "atributo b";
obj2.c.d = "objeto dentro de otro";

console.log(obj2);
console.log(obj1);

/* > Mensaje en consola
{
  a: 'atributo a',
  b: 'atributo b',
  c: {
		d: 'objeto dentro de otro',
		e: 'e'
	}
}
{
	a: 'a',
	b: 'b',
	c: {
		d: 'objeto dentro de otro',
		e: 'e'
	}
}
*/
```
## **Shallow copy con Object.assign**
El Object.assign nos permite realizar el mismo shallow copy que podemos hacer con el bucle for.
```javascript
const obj1 = {
	a: "a",
	b: "b",
	c: {
		d: "d",
		e: "e"
	}
}

const obj3 = Object.assign({}, obj1);

// Con esto podemos crear copias exactas
console.log(obj1); // { a: 'a', b: 'b', c: { d: 'd', e: 'e' } }
console.log(obj3); // { a: 'a', b: 'b', c: { d: 'd', e: 'e' } }

// Sin embargo, si hacemos modificaciones en los nested objects...
obj1.c.d = "COPIA DESDE EL OBJ1";

// se verán afectados los demás objetos copiados
console.log(obj3); // { a: 'a', b: 'b', c: { d: 'COPIA DESDE EL OBJ1', e: 'e' } }
```
Aun así, tendremos los mismos problemas si el objeto original posee nested objects.

## **Object.create**
Nos permite crear un objeto que tenga como parte de su prototipo los atributos de otro objeto:
```javascript
const obj1 = {
	a: "a",
	b: "b",
	c: {
		d: "d",
		e: "e"
	}
}

const obj4 = Object.create(obj1);
```
![](https://static.platzi.com/media/articlases/Images/object-create-curso-intermedio-de-programacion-orientada-a-objetos-en-javascript.jpg)

Hasta ahora hemos podido resolver parcialmente el problema de copiar objetos, ya que aún tenemos inconvenientes cuando los objetos originales tienen anidados otros objetos. Tratemos de resolver esto con [JSON.parse y JSON.stringify](https://platzi.com/clases/2419-javascript-poo-intermedio/39813-jsonparse-y-jsonstringify/).

# Qué es JSON.parse y JSON.stringify
Con `JSON.stringify` podemos convertir un objeto en un `string` y lo inverso con `JSON.parse`. Podríamos **usar ambos métodos para lograr copiar un objeto en otro**.
```javascript
const obj1 = {
    a: 'a',
    b: 'b',
    c: {
        d: 'd',
        e: 'e',
    }
}

// Lo convertimos en String y el resultado lo asignamos en un variable:
const stringifiedComplexObj = JSON.stringify(obj1);
// Lo convertimos a objeto y lo asignamos al nuevo objeto:
const obj2 = JSON.parse(stringifiedComplexObj);

console.log(obj1);
console.log(obj2);

// Si hacemos modificaciones en un de los objetos...
obj2.c.d = "nested object";
obj2.c.e = "nested object";
// El objeto original no se vería afectado
console.log(obj1);
console.log(obj2);
```
De esta forma, aunque el objeto original tenga objetos anidados, es posible crear un nuevo objeto con las mismas propiedades del original sin que este se vea afectado ante modificaciones en los objetos copias.

## **Problemas para copiar un objeto con métodos**
Con lo anterior pareciera que finalmente habíamos logrado dar solución a los convenientes que nos daba copiar objetos en otros. Sin embargo, tanto `JSON.parse` como `JSON.stringify` no saben trabajar con métodos, lo cual sería un nuevo inconveniente:
```javascript
const obj1 = {
    a: 'a',
    b: 'b',
    c: {
        d: 'd',
        e: 'e',
    },
    editA() {
        this.a = 'Abcd'
    }
};

const stringifiedComplexObj = JSON.stringify(obj1);

console.log(stringifiedComplexObj);
// "{\\"a\\":\\"a\\",\\"b\\":\\"b\\",\\"c\\":{\\"d\\":\\"d\\",\\"e\\":\\"e\\"},\\"f\\":[1,\\"2\\",3]}"

const obj2 = JSON.parse(stringifiedComplexObj);

console.log(obj2);
// {a: "a", b: "b", c: {d: "d", e: "e"}}
```
Para ello necesitamos utilizar Deep Copy para poder obtener una correcta copia de objetos. Antes de entrar en este concepto, debemos conocer [qué es recursividad](https://platzi.com/clases/2419-javascript-poo-intermedio/39814-que-es-recursividad/). ¡Vamos a ello! 🤔👩‍💻

## **Qué más necesitas saber acerca de JSON.stringify()**
El método JSON.stringify() convierte un objeto o valor de JavaScript en una cadena JSON, reemplazando opcionalmente valores si se especifica una función de reemplazo u opcionalmente incluyendo solo las propiedades especificadas si se especifica una matriz de reemplazo.

### **Descripción**
* Los objetos Boolean, Number y String se convierten a sus valores primitivos, de acuerdo con la conversión semántica tradicional.
* Si durante la conversión se encuentra un undefined, una Function, o un Symbol se omite (cuando se encuentra en un objeto) o se censura a null (cuando se encuentra en un array). JSON.stringify() puede devolver undefined cuando se pasan valores “puros” como JSON.stringify(function(){}) o JSON.stringify(undefined).
* Todas las propiedades que utilicen Symbol en los nombres de la clave se ignoran por completo, incluso si utilizan una función replacer.
* Las instancias de Date implementan la función toJSON() devolviendo una cadena de texto (igual que date.toISOString()). Por lo que son tratadas como strings.
* Los números Infinity y NaN, así como el valor null, se consideran null. El resto de instancias de Object (incluyendo Map, Set, WeakMap, y WeakSet) solo tendrán serializadas sus propiedades enumerables.
  
JSON.stringify () convierte un valor en notación JSON que lo representa.

## **Qué más necesitas saber acerca de JSON.parse()**
El método JSON.parse() analiza una cadena de texto (string) como JSON, transformando opcionalmente el valor producido por el análisis.

## **¿Por qué JSON.parse(JSON.stringify()) es una mala práctica para clonar un objeto en JavaScript?**
* Puedes perder tipos de datos.
* JavaScript no te avisara cuando pierdas algún tipo de dato al usar JpSON.stringify(), asi que GG mi rey
* Convierte tipos de datos no soportados en soportados, como infinity y NaN en null
* Los tipos de datos Date serán parseados como strings, no como Date
* No es tan rápido y eficiente.

# Qué es recursividad
La recursividad **es cuando una función se llama a sí misma** y esta genera una nueva ejecución de la función. Esto sucede reiteradamente hasta que cumpla o no con cierta validación que nosotros declaremos para que deje de llamarse a sí misma en algún punto.

Normalmente, pensaríamos que este tipo de problemas lo podemos resolver con condicionales y/o bucles. Veamos el siguiente ejemplo:
```javascript
// PROBLEMA:
// Deseamos imprimir una serie de números desde el 0 hasta n números. En este caso
// hasta el 4
let numerito = 0; // Declaramos desde el número que deseamos partir.

// Usamos un bucle while para repetir este proceso hasta que se cumpla la condición:
while(numerito < 5) {
	console.log(numerito);
	numerito++;
}
```
Así resolveríamos este problema con recursividad:
```javascript
// Función recursiva:
function recursiva(numerito) { // Recive un número
	console.log(numerito); // Imprimimos en consola el número
	if (numerito < 5) { // Evalua si es menor a 5
		// Llamamos nuevamente a nuestra función enviandole el número siguiente:
		return recursiva(numerito + 1);
	} else { // La función deja de llamarse a sí misma:
		return 5;
	}
}
```
## **¿Por qué escribir programas recursivos?**}
* Son más cercanos a la descripción matemática.
* Generalmente más fáciles de analizar
* Se adaptan mejor a las estructuras de datos recursivas.
* Los algoritmos recursivos ofrecen soluciones estructuradas, modulares y elegantemente simples.
## **¿Cuándo SÍ es factible de utilizar recursividad?**
* Para simplificar el código.
* Cuando la estructura de datos es recursiva. Ejemplo: árboles.
## **¿Cuándo NO es factible utilizar recursividad?**
* Cuando los métodos usen arreglos largos.
* Cuando el método cambia de manera impredecible de campos.
* Cuando las iteraciones sean la mejor opción.

Empleemos ahora la recursividad para poder aplicar el [Deep Copy en JavaScript](https://platzi.com/clases/2419-javascript-poo-intermedio/39815-deep-copy-con-recursividad/) y así copiar de manera óptima nuestros objetos.

# Deep copy con recursividad
Con el Deep Copy podemos **generar copias de objetos sin importar que estos posean objetos anidados o métodos dentro**.

## Aplicando Deep Copy en JavaScript
Veamos el siguiente ejemplo:
```javascript
// OBJETO ORIGINAL
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
	hello() {
		 console.log("Hello, World!");
	}
};

// FUNCIÓN RECURSIVA
function isObject(subject) { // Comprueba si es un objeto
  return typeof subject == "object"; // Devuelve true o false
}

function isArray(subject) { // Comprueba si es una Array
  return Array.isArray(subject); // Devuelve true o false
}

// FUNCIÓN RECURSIVA
// Recibe un parametro que puede ser un objeto, array u otro tipo de dato
function deepCopy(subject) {
  let copySubject; // Esta variable se convertira en array, objeto u otro tipo de dato

  const subjectIsObject = isObject(subject); // ¿El parámetro es objeto?
  const subjectIsArray = isArray(subject); // ¿El parámetro es array?

  if (subjectIsArray) { // Si es array...
    copySubject = []; // Asignamos un array vacío donde iremos copiando 1 a 1 los datos
  } else if (subjectIsObject) { // Si es un objeto...
    copySubject = {}; // Asignamosun objeto vacío donde iremos copiando 1 a 1 los atributos
  } else { // Sino es array u objeto...
    // Entonces es un tipo de dato que se puede copiar sin problemas, retornamos dicho
		// dicho dato y terminamos con la ejecución de la fucnción.
		return subject;
  }
	
	// Continuamos con la ejecución de la función si el parámetro fue array u objeto: 
  for (key in subject) { // Recorremos cada uno de los atributos o datos del objeto o array
		// Comprueba si hay un objeto dentro del índice o atributo:
    const keyIsObject = isObject(subject[key]);

    if (keyIsObject) { // Si es verdad que hay un objeto dentro...
	      // Invocamos recursivamente la misma función:
				copySubject[key] = deepCopy(subject[key]); // 👀🔄
    } else { // Sino...
      if (subjectIsArray) { // Si el parámetro recibido por la función deepCopy es Array...
	        // Agregamos el elemento a la variable a retornar al final de la función:
					copySubject.push(subject[key]);
      } else { 
				// sino, significa que es objeto el parámetro y además no hay objetos anidados
				// en el elemento actual dentro del recorrido del bucle for, por tanto, asignamos
				// dicho elemento como valor a la propiedad correspondiente:
        copySubject[key] = subject[key];
      }
    }
  }

  return copySubject; // Finalmente retornamos el objeto/array copia
}
```
Generemos un objeto copia utilizando la función recursiva e intentemos realizar modificaciones en el objeto copia y original:
```javascript
// OBJETO COPIA
const juan = deepCopy(studentBase);

// MODIFICACIONES EN EL OBJETO ORIGINAL
studentBase.socialMedia.twitter = "@student_twitter"

// MODIFICACIONES EN EL OBJETO COPIA
juan.socialMedia.instagram = "@juanDC"

// VEAMOS EN CONSOLA LAS DIFERENCIAS DEL OBJETO ORIGINAL Y LA COPIA
console.log(studentBase);
console.log(juan);

/* > Mensaje en consola
{
  name: undefined,
  email: undefined,
  age: undefined,
  approvedCourses: undefined,
  learningPaths: undefined,
  socialMedia: {
    twitter: '@student_twitter', 👈👈 👀
    instagram: undefined,
    facebook: undefined
  },
  hello: [Function: hello] 👈👈 FUNCIÓN
}
{
  name: undefined,
  email: undefined,
  age: undefined,
  approvedCourses: undefined,
  learningPaths: undefined,
  socialMedia: { 
		twitter: undefined, 
		instagram: '@juanDC', 👈👈 👀
		facebook: undefined 
	},
  hello: [Function: hello] 👈👈 FUNCIÓN
}
*/
```
Podemos notar que los cambios en un objeto no afecta en los valores de las propiedades del otro. Logramos crear una copia de un objeto que no esté condicionada a que si el objeto original tiene objetos anidados o si tiene métodos dentro.

# Abstracción con objetos literales y deep copy
Aplicaremos la **abstracción y encapsulamiento** a nuestros objetos en JavaScript **sin necesidad de utilizar prototipos ni clases**. Emplearemos el deep copy para generar nuevos objetos a partir de un objeto base y los encapsularemos con ayuda de los métodos del superprototipo `Object` tales como `defineProperty`, `seal y freeze`.

## **Abstracción con deep copy en JavaScript**
Vamos a crear un objeto base para un estudiante:
```javascript
// OBJETO BASE
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
```
Con esto podemos crear nuevos estudiantes generando copias a partir de este objeto literal `studentBase`. Para ello emplearemos [deep copy con recursividad](https://platzi.com/clases/2419-javascript-poo-intermedio/39815-deep-copy-con-recursividad/) :
```javascript
function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

// FUNCIÓN RECURSIVA
function deepCopy(subject) {
  let copySubject;

  const subjectIsObject = isObject(subject);
  const subjectIsArray = isArray(subject);

  if (subjectIsArray) {
    copySubject = [];
  } else if (subjectIsObject) {
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

  return copySubject;
}

// OBJETO BASE
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

// GENERANDO NUEVOS OBJETOS
const juan = deepCopy(studentBase);
const emma = deepCopy(studentBase);
```
## **Encapsulamiento de objetos con Object.defineProperty**
Sabemos que con `Object.defineProperty` es posible editar las propiedades `writable`, `enumerable` y `configurable` de los atributos de un objeto. Con esto limitamos el acceso a los datos de los nuevos objetos que generemos.

Editemos la propiedad `configurable` del atributo `name` del objeto `juan` para evitar que sea borrada:
```javascript
Object.defineProperty(juan, "name", {
	value: "Juanito", // Definimos el valor del atributo "name" como "Juanito"
	configurable: false
});
// El resto de propiedades (writable y enumerable) por defecto serán true

// Si intentamos borrar el atributo "name" ...
delete juan.name

// Observamos que no fue eliminado dicho atributo, pues bloqueamos su eliminación
console.log(juan);

/* > Mensaje en consola
{
  name: 'Juanito',
  email: undefined,
  age: undefined,
  approvedCourses: undefined,
  learningPaths: undefined,
  socialMedia: { twitter: undefined, instagram: undefined, facebook: undefined }
}
*/
```
### **Object.seal para restringir la eliminación de atributos**
Seguramente deseemos tener esta configuración con el resto de nuestros atributos y así evitar que sean borradas, pero tendríamos que hacerlo uno por uno. Podemos simplificar esta labor utilizando `Object.seal`:
```javascript
Object.seal(juan); // Ahora todos los atributos están restringidos a que sean eliminados
```
### **Verificar si no se pueden borrar los atributos de un objeto**
Con `Object.isSealed` podemos comprobar si todas las propiedades de un objeto están bloqueadas a que sean eliminadas. Nos devolverán un booleano.
```javascript
Object.isSealed(juan);
```
### **Verificar si los atributos de un objeto no pueden ser borradas ni editadas**
Empleamos `Objcet.isFrozen` para preguntar si las propiedades de un objeto están restringidas a su eliminación y edición. Devolverá un booleano.
```javascript
Object.isFrozen(juan);
````
![](https://static.platzi.com/media/articlases/Images/datos-acerca-de-las-propiedades-de-encapsulamiento-curso-intermedio-de-programacion-orientada-a-objetos-en-javascript.png)

# Factory pattern y RORO
Factory pattern (o fábrica de objeto) y RORO (Recibir un Objeto, Retornar un Objeto) son dos patrones que nos ayudan a **crear moldes de objetos a partir de funciones**. Con ello ya no sería necesario utilizar [objetos literales ni deep copy con recursividad](https://platzi.com/clases/2419-javascript-poo-intermedio/40092-abstraccion-con-objetos-literales-y-deep-copy/).

## **Generando objetos a partir de funciones**
Generaremos una función que nos permita generar nuevos estudiantes. Esta función va a recibir un objeto (con los datos del nuevo estudiante) como parámetro y devolverá el nuevo objeto generado.
```javascript
function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

function createStudent({
  name,
  email,
  age,
  twitter,
  instagram,
  facebook,
  approvedCourses,
  learningPaths,
}) {
  return {
    name,
    email,
    age,
    approvedCourses,
    learningPaths,
    socialMedia: {
      twitter,
      instagram,
      facebook,
    },
  };
}
```
Antes de crear nuevos objetos, podríamos darles unas mejoras a nuestra función:

1. Los atributos `approvedCourses` y `learningPaths` deberían ser arreglos vacíos por defecto y así evitamos que sean `undefined` en caso de que no se envíen datos en el momento que se genere un nuevo estudiante:
```javascript
function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

function createStudent({
  name,
  email,
  age,
  twitter,
  instagram,
  facebook,
  approvedCourses = [], // 👈👈
  learningPaths = [], // 👈👈
}) {
  return {
    name,
    email,
    age,
    approvedCourses,
    learningPaths,
    socialMedia: {
      twitter,
      instagram,
      facebook,
    },
  };
}
```
2. Si en caso de invocar a la función `createStudent` no mandamos siquiera un objeto vacío como argumento, nos dará un error. Evitemos esto declarando que el parámetro que recibe la función puede ser un objeto vacío por defecto:
```javascript
function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

function createStudent({
  name,
  email,
  age,
  twitter,
  instagram,
  facebook,
  approvedCourses = [],
  learningPaths = [],
} = {}) { // 👈👈
  return {
    name,
    email,
    age,
    approvedCourses,
    learningPaths,
    socialMedia: {
      twitter,
      instagram,
      facebook,
    },
  };
}
```
3. Deberíamos hacer que algunos campos como `email` sean obligatorios de enviar, pues, no todos los atributos se deberían quedar como `undefined` ni tampoco deberíamos poner valores por defecto a ciertos datos personales de un estudiante. Por tanto, deberíamos avisar mediante un mensaje de error personalizado que ciertos campos son obligatorios:
```javascript
function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

// Creamos una función con el objetivo de generar un Error el cual
// tendrá un mensaje customizado por nosotros.
// Como parámetro indicamos el nombre del atributo que no se está enviando (String)
function requiredParam(param) { // 👈👈
  throw new Error(param + " es obligatorio"); // Este es el mensaje de error generado
}

function createStudent({
	// Por defecto, invocamos a la nueva función requiredParam en aquellos
	// atributos que deseamos que sean obligatorios. Indicamos como argumento el nombre
	// de dicho atributo.
  name = requiredParam("name"), // 👈👈
  email = requiredParam("email"), // 👈👈
  age,
  twitter,
  instagram,
  facebook,
  approvedCourses = [],
  learningPaths = [],
} = {}) {
  return {
    name,
    email,
    age,
    approvedCourses,
    learningPaths,
    socialMedia: {
      twitter,
      instagram,
      facebook,
    },
  };
}
```
Ahora, si intentamos crear un objeto que no tenga, por ejemplo, asignado un valor en la propiedad `name`, la consola nos mostrará el mensaje de error que creamos:
```javascript
const juan = createStudent({ email: "juanito@frijoles.co"});
```
![](https://static.platzi.com/media/articlases/Images/atributo-obligatorio-en-un-mensaje-de-error-de-la-consola-curso-intermedio-de-programacion-orientada-a-objetos-en-javascript.jpg)

# Module pattern y namespaces: propiedades privadas en JavaScript
En JavaScript **no tenemos** ***keywords*** **para indicar que un atributo es privado o público** a diferencia de otros lenguajes de programación. Sin embargo, podemos aplicar ciertas técnicas y métodos para lograrlo.

## **Atributos públicos y privados en JavaScript**
Modificaremos la función creada [anteriormente](https://platzi.com/clases/2419-javascript-poo-intermedio/39816-factory-pattern-y-roro/) con la que podíamos generar nuevos objetos. Esto con la finalidad de separar los atributos que queremos que sean privados (por ahora solo el atributo `name`) y públicos, además de crear 2 funciones: una para poder modificar el atributo privado y otra para obtener el valor de esa propiedad privada:

1. Declaramos un objeto `privateAtributos` en el que colocaremos las propiedades que deseamos que sean privadas y otro objeto `publicAtributos` en el que queremos que sean públicas. Por ahora, solo name será privada y por convención se coloca un guion bajo delante del nombre de aquel atributo privado:
```javascript
function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

function requiredParam(param) {
  throw new Error(param + " es obligatorio");
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
  const privateAtributos = { // 👈👈
		// '_name' es el atributo privado
		// 'name' es el parámetro que recibe la función
    "_name": name,
  };

  const publicAtributos = { // 👈👈
		// El resto de atributos serán públicos:
    email,
    age,
    approvedCourses,
    learningPaths,
    socialMedia: {
      twitter,
      instagram,
      facebook,
    }
  }

  return publicAtributos ;
}
```
Por consiguiente, solo retornaremos `publicAtributos`, pues contiene las propiedades a las que sí podrán acceder los usuarios.

2. Crearemos las funciones con las que el usuario puede editar y leer el valor del atributo privado `_name`:
```javascript
function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

function requiredParam(param) {
  throw new Error(param + " es obligatorio");
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
  const privateAtributos = {
    "_name": name,
  }

  const publicAtributos = {
		// El resto de atributos serán públicos:
    email,
    age,
    approvedCourses,
    learningPaths,
    socialMedia: {
      twitter,
      instagram,
      facebook,
    },
		readName() { // 👈👈
      return privateAtributos["_name"];
    },
    changeName(newName) { // 👈👈
      privateAtributos["_name"] = newName;
    },
  }

  return publicAtributos ;
  ```
3. Finalmente, deberíamos evitar que el usuario modifique o elimine los métodos `readName` y `changeName` y dar así mejor seguridad a estos. Con `Object.defineProperty` haremos las configuraciones respectivas para evitar lo mencionado:
```javascript
function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

function requiredParam(param) {
  throw new Error(param + " es obligatorio");
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
  const privateAtributos = {
    "_name": name,
  };

  const publicAtributos = {
		// El resto de atributos serán públicos:
    email,
    age,
    approvedCourses,
    learningPaths,
    socialMedia: {
      twitter,
      instagram,
      facebook,
    },
		readName() {
      return privateAtributos["_name"];
    },
    changeName(newName) {
      privateAtributos["_name"] = newName;
    },
  };

	Object.defineProperty(publicAtributos, "readName", { // 👈👈
    writable: false,
    configurable: false,
  });
  Object.defineProperty(publicAtributos, "changeName", { // 👈👈
    writable: false,
    configurable: false,
  });

  return publicAtributos ;
}

// Creamos un nuevo objeto
const juan = createStudent({ email: "juanito@frijoles.co", name: "Juanito" });

// Intentamos eliminar y alterar los métodos changeName y readName
delete juan.changeName; // false
delete juan.readName; // false
juan.changeName = function (nombreImpostor) { // NO se ve afectada la función original
	return "patatas";
}
```
La desventaja de protegerlos es que no nos permitiría trabajar con el polimorfismo (uno de los pilares de POO).

# Getters y setters
* La sintaxis `get` vincula la propiedad de un objeto con una función que se llamará cuando se busque esa propiedad. [1]
* La sintaxis `set` vincula la propiedad de un objeto con una función que se llamará cuando se intente hacer una asignación a esa propiedad. [2]
## **Cómo funciona Get y Set en JavaScript**
Los métodos `readName` y `changeName` [creados anteriormente](https://platzi.com/clases/2419-javascript-poo-intermedio/39817-module-pattern-y-namespaces-propiedades-privadas-e/) serán reemplazados por getters y setters:

1. Eliminamos o comentamos las funciones `readName` y `changeName`, además de las encapsulaciones de estos métodos que hicimos con `Object.defineProperty`:
```javascript
function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

function requiredParam(param) {
  throw new Error(param + " es obligatorio");
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
  const privateAtributos = {
    "_name": name,
  };

  const publicAtributos = {
    email,
    age,
    approvedCourses,
    learningPaths,
    socialMedia: {
      twitter,
      instagram,
      facebook,
    },
    // readName() { 👈👈
    //   return privateAtributos["_name"];
    // },
    // changeName(newName) { 👈👈
    //   privateAtributos["_name"] = newName;
    // },
  };

  // Object.defineProperty(publicAtributos, "readName", { 👈👈
  //   writable: false,
  //   configurable: false,
  // });
  // Object.defineProperty(publicAtributos, "changeName", { 👈👈
  //   writable: false,
  //   configurable: false,
  // });

  return publicAtributos;
}
```
2. Definimos el getter con el cual obtendremos el atributo “privado” name
```javascript
function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

function requiredParam(param) {
  throw new Error(param + " es obligatorio");
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
  const privateAtributos = {
    "_name": name,
  };

  const publicAtributos = {
    email,
    age,
    approvedCourses,
    learningPaths,
    socialMedia: {
      twitter,
      instagram,
      facebook,
    },
		get name() { // 👈👈
      return privateAtributos["_name"];
    },
  };

  return publicAtributos;
}
```
3. Definimos setter con el cual podremos asignar valores a nuestro atributo ”privado” name:
```javascript
function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

function requiredParam(param) {
  throw new Error(param + " es obligatorio");
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
  const privateAtributos = {
    "_name": name,
  };

  const publicAtributos = {
    email,
    age,
    approvedCourses,
    learningPaths,
    socialMedia: {
      twitter,
      instagram,
      facebook,
    },
		get name() {
      return privateAtributos["_name"];
    },
		set name(newName) { // 👈👈
			privateAtributos["_name"] = newName;
    }
  };

  return publicAtributos;
}
```
4. Agreguemos una pequeña validación para garantizar que al menos la asignación a `name` sea de al menos una letra y no sea un `string` vacío.
```javascript
function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

function requiredParam(param) {
  throw new Error(param + " es obligatorio");
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
  const privateAtributos = {
    "_name": name,
  };

  const publicAtributos = {
    email,
    age,
    approvedCourses,
    learningPaths,
    socialMedia: {
      twitter,
      instagram,
      facebook,
    },
		get name() {
      return privateAtributos["_name"];
    },
		set name(newName) {
      if (newName.length != 0) { // 👈👈
        privateAtributos["_name"] = newName;
      } else {
        console.warn("Tu nombre debe tener al menos 1 caracter");
      }
    },
  };

  return publicAtributos;
}
```
¡Listo! Ya podemos crear objetos y utilizar los getters y setters respectivos del atributo `name`:
```javascript
const juan = createStudent({ email: "juanito@frijoles.co", name: "Juanito" });

console.log(juan.name); // Se ejecuta el GETTER
juan.name = "Rigoberto"; // Se ejecuta el SETTER
console.log(juan.name);
```
Apliquemos `Object.getOwnPropertyDescriptors` sobre nuestro objeto `juan` para visualizar la accesibilidad de sus atributos: el atributo `name` no tendrá las propiedades `value` y `wriatable `como tal, en vez de eso nos aparecerán las funciones `get` y `set`. Observemos esto en la consola del navegador:
```javascript
Object.getOwnPropertyDescriptors(juan);
```
![](https://static.platzi.com/media/articlases/Images/el-atributo-tiene-a-los-metodos-get-y-set-en-vez-de-value-y-writable-curso-intermedio-de-programacion-orientada-a-objetos-en-javascript.png)

# Qué es duck typing
El duck typing es la forma de programar donde identificamos los elementos por los métodos y atributos que tenga por dentro.

## **Cómo funciona el duck typing**
* Se deben tener parámetros para saber diferenciar dos cosas, dos personas, dos elementos, etc. Si queremos determinar quién es quién, se debe mirar por sus atributos y métodos, aunque puede haber el caso en el que haya elementos parecidos que también se deben diferenciar (impostores), es cuando más detalle se debe poner en identificar qué los compone.
* El nombre proviene de la frase:
```
Si parece un pato y grazna como un pato, es un pato.
```
En otras palabras, tiene que cumplir con ciertos métodos y atributos para considerarse alguna cosa.

# Duck typing en JavaScript
Vamos a definir cuáles son las propiedades que deben tener ciertos objetos para determinar cuál es cuál y así construir objetos más completos.

## **Validando que un objeto tenga lo necesario**
Vamos a validar que cuando generemos un nuevo estudiante, las rutas de aprendizajes tengan los datos necesarios para poder ser agregados en el array del atributo `learningPaths`:

1. Creamos una función `createLearningPath` para poder generar nuevas rutas de aprendizaje. Aquí validaremos que tenga los atributos necesarios:
```javascript
function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

function requiredParam(param) {
  throw new Error(param + " es obligatorio");
}

function createLearningPath({ // 👈👈
	name = requiredParam("name"), // Campo obligatorio
	courses = [], // Lista de Cursos que pertencen a la ruta de aprendizaje
}) {}

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
  const privateAtributos = {
    "_name": name,
  };

  const publicAtributos = {
    email,
    age,
    approvedCourses,
    learningPaths,
    socialMedia: {
      twitter,
      instagram,
      facebook,
    },
		get name() {
      return privateAtributos["_name"];
    },
		set name(newName) {
      if (newName.length != 0) {
        privateAtributos["_name"] = newName;
      } else {
        console.warn("Tu nombre debe tener al menos 1 caracter");
      }
    },
  };

  return publicAtributos;
}
```
2. Creamos 2 variables en las que dividiremos nuestras propiedades públicas y privadas:
```javascript
function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

function requiredParam(param) {
  throw new Error(param + " es obligatorio");
}

function createLearningPath({
	name = requiredParam("name"), // Campo es obligatorio
	courses = [], // Lista de Cursos que pertencen a la ruta de aprendizaje
}) {
	const private = { // 👈👈 Atributos privados
		"_name": name,
		"_courses": courses,
	};
	const public = {}; // 👈👈
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
  const privateAtributos = {
    "_name": name,
  };

  const publicAtributos = {
    email,
    age,
    approvedCourses,
    learningPaths,
    socialMedia: {
      twitter,
      instagram,
      facebook,
    },
		get name() {
      return privateAtributos["_name"];
    },
		set name(newName) {
      if (newName.length != 0) {
        privateAtributos["_name"] = newName;
      } else {
        console.warn("Tu nombre debe tener al menos 1 caracter");
      }
    },
  };

  return publicAtributos;
}
```
3. En la variable `public` definiremos los getters y setters para los atributos `name` y `courses`:
```javascript
function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

function requiredParam(param) {
  throw new Error(param + " es obligatorio");
}

function createLearningPath({
	name = requiredParam("name"), // Campo es obligatorio
	courses = [], // Lista de Cursos que pertencen a la ruta de aprendizaje
}) {
	const private = { // Atributos privados
		"_name": name,
		"_courses": courses,
	};
	const public = { // 👈👈 Getters y Setters
		get name() {
			return private["_name"];
		},
		set name(newName) {
			if (newName.length != 0) {
				private["_name"] = newName;
			} else {
				console.warn("El nombre debe tener al menos 1 caracter");
			}
		},
		get courses() {
			return private["_courses"];
		},
	};
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
  const privateAtributos = {
    "_name": name,
  };

  const publicAtributos = {
    email,
    age,
    approvedCourses,
    learningPaths,
    socialMedia: {
      twitter,
      instagram,
      facebook,
    },
		get name() {
      return privateAtributos["_name"];
    },
		set name(newName) {
      if (newName.length != 0) {
        privateAtributos["_name"] = newName;
      } else {
        console.warn("Tu nombre debe tener al menos 1 caracter");
      }
    },
  };

  return publicAtributos;
}
```
En este caso no definimos un setter a `courses, ya que` no cualquiera debería realizar asignaciones a ese atributo.

4. Ahora en la función `createStudent` eliminamos el atributo `learningPaths` de los atributos públicos y lo pasamos al objeto de atributos privados. Luego, generaremos el getter y setter respectivo:
```javascript
function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

function requiredParam(param) {
  throw new Error(param + " es obligatorio");
}

function createLearningPath({
	name = requiredParam("name"), // Campo es obligatorio
	courses = [], // Lista de Cursos que pertencen a la ruta de aprendizaje
}) {
	const private = { // Atributos privados
		"_name": name,
		"_courses": courses,
	};
	const public = { // Getters y Setters
		get name() {
			return private["_name"];
		},
		set name(newName) {
			if (newName.length != 0) {
				private["_name"] = newName;
			} else {
				console.warn("El nombre debe tener al menos 1 caracter");
			}
		},
		get courses() {
			return private["_courses"];
		},
	};
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
  const privateAtributos = {
    "_name": name,
		"_learningPaths": learningPaths, // 👈👈
  };

  const publicAtributos = {
    email,
    age,
    approvedCourses,
    //learningPaths,👈👈
    socialMedia: {
      twitter,
      instagram,
      facebook,
    },
		get name() {
      return privateAtributos["_name"];
    },
		set name(newName) {
      if (newName.length != 0) {
        privateAtributos["_name"] = newName;
      } else {
        console.warn("Tu nombre debe tener al menos 1 caracter");
      }
    },
		get learningPaths() { // 👈👈
			return private["__learningPaths"];
		},
		set learningPaths(newLP) { // 👈👈
			// AQUÍ empezamos a aplicar DUCK TYPING 👀🦆
      if (!newLP.name) {
				// Si la nueva ruta de aprendizaje NO tiene el atributo "name"...
        console.warn("Tu LP no tiene la propiedad name");
        return; // Cortamos el proceso y no agregamos la ruta de aprendizaje
      }

      if (!newLP.courses) {
				// Si la nueva ruta NO tiene asignado un array
				// en el atributo "courses"
        console.warn("Tu LP no tiene courses");
        return; // Cortamos el proceso y no agregamos la ruta de aprendizaje
      }

      if (!isArray(newLP.courses)) {
				// Si el atributo "courses" en la nueva ruta de aprendizaje NO es un Array
        console.warn("Tu LP no es una lista (*de cursos)");
        return; // Cortamos el proceso y no agregamos la ruta de aprendizaje
      }

			// Si la nueva ruta de aprendizaje pasó por todas las validaciones
			// correctamente...Quiere decir que SÍ es una ruta válida tal como
			// la deseamos que fuese. Por tanto, procedemos a añadir ese Learning Path
			// a la lista de rutas del estudiante:
      private["_learningPaths"].push(newLP);
    },
  };

  return publicAtributos;
}
```
## **Ser o parecer una instancia de otro objeto**
Ahora ya podríamos añadir nuevas rutas con los atributos que esperamos que tenga una ruta de aprendizaje a los nuevos estudiantes:
```javascript
// NUEVO ESTUDIANTE:
const juan = createStudent({email:"juanito@frijoles.co",name:"Juanito"});

// Le asignamos al estudiante "juan" un ruta de aprendizaje:
juan.learningPaths = {
	name: "Escuela de Desarrollo Web",
	courses: [],
}
```
En teoría, la ruta que añadimos es un *learning path*, sin embargo, no hemos validado que se haya generado esa ruta de aprendizaje con la función generadora de *learning paths* (`createLearningPath`). Es decir, nosotros no creamos la ruta de “desarrollo web” de este modo:
```javascript
const escuelaWeb = createLearningPath({
	name: "Escuela de Desarrollo Web",
	courses: []
})
```
Si no que lo hicimos directamente en el objeto `juan`. El objeto `escuelaWeb` es una ruta que heredó las propiedades de la función fábrica de *learning paths* y el otro es uno que producimos directamente desde el objeto `juan`.

Lo anterior nos lleva al problema SER o TENER: no estamos validando si nuestros **learning paths** son realmente objetos que se construyeron desde `createLearningPath`, lo que validamos es que sí tienen los atributos que esperaríamos que tenga una ruta de aprendizaje.

Comenzaremos a utilizar nuevamente prototipos de JavaScript para ahora sí validar qué objetos son realmente rutas de aprendizajes y no solo confirmar si tienen o no las propiedades que los convierte en un ***learning path***.

# Instance Of en JavaScript con instancias y prototipos
Con `instanceof` podemos **saber si un objeto es instancia de cierto prototipo**. Esto nos devuelve `true` o `false`.

## **Determinando la procedencia de un objeto**
A partir del código [creado anteriormente](https://platzi.com/clases/2419-javascript-poo-intermedio/39820-duck-typing-en-javascript/), realizaremos las modificaciones respectivas para que ahora nuestras funciones generadoras de objetos (como `createLearningPath`) sean ahora prototipos. Con ello ya podremos usar `instanceof` para identificar si ciertos objetos son instancias de nuestros prototipos, asegurándonos así de que tengan los atributos y métodos necesarios.

1. Convertiremos nuestras funciones `createLearningPath` y `createStudent` en prototipos. Utilizaremos ahora `this` para asignar los parámetros recibidos a las propiedades de los nuevos prototipos y por ahora no trabajaremos con métodos y atributos privados:
```javascript
function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

function requiredParam(param) {
  throw new Error(param + " es obligatorio");
}

function LearningPath({ // 👈👈 PROTOTIPO
	name = requiredParam("name"), // Campo es obligatorio
	courses = [], // Lista de Cursos que pertencen a la ruta de aprendizaje
}) {
	this.name = name;
	this.courses = courses;
}

function Student({ // 👈👈 PROTOTIPO
  name = requiredParam("name"),
  email = requiredParam("email"),
  age,
  twitter,
  instagram,
  facebook,
  approvedCourses = [],
  learningPaths = [],
} = {}) {

	this.name = name; // ⬅⬇
	this.email = email;
	this.age = age;
	this.approvedCourses = approvedCourses;
	this.socialMedia = {
		twitter,
		instagram,
		facebook,
	}; // ⬅⬆

}
```
La propiedad `learningPaths` lo asignaremos luego de haber hecho las validaciones respectivas.

2. Ahora validaremos si nuestras rutas de aprendizaje que vayamos a crear son auténticas, es decir, no solamente se comportan como tal (tienen los atributos y métodos que un ***learning path*** debería tener) sino que también son instancias de nuestro prototipo `LearningPath`:
```javascript
 function isObject(subject) {
   return typeof subject == "object";
 }
 
 function isArray(subject) {
   return Array.isArray(subject);
 }
 
 function requiredParam(param) {
   throw new Error(param + " es obligatorio");
 }
 
 function LearningPath({ // PROTOTIPO
 	name = requiredParam("name") // Campo es obligatorio
 	courses = [], // Lista de Cursos que pertencen a la ruta de aprendizaje
 }) {
 	this.name = name;
 	this.courses = courses;
 }
 
 function Student({ // PROTOTIPO
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
 
 	// Preguntamos primero si el parámetro recibido "learningPaths" sí es un Array:
 	if (isArray(learningPaths)) { // 👈👈
 		// Momentaneamente hacemos esta asignación hasta realizar el resto de
 		// validaciones:
 		this.learningPaths = [];
 
 		// Vamos a recorrer cada índice del Array "learningPaths"
 		for (learningPathIndex in learningPaths) { // 👈👈
 
 			// Preguntaremos si el elemento ubicado en el índice actual es una
 			// instancia del prototipo LearningPath. Solo así sabremos si es una
 			// verdadera ruta de aprendizaje:
 			if (learningPaths[learningPathIndex] instanceof LearningPath) { // 👈👈
 
 				// Si es que SÍ es una instancia de dicho prototipo, entonces agregamos
 				// dicha ruta de aprendizaje al array "learningPaths" del estudiante:
 				this.learningPaths.push(learningPaths[learningPathIndex]);
 
 			} // If end
 		} // For end
 	} // If end
 
 }
 ```
Ya podemos agregar rutas de aprendizaje a los nuevos estudiantes que generemos. Los ***learning paths*** estarán correctamente validados al momento de realizar la asignación:
```javascript
// Creamos nuevas rutas de aprendizaje que son instancias de "LearningPath"
const escuelaWeb = new LearningPath({
	name:"Escuela de WebDev"
});
const escuelaData = new LearningPath({
	name:"Escuela de Data Science"
});

// Generamos un nuevo estudiante asignandole las rutas creadas hace un momento, pero
// además agregamos un objeto con el nombre de una escuela al azar la cual a pesar de
// que tenga los mismos atributos, NO es instancia del prototipo LearningPath
const juan = new Student({
	email:"juanito@frijoles.co",
	name:"Juanito",
	learningPaths:[
		escuelaWeb,
		escuelaData,
		{
			name: "Escuela Impostora"
		}
	]
});

// Si observamos en consola las rutas que tiene el estudiante creado, no nos aparecerá
// aquella "Escuela Impostora" que intentamos agregar, esto debido a que no pasó las
// Validaciones que establecimos:
console.log(juan.learningPaths);

/* > Mensaje en consola: 👀
[
  LearningPath {
		name: 'Escuela de WebDev',
		courses: []
	},
  LearningPath {
		name: 'Escuela de Data Science',
		courses: []
	}
]
*/
```

# Atributos y métodos privados en prototipos
A partir del último [código](https://platzi.com/clases/2419-javascript-poo-intermedio/39821-instance-of-en-javascript-con-instancias-y-prototi/) generado, crearemos un *getter* y *setter* a nuestra propiedad `learningPaths` dentro de nuestro prototipo `Student` para evitar que sea manipulado después de la creación de un estudiante.

## **Getters y Setters desde Object.defineProperty**
1. Generamos un objeto `private` en el que colocaremos el atributo, `_learningPaths` el cual al principio será un array vacío. Previo a esto, borramos todo el código que viene después de la asignación de atributos en el objeto `Student`:

```javascript function isObject(subject) { return typeof subject == "object"; }

function isArray(subject) { return Array.isArray(subject); }

function requiredParam(param) { throw new Error(param + " es obligatorio"); }

function LearningPath({ // PROTOTIPO name = requiredParam("name"), // Campo es obligatorio courses = [], // Lista de Cursos que pertencen a la ruta de aprendizaje }) { this.name = name; this.courses = courses; }

function Student({ // PROTOTIPO name = requiredParam("name"), email = requiredParam("email"), age, twitter, instagram, facebook, approvedCourses = [], learningPaths = [], } = {}) {

// ASIGNACIÓN DE ATRIBUTOS
this.name = name;
this.email = email;
this.age = age;
this.approvedCourses = approvedCourses;
this.socialMedia = {
    twitter,
    instagram,
    facebook,
};

const private = { // 👈👈
"_learningPaths": [],
};

}
```

2. Con `Object.defineProperty` añadiremos el *getter* y *setter* respectivo a la propiedad `learningPaths`. En el setter es donde validaremos si un nuevo ***learning path*** que deseamos añadir es instancia del prototipo `LearningPath`:

```javascript function isObject(subject) { return typeof subject == "object"; }

function isArray(subject) { return Array.isArray(subject); }

function requiredParam(param) { throw new Error(param + " es obligatorio"); }

function LearningPath({ // PROTOTIPO name = requiredParam("name"), // Campo es obligatorio courses = [], // Lista de Cursos que pertencen a la ruta de aprendizaje }) { this.name = name; this.courses = courses; }

function Student({ // PROTOTIPO name = requiredParam("name"), email = requiredParam("email"), age, twitter, instagram, facebook, approvedCourses = [], learningPaths = [], } = {}) {

// ASIGNACIÓN DE ATRIBUTOS
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
};

// "this" referencia al prototipo "Student"
Object.defineProperty(this, "learningPaths", { // 👈👈
get() { // GETTER
  return private["_learningPaths"];
},
set(newLp) { // SETTER
  if (newLp instanceof LearningPath) {
            // Si es que SÍ es una instancia, añadimos al array privado "_learningPaths"
    private["_learningPaths"].push(newLp);
  } else {
            // "LPs" hace referencia a Learning Paths
    console.warn("Alguno de los LPs NO es una instancia del prototipo LearningPath");
  }
},
});

}
```

3. Con un bucle `for in` vamos a recorrer cada una de las rutas de aprendizaje que queramos asignarle al nuevo estudiante para invocar al *setter* que generamos. Este *setter* validará al ***learning path*** de turno si es en realidad una instancia del prototipo `LearningPath`:

```javascript function isObject(subject) { return typeof subject == "object"; }

function isArray(subject) { return Array.isArray(subject); }

function requiredParam(param) { throw new Error(param + " es obligatorio"); }

function LearningPath({ // PROTOTIPO name = requiredParam("name"), // Campo es obligatorio courses = [], // Lista de Cursos que pertencen a la ruta de aprendizaje }) { this.name = name; this.courses = courses; }

function Student({ // PROTOTIPO name = requiredParam("name"), email = requiredParam("email"), age, twitter, instagram, facebook, approvedCourses = [], learningPaths = [], } = {}) {

// ASIGNACIÓN DE ATRIBUTOS
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
};

// "this" referencia al prototipo "Student"
Object.defineProperty(this, "learningPaths", {
get() { // GETTER
  return private["_learningPaths"];
},
set(newLp) { // SETTER
  if (newLp instanceof LearningPath) {
            // Si es que SÍ es una instancia, añadimos al array privado "_learningPaths"
    private["_learningPaths"].push(newLp);
  } else {
            // "LPs" hace referencia a Learning Paths
    console.warn("Alguno de los LPs que quieres añadir NO es una instancia del prototipo LearningPath");
  }
},
});

for (learningPathIndex in learningPaths) { // 👈👈
    // Al querer hacer una asignación, estamos invocando al setter de la
    // propiedad "learningPaths". Entonces, la ruta de aprendizaje ubicado
    // en el índice actual será validado por el setter para saber si es o no
    // instancia del prototipo LearningPath:
this.learningPaths = learningPaths[learningPathIndex];
}

}
```

¡Listo! Nuestro atributo `learningPaths` quedó protegido. Intentemos crear un estudiante con sus respectivos ***learning paths***. Luego intentemos añadir una ruta adicional que sea instancia del prototipo `LearningPath` y otra que no lo sea:

```javascript const escuelaWeb = new LearningPath({ name: "Escuela de WebDev" }); const escuelaData = new LearningPath({ name: "Escuela de Data Science" }); const juan = new Student({ email: "juanito@frijoles.co", name: "Juanito", learningPaths: [ escuelaWeb, escuelaData, ], });

console.log(juan.learningPaths); // ANTES

const escuelaMarketing = new LearningPath({ name: "Escuela de Marketing" });

juan.learningPaths = { name: "Escuela Impostora" }; // 👈👀 juan.learningPaths = escuelaMarketing;

console.log(juan.learningPaths); // DESPUES

/ > Mensaje en consola [ LearningPath { name: 'Escuela de WebDev', courses: [] }, LearningPath { name: 'Escuela de Data Science', courses: [] } ] Alguno de los LPs NO es una instancia del prototipo LearningPath 👈👀 [ LearningPath { name: 'Escuela de WebDev', courses: [] }, LearningPath { name: 'Escuela de Data Science', courses: [] }, LearningPath { name: 'Escuela de Marketing', courses: [] } ] / 
```

# Creando métodos estáticos en JavaScript
Generaremos **un prototipo en el cual añadiremos 2 métodos estáticos**: uno para determinar si un determinado valor es del tipo `object` y otro para realizar [deep copy](https://platzi.com/clases/2419-javascript-poo-intermedio/39815-deep-copy-con-recursividad/). A partir del último [código](https://platzi.com/clases/2419-javascript-poo-intermedio/39822-atributos-y-metodos-privados-en-prototipos/) implementado, añadamos las siguientes líneas de código:

1. Crearemos una función `SuperObject` vacío. Esto en realidad será un prototipo:
```javascript
function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

function SuperObject() {} // 👈👈👈👈

function requiredParam(param) {
  throw new Error(param + " es obligatorio");
}

function LearningPath({ // PROTOTIPO
	name = requiredParam("name"), // Campo es obligatorio
	courses = [], // Lista de Cursos que pertencen a la ruta de aprendizaje
}) {
	this.name = name;
	this.courses = courses;
}

function Student({ // PROTOTIPO
  name = requiredParam("name"),
  email = requiredParam("email"),
  age,
  twitter,
  instagram,
  facebook,
  approvedCourses = [],
  learningPaths = [],
} = {}) {

	// ASIGNACIÓN DE ATRIBUTOS
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
  };

	// "this" referencia al prototipo "Student"
	Object.defineProperty(this, "learningPaths", {
    get() { // GETTER
      return private["_learningPaths"];
    },
    set(newLp) { // SETTER
      if (newLp instanceof LearningPath) {
				// Si es que SÍ es una instancia, añadimos al array privado "_learningPaths"
        private["_learningPaths"].push(newLp);
      } else {
				// "LPs" hace referencia a Learning Paths
        console.warn("Alguno de los LPs que quieres añadir NO es una instancia del prototipo LearningPath");
      }
    },
  });

	for (learningPathIndex in learningPaths) {
    this.learningPaths = learningPaths[learningPathIndex];
  }

}
```
2. Añadimos un método estático por fuera el prototipo `SuperObject` para validar que un dato sea del tipo `object`. Luego, agregamos otro método que nos permita hacer deep copy a un objeto:
```javascript
function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

function SuperObject() {}

// Agregamos directamente estos métodos estáticos a nuestro prototipo "SuperObject"
SuperObject.isObject = function (subject) { // 👈👈
  return typeof subject == "object";
}
SuperObject.deepCopy = function (subject) { // 👈👈
  let copySubject;

  const subjectIsObject = isObject(subject);
  const subjectIsArray = isArray(subject);

  if (subjectIsArray) {
    copySubject = [];
  } else if (subjectIsObject) {
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

  return copySubject;
}

function requiredParam(param) {
  throw new Error(param + " es obligatorio");
}

function LearningPath({ // PROTOTIPO
	name = requiredParam("name"), // Campo es obligatorio
	courses = [], // Lista de Cursos que pertencen a la ruta de aprendizaje
}) {
	this.name = name;
	this.courses = courses;
}

function Student({ // PROTOTIPO
  name = requiredParam("name"),
  email = requiredParam("email"),
  age,
  twitter,
  instagram,
  facebook,
  approvedCourses = [],
  learningPaths = [],
} = {}) {

	// ASIGNACIÓN DE ATRIBUTOS
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
  };

	// "this" referencia al prototipo "Student"
	Object.defineProperty(this, "learningPaths", {
    get() { // GETTER
      return private["_learningPaths"];
    },
    set(newLp) { // SETTER
      if (newLp instanceof LearningPath) {
				// Si es que SÍ es una instancia, añadimos al array privado "_learningPaths"
        private["_learningPaths"].push(newLp);
      } else {
				// "LPs" hace referencia a Learning Paths
        console.warn("Alguno de los LPs que quieres añadir NO es una instancia del prototipo LearningPath");
      }
    },
  });

	for (learningPathIndex in learningPaths) {
    this.learningPaths = learningPaths[learningPathIndex];
  }

}
```
¡Listo! Ya podemos usar estos métodos desde este nuevo prototipo `SuperObject` en nuestro código.
```javascript
const copia = SuperObject.deepCopy({
	nombre: "Objecto Copia",
	valor: 100,
});
console.log(copia);

console.log(
	SuperObject.isObject(20)
); // false
console.log(
	SuperObject.isObject("JS")
); // false
console.log(
	SuperObject.isObject({name: "Juanito"})
); // true
console.log(
	SuperObject.isObject(["juan"])
); // true  👈👀 
// Los Arrays son instanticas del superprototipo Array y a su vez esta superclase hereda
// del superprototipo Object. Por tanto, son también considaradas del tipo "object"
// y es por eso que nos sale "true"
```
Como **reto** te dejamos modificar el método `isObject` del prototipo `SuperObject` para que cuando le mandemos un Array como argumento, este nos indique `false`.

# ¿Quieres más cursos de POO en JavaScript?
Repasemos los conocimientos que hemos adquirido en el [Curso Intermedio de Programación Orientada a Objetos en JavaScript](https://platzi.com/cursos/javascript-poo-intermedio/):

* Entendimos cómo funcionan los objetos por dentro. Los objetos no solo tienen atributos y valores, sino también otras propiedades como `writable`, `enumerable` o `configurable` que nos permiten realizar el encapsulamiento de estos.
* Aprendimos a proteger a nuestros atributos ante posibles modificaciones o eliminaciones con `Object.seal`, `Object.freeze` y `Object.defineProperty`.
* Conocemos ahora cómo implementar funciones generadoras de objetos sin el uso de clases o prototipos.
* Sabemos ahora cómo establecer atributos privados y públicos, aunque JavaScript nativamente no tenga **keywords** para indicar esto.
* Aprendimos a trabajar con *getters* y *setters*.
* Entendemos un poco mejor cómo funciona la memoria de JavaScript.
* Sabemos hacer copias de objetos con Shallow copy y Deep copy en JavaScript.

Con lo anterior, conocemos mejor cómo se comporta internamente JavaScript cuando deseamos aplicar el paradigma de la programación orientada a objetos. 👨‍💻🚀