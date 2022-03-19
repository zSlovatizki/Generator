import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Select.css'
import { useState, useEffect } from 'react';

export default function SimpleSelect(props) {

    const handleChange = (event) => {

        props.setV(event.target.value);
        if (props.handleSelect != undefined)
            props.handleSelect(event.target.value);
    }

    //const [v, setV] = useState(props.arr[0]);

    return (
        <Select className="select" onChange={handleChange} value={props.v}>
            {props.arr != undefined && props.arr.map((item,i) => <MenuItem key={i} value={item}>{item}</MenuItem>)}
        </Select>
    )
}