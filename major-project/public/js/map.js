mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  center: listing.geometry.coordinates,
  zoom: 9,
});

// console.log(Listing.geometry.coordinates);
const marker1 = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates) //listing.geometry.coordinates
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h4>${listing.title} </h4><p>Exact location provided after booking!</p>`
    )
  )
  .addTo(map);
