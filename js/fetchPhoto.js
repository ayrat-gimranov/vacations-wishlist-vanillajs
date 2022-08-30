export async function fetchPhoto(location, destination) {
  const defaultPhotoUrl = "https://c.pxhere.com/photos/a7/e3/red_rock_jeep_canoe_transport_vehicle-1392511.jpg!d";
  const imageWidth = 720;
  const imageHeight = 720;
  let photo;

  try {
    let response = await fetch(`https://source.unsplash.com/random/${imageWidth}×${imageHeight}/?${destination},${location}`);
    if (response.url.startsWith("https://images.unsplash.com/source-404")) {
      throw new Error("Couldn't find an image")
    }
    photo = response.url
  } catch (error) {
    photo = defaultPhotoUrl;
  }

  return photo
}