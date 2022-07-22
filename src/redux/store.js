import { configureStore } from '@reduxjs/toolkit'
import apiForecastReducer from './reducers/api-forecast-reducer'
// import { getDefaultMiddleware } from '@reduxjs/toolkit'

const store = configureStore({
    reducer:{
        forecast: apiForecastReducer,
    },
    // middleware: getDefaultMiddleware({
    //     serializableCheck: false
    //  })
})

export default store
