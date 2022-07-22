import { createSlice, createAction, isAnyOf } from "@reduxjs/toolkit";
import { owInstance } from "../../api";
import { setLocalStorageItem,getItemFromLocalStorage } from "../../utils/helpers";

const removeFromFav = createAction("/remove-from-fav");

const localStorageFav = getItemFromLocalStorage("favList");

const isFavAction = (action) => {
  return isAnyOf(isFavAdd, isRemovedFromFav)(action);
};

const isFavAdd = (action) => {
  return action.type.endsWith("/addToFav");
};

const isRemovedFromFav = (action) => {
  return action.type.endsWith("remove-from-fav");
};



const initialState = {
  query: {
    query: {
      lat: "",
      lon: "",
      label: "",
    },
    path: "",
  },
  deg: localStorage.getItem("last-degree") || "C",
  day: {
    selectedDay: "",
    today: "",
  },
  favList: localStorageFav || [],
  loading: false,
  error: {
    status: false,
    message: "",
  },
  forecasts: {},
};


const apiSlice = createSlice({
  name: "forecasts-api",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.forecasts = {};
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    saveData: (state, action) => {
      state.forecasts = action.payload;
    },
    saveQuery: (state, action) => {
      state.query.query = action.payload;
    },
    saveDeg: (state, action) => {
      state.deg = action.payload;
    },
    saveDay: (state, action) => {
      state.day = { ...action.payload };
    },
    addToFav: (state, action) => {
      state.favList.push(action.payload);
    },
    catchError: (state, action) => {
      state.error.status = true;
      state.error.message = action.payload;
      state.forecasts = {};
    },
    cleanError: (state) => {
      state.error.status = false;
      state.error.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeFromFav, (state, action) => {
        state.favList = state.favList.filter(
          (el) => el.id !== action.payload.id
        );
      })
      .addMatcher(isFavAction, (state) => {
        setLocalStorageItem("fav-list", state.favList);
      })
      .addDefaultCase((state) =>{
        return state
      })
  },
});

const {
  startLoading,
  saveData,
  stopLoading,
  cleanError,
  catchError,
  saveQuery,
  saveLabel,
  saveDeg,
  saveDay,
  addToFav,
} = apiSlice.actions;
const { reducer } = apiSlice;
export {
  cleanError,
  catchError,
  saveQuery,
  saveLabel,
  saveDeg,
  saveDay,
  addToFav,
};

export const toggleFav = (item) => (dispatch, getState) => {
    const { favList,forecasts } = getState().forecast;
  
    if (favList.find((x) => x.id === item.id)) {
      dispatch(removeFromFav(item))
      console.log('aaa')
      return
    }
    if (forecasts?.cod==='200'){ 
      dispatch(addToFav(item)) }
    else return
  };



export const fetchData = (path) => async (dispatch, getState) => {
  dispatch(startLoading());
  dispatch(cleanError());
  try {
    const response = await owInstance.get(
      "https://api.openweathermap.org/data/2.5/forecast?appid=4872b4a7ad6c2fb78512b75b27acd31f" +
        path
    );
    dispatch(saveData(response.data));
  } catch (error) {
    dispatch(catchError(["Nessun risultato per il termine ricercato"]));
  }
  dispatch(stopLoading());
};

export default reducer;
