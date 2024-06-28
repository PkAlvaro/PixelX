# PixelX - Frontend

## Instrucciones para Setup - E3

1. Clonar este repositorio (Frontend)
2. `git pull` el repositorio del Backend.
3. En cada repositorio verificar o crear un archivo `.env` con las variables de entorno necesarias.

- `.env` de Frontend: \
VITE_BACKEND_URL=http://localhost:3000 

- `.env` de Backend: \
DB_USER=Usuario_postgres \
DB_PASSWORD=12131415 \
DB_HOST=localhost \
DB_NAME=fval_db \
JWT_SECRET= jwt_secret

4. En cada repositorio ejecutar `yarn` para instalar las dependencias.

5. Mediante terminal ejecutar los siguientes comandos para resetar la base de datos y poblarla con datos de prueba.
(Ir ejecutando una linea a la vez)
- `TRUNCATE TABLE "Usuarios" RESTART IDENTITY  CASCADE;`

- `TRUNCATE TABLE "ServicioTrenJugadors" RESTART IDENTITY  CASCADE;`

- `TRUNCATE TABLE "Partidas" RESTART IDENTITY  CASCADE;`

- `TRUNCATE TABLE "Participacions" RESTART IDENTITY  CASCADE;`

- `TRUNCATE TABLE "Jugadors" RESTART IDENTITY  CASCADE;`

- `TRUNCATE TABLE "Casillas" RESTART IDENTITY  CASCADE;`

- Luego en el backend ejecutar las semillas con `yarn sequelize-cli db:seed:all`

6. En cada repositorio ejecutar `yarn dev` para iniciar el servidor.

7. Crear un usuario en la página mediante el botón de registro.

8. Iniciar sesión con el usuario creado.

9. Luego en Postman generar una petición PATCH a la ruta `http://localhost:3000/usuarios/1` con un request vacía pero ingresando el Header `Bearer key` donde `key` es el token generado al iniciar sesión.

10. Listo! Ya puedes disfrutar de la aplicación.

##  Endpoints

Para probar los endpoints se debe usar al usuario Admin, ya que es el único que puede acceder a ellos (tanto desde el LandingPage como del Navbar)

Para probar los endpoints, es necesario

- Al menos tres usuarios creados conectados a la misma partida.

- Tener una partida creada.

Además para probar cualquier endpoint, es necesario comenzar por el `Comprar Propiedad` y luego seguir con los demás.
 