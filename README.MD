# Proyecto Final Coderhouse-Backend 

Buenas, este es el proyecto final de backend, en donde estaremos utilizando todo lo aprendido en las clases de toda la comision en un E-commerce en donde tendremos una API con:
- Autenticacion
- Manejo de usuarios
- Manejo de productos
- Manejo de ordenes
- Chat en tiempo real

El proyecto Utilizará: **Node.js, Express, Socket.io, Patrones de Diseño, EslintJS, Arquitectura de Capas, Passport, JWT, MongoDB, Nodemailer, entre otros.**

## Instalacion

Para la instalacion del proyecto, se necesita utilizar [node.js](https://nodejs.org/en/)
Para verificar que tiene instalado **Node.js** debera utilizar en cualquier terminal de su convencion el siguiente comando.

```bash
node --version
```
Ya habiendo instalado nodeJS se le instalara por defecto el NPM, aun asi para verificar/corroborar que exista el NPM utilizar el siguiente comando.

```bash
npm -v
```
Ya corroborado la existencia de estos 2 programas deberá descargar este repositorio/proyecto en su entorno, luego posicionarse en el directorio del proyecto y escribir el siguiente comando para instalar las dependencias necesarias para correr el proyecto.

```bash
npm i
```
Si hizo todo correctamente le aparecera una barra de carga indicando que se estan instalando las dependencias necesarias.

## Uso

Para correr el proyecto, tiene que hacer uso del siguiente comando.

```bash
#Modo desarrolador
npm run dev
#Modo produccion
npm start
```

Ya el comando corriendo va a instanciarse un servidor en el puerto `8080`(Al menos que este definido en el .env) en donde va a tener disponible una serie de endpoints para comunicarse con el e-commerce:

*Para poder comunicarse con la API va a necesitar un token, el cual puede acceder, registrandose en la API con el siguiente **endpoint***

```js
POST "http://localhost:{PORT}/api/user/register"

{
  name: { type: "string", required: true },
  lastname: { type: "string", required: true },
  password: { type: "string", required: true },
  email: { type: "string", required: true },
  nickname: { type: "string", required: true },
  phone_number: { type: "string" },
  profile_image: { type: "string" },
  address: { type: "string", required: true },
}

//Ejemplo

{
  name: "Carlos",
  lastname: "Perez",
  password: "******",
  email: "SoyUnEjemplo@Ejemplo.com",
  nickname: "CarlPer",
  phone_number: "+54 1313-1313",
  profile_image: "http://placeholder.com",
  address: "Calle falsa 123",
}

```

Habiendose registrado correctamente se le respondera con la validez del mismo.
Ya habiendose registrado, necesitara loguearse con el siguiente endpoint.

```js
POST "http://localhost:{PORT}/api/user/login"

{
  email: { type: "string", required: true},
  password: { type: "string", required: true }
}

// Ejemplo

{
  email: "SoyUnEjemplo@Ejemplo.com",
  password: "******"
}
```
Si el email existe y las credenciales son correctas se le regresará un token de acceso para poder utilizar la API.

## Endpoints

### Productos

```js
GET "http://localhost:{PORT}/api/products/"
```
Le regresara un array de todos los productos disponibles en el E-commerce


```js
GET "http://localhost:{PORT}/api/products/:id"
```
Le regresara el producto especificado en el `param: id`.

```js
ESTE ENDPOINT SOLAMENTE FUNCIONA PARA LOS ADMINS
POST "http://localhost:{PORT}/api/products/"

{
  name: { type: "string", required: true },
  description: { type: "string", required: true },
  thumbnail: { type: "Array<string>" },
  stock: { type: "number" },
  price: { type: "number" }
}

// Ejemplo

{
  name: "Producto generico 1",
  descripcion: "Este es un producto generico",
  stock: 100,
  price: 120
}
```

Este endpoint le creara el producto en la base de datos del E-commerce.

```js
ESTE ENDPOINT SOLAMENTE FUNCIONA PARA LOS ADMINS
PUT "http://localhost:{PORT}/api/products/:id"

{
  thumbnail: { type: "Array<string>" },
  stock: { type: "number" },
  price: { type: "number" }
}

// Ejemplo

{
  thumbnail: ["http://placeholder.com/200x400", "http://placeholder.com/400x200"],
  stock: 150
  price: 100
}
```
Este endpoint le dejara modificar las propiedades de el producto especificado en el `params: id`.

```js
ESTE ENDPOINT SOLAMENTE FUNCIONA PARA LOS ADMINS
DELETE "http://localhost:{PORT}/api/products/:id"
```

Este endpoint le dejara borrar el producto especificado en el `params: id`.


### Ordenes


```js
POST "http://localhost:{PORT}/api/order/"
```

El Endpoint buscara el carrito del usuario que hace el POST, y generara una orden de compra, enviando un correo al mail administrador.

```js
POST "http://localhost:{PORT}/api/order/:id/delivery"
```

El Endpoint buscara el id en `params: id` y dara por finalizada o en entrega la orden.

### Usuarios

```js
GET "http://localhost:{PORT}/api/user/profile"
```

El Endpoint buscara el perfil del usuario que hace el GET, y retornara un JSON con la data del usuario.

```js
ESTE ENDPOINT SOLAMENTE FUNCIONA PARA LOS ADMINS
GET "http://localhost:{PORT}/api/user/:id/profile"
```
El Endpoint buscara el perfil del id del usuario que se especifica en el `params: id`, y retornara un JSON con la data del mismo.


```js
POST "http://localhost:{PORT}/api/user/"

{
  name: { type: "string", required: true },
  lastname: { type: "string", required: true },
  password: { type: "string", required: true },
  email: { type: "string", required: true },
  role: { type: "admin" | "user" },
  nickname: { type: "string", required: true },
  phone_number: { type: "string" },
  profile_image: { type: "string" },
  address: { type: "string", required: true },
}

// Ejemplo

{
  name: "Diegato",
  lastname: "Jeit",
  password: "******",
  email: "Diegato@jeit.com",
  role: "admin",
  nickname: "Jeitgato",
  phone_number: "+52 1313-1313",
  profile_image: "http://placeholder.com",
  address: "Doxxeado PRRR"
}
```
**Como fines didacticos se deshabilito la verificacion de admin, asi cualquier usuario puede crear un usuario admin y poder utilizar las funcionalidades del mismo**
El Endpoint creara un usuario con los parametros indicados. 

```js
PUT "http://localhost:{PORT}/api/user/"

{
  password: { type: "string" },
  phone_number: { type: "string" },
  profile_image: { type: "string" },
  address: { type: "string" },
}

// Ejemplo

{
  password: "*******",
  phone_number: "Este no es mi numero",
  profile_image: "404",
  address: "Falsa Calle 321"
}
```
Este Endpoint Modificara el usuario que haya realizado la peticion PUT con los parametros indicados.

```js
ESTE ENDPOINT SOLAMENTE FUNCIONA PARA LOS ADMINS
PUT "http://localhost:{PORT}/api/user/:id"

{
  password: { type: "string" },
  phone_number: { type: "string" },
  profile_image: { type: "string" },
  address: { type: "string" },
}

// Ejemplo

{
  password: "*******",
  phone_number: "Este no es mi numero",
  profile_image: "404",
  address: "Falsa Calle 321"
}
```
Este endpoint Modificara el usuario que se indique en el `params: id` con los parametros indicados.


```js
ESTE ENDPOINT SOLAMENTE FUNCIONA PARA LOS ADMINS
DELETE "http://localhost:{PORT}/api/user/:id"
```

Este Endpoint Borrara el usuario que se indique en el `params: id`.

### Carrito

```js
ESTE ENDPOINT SOLAMENTE FUNCIONA PARA LOS ADMINS
GET "http://localhost:{PORT}/api/cart/all"
```

Este Endpoint Buscara todos los carritos disponibles

```js
GET "http://localhost:{PORT}/api/cart/"
```

Este Endpoint buscara el carrito del usuario que haya realizado la peticion GET, retornando el mismo.

```js
ESTE ENDPOINT SOLAMENTE FUNCIONA PARA LOS ADMINS
GET "http://localhost:{PORT}/api/cart/:id"
```

Este Endpoint buscara el carrito del id mencionado en el `params: id`, retornando el mismo.

```js
POST "http://localhost:{PORT}/api/cart/"

{
  "id": {type: "string", required: true},
  "quantity": {type: "number", required: true} 
}

// Ejemplo

{
  "id": "131313131313",
  "quantity": 5
}
```

Este Endpoint Añadira el producto del id especificado, y se le agregara o sumara la cantidad especificada

```js
PUT "http://localhost:{PORT}/api/cart/:id/"
```

```js
DELETE "http://localhost:{PORT}/api/cart/"
```

Este Endpoint borrara todos los productos del carrito del usuario que haga la peticion DELETE

```js
DELETE "http://localhost:{PORT}/api/cart/:id/product"
```

Este Endpoint borrara todos los productos del id del carrito especificado en el `params: id`.

## Socket.IO

Se agregara dos endpoint especiales llamados:

```js
GET "http://localhost:{PORT}/index.html"
GET "http://localhost:{PORT}/admin.html"
```
En donde tendras que especificarles el access_token para poder utilizarlo, para poder especificar el access token, basta con entrar al endpoint y te pedira que ingreses el TOKEN en un inputHTML con un boton Enviar. Tanto para el Admin, como para el User.

**Para el uso de la propia API, se adjuntara un collection de postman en donde podra tratar todos los endpoints especificados en el README.MD**

Saludos.