import React from 'react'
import { createStore } from 'redux'
import produce from 'immer'
import {} from './actions'
const initialState={
    routes:[
        {route:"18.55996,-68.388832 18.558028,-68.388971"}
    ]
}

const reducer=produce((state,action)=>{
switch(action.type)
{
case 'ADD_ROUTE':
    state.routes.push(action.payload);
}

},initialState)

const store=createStore(reducer);
window.store=store;
export default store;
