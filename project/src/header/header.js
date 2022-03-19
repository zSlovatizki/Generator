import {  useState } from "react";
import { connect } from 'react-redux'
import { setFilter } from '../redux/action'
import { orderBy } from 'lodash'
import React from   "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = (props) => {
    const { stores, setFilter, filterArray } = props

    const [search, setSearch] = useState('')


    const searchByName = () => {
       
        setFilter(stores.filter(({ storeName = '' }) => storeName.toLowerCase().includes(search.toLowerCase())))
        console.log(search)
    }

    const sort = (by) => {
        setFilter(orderBy(filterArray, 'storeName', by))
        console.log(filterArray)
    }
    return (
      
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                    <div className="btn-group" role="group" aria-label="Basic example">
                    <input className="form-control mr-sm-2" type="search" onChange={(event) => setSearch(event.target.value)} placeholder="Search..." aria-label="Search" />
                    <button className="btn btn-secondary" onClick={() => searchByName()} type="submit">Search</button>
                    <button type="button" onClick={() => sort('asc')} className="btn btn-secondary">asc</button>
                        <button type="button" onClick={() => sort('desc')} className="btn btn-secondary">desc</button>
                    </div>
                </div>
            </nav>
       
    )
}

export default connect(
    (state) => {
        return {
            stores: state.stores,
            filterArray: state.filterArray
        }
    },
    {
        setFilter
    }
)(Header);