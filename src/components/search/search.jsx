import "./search.css";
import React from "react";
import img3 from "../../../public/img/logo.png";

export const search = (props) => {
  const { mask, close } = props;
  return (
    <div>
      {mask ? (
        <div className="search">
          <div className="search_container">
            <div className="old_logo">
              <img src={img3} height="36px" />
            </div>
            <div className="input_box">
              <div className="search_icon">
                <div className="searchImg"></div>
              </div>
              <input
                className="search_input"
                placeholder="搜索"
                autoFocus
              ></input>
            </div>
          </div>
          <div
            className={mask ? "mask" : ""}
            onClick={() => {
              close();
            }}
          ></div>
        </div>
      ) : null}
    </div>
  );
};
export default search;
