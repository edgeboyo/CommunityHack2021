import express from "express";
import { Client } from "@googlemaps/google-maps-services-js";

import { config } from "dotenv";

config();

export const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello, world!").end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
// [END gae_node_request_example]

/*
let map: google.maps.Map;
const center: google.maps.LatLngLiteral = {lat: 50.937349, lng: -1.397909};

function initMap(): void {
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center,
        zoom: 8
    });
}
*/

const client = new Client({});

client
  .elevation({
    params: {
      locations: [{ lat: 50.937349, lng: -1.397909 }],
      key: process.env.GOOGLE_MAPS_API_KEY || "",
    },
    timeout: 1000, // milliseconds
  })
  .then((r) => {
    console.log(r.data.results[0].elevation);
  })
  .catch((e) => {
    console.log(e.response.data.error_message);
  });
