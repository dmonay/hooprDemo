import React from 'react';

export default ({ data3 }) => (
    <div className="leagueName w220">
        <p className="up pt9 pl20">League</p>
        <p className="up heavy pt3 pl20">
            {data3.league.name}, Division {data3.league.division}
        </p>
    </div>
);
