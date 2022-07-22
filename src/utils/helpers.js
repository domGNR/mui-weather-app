export const degConversion = (unit, value) => {
  switch (unit) {
    case "C":
      return Math.round(value - 273.15) + " " + unit + "°";
    case "F":
      return Math.round((value - 273.15) * (9 / 5) + 32) + " " + unit + "°";
    case "K":
      return Math.round(value) + " " + unit + "°";
    default:
      break;
  }
};

/* eslint-disable no-fallthrough */

export const getIcon = (time, id, size = "") => {
  let icon;
  let nd;
  if (id >= 200 && id <= 232) icon = "11";
  else if ((id >= 300 && id <= 321) || (id >= 520 && id <= 531)) icon = "09";
  else if (id >= 500 && id <= 504) icon = "10";
  else if ((id >= 600 && id <= 622) || id === 511) icon = "13";
  else if (id >= 701 && id <= 781) icon = "50";
  else if (id === 800) icon = "01";
  else if (id === 801) icon = "02";
  else if (id === 802) icon = "03";
  else if (id === 803 || id === 804) icon = "04";
  else {
    console.log("default");
  }

  // console.log(time, typeof time)
  if (time <= 6 || time >= 18) {
    nd = "n";
  }
  if (time >= 6 && time <= 18) {
    nd = "d";
  }
  return "http://openweathermap.org/img/wn/" + icon + nd + size + ".png";
};

export const getItemFromLocalStorage = (key) => {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
    return null;
  };
  
  export const setLocalStorageItem = (key, item) => {
    if (item && typeof key === "string") {
      localStorage.setItem(key, JSON.stringify(item));
    }
  };
  