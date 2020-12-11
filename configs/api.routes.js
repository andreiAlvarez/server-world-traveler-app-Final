// const {Client} = require("@googlemaps/google-maps-services-js");
// const axios = require("axios");
// const client = new Client({});
// const router = express.Router();

// client
//   .elevation({
//     params: {
//       locations: [{ lat: 45, lng: -110 }],
//       key: process.env.GOOGLE_MAPS_API_KEY
//     },
//     timeout: 1000 // milliseconds
//   }, axios.get(
//     `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${searchPlace}&inputtype=textquery&fields=name,photos&key=${placesGoogleAPIKey}`
//   )
// )
//   .then(r => {
//     console.log(r.data.results[0].elevation);
//   })
//   .catch(e => {
//     console.log(e);
//   });

//   module.exports = Client;