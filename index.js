import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from "react";
import { useEffect } from "react";
import { HeatMapComponent, Legend, Tooltip, Inject } from '@syncfusion/ej2-react-heatmap';
import * as data from './calendar-data-source.json';

import { Internationalization } from "@syncfusion/ej2-base";
/**
 * Calender HeatMap sample
 */
const CalendarHeatmap = () => {
    let paletteSettings = {
        palette: [
            { value: 0, color: 'rgb(238,238,238)', label: 'no contributions' },
            { value: 1, color: 'rgb(172, 213, 242)', label: '1-15 contributions' },
            { value: 16, color: 'rgb(127, 168, 201)', label: '16-31 contributions' },
            { value: 32, color: 'rgb(82, 123, 160)', label: '31-49 contributions' },
            { value: 50, color: 'rgb(37, 78, 119)', label: '50+ contributions' },
        ],
        type: 'Fixed',
        emptyPointColor: 'white'
    };
    let xAxis = {
        opposedPosition: true,
        valueType: 'DateTime',
        minimum: new Date(2017, 6, 23),
        maximum: new Date(2018, 6, 30),
        intervalType: 'Days',
        showLabelOn: 'Months',
        labelFormat: 'MMM',
        increment: 7,
        labelIntersectAction: 'Rotate45',
    };
    let title = {
        text: 'Annual Summary of User Activities in GitLab',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
        }
    };
    const tooltipTemplate = (args) => {
        let intl = new Internationalization();
        let format = intl.getDateFormat({ format: 'EEE MMM dd, yyyy' });
        let newDate = new Date(args.xValue);
        let date = new Date(newDate.getTime());
        let axisLabel = args.heatmap.axisCollections[1].axisLabels;
        let index = axisLabel.indexOf(args.yLabel);
        (date).setDate((date).getDate() + index);
        let value = format(date);
        args.content = [(args.value === 0 ? 'No' : args.value) + ' ' + 'contributions' + '<br>' + value];
    };
    const load = (args) => {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    return (<div className='control-pane'>

            <div className='control-section'>
                <HeatMapComponent id='heatmap-container' titleSettings={title} height={'300px'} xAxis={xAxis} yAxis={{ labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], isInversed: true }} dataSource={data.calendarDataSource} cellSettings={{ showLabel: false, border: { color: 'white' } }} tooltipRender={tooltipTemplate} paletteSettings={paletteSettings} load={load.bind(this)} legendSettings={{ position: 'Bottom', width: '20%', alignment: 'Near', showLabel: true, labelDisplayType: 'None', enableSmartLegend: true }}>
                    <Inject services={[Legend, Tooltip]}/>
                </HeatMapComponent>
            </div>
        </div>);
};
export default CalendarHeatmap;

const root = createRoot(document.getElementById('sample'));
root.render(<CalendarHeatmap />);