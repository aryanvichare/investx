import json
import os
import requests

from dotenv import load_dotenv
load_dotenv()

all_stocks = {}
all_esg = {}

json_in = open('utils/sp500.json', 'r')
jsonfile = open('utils/sp500-2.json', 'w')

stocks = json.load(json_in)

for i in range(len(stocks)):
  stock = stocks[i]
  if (stock.get('industryComparison')):
    continue

  symbol = stock['symbol']
  resp = requests.get(f'https://www.refinitiv.com/bin/esg/esgsearchresult?ricCode={symbol}')
  result = resp.json()

  if not result:
    print('!!!', symbol)
    continue

  result['symbol2'] = ''
  stock.update(result)
  stocks[i] = stock
  print(f'\'{symbol}\': {result}')

jsonfile.write(json.dumps(stocks))
#BRKa
#BFb
#GOOG