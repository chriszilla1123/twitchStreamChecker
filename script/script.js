$(document).ready(function() {
  var channels = ["freecodecamp", "esl_sc2", "wingsofredemption", "hanryang1125", "imaqtpie"];
  var baseURL = "https://wind-bow.gomix.me/twitch-api/";
  streamSectionBuilder(channels.length)
  updateStatus();
  updateUser();
  
  function updateStatus(){
    for(var i=0; i< channels.length; i++){
      var entry = '#name' + i;
      var url = makeURL("streams/", channels[i]);
      $(entry).html("<h3>" + channels[i] + "</h3>");
      $.getJSON(url, function(json){
        var channel = json._links.self.split('streams/');
        var entry = channels.indexOf(channel[1]);
        if(json.stream === null){
          $('#content' + entry).html('<h4 class="offline">Ofline</h4>');
        }
        else{
          $('#content' + entry).html('<h4 class=online>'
              + json.stream.game + ': ' 
              + trimString(json.stream.channel.status, 50) + '</h4>');
        }
      });
    }
  };
  
  function updateUser(){
    for(var i=0;  i< channels.length; i++){
      var url = makeURL("channels/", channels[i]);
      $.getJSON(url, function(json){
        var entry = channels.indexOf(json.name);  
        $('#img' + entry).attr('src', json.logo)
        $('#link' + entry).attr('href', json.url);
      });
    }
  };
  
  function makeURL(type, channel){
    return baseURL + type + channel + '?callback=?';
  };
  
  function trimString(string, length){
    if(string.length > length){
      string = string.substring(0, length-3) + '...';
    }
    return string
  };
  
  function streamSectionBuilder(num){
    var container = document.getElementById('main-container');
    for(var i=0 ; i<num; i++){
      var toAdd = ("<a target='_blank' id='link" + i + "' class='link'>\n"
                    + "<div class='entry'>\n"
                    + "<div class='img'>\n"
                    + "<img id='img" + i + "' class='logo' src='twitch.png'>\n"
                    + "</div>\n"
                    + "<div id='name" + i + "' class='name'></div>\n"
                    + "<div id='content" + i + "' class='content'></div>\n"
                    + "</div>\n"
                    + "</a>");
      container.insertAdjacentHTML('beforeend', toAdd);
    }
  }
});