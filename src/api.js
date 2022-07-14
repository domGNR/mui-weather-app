import axios from "axios";

export const owInstance = axios.create({
  baseURL:
    "https://api.openweathermap.org/data/2.5/forecast?appid=4872b4a7ad6c2fb78512b75b27acd31f",
  // headers: {
  //   "Content-Type": "application/json",
  //   "Accept-Version": "v1",
  //   "Authorization": `Client-ID ${process.env.REACT_APP_ACCUWEATHER_CLIENT_ID}`,
  // },
});

export const geoDbInstance = axios.create({
  baseURL: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
  // params: {namePrefixDefaultLangResults: 'true'},
  params: {sort: '+countryCode=it'},
  headers: {
    "X-RapidAPI-Key": "07c760a14cmshbbdc1bbc363fc25p129f46jsn5742af7b41e2",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
});

export const geoDbOptions = {
  method: "GET",
  url: "https://wft-geo-db.p.rapidapi.com/v1/geo",
  headers: {
    "X-RapidAPI-Key": "07c760a14cmshbbdc1bbc363fc25p129f46jsn5742af7b41e2",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

// export const geoDbInstance = () => {
//   axios
//     .request(geoDbOptions)
//     .then(function (response) {
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// };
