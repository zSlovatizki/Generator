import * as React from 'react';
import { useState,useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { useLocation } from "react-router-dom";

export default function MyChart(props) {

    useEffect(() => {
        console.log("nnyy", location.state.user.UsesForDate)
         setData(location.state.user.UsesForDate)
    }, [])

    const location = useLocation();
    const [data, setData] = useState([]);

    return (
        <Paper>
            <Chart
                data={data}
            >
                <ArgumentAxis />
                <ValueAxis max={200} />

                <BarSeries
                    valueField="AmpereUseAmount"
                    argumentField="Date"
                />
                <Title text="using" />
                <Animation />
            </Chart>
        </Paper>
    );

}
