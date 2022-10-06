import "./login.css";
import React from "react";
import qrCode from "../../../public/img/qrcode.jpg";

const login = () => {
  return (
    <div className="wrap">
      <div className="login_box">
        <div className="login_box_layout">
          <div className="login_text">
            <div className="weChat">微信登陆</div>
            <div className="scanText">使用微信扫一扫登录</div>
          </div>
          <div className="login_qrcode">
            <img src={qrCode} width="220px" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default login;
