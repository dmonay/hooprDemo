import React from 'react';

export default ({ data3 }) => (
    <div className="playerBox w230">
        <div className="sectionTitle w230">
            <div className="playerHeading pl30">
                <p className="up fs18 w170 pt12">Player (YOU)</p>
            </div>
            <div className="playerArrowWedge" />
            <div className="playerArrow pl27">
                <i className="fa fa-share fs16" />
            </div>
        </div>
        <div className="playerCard">
            <p className="playerName">
                {data3.player.name.first} {data3.player.name.last}
            </p>
            <p className="playerTeam">{data3.team.name}</p>
            <p className="playerNumber">{data3.player.number} </p>
            <p className="playerPosition">{data3.player.position} </p>
            <p className="playerHeadshot" />
            <p className="playerActionShot" />
        </div>
    </div>
);
