from urllib.request import urlopen
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import re
import json
import os
import time
from pathlib import Path
import shutil

urlsToScrap = ['https://webscraper.io/test-sites/e-commerce/scroll/computers/laptops', \
     'https://webscraper.io/test-sites/e-commerce/scroll/computers/tablets', \
    'https://webscraper.io/test-sites/e-commerce/scroll/phones/touch']


def ensure_dir(path):
    try:
        os.makedirs(path)
    except FileExistsError:
        pass

def remove_dir(path):
    try:
        shutil.rmtree(path)
    except OSError as e:
        print("Error: %s : %s" % (path, e.strerror))      


def scrap(urls):
    items = []
    ensure_dir("./pages")
    for url in urls:
        print("scraping " + url)
        arrayFromUrl = url.split("/")
        tag = arrayFromUrl[-1] 

        scroller(url, tag)

        items += extractInfo('./pages/Scrolled_file_' + tag + '.html', tag)

    print("writing output to file")
    with open('output.json', 'w') as fout:
        json.dump(items, fout)

    print("removing temp files")
    remove_dir("./pages")
    
    print("done")
    return items

        


def scroller(url, tag):
    chromedriver = "/usr/bin/chromedriver"
    os.environ["webdriver.chrome.driver"] = chromedriver
    options = webdriver.ChromeOptions()
    options.add_argument("headless")
    options.add_argument("no-sandbox")
    driver = webdriver.Chrome(chromedriver, options=options)
    driver.get(url)

    last_height = driver.execute_script("return document.body.scrollHeight")

    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(.5)
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

    file = open('./pages/Scrolled_file_' + tag + '.html', 'w')
    file.write(driver.page_source)
    file.close()
    driver.close()

def extractInfo(file, tag):
    additionalProperties = []
    data = open(file, 'r')
    bsObj = BeautifulSoup(data, 'html.parser')
    itemsString = bsObj.find("div", {"class":"row ecomerce-items ecomerce-items-scroll"}).get('data-items')
    itemList = json.loads(itemsString)
    numberOfItems = len(itemList)
    cardsObject = bsObj.findAll("div", {"class":"thumbnail"})
    for card in cardsObject:
        Dict = {}
        Dict["reviews"] = card.find("div", {"class":"ratings"}).find("p", {"class":"pull-right"}).get_text()
        Dict["stars"] = len(card.findAll("span", {"class":"glyphicon glyphicon-star"}))
        Dict["tag"] = tag
        additionalProperties.append(Dict)

    for i in range(0, len(itemList)):
        itemList[i].update(additionalProperties[i])
    
    return itemList


scrap(urlsToScrap)
    
with open('output.json') as json_file:
    data = json.load(json_file)    

print(json.dumps(data, indent=4, sort_keys=True))    