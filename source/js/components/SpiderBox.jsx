import React from 'react';
import SpiderChart from './SpiderChart';
import Toggle from 'react-toggle';

const data = [
    [
        { axis: 'SCORING', value: 0.82 },
        { axis: 'BALL-HANDLING', value: 0.43 },
        { axis: 'BASKETBALL IQ', value: 0.64 },
        { axis: 'ATHLETICISM', value: 0.46 },
        { axis: 'DEFENSE', value: 0.14 }
    ],
    [
        { axis: 'SCORING', value: 0.59 },
        { axis: 'BALL-HANDLING', value: 0.40 },
        { axis: 'BASKETBALL IQ', value: 0.53 },
        { axis: 'ATHLETICISM', value: 0.52 },
        { axis: 'DEFENSE', value: 0.39 }
    ]
];

const toggleLegend = () => {
    const legend = document.getElementsByClassName('spiderChartLegend')[0];
    const chartElement = document.getElementsByClassName('radar1')[0];

    if (legend.style.opacity == 0) {
        fadeIn(legend, chartElement);
    } else {
        fadeOut(legend, chartElement);
    }
};

const fadeIn = (p1, p2) => {
    (function myLoop(i) {
        console.log('fadeIn running');
        setTimeout(
            function() {
                p1.style.opacity = i / 100;
                p2.style.opacity = i / 100;
                if (++i < 101) myLoop(i);
            },
            5
        );
    })(0);
};

const fadeOut = (p1, p2) => {
    (function myLoop(i) {
        console.log('fadeOut running');
        setTimeout(
            function() {
                p1.style.opacity = i / 100;
                p2.style.opacity = i / 100;
                if (--i > -1) myLoop(i);
            },
            5
        );
    })(100);
};

export default props => (
    <div className="spiderBox">
        <label>
            <Toggle icons={false} onChange={toggleLegend} />
            <span className="toggleLabel">Compare</span>
        </label>
        <div className="spiderChartLegend">
            <div className="spiderChartLegendYou">
                <div />
                <p>You</p>
            </div>
            <div className="spiderChartLegendAvg">
                <div />
                <p>Division average</p>
            </div>
        </div>
        <SpiderChart data={data} />
    </div>
);
