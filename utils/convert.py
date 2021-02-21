import csv
import json
import os
import pandas as pd
import requests
import alpaca_trade_api as tradeapi

from collections import deque
from dotenv import load_dotenv
load_dotenv()


fieldnames = ("symbol","name","sector","subIndustry", "headquarters", "firstAdded", "founded")
alpaca = tradeapi.REST(os.getenv('NEXT_PUBLIC_ALPACA_API_KEY_ID'), os.getenv('NEXT_PUBLIC_ALPACA_API_SECRET_KEY'))

sp500 = deque()
all_stocks = {}
all_esg = {}

csvfile = open('utils/sp500.csv', 'r')
jsonfile = open('utils/sp500.json', 'w')

reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    sp500.append(row['symbol'])

NY = 'America/New_York'
start=pd.Timestamp('2021-02-19', tz=NY).isoformat()
end=pd.Timestamp('2021-02-19', tz=NY).isoformat()

while sp500:
    llama_limit = [sp500.popleft() for _ in range(100) if sp500]
    stocks = alpaca.get_barset(llama_limit, 'day', start=start, end=end)
    while len(stocks):
        item = stocks.popitem()
        bar = item[1].pop()
        all_stocks[item[0]] = { 'price': bar.c, 'change': str(round(bar.o - bar.c, 2)) }

    for symbol in llama_limit:
        resp = requests.get(f'https://www.refinitiv.com/bin/esg/esgsearchresult?ricCode={symbol}.O')
        result = resp.json()
        all_esg[symbol] = result
        print(f'\'{symbol}\': {result}')

csvfile = open('utils/sp500.csv', 'r')
reader = csv.DictReader( csvfile, fieldnames)
jsonfile.write('[')
for row in reader:
    row.update(all_stocks[row['symbol']])
    row.update(all_esg[row['symbol']])
    json.dump(row, jsonfile)
    jsonfile.write(',\n')
jsonfile.write(']\n')
#TR.TRESG:
