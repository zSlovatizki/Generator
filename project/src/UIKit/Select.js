import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Select.css'
import { useState } from 'react';

export default function KitSelect(props) {
    
    const handleChange = (event) => {
         setV(event.target.value);
         props.handleSelect(event);
    }

    const [v, setV] = useState({key:0,value:props.arr[0]});
    return (
        <Select className="select" onChange={handleChange} value={v}>
            {props.arr != undefined && props.arr.map((item,i) => <MenuItem className="option" key={i} value={item.item}>{item.name}</MenuItem>)}
        </Select>
    )
}