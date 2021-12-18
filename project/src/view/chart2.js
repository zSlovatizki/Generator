import * as React from 'react';
import { useState } from 'react'
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

export default function Using() {

    const [data, setDate] = useState([
        {
            month: 1888,
            avg: 90,
            amount: 80
        },        {
            month: 1800,
            avg: 90,
            amount: 80
        },        {
            month: 1801,
            avg: 90,
            amount: 80
        },        {
            month: 1802,
            avg: 90,
            amount: 80
        },        {
            month: 1803,
            avg: 90,
            amount: 80
        },        {
            month: 1804,
            avg: 90,
            amount: 80
        },        {
            month: 1805,
            avg: 90,
            amount: 80
        },        {
            month: 1809,
            avg: 90,
            amount: 80
        },        {
            month: 1806,
            avg: 90,
            amount: 80
        },        {
            month: 1807,
            avg: 90,
            amount: 80
        },
        {
            month: 1701,
            avg: 90,
            amount: 80
        },       {
            month: 1702,
            avg: 90,
            amount: 80
        },       {
            month: 1703,
            avg: 90,
            amount: 80
        },       {
            month: 1704,
            avg: 90,
            amount: 80
        },       {
            month: 1705,
            avg: 90,
            amount: 80
        },       {
            month: 1706,
            avg: 90,
            amount: 80
        },       {
            month: 1707,
            avg: 90,
            amount: 80
        },       {
            month: 18078,
            avg: 90,
            amount: 80
        },       {
            month: 1809,
            avg: 90,
            amount: 80
        },       {
            month: 1810,
            avg: 90,
            amount: 80
        },       {
            month: 1811,
            avg: 90,
            amount: 80
        },       {
            month: 1812,
            avg: 90,
            amount: 80
        },       {
            month: 1813,
            avg: 90,
            amount: 80
        },       {
            month: 1814,
            avg: 90,
            amount: 80
        },


        {
            month: 2002,
            avg: 90,
            amount: 80
        },
        {
            month: 2001,
            avg: 90,
            amount: 70
        }, {
            month: 2000,
            avg: 90,
            amount: 60
        }, {
            month: 1999,
            avg: 90,
            amount: 120
        }
    ])

    return (
        <>
            <Line>
                <div style={{ width: "15px", height: "15px", background: "#ff7043", margin: "10px" }} />
                <p>the using average for thus month</p>
            </Line>
            <Line>
                <div style={{ width: "15px", height: "15px", background: "#42a5f5", margin: "10px" }} />
                <p>your using</p>
            </Line>
            <Paper>
                <Chart
                    data={data}
                >
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
                    <Title text="using" />
                    <Animation />
                </Chart>
            </Paper>
        </>
    );
}
