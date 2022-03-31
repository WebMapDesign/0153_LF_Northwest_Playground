let layerStates;
let layerZipCodes;
let layerZipCodesAlaska;
let layerZipCodesHawaii;
let layerCounties;
let layerCountiesAlaska;
let layerCountiesHawaii;

let map = L.map("map-contiguous", {
  fullScreenControl: true,
  zoomSnap: 0.1,
}).setView([43.9, -112.8], 6.5);

let sidebarControlMenu = L.control.sidebar("table-container", {
  position: "right",
  closeButton: false,
  autoPan: false,
});
map.addControl(sidebarControlMenu);
sidebarControlMenu.show();

L.easyButton(
  '<span class="star">&starf;</span>',

  function (btn, map) {
    map.setView([43.9, -112.8], 6.5);
  },
  "Default View"
).addTo(map);

let layerTilesOSM = new L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors</a>',
  }
).addTo(map);

const contactDetailsTerritories = {
  Alaska: {
    representative: "Jim Protiva",
    phone: "808--281-1849",
    email: "jim@nwplayground.com",
  },
  "East Washington": {
    representative: "Chris Brummett",
    phone: "509-520-6053",
    email: "chrisb@nwplayground.com",
  },
  Hawaii: {
    representative: " ",
    phone: " ",
    email: "sales@nwplayground.com",
  },
  Idaho: {
    representative: "Chris Brummett",
    phone: "509-520-6053",
    email: "chrisb@nwplayground.com",
  },
  Montana: {
    representative: "Chris Brummett",
    phone: "509-520-6053",
    email: "chrisb@nwplayground.com",
  },
  "North Oregon and Vancouver": {
    representative: "Justin Patterson",
    phone: "503-991-3604",
    email: "justin@nwplayground.com",
  },
  "Northwest Washington": {
    representative: "Eric Arneson",
    phone: "206-920-2660",
    email: "eric@nwplayground.com",
  },
  "South and Central Oregon": {
    representative: "Cortney Peck",
    phone: "541-554-2902",
    email: "cortney@nwplayground.com",
  },
  "Southwest Washington": {
    representative: "Doug Nelson",
    phone: "253-740-0075",
    email: "doug@nwplayground.com",
  },
};

const fillColorsTerritories = {
  Alaska: "#808119",
  "East Washington": "#c3ecb2",
  Hawaii: "#cbce44",
  Idaho: "#7fc063",
  Montana: "#4fac28",
  "North Oregon and Vancouver": "#ffc584",
  "Northwest Washington": "#80b1d3",
  "South and Central Oregon": "#f58c9b",
  "Southwest Washington": "#d79ce6",
};

function colorByPopulation(a) {
  return a > 50000
    ? "#e93e3a"
    : a > 25000
    ? "#ed683c"
    : a > 10000
    ? "#f3903f"
    : a > 1000
    ? "#fdc70c"
    : "#fff33b";
}

let popupStyle = {
  closeButton: true,
};

function styleZipCodes(feature) {
  return {
    color: "#000000",
    fillColor: colorByPopulation(feature.properties.population),
    fillOpacity: 0.7,
    opacity: 1,
    weight: 0.5,
  };
}

function styleCounties(feature) {
  return {
    color: "#000000",
    fillColor: fillColorsTerritories[feature.properties.territory],
    fillOpacity: 0.7,
    opacity: 1,
    weight: 0.5,
  };
}

let styleStates = {
  color: "#000000",
  fillColor: "#ffffff",
  fillOpacity: 0,
  opacity: 1,
  weight: 2,
};

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    color: "#000000",
    opacity: 1,
    weight: 2,
  });
}

function resetHighlightZipCodes(e) {
  layerZipCodes.resetStyle(e.target);
}

function resetHighlightZipCodesAlaska(e) {
  layerZipCodesAlaska.resetStyle(e.target);
}

function resetHighlightZipCodesHawaii(e) {
  layerZipCodesHawaii.resetStyle(e.target);
}

function resetHighlightCounties(e) {
  layerCounties.resetStyle(e.target);
}

function resetHighlightCountiesHawaii(e) {
  layerCountiesHawaii.resetStyle(e.target);
}

function resetHighlightCountiesAlaska(e) {
  layerCountiesAlaska.resetStyle(e.target);
}

function onEachFeatureZipCodes(feature, layer) {
  let tooltipContent = feature.properties.ZCTA5CE20;
  layer.bindTooltip(tooltipContent, {
    permanent: false,
    direction: "center",
    className: "tooltip-style",
  });

  let popupContent =
    '<p class="popup-title">' +
    feature.properties.ZCTA5CE20 +
    "</p>" +
    '<p class="popup-text">City: ' +
    feature.properties.city +
    "</p>" +
    '<p class="popup-text">County: ' +
    feature.properties.county +
    "</p>" +
    '<p class="popup-text">State: ' +
    feature.properties.state +
    "</p>" +
    '<p class="popup-text">Population: ' +
    feature.properties.population +
    "</p>" +
    '<p class="popup-text">Territory: ' +
    feature.properties.territory +
    "</p>";

  layer.bindPopup(popupContent, popupStyle);
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlightZipCodes,
  });
}

function onEachFeatureZipCodesAlaska(feature, layer) {
  let tooltipContent = feature.properties.ZCTA5CE20;
  layer.bindTooltip(tooltipContent, {
    permanent: false,
    direction: "center",
    className: "tooltip-style",
  });

  let popupContent =
    '<p class="popup-title">' +
    feature.properties.ZCTA5CE20 +
    "</p>" +
    '<p class="popup-text">City: ' +
    feature.properties.city +
    "</p>" +
    '<p class="popup-text">County: ' +
    feature.properties.county +
    "</p>" +
    '<p class="popup-text">State: ' +
    feature.properties.state +
    "</p>" +
    '<p class="popup-text">Population: ' +
    feature.properties.population +
    "</p>" +
    '<p class="popup-text">Territory: ' +
    feature.properties.territory +
    "</p>";

  layer.bindPopup(popupContent, popupStyle);
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlightZipCodesAlaska,
  });
}

function onEachFeatureZipCodesHawaii(feature, layer) {
  let tooltipContent = feature.properties.ZCTA5CE20;
  layer.bindTooltip(tooltipContent, {
    permanent: false,
    direction: "center",
    className: "tooltip-style",
  });

  let popupContent =
    '<p class="popup-title">' +
    feature.properties.ZCTA5CE20 +
    "</p>" +
    '<p class="popup-text">City: ' +
    feature.properties.city +
    "</p>" +
    '<p class="popup-text">County: ' +
    feature.properties.county +
    "</p>" +
    '<p class="popup-text">State: ' +
    feature.properties.state +
    "</p>" +
    '<p class="popup-text">Population: ' +
    feature.properties.population +
    "</p>" +
    '<p class="popup-text">Territory: ' +
    feature.properties.territory +
    "</p>";

  layer.bindPopup(popupContent, popupStyle);
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlightZipCodesHawaii,
  });
}

function onEachFeatureCounties(feature, layer) {
  let tooltipContent = feature.properties.name;
  layer.bindTooltip(tooltipContent, {
    permanent: true,
    direction: "center",
    className: "tooltip-style",
  });

  let popupContent =
    '<p class="popup-title">' +
    feature.properties.territory +
    "</p>" +
    '<p class="popup-text">County: ' +
    feature.properties.name +
    "</p>" +
    '<p class="popup-text">Name: ' +
    contactDetailsTerritories[feature.properties.territory]["representative"] +
    "</p>" +
    '<p class="popup-text">Phone: ' +
    contactDetailsTerritories[feature.properties.territory]["phone"] +
    "</p>" +
    '<p class="popup-text">E-mail: ' +
    contactDetailsTerritories[feature.properties.territory]["email"] +
    "</p>";

  layer.bindPopup(popupContent, popupStyle);
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlightCounties,
  });
}

function onEachFeatureCountiesHawaii(feature, layer) {
  let tooltipContent = feature.properties.name;
  layer.bindTooltip(tooltipContent, {
    permanent: true,
    direction: "center",
    className: "tooltip-style",
  });

  let popupContent =
    '<p class="popup-title">' +
    feature.properties.territory +
    "</p>" +
    '<p class="popup-text">County: ' +
    feature.properties.name +
    "</p>" +
    '<p class="popup-text">Name: ' +
    contactDetailsTerritories[feature.properties.territory]["representative"] +
    "</p>" +
    '<p class="popup-text">Phone: ' +
    contactDetailsTerritories[feature.properties.territory]["phone"] +
    "</p>" +
    '<p class="popup-text">E-mail: ' +
    contactDetailsTerritories[feature.properties.territory]["email"] +
    "</p>";

  layer.bindPopup(popupContent, popupStyle);
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlightCountiesHawaii,
  });
}

function onEachFeatureCountiesAlaska(feature, layer) {
  let tooltipContent = feature.properties.name;
  layer.bindTooltip(tooltipContent, {
    permanent: true,
    direction: "center",
    className: "tooltip-style",
  });

  let popupContent =
    '<p class="popup-title">' +
    feature.properties.territory +
    "</p>" +
    '<p class="popup-text">County: ' +
    feature.properties.name +
    "</p>" +
    '<p class="popup-text">Name: ' +
    contactDetailsTerritories[feature.properties.territory]["representative"] +
    "</p>" +
    '<p class="popup-text">Phone: ' +
    contactDetailsTerritories[feature.properties.territory]["phone"] +
    "</p>" +
    '<p class="popup-text">E-mail: ' +
    contactDetailsTerritories[feature.properties.territory]["email"] +
    "</p>";

  layer.bindPopup(popupContent, popupStyle);
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlightCountiesAlaska,
  });
}

layerZipCodes = L.geoJSON(geojsonZipCodes, {
  style: styleZipCodes,
  onEachFeature: onEachFeatureZipCodes,
  filter: function (feature, layer) {
    if (
      feature.properties["state"] !== "AK" &&
      feature.properties["state"] !== "HI"
    )
      return true;
  },
});

layerCounties = L.geoJSON(geojsonCounties, {
  style: styleCounties,
  onEachFeature: onEachFeatureCounties,
  filter: function (feature, layer) {
    if (
      feature.properties["state"] !== "AK" &&
      feature.properties["state"] !== "HI"
    )
      return true;
  },
}).addTo(map);

layerStates = L.geoJSON(geojsonStates, {
  style: styleStates,
  filter: function (feature, layer) {
    if (
      feature.properties["state"] !== "AK" &&
      feature.properties["state"] !== "HI"
    )
      return true;
  },
}).addTo(map);

// ---------------SEARCH BY ZIPCODE ---------------
let searchZipCode = new L.Control.Search({
  layer: layerZipCodes,
  propertyName: "ZCTA5CE20",
  textPlaceholder: "Search Zip Code",
  marker: false,
  collapsed: false,
  position: "topleft",
  moveToLocation: function (latlng, title, map) {
    let zoom = map.getBoundsZoom(latlng.layer.getBounds());
    map.setView(latlng, zoom);
  },
});

searchZipCode
  .on("search:locationfound", function (e) {
    e.layer.setStyle({
      fillColor: "#ffffff",
      fillOpacity: 0,
      weight: 3,
      color: "#000000",
    });
    if (e.layer._popup) e.layer.openPopup();
  })
  .on("search:collapsed", function (e) {
    featuresLayer.eachLayer(function (layer) {
      featuresLayer.resetStyle(layer);
    });
  });

// ---------------SEARCH BY COUNTY ---------------
let searchCounty = new L.Control.Search({
  layer: layerCounties,
  propertyName: "name",
  textPlaceholder: "Search County",
  marker: false,
  collapsed: false,
  position: "topleft",
  moveToLocation: function (latlng, title, map) {
    let zoom = map.getBoundsZoom(latlng.layer.getBounds());
    map.setView(latlng, zoom);
  },
});

searchCounty
  .on("search:locationfound", function (e) {
    e.layer.setStyle({
      fillColor: "#ffffff",
      fillOpacity: 0,
      weight: 3,
      color: "#000000",
    });
    if (e.layer._popup) e.layer.openPopup();
  })
  .on("search:collapsed", function (e) {
    featuresLayer.eachLayer(function (layer) {
      featuresLayer.resetStyle(layer);
    });
  });

// ---------------TABLE DATA ---------------
let arrayZipCodes = [];
let arrayPopulation = [];
let arrayTerritoriesZips = [];

let arrayCounties = [];
let arrayTerritories = [];

geojsonZipCodes["features"].forEach((item) => {
  arrayZipCodes.push(item["properties"]["ZCTA5CE20"]);
  arrayPopulation.push(item["properties"]["population"]);
  arrayTerritoriesZips.push(item["properties"]["territory"])
});

geojsonCounties["features"].forEach((item) => {
  arrayCounties.push(item["properties"]["name"]);
  arrayTerritories.push(item["properties"]["territory"]);
});

// ---------------LAYER CONTROL ---------------
let baseLayers = {
  "Territories Map": layerCounties,
  "Zip Codes Map": layerZipCodes,
};

L.control
  .layers(baseLayers, {}, { collapsed: false, position: "topleft" })
  .addTo(map);

let legendZipCodes = L.control({ position: "bottomleft" });

legendZipCodes.onAdd = function (map) {
  let div = L.DomUtil.create("div", "info legend legend-zip-codes");

  div.innerHTML =
    '<p id="legend-title">Population by Zip Code</p>' +
    '<i style="background: #e93e3a"></i>> 50,000<br>' +
    '<i style="background: #ed683c"></i>25,000 - 50,000<br>' +
    '<i style="background: #f3903f"></i>10,000 - 25,000<br>' +
    '<i style="background: #fdc70c"></i>1,000 - 10,000<br>' +
    '<i style="background: #fff33b"></i>< 1,000<br>';
  return div;
};

// legend for zip codes by area code
let legendTerritories = L.control({ position: "bottomleft" });

legendTerritories.onAdd = function (map) {
  let div = L.DomUtil.create("div", "info legend legend-territories");

  div.innerHTML =
    '<p id="legend-title">Territories</p>' +
    '<i style="background: #808119"></i>Alaska<br>' +
    '<i style="background: #c3ecb2"></i>East Washington<br>' +
    '<i style="background: #cbce44"></i>Hawaii<br>' +
    '<i style="background: #7fc063"></i>Idaho<br>' +
    '<i style="background: #4fac28"></i>Montana<br>' +
    '<i style="background: #ffc584"></i>North Oregon and Vancouver<br>' +
    '<i style="background: #80b1d3"></i>Northwest Washington<br>' +
    '<i style="background: #f58c9b"></i>South and Central Oregon<br>' +
    '<i style="background: #d79ce6"></i>Southwest Washington<br>';
  return div;
};

legendTerritories.addTo(map);
searchCounty.addTo(map);
drawTerritoryTable();

map.on("baselayerchange", function (eventLayer) {
  if (eventLayer.name === "Zip Codes Map") {
    // replace the legend
    this.removeControl(legendTerritories);
    legendZipCodes.addTo(this);

    // replace layers for other 2 maps
    mapAlaska.removeLayer(layerCountiesAlaska);
    mapAlaska.addLayer(layerZipCodesAlaska);
    mapHawaii.removeLayer(layerCountiesHawaii);
    mapHawaii.addLayer(layerZipCodesHawaii);

    // replace the search bars
    map.addControl(searchZipCode);
    map.removeControl(searchCounty);
    mapAlaska.addControl(searchZipCodeAlaska);
    mapAlaska.removeControl(searchCountyAlaska);
    mapHawaii.addControl(searchZipCodeHawaii);
    mapHawaii.removeControl(searchCountyHawaii);

    // draw the table
    drawZipCodeTable();
  } else {
    // replace the legend
    this.removeControl(legendZipCodes);
    legendTerritories.addTo(this);

    // replace layers for other 2 maps
    mapAlaska.removeLayer(layerZipCodesAlaska);
    mapAlaska.addLayer(layerCountiesAlaska);
    mapHawaii.removeLayer(layerZipCodesHawaii);
    mapHawaii.addLayer(layerCountiesHawaii);

    // replace the search bars
    map.removeControl(searchZipCode);
    map.addControl(searchCounty);
    mapAlaska.removeControl(searchZipCodeAlaska);
    mapAlaska.addControl(searchCountyAlaska);
    mapHawaii.removeControl(searchZipCodeHawaii);
    mapHawaii.addControl(searchCountyHawaii);

    // draw the table
    drawTerritoryTable();
  }
});

function drawZipCodeTable() {
  let divNewTable = document.getElementById("table-data");
  document.getElementById("table-data").style.height = "auto";
  const tableHeaders = ["Zip Code", "Population", "Territory"];

  let tableZipcodes = document.createElement("table");
  tableZipcodes.id = "table-zipcodes";
  let tr = tableZipcodes.insertRow(-1);

  for (let i = 0; i < tableHeaders.length; i++) {
    let th = document.createElement("th");
    tr.appendChild(th);
    th.innerHTML = tableHeaders[i];
  }

  for (let i = 0; i < arrayZipCodes.length; i++) {
    tr = tableZipcodes.insertRow(-1);
    let cell1 = tr.insertCell(-1);
    cell1.innerHTML = arrayZipCodes[i];
    let cell2 = tr.insertCell(-1);
    cell2.innerHTML = arrayPopulation[i];
    let cell3 = tr.insertCell(-1);
    cell3.innerHTML = arrayTerritoriesZips[i];
  }

  divNewTable.innerHTML = "";
  divNewTable.appendChild(tableZipcodes);
}

function drawTerritoryTable() {
  let divNewTable = document.getElementById("table-data");
  document.getElementById("table-data").style.height = "auto";
  const tableHeaders = ["County", "Territory"];

  let tableTerritories = document.createElement("table");
  tableTerritories.id = "table-territories";
  let tr = tableTerritories.insertRow(-1);

  for (let i = 0; i < tableHeaders.length; i++) {
    let th = document.createElement("th");
    tr.appendChild(th);
    th.innerHTML = tableHeaders[i];
  }

  for (let i = 0; i < arrayCounties.length; i++) {
    tr = tableTerritories.insertRow(-1);
    let cell1 = tr.insertCell(-1);
    cell1.innerHTML = arrayCounties[i];
    let cell2 = tr.insertCell(-1);
    cell2.innerHTML = arrayTerritories[i];
  }

  divNewTable.innerHTML = "";
  divNewTable.appendChild(tableTerritories);
}

// ----------ALASKA MAP------------------
let mapAlaska = L.map("map-Alaska", {
  fullScreenControl: false,
  attributionControl: false,
  zoomSnap: 0.1,
}).setView([63.9, -150.0], 4);

L.easyButton(
  '<span class="star">&starf;</span>',

  function (btn, map) {
    map.setView([63.9, -150.0], 4);
  },
  "Default View"
).addTo(mapAlaska);

let layerTilesOSM_AK = new L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors</a>',
  }
).addTo(mapAlaska);

layerCountiesAlaska = L.geoJSON(geojsonCounties, {
  style: styleCounties,
  onEachFeature: onEachFeatureCountiesAlaska,
  filter: function (feature, layer) {
    if (feature.properties["state"] === "AK") return true;
  },
}).addTo(mapAlaska);

layerZipCodesAlaska = L.geoJSON(geojsonZipCodes, {
  style: styleZipCodes,
  onEachFeature: onEachFeatureZipCodesAlaska,
  filter: function (feature, layer) {
    if (feature.properties["state"] === "AK") return true;
  },
});

layerStatesAlaska = L.geoJSON(geojsonStates, {
  style: styleStates,
  filter: function (feature, layer) {
    if (feature.properties["state"] === "AK") return true;
  },
}).addTo(mapAlaska);

// ---------------SEARCH BY ZIPCODE ALASKA---------------
let searchZipCodeAlaska = new L.Control.Search({
  layer: layerZipCodesAlaska,
  propertyName: "ZCTA5CE20",
  textPlaceholder: "Search Zip Code",
  marker: false,
  collapsed: false,
  position: "topright",
  moveToLocation: function (latlng, title, map) {
    let zoom = map.getBoundsZoom(latlng.layer.getBounds());
    map.setView(latlng, zoom);
  },
});

searchZipCodeAlaska
  .on("search:locationfound", function (e) {
    e.layer.setStyle({
      fillColor: "#ffffff",
      fillOpacity: 0,
      weight: 3,
      color: "#000000",
    });
    if (e.layer._popup) e.layer.openPopup();
  })
  .on("search:collapsed", function (e) {
    featuresLayer.eachLayer(function (layer) {
      featuresLayer.resetStyle(layer);
    });
  });

// ---------------SEARCH BY COUNTY ALASKA---------------
let searchCountyAlaska = new L.Control.Search({
  layer: layerCountiesAlaska,
  propertyName: "name",
  textPlaceholder: "Search County",
  marker: false,
  collapsed: false,
  position: "topright",
  moveToLocation: function (latlng, title, map) {
    let zoom = map.getBoundsZoom(latlng.layer.getBounds());
    map.setView(latlng, zoom);
  },
});

searchCountyAlaska
  .on("search:locationfound", function (e) {
    e.layer.setStyle({
      fillColor: "#ffffff",
      fillOpacity: 0,
      weight: 3,
      color: "#000000",
    });
    if (e.layer._popup) e.layer.openPopup();
  })
  .on("search:collapsed", function (e) {
    featuresLayer.eachLayer(function (layer) {
      featuresLayer.resetStyle(layer);
    });
  });

searchCountyAlaska.addTo(mapAlaska);

// ----------HAWAII MAP------------------
let mapHawaii = L.map("map-Hawaii", {
  fullScreenControl: false,
  attributionControl: false,
  zoomSnap: 0.5,
}).setView([20.75, -157.8], 6.5);

L.easyButton(
  '<span class="star">&starf;</span>',

  function (btn, map) {
    map.setView([20.75, -157.8], 6.5);
  },
  "Default View"
).addTo(mapHawaii);

let layerTilesOSM_HI = new L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors</a>',
  }
).addTo(mapHawaii);

layerCountiesHawaii = L.geoJSON(geojsonCounties, {
  style: styleCounties,
  onEachFeature: onEachFeatureCountiesHawaii,
  filter: function (feature, layer) {
    if (feature.properties["state"] === "HI") return true;
  },
}).addTo(mapHawaii);

layerZipCodesHawaii = L.geoJSON(geojsonZipCodes, {
  style: styleZipCodes,
  onEachFeature: onEachFeatureZipCodesHawaii,
  filter: function (feature, layer) {
    if (feature.properties["state"] === "HI") return true;
  },
});

layerStatesHawaii = L.geoJSON(geojsonStates, {
  style: styleStates,
  filter: function (feature, layer) {
    if (feature.properties["state"] === "HI") return true;
  },
}).addTo(mapHawaii);


// ---------------SEARCH BY ZIPCODE HAWAII ---------------
let searchZipCodeHawaii = new L.Control.Search({
  layer: layerZipCodesHawaii,
  propertyName: "ZCTA5CE20",
  textPlaceholder: "Search Zip Code",
  marker: false,
  collapsed: false,
  position: "topright",
  moveToLocation: function (latlng, title, map) {
    let zoom = map.getBoundsZoom(latlng.layer.getBounds());
    map.setView(latlng, zoom);
  },
});

searchZipCodeHawaii
  .on("search:locationfound", function (e) {
    e.layer.setStyle({
      fillColor: "#ffffff",
      fillOpacity: 0,
      weight: 3,
      color: "#000000",
    });
    if (e.layer._popup) e.layer.openPopup();
  })
  .on("search:collapsed", function (e) {
    featuresLayer.eachLayer(function (layer) {
      featuresLayer.resetStyle(layer);
    });
  });

// ---------------SEARCH BY COUNTY HAWAII---------------
let searchCountyHawaii = new L.Control.Search({
  layer: layerCountiesHawaii,
  propertyName: "name",
  textPlaceholder: "Search County",
  marker: false,
  collapsed: false,
  position: "topright",
  moveToLocation: function (latlng, title, map) {
    let zoom = map.getBoundsZoom(latlng.layer.getBounds());
    map.setView(latlng, zoom);
  },
});

searchCountyHawaii
  .on("search:locationfound", function (e) {
    e.layer.setStyle({
      fillColor: "#ffffff",
      fillOpacity: 0,
      weight: 3,
      color: "#000000",
    });
    if (e.layer._popup) e.layer.openPopup();
  })
  .on("search:collapsed", function (e) {
    featuresLayer.eachLayer(function (layer) {
      featuresLayer.resetStyle(layer);
    });
  });

searchCountyHawaii.addTo(mapHawaii);
