import React, { createContext, useState,useEffect } from 'react'
import ProductsAPI from './API/Products'
import UserAPI from './API/User'
import CategoriesAPI from './API/Categories'
import axios from 'axios'


export const GlobalState = createContext()

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false)

    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){

            const refreshToken = async () =>{
                const res = await axios.get('/user/refresh_token')
                setToken(res.data.accessToken)
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])


    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI(),
    }
    
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>)
}