import { configureStore } from '@reduxjs/toolkit'
import apiForecastReducer from './reducers/api-forecast-reducer'
import apiCitiesReducer from './reducers/api-cities-reducer'
// import { getDefaultMiddleware } from '@reduxjs/toolkit'

const store = configureStore({
    reducer:{
        forecast: apiForecastReducer,
        cities:apiCitiesReducer,
    },
    // middleware: getDefaultMiddleware({
    //     serializableCheck: false
    //  })
})

export default store
