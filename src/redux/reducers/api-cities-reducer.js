import {createSlice} from '@reduxjs/toolkit'
import {geoDbInstance,geoDbOptions,GEO_API_URL} from '../../api'
import axios from 'axios'



const initialState = {
    loading:false,
    error:{
        status:false,
        message:'',
    },
    cities:{},
}

const apiSlice = createSlice({
    name:'cities-api',
    initialState,
    reducers: {
        startLoading: (state) =>{
            state.loading = true
            state.cities = []
        },
        stopLoading: (state) =>{
            state.loading = false
        },
        saveData:(state,action) =>{
            state.cities = action.payload
        },
        catchError:(state,action) =>{
            state.error.status = true
            state.error.message = action.payload
            state.cities = []
        },
        cleanError: (state) => {
            state.error.status = false
            state.error.message = ''
        },
        
    },
})


const {startLoading,stopLoading,saveData,catchError,cleanError} = apiSlice.actions

export const fetchData  = (inputValue) => async(dispatch,getState) => {
    dispatch(startLoading())
    dispatch(cleanError())

    // try {
    //     return fetch(`${GEO_API_URL}/cities?namePrefix=${inputValue}`, geoDbOptions)
    //     .then((response) => response.json())
    //     .then((response) => {
    //       return {
    //         options: response.data.map((city) => {
    //           return {
    //             value: `${city.latitude} ${city.longitude}`,
    //             label: `${city.name}, ${city.countryCode}`,
    //           };
    //         }),
    //       };
    //     });
    // }
    // catch {

    // }
    // try {
    //     const response = await geoDbInstance.get(`?namePrefix=${inputValue}`)
    //     dispatch(saveData(
    //         response.data.data.map(el=>{
    //             return {
    //                 value: `${el.latitude} ${el.longitude}`,
    //                 label: `${el.name}, ${el.countryCode}`,
    //               };
    //         })
    //     ))
    //     // console.log()
    //   } catch (error) {
    //     dispatch(catchError([error]))
    //   }
    stopLoading()


}

export {cleanError,catchError}

const {reducer} = apiSlice

export default reducer
