$(document).ready(function() {
  var channels = ["freecodecamp", "ESL_SC2", "WingsOfRedemption"];
  var baseURL = "https://wind-bow.gomix.me/twitch-api/";
  updateStatus();
  
  function updateStatus(url){
    for(i=0; i< channels.length; i++){
      var entry = '#name' + i;
      var url = makeURL("streams/", channels[i]);
      $(entry).html("<h3>" + channels[i] + "</h3>");
      $.getJSON(url, function(json){
        console.log(json);
        var channel = json._links.self.split('streams/');
        var entry = channels.indexOf(channel[1]);
        if(json.stream === null){
          $('#content' + entry).html('<h3 id="offline">Ofline</h3>');
        }
        else{
          $('#content' + entry).html('<h3 id=online>'
              + json.stream.game + '</h3>');
        }
      });
    }
  };
  
  function makeURL(type, channel){
    return baseURL + type + channel + '?callback=?';
  }
});

