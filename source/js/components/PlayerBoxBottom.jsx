import React from 'react';
import TipBox from './TipBox';
import SpiderBox from './SpiderBox';

export default ({ data3 }) => (
    <div className="playerBoxBottom">
        <TipBox />
        <SpiderBox data3={data3} />
    </div>
);
