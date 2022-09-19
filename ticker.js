/* API ENDPOINTS
simple/price - (query params) ids, currency - example: bitcoin(if multiple splited by comma), usd - 
  returns {id: {currency: price}}
  
coins/list - returns all coins info
*/

async function setCoinsPrice(coins) {
  coinsIds = ''

  for (coin of coins) {
    coinsIds += coin.id + ','
  }

  host = 'https://api.coingecko.com/api/v3'

  searchRequest = '/search?query='
  coinsPriceRequest = `/simple/price?ids=${coinsIds}&vs_currencies=usd`

  const response = await fetch(host + coinsPriceRequest, { method: 'GET' })
  const data = await response.json()

  dataKeys = Object.keys(data)

  for (let i = 0; i < coins.length; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (coins[i].id === dataKeys[j]) {
        let price = parseFloat(data[dataKeys[j]].usd).toFixed(3)
        coins[i].price = price
      }
    }
  }

  return coins
}

function appendCoins(coins) {
  let tickerLine = document.querySelector('.header_underline')
  let ticker = document.createElement('div')
 
  let tickerContent = document.createElement('ul')
  let tickerContent2 = document.createElement('ul')
 
  ticker.classList.add('ticker')
 
  tickerContent.classList.add('ticker_content')
  tickerContent2.classList.add('ticker_content')
 
  tickerContent2.setAttribute('aria-hidden', 'true')

  for (coin of coins) {
    let coinItem = document.createElement('li')
    let coinItem2 = document.createElement('li')

    coinItem.classList.add('coin_item')
    coinItem2.classList.add('coin_item')
    
    coinItem.textContent = coin.name
    coinItem2.textContent = coin.name
    
    let coinPrice = document.createElement('span')
    let coinPrice2 = document.createElement('span')
    
    coinPrice.textContent = coin.price + '$'
    coinPrice2.textContent = coin.price + '$'
    
    coinItem.appendChild(coinPrice)
    coinItem2.appendChild(coinPrice2)

    tickerContent.appendChild(coinItem)
    tickerContent2.appendChild(coinItem2)
  }
  ticker.appendChild(tickerContent)
  ticker.appendChild(tickerContent2)

  tickerLine.appendChild(ticker)
}

/* 
  To add new coin - create new object with id
  that you can get from 'coins/list' endpoint,
  name is up to you, price is always null
*/
const coins = [
  { id: 'bitcoin', name: 'BTC', price: null },
  { id: 'ethereum', name: 'ETH', price: null },
  { id: 'tether', name: 'USDT', price: null },
  { id: 'usd-coin', name: 'USDC', price: null },
  { id: 'binancecoin', name: 'BNB', price: null },
  { id: 'binance-usd', name: 'BUSD', price: null },
  { id: 'ripple', name: 'XRP', price: null },
  { id: 'cardano', name: 'ADA', price: null },
  { id: 'solana', name: 'SOL', price: null },
  { id: 'polkadot', name: 'DOT', price: null },
  { id: 'dogecoin', name: 'DOGE', price: null },
  { id: 'litecoin', name: 'LTC', price: null },
]

setCoinsPrice(coins).then((coins) => appendCoins(coins))