import express from "express";
import { config } from "dotenv";
import path from "path";

config();

export const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).send("Hello world!").end();
});

let map: google.maps.Map;
function initMap(): void {
  map = new google.maps.Map(document.getElementById("Map") as HTMLElement, {
    center: { lat: 50.937349, lng: -1.397909 },
    zoom: 8,
  });
}

// Start the server

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
// [END gae_node_request_example]

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/index.html"));
});

/*
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


const source = {
    html: `<iframe width="600" height="450" style="border:0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJKeyH6vVzdEgRVp9Uu4KZl1M&key=AIzaSyBmoJGxjYSO1MToeKhfM9Cz6-dMB4i2-Tg"></iframe>`
};
*/

/*
const source = {
    html: `
<p style='text-align:center;'>
  Hello Woarld!
</p>`
};

export default function App() {
    const { width } = useWindowDimensions();
    return (
        <RenderHtml
            contentWidth={width}
            source={source}
        />
    );
}
*/
