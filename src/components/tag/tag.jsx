import React from "react";
import "../../pages/content/content.css";
import { subscribe } from "../../utils/subscribe";

export const tag = (props) => {
  const { tag } = props;
  const flag = !(tag.length === 0);
  return (
    <>
      {flag ? (
        <>
          {tag.map((item) => (
              <div key={item.uid} className="content_tag">
                <div className="content_tagName">{item.name}</div>
                <div className="content_add_btn"onClick={()=>{subscribe()}}></div>
                <span className="content_subscribe" onClick={()=>{subscribe()}}>订阅</span>
              </div>
            ))}
        </>
      ) : null}
    </>
  );
};
export default tag;
