'use strict';

var express = require('express');
var app = express();
var watson = require('watson-developer-cloud');

var apiKey = '1606a99be969a79613b4668457f19fdeff33bb4b';

var alchemy_language = watson.alchemy_language({
  api_key: apiKey
});

var parameters = {
  extract: 'entities,keywords,concepts,taxonomy,relations,typed-rels,doc-emotion,doc-sentiment',
  sentiment: 1,
  maxRetrieve: 1
};

app.get('/:text', function (req, res) {
  var text = req.params.text;

  parameters.text =text;
  alchemy_language.combined(parameters, function (err, response) {
    if (err) {
      console.log('error:', err);
      res.status(500);
    } else {
      var toAnalyze = [];
      console.log(response.keywords);
      for (var i = 0; i < response.keywords.length; i++) {
        toAnalyze.push(response.keywords[i].text);
      }
      var parameters2 = {
        text: text,
        targets: toAnalyze
      };
console.log(toAnalyze);
      alchemy_language.sentiment(parameters2,
        function (err2, response2) {

          if (err) {
            console.log('error:', err2);
            res.status(500);
          } else {

            console.log(JSON.stringify(response2, null, 2));
            var result = { result1: response, result2: response2 };
            res.send(result);

          }
        });


    }
  });
});

module.exports = app;