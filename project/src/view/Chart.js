import react, { useState, useEffect } from 'react'
import UserDetails from './UserDetails'
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Title
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';
import Line from '../UIKit/Line'
import { useLocation } from "react-router-dom";
import { getUserUsesInYear } from '../connect to server/Connect';
import { getUsersUsesInYear } from '../connect to server/Connect';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/system';
import { getStorageItem } from '../services/Functions';

export default function Using() {

    const location = useLocation();
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const [data, setData] = useState([])
    const [year, setYear] = useState(new Date().getFullYear())
    const [years, setYears] = useState([])

    useEffect(() => {
        var userId = query.get('id');
        var managerId = JSON.parse(getStorageItem("user")).id
        getUserUsesInYear(userId, year).then(use => {
            console.log("use", use)
            getUsersUsesInYear(managerId, year).then(uses => {
                console.log("uses", uses)
                var chart = [];
                for (var i = 0; i < 12; i++) {
                    chart[i] = { month: i + 1, avg: uses.data[i], amount: use.data[i] }
                }
                console.log("chart", chart);
                setData(chart)
            })
        })
    }, [year])


    useEffect(() => {
        let _years = []
        for (var i = new Date().getFullYear() - 1; i >= 1990; i--) {
            _years.push(i);
        }
        setYears(_years)
        console.log("years", years)
    }, [])

    return (
        <>
            <Line>
                <UserDetails />
                <div style={{ width: "80%" }}>
                    <Line>
                        <div style={{ width: "15px", height: "15px", background: "#ff7043", margin: "10px" }} />
                        <p>ממוצע צריכה כללי</p>
                    </Line>
                    <Line>
                        <div style={{ width: "15px", height: "15px", background: "#42a5f5", margin: "10px" }} />
                        <p>הצריכה שלך</p>
                    </Line>
                    {/* <Paper width="100%"> */}
                    <Chart
                        data={data}
                        width="100%">
                        <ArgumentScale factory={scaleBand} />
                        <ArgumentAxis />
                        <ValueAxis />
                        <BarSeries
                            valueField="amount"
                            argumentField="month"
                            name="amount"
                        />
                        <BarSeries
                            valueField="avg"
                            argumentField="month"
                            name="avg"
                        />
                        <Stack />
                        <Box sx={{ display: 'inline-flex' }}>
                            <div style={{ marginTop: '2vh' }}><h1>גרף שימוש לשנת </h1></div>
                            <div>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={year}
                                        onChange={(e) => { setYear(e.target.value) }}
                                        label="Year"
                                    >
                                        <MenuItem value={new Date().getFullYear()}><em>{new Date().getFullYear()}</em></MenuItem>
                                        {
                                            years.map(y =>
                                                <MenuItem value={y}><em>{y}</em></MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        </Box>
                        <Animation />
                    </Chart>
                    {/* </Paper> */}
                </div>
            </Line>
        </>
    );
}
