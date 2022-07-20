import {createSlice} from '@reduxjs/toolkit'
import {owInstance} from '../../api'



const initialState = {
    query:{
        query:{
            lat:'',
            lon:'',
            label:'',
        },
        path:'',
    },
    deg:'C',
    favList:[],
    loading:false,
    error:{
        status:false,
        message:'',
    },
    forecasts:{},
}




const apiSlice = createSlice({
    name:'forecasts-api',
    initialState,
    reducers: {
        startLoading: (state) =>{
            state.loading = true
            state.forecasts = {}
        },
        stopLoading: (state) =>{
            state.loading = false
        },
        saveData:(state,action) => {
            state.forecasts = action.payload
        },
        saveQuery:(state,action) => {
            state.query.query = action.payload
        },
        saveDeg:(state,action) => {
            state.deg = action.payload
        },
        catchError:(state,action) =>{
            state.error.status = true
            state.error.message = action.payload
            state.forecasts = {}
        },
        cleanError: (state) => {
            state.error.status = false
            state.error.message = ''
        },
        
    },
})

const {startLoading,saveData,stopLoading,cleanError,catchError,saveQuery,saveLabel,saveDeg} = apiSlice.actions
const {reducer} = apiSlice
export {cleanError,catchError,saveQuery,saveLabel,saveDeg}

export const fetchData = (path) => async (dispatch,getState) => {
    dispatch(startLoading())
    dispatch(cleanError())
    try {
        const response = await owInstance.get('https://api.openweathermap.org/data/2.5/forecast?appid=4872b4a7ad6c2fb78512b75b27acd31f'+path)
        dispatch(saveData(response.data))
    } catch (error) {
        dispatch(catchError(['Nessun risultato per il termine ricercato']))
    }    
    dispatch(stopLoading())
}


export default reducer
