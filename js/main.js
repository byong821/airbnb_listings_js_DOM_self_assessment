function MainModule(listingsID = "#listings") {
  const me = {};
  // adding logic to track state for button to load next 50 cards
  let allListings = [];
  let currentIndex = 0;
  const listingsElement = document.querySelector(listingsID);

  function getListingCode(listing) {
    const amenities = JSON.parse(listing.amenities).slice(0, 3).join(", ");
    return `<div class="col-4 mb-4">
  <div class="listing card h=100">
    <img
      src="${listing.picture_url}"
      class="card-img-top"
      alt="${listing.name}"
      onerror="this.style.display='none'">
    <div class="card-body">
      <h5 class="card-title">${listing.name}</h5>
      <div>${listing.price}</div>
      <p class="card-text">${listing.description.substring(0, 120)}...</p>
      <div class="d-flex align-items-center mb-2">
        <img src ="${listing.host_thumbnail_url}"
        width="30" 
        height="30" 
        class= "rounded-circle me-2"
        alt="${listing.host_name}"
        onerror="this.src='https://via.placeholder.com/30x30?text=?'">
        <small>Host: ${listing.host_name}</small>
    </div>
    <p><strong>Price:</strong> ${listing.price}/night</p>
    <p><strong>Amenities:</strong> ${amenities}</p>
    <p><strong>Room Type:</strong> ${listing.room_type}</p>
    <p><strong>Bedrooms:</strong> ${listing.bedrooms}</p>
    <p><strong>Bathrooms:</strong> ${listing.bathrooms}</p>
    <p><strong>Minimum Nights:</strong> ${listing.minimum_nights}</p>
    <p><strong>Number of Reviews:</strong> ${listing.number_of_reviews}</p>
    <p><strong>Availability:</strong> ${listing.availability_365} days</p>
    </div>
  </div>
  <!-- /card -->
  </div>

  `;
  }

  function redraw(listings) {
    listingsElement.innerHTML = "";
    // for (let i = 0; i < listings.length; i++) {
    //   listingsElement.innerHTML += getListingCode(listings[i]);
    // }

    // for (let listing of listings) {
    //   console.log("listing", listing );
    //   listingsElement.innerHTML += getListingCode(listing);
    // }

    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    // changing logic to store every listing for new button functionality
    allListings = await res.json();
    me.showNext50();
  }

  function showNext50() {
    const nextListings = allListings.slice(currentIndex, currentIndex + 50);
    listingsElement.innerHTML += nextListings.map(getListingCode).join("\n");
    currentIndex += 50;
    
    if (currentIndex < allListings.length) {
      listingsElement.innerHTML += `<div class="col-12 text-center mb-4">
        <button class="btn btn-primary" onclick="main.showNext50()">Load Next 50</button>
      </div>`;
    }
  }

  me.showNext50 = showNext50;
  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();


main.loadData();