stockstatus
===========

A stock ticker intended for use with Panic's Status, a dashboard app for the iPad

## Single-page App

Check out the `gh-pages` branch [here](https://github.com/brentmc79/stockstatus/tree/gh-pages). You'll have to modify the page source in order to define which stock symbols are displayed. I intended to parse the stock symbols from the url query, but ran into problems. It's simple in the browser, but when tested within the Status panel, the `window.locaiton.search` never appeared to have a value. As a result the symbols are hard-coded in the source.
