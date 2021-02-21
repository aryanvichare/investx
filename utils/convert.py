import csv
import json

csvfile = open('sp500.csv', 'r')
jsonfile = open('sp500.json', 'w')

fieldnames = ("symbol","name","sector","subIndustry", "headquarters", "firstAdded", "founded")
reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write('\n')