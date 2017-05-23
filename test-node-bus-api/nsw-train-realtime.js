const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const request = require('request');

// setup HTTP GET request with correct header
const requestSettings = {
  url: 'https://api.transport.nsw.gov.au/v1/gtfs/vehiclepos/nswtrains',
  encoding: null,
  headers: {
    'Authorization': process.env.NSW_TRANSPORT_API, //replace the API key here
    'Content-Type': 'application/x-google-protobuf' //structure of the protocol buffer encoding
  }
};

request(requestSettings, function (error, response, body) {
  // log response status
  if (!error && response.statusCode == 200){
    console.log('Request status: OK! With HTTP status code ' + response.statusCode)
  };

  // log response header
  console.log('Response headers:', JSON.stringify(response.headers));
  //console.log('Reponse received:', body);

  //if response status is good – log all the current bus locations
  if (!error && response.statusCode == 200) {
    console.log('Retrieving realtime train data')
    // to do this need to decode the protocol buffer feed content into JSON
    var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
    feed.entity.forEach(function(entity) {
      console.log(entity)
    });
  };
});
