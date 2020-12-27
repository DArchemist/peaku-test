# peaku-test

////////////////////////ENGLISH/////////////////////////////

/client
This directory contains a simple view that fetches a list of items from a server, displays them as a grid of cards and allows the user to search for
matching titles and/or descriptions, and filter the items both, by device type (laptops, tablets and phones) and by price.

/server
This directory contains a simple Flask aṕi that serves a list of scrapped items by reading output.json.

/scraper
This directory contains a Python script that scrapes every subcategory link on https://webscraper.io/test-sites/e-commerce/scroll/, returning a list of
dictionaries, each dictionary corresponding to a single item and its properties/features. Additionally, the script outputs a json file (output.json) containing the returned
data.

If you want to check the project running live, visit: http://ec2-35-174-200-43.compute-1.amazonaws.com:8080/

If you own a Docker/Podman account, you can build the project as follows:

1. Clone this repository into your machine
$ git clone https://github.com/DArchemist/peaku-test.git

2. Build the server docker image
$




