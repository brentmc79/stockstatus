function StockStatus(symbols) {
  this.symbols = symbols;
  var _data = null;

  this.printSymbols = function() {
    console.log(symbols);
  }

  this.fetchInfo = function(callback) {
    $.getJSON(this.url(), function(data) {
      callback(data.query.results.quote);
    });
  }

  this.url = function() {
    var symbolString = ['%22', this.symbols.join('%22%2C%22'), '%22'].join('')
    return ['http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(', symbolString, ')%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json'].join('');
  }

  this.updateView = function() {
    console.log("Updating view...");
    var template = $("#template").html();
    var view = $("#view");
    this.fetchInfo(function(quotes) {
      view.html("");
      var viewObj = null;
      $(quotes).each(function(index, quote) {
        viewObj = {
          symbol: quote.Symbol,
          quote: parseFloat(quote.AskRealtime).toFixed(2),
          index: index.toString(),
          daysHigh: parseFloat(quote.DaysHigh).toFixed(2),
          daysLow: parseFloat(quote.DaysLow).toFixed(2),
          change: parseFloat(quote.Change).toFixed(2),
          changeColor: quote.Change.charAt(0) == '+' ? 'green' : 'red'
        }
        var rendered = Mustache.render(template, viewObj);
        $('#view').append(rendered);
      });
    });
  }
}
