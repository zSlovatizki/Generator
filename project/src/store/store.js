import React from 'react'
import { connect } from 'react-redux'

import { setCurrent} from '../redux/action'

const Store = (props) => {
    const { store,setCurrent } = props

    const set = () => {
        setCurrent(store.id)
    }
    
    return (
        <button className="btn btn-light" onClick={() => set()}>{store?.storeName}</button>
    )
}
export default connect(
    null,
    {
        setCurrent
    }
)(Store) ;