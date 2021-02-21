import csv
import json
import os
import pandas as pd
import alpaca_trade_api as tradeapi

from collections import deque
from dotenv import load_dotenv
load_dotenv()

alpaca = tradeapi.REST(os.getenv('NEXT_PUBLIC_ALPACA_API_KEY_ID'), os.getenv('NEXT_PUBLIC_ALPACA_API_SECRET_KEY'))
sp500 = deque()

fieldnames = ("symbol","name","sector","subIndustry", "headquarters", "firstAdded", "founded")

csvfile = open('utils/sp500.csv', 'r')
jsonfile = open('utils/sp500.json', 'w')

reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    sp500.append(row['symbol'])

NY = 'America/New_York'
start=pd.Timestamp('2021-02-19', tz=NY).isoformat()
end=pd.Timestamp('2021-02-19', tz=NY).isoformat()

llama_limit = []
for i in range(100):
    llama_limit.append(sp500.popleft())

stocks = alpaca.get_barset(llama_limit, 'day', start=start, end=end)

csvfile = open('utils/sp500.csv', 'r')
reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    item = stocks.popitem()
    bar = item[1].pop()
    print(item[0], bar.c, bar.o - bar.c)
    row['price'] = bar.o
    row['change'] = str(round(bar.o - bar.c, 2))
    json.dump(row, jsonfile)
    jsonfile.write(',\n')

    if not len(stocks) and sp500:
        llama_limit = []
        for i in range(min(100, len(sp500))):
            llama_limit.append(sp500.popleft())
        stocks = alpaca.get_barset(llama_limit, 'day', start=start, end=end)
