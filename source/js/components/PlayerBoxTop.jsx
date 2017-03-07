import React from "react";
import MenuBox from "./MenuBox";
import HelpBox from "./HelpBox";
import PlayerBox from "./PlayerBox";
import PPIBox from "./PPIBox";

export default ({ data3 }) => (
    <div className="playerBoxTop">
        <div className="menuContainer">
            <MenuBox />
            <HelpBox />
        </div>
        <PlayerBox data3={data3} />
        <PPIBox data3={data3} />
    </div>
);
