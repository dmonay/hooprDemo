import React from 'react';

// temporary hack given that position of ppiDurationQuantity div
// has to be absolute for now
const resize = () => {
    // y = mx+b
    // we will use this function to get y, which for our purposes is the "right" offset
    // x is the innerWidth
    const b = -457.6456;
    const m = 0.488;
    const rightOffset = m * window.innerWidth + b;
    const elem = document.getElementsByClassName('ppiDurationQuantity')[0];
    elem.style.right = rightOffset + 'px';
};

window.onload = resize;
window.onresize = resize;

export default ({ data3 }) => (
    <div className="ppiBox">
        <div className="sectionTitle pl20 pt12">
            <h1>Quick PPI Overview</h1>
        </div>
        <div className="ppiDuration">
            <div className="ppiDurationDescriptor">
                <p className="up fs16 w230 pt12 pl20">Based on the last</p>
            </div>
            <div className="ppiDurationWedge" />
            <div className="ppiDurationQuantity pl27">
                20 games
                <i className="fa fa-caret-down fs16 pl10" />
            </div>
        </div>
        <div className="ppiStatDescriptor">
            <p>Your PPI</p>
            <p>Avg PPI, Division</p>
            <p>Best PPI, Division</p>
        </div>
        <div className="ppiStatQuantity">
            <p>{data3.player.stats.ppi}</p>
            <p>{data3.league.stats.ppi.avg}</p>
            <p>{data3.league.stats.ppi.best}</p>
        </div>
        <div className="ppiStatSummary">
            <p>Congrats, {data3.player.name.first}!</p>
            <p>
                Your PPI score is {data3.player.stats.ppi}
                . You are doing better than
                {' '}
                {data3.player.stats.outperform * 100}%
                {' '}
                of players in your division.
            </p>
        </div>
    </div>
);
