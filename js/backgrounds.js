(function () {

  function init () {
    var heros = document.getElementsByClassName("heroBan");
    var colors = ["YlGnBu", "PuBu", "BuPu", "PuBuGn", "YlGnBu"]
    var i;

    // Flush the event cache
    addEvent(window, 'unload', EventCache.flush);

    addEvent(window, 'resize', function () {
      resizeHandler(heros);
    });

    for (i = 0; i < heros.length; ++i) {
      var pattern = Trianglify({
        height: heros[i].offsetHeight,
        width: window.innerWidth,
        variance: "1",
        cell_size: 100,
        x_colors: colors[i],
        y_colors: 'match_x'
      });
      heros[i].appendChild(pattern.canvas());
    }

  }

  function resizeHandler (elems) {
    var i;
    for (i = 0; i < elems.length; ++i) {
      var c = elems[i].getElementsByTagName("CANVAS")[0];
      c.style.height = elems[i].offsetHeight + "px";
      c.style.width = window.innerWidth + "px";
    }
  }

  // Rock solid add event method by Dustin Diaz (http://dustindiaz.com/rock-solid-addevent)
  function addEvent (obj, type, fn) {
    if (obj.addEventListener) {
      obj.addEventListener( type, fn, false );
      EventCache.add(obj, type, fn);
    }
    else if (obj.attachEvent) {
      obj["e"+type+fn] = fn;
      obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
      obj.attachEvent( "on"+type, obj[type+fn] );
      EventCache.add(obj, type, fn);
    }
    else {
      obj["on"+type] = obj["e"+type+fn];
    }
  }

  // Store the event cache
  var EventCache = function () {
    var listEvents = [];
    return {
      listEvents : listEvents,
      add : function(node, sEventName, fHandler){
        listEvents.push(arguments);
      },
      flush : function(){
        var i, item;
        for(i = listEvents.length - 1; i >= 0; i = i - 1){
          item = listEvents[i];
          if(item[0].removeEventListener){
            item[0].removeEventListener(item[1], item[2], item[3]);
          };
          if(item[1].substring(0, 2) != "on"){
            item[1] = "on" + item[1];
          };
          if(item[0].detachEvent){
            item[0].detachEvent(item[1], item[2]);
          };
          item[0][item[1]] = null;
        };
      }
    };
  }();

  // Check wether or not the document is ready until it is ready
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      init();
      clearInterval(readyStateCheckInterval);
    }
  }, 10);
})();
