    mapboxgl.accessToken = maptoken;
    
    
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: coordinates, // starting position
        zoom: 10// starting zoom
    });

    map.addControl(new mapboxgl.FullscreenControl());

    console.log(coordinates);
    const marker1 = new mapboxgl.Marker({color:"red"})
        .setLngLat(coordinates)
        .addTo(map);

    