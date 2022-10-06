import "./daily.css";
import React from "react";
import Nav from "../../components/nav/nav.jsx";
import DailyPaper from "../../components/dailyPaper/dailyPaper";
import QrCode from "../../components/qrCode/qrCode.jsx";
import Copyright from "../../components/copyright/copyright";

const daily = () => {
  return (
    <div className="body">
      <Nav />
      <div className="daily_content">
        <DailyPaper />
        <div className="right">
          <QrCode />
        </div>
      </div>
      <Copyright />
    </div>
  );
};
export default daily;
