# peaku-test

////////////////////////ENGLISH/////////////////////////////

/client \
This directory contains a simple view that fetches a list of items from a server, displays them as a grid of cards and allows the user to search for
matching titles and/or descriptions; and filter the items both, by device type (laptops, tablets, and phones) and by price.

/server \
This directory contains a simple Flask api that serves a list of scraped items by reading output.json.

/scraper \
This directory contains a Python script that scrapes every subcategory link on https://webscraper.io/test-sites/e-commerce/scroll/, returning a list of
dictionaries, each dictionary corresponding to a single item and its properties/features. Additionally, the script outputs a json file (output.json) containing the returned
data.

If you want to check the project running live, visit: http://ec2-35-174-200-43.compute-1.amazonaws.com:8080/

If you own a Docker/Podman account, you can build the project as follows:

1. Clone this repository into your machine \
$ git clone https://github.com/DArchemist/peaku-test.git

2. Navigate to the project directory \
$ cd peaku-test

3. Build the server docker image \
$ docker build -f Dockerfile.server -t scraper-server .

4. Run the server docker image \
$ docker run -d --rm -p 5000:5000 scraper-server

5. Build the client docker image \
$ docker build -f Dockerfile.client -t scraper-client .

6. Run the client docker image \
$ docker run -d --rm -p 8080:80 scraper-client

7. Visit https://localhost:8080 from your browser, you should see now the project working.


If you want to test the scraper, given that you have cloned this repository, perform the following:

1. Build the scraper docker image \
$ docker build -f Dockerfile.scraper -t scraper .

2. Run the scraper docker image (pwd is only compatible with UNIX-based systems) \
$ docker run -it --rm -v $(ṕwd)/scraper:/app scraper   





////////////////////////ESPAÑOL/////////////////////////////


/client \
Este directorio contiene una vista simple que obtiene una lista de elementos de un servidor, los muestra como una cuadrícula de tarjetas y permite al usuario buscar elementos que coincidan con los títulos y/o descripciones; y filtrar los artículos tanto por tipo de dispositivo (portátiles, tabletas y teléfonos) como por precio.

/server \
Este directorio contiene una simple api de Flask que sirve una lista de artículos minados leyendo el archivo output.json.

/scraper \
Este directorio contiene un script de Python que hace minería a cada enlace de subcategoría en https://webscraper.io/test-sites/e-commerce/scroll/, devolviendo una lista de diccionarios, cada uno de los cuales corresponde a un solo elemento y sus propiedades/características. Además, el script produce un archivo json (output.json) que contiene los datos minados.

Si quieres ver el proyecto en vivo, visita: http://ec2-35-174-200-43.compute-1.amazonaws.com:8080/

Si tienes una cuenta de Docker/Podman, puedes construir el proyecto de la siguiente manera:

1. Clona este repositorio en tu máquina. \
$ git clon https://github.com/DArchemist/peaku-test.git

2. Navega hasta el directorio del proyecto. \
$ cd peaku-test

3. Construye la imagen docker del servidor. \
$ docker build -f Dockerfile.server -t scraper-server .

4. Ejecuta la imagen docker del servidor. \
$ docker run -d --rm -p 5000:5000 scraper-server

5. Construye la imagen docker del cliente. \
$ docker build -f Dockerfile.client -t scraper-client .

6. Ejecuta la imagen docker del cliente. \
$ docker run -d --rm -p 8080:80 scraper-client

7. Visita https://localhost:8080 desde tu navegador. Deberías ver el proyecto en funcionamiento. \


Si quieres probar el scraper, suponiendo que ya has clonado este repositorio, haz lo siguiente:

1. Construye la imagen docker del scraper. \
$ docker build -f Dockerfile.scraper -t scraper .


2. Ejecuta la imagen docker del scraper (pwd solo es compatible con sistemas basados en UNIX. \
$ docker run -it --rm -v $(ṕwd)/scraper:/app scraper 











