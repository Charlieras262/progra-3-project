Guía para contribuir con los repositorios de github de Brainsco

1.- Animarse con las ganas para contribuir... y terminar de leer esta guía.

2.- Tener una cuenta en github.

3.- Instalar algun cliente git (TortoiseGit en windows, git cli en MAC y linux distros)

4.- Configurar nuestra cuenta en github (Estos pasos los podemos completar siguiendo esta otra guía https://help.github.com/articles/set-up-git  en ingles)

5.-  Haremos un fork de este repositorio (Hacemos click en el boton que dice fork, duh) y clickeamos en _fork to_ (nombre de mi cuenta)

6.- Clonamos este repositorio en nuestra cuenta local
(Esto depende del sistema operativo, en este caso es el terminal de OSX)
$ git clone https://github.com/Charlieras262/progra-3-project.git

7.- Agregamos / Editamos los archivos necesarios para nuestro feature.

8.- Agregamos nuestros cambios al repositorio (http://www.kernel.org/pub/software/scm/git/docs/git-add.html)
$ git add .

9.- Hacemos commit de nuestros cambios con algun mensaje descriptivo pero corto en la primera linea, desde la segunda línea en adelante podemos re-escribir el Corán si deseamos.
$ git commit -m 'Agregando archivos base para el tema de alumnos'

10.- Repetimos los pasos 7 a 9 cada vez que agreguemos más cambios
$ git commit -m 'Agregando detalles de tema y licencia'
$ git commit -m 'Agregando screenshot al tema'

11.- Una vez que estemos contentos con nuestros cambios, realizamos un push al repositorio
$ git push origin master
(con este comando estamos sincronizando nuestro branch local a un branch con el mismo nombre en github)

12.- Hacemos un pull request, escribiremos qué feature(s) se agregan con nuestros cambios y por qué debería ser aceptado.

Una vez escrita la descripcion, seleccionamos el botón _Send pull request_

La organización verá esta solicitud, y podrá comentar. Por otro lado, incluso antes de unir los cambios, podemos modificar nuestro pull request.

Una vez hecho el merge, github nos envía una notificación, y podremos ver nuestros cambios en el repositorio principal.

Nota: No olvidar cambiar los nombres de los branches donde trabajaremos (solo se utilizaron nombres de ejemplo) 
