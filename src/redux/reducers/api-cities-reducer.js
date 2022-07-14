import {createSlice} from '@reduxjs/toolkit'
import {geoDbInstance,geoDbOptions} from '../../api'
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
    //     const response = await geoDbInstance.get()
    //     dispatch(saveData(response.data))
    // }
    // catch(error){
    //     dispatch(catchError(['Errore nel caricamento']))
    // }
    // const newUrl = geoDbOptions.url +``
    // axios
    // .request(geoDbOptions)
    // .then(function (response) {
    // dispatch(saveData(response.data))
    // })
    // .catch(function (error) {
    //     dispatch(catchError([error()]))
    // });

    try {
        const response = await geoDbInstance.get(`?namePrefix=${inputValue}`)
        dispatch(saveData(response.data))
      } catch (error) {
        dispatch(catchError([error]))
      }
    stopLoading()


}

export {cleanError,catchError}

const {reducer} = apiSlice

export default reducer
