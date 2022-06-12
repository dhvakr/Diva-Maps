mapboxgl.accessToken = 'pk.eyJ1IjoiZGh2YWtyIiwiYSI6ImNraGRjdmJ3MzAzdm8zM3BqenFxYTJtbjMifQ.kYNJnezYL5oJWLHejohiEg';

    navigator.geolocation.getCurrentPosition(successLocation , errorLocation ,
    {
        enableHighAccuracy : true
    })
    function successLocation(position)
    {
    // Gets Current Location
      console.log(position)  
      setupMap([position.coords.longitude, position.coords.latitude])
    }
    function errorLocation()
    {
      setupMap([78.6569,11.1271]) // Setting Tamilnadu coordinates, INCASE OF LOCATION ERROR
    }

function setupMap(center)
{ 
    var map = new mapboxgl.Map(
     {
      container : 'map',
      style : 'mapbox://styles/mapbox/streets-v11',
      center : center, 
      zoom : 15
     }) 

  //Locate the user current location 
     map.addControl(new mapboxgl.GeolocateControl
      ({
          positionOptions: 
          {
            enableHighAccuracy: true
          },
        trackUserLocation: true  
      }));

  // Add zoom and rotation controls to the map.
     map.addControl(new mapboxgl.NavigationControl());

  // Direction Bar
    var directions = new MapboxDirections(
    {
      accessToken: mapboxgl.accessToken
    });
    map.addControl(directions, 'bottom-left'); 

  // View a fullscreen map
  map.addControl(new mapboxgl.FullscreenControl()); 

  // Custom Icon
  var geojson = 
  {
    'type' : 'FeatureCollection',
    'features': 
    [{
    'type': 'Feature',
    'properties': 
      {
      'message': 'Heyy ! Please Feel Free to Provide Feedback ☻ '+'Have a Nice Day' + '\n\n- BY DIVA', 
      'iconSize': [45, 45]
      },
    'geometry': 
      {
      'type': 'Point',
      'coordinates': center
      }
    }]
  }
  geojson.features.forEach(function (marker) 
  {
    // create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(https://placekitten.com/g/' + marker.properties.iconSize.join('/') + '/)';
    el.style.width = marker.properties.iconSize[0] + 'px';
    el.style.height = marker.properties.iconSize[1] + 'px';

    el.addEventListener('click', function () 
    {
    window.alert(marker.properties.message);
    });
     
    // add marker to map
    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
  });

}
