const parsedCampground = JSON.parse(campground)

mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        zoom: 4,
        center: parsedCampground.geometry.coordinates
        // center: [40,40]
    });

    new mapboxgl.Marker()
      .setLngLat(parsedCampground.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
          `<h3>${parsedCampground.title}</h3><p>${parsedCampground.location}</p>`
        )
      )
      .addTo(map);