mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        zoom: 4,
        center: campground.geometry.coordinates
        // center: [40,40]
    });

    map.addControl(new mapboxgl.NavigationControl());

    new mapboxgl.Marker()
      .setLngLat(campground.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
          `<h3>${campground.title}</h3><p>${campground.location}</p>`
        )
      )
      .addTo(map);