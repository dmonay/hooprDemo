import React from 'react';
import SpiderChart from './SpiderChart';

const data = [
    [
        { axis: 'SCORING', value: 0.82 },
        { axis: 'BALL-HANDLING', value: 0.43 },
        { axis: 'BASKETBALL IQ', value: 0.64 },
        { axis: 'ATHLETICISM', value: 0.46 },
        { axis: 'DEFENSE', value: 0.14 }
    ]
];

export default props => (
    <div className="spiderBox">
        <SpiderChart data={data} />
    </div>
);
