import React, { useEffect, } from "react"
import { connect } from 'react-redux'
import { getFetch } from '../redux/action'
import Store from '../store/store'
import data from '../data/data.json'


const List = (props) => {

    const { getFetch, filterArray } = props;

    useEffect(() => {
        getFetch(data);
    }, [getFetch])

    return (
        <ul className="list-group" >
            {filterArray?.map((item, i) => {
                return (
                    <li key={i} className="list-group-item"><Store store={item} /></li>
                )
            })
            }
       </ul>
    )
}
export default connect(
    (state) => {
        return {
            filterArray: state.filterArray
        }
    },
    {
        getFetch
    }
)(List)