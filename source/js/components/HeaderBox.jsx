import React from "react";
import LeagueName from "./LeagueName";
import PageName from "./PageName";

export default ({ data3 }) => (
    <div className="headerBox">
        <LeagueName data3={data3} />
        <PageName />
    </div>
);
