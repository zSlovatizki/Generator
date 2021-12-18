import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Select.css'

export default function KitSelect(props) {
    return (
        <Select className="select">
            {props.arr != undefined && props.arr.map((item, i) => <MenuItem key={i} value={item.name}>{item}</MenuItem>)}
        </Select>
    )
}