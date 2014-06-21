function StockStatus(symbols) {
  this.symbols = symbols;
  this.url = constructUrl();

  this.printSymbols = function() {
    console.log(symbols);
  }

  this.fetchInfo = function() {
    $.getJSON(this.url, function(data) {
      console.log(data);
    });
  }

  this.constructUrl = function() {
    var symbolString = ['%22', this.symbols.join('%22%2C%22'), '%22'].join('')
    return ['http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(', symbolString, ')%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json'].join('');
  }
}
