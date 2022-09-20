import React from "react";
import "../../pages/content/content.css";
import { subscribe } from "../../utils/subscribe";

export const nameTag = (props) => {
  const { name } = props;
  const flag = !(name.length === 0);
  return (
    <>
      {flag ? (
        <>
          {name.map((item) => (
            <div key={item.entityId} className="content_tag">
              <div className="content_tagName">{item.entityName}</div>
              <div className="content_add_btn" onClick={()=>{subscribe()}}></div>
              <span className="content_subscribe"onClick={()=>{subscribe()}}>订阅</span>
            </div>
          ))}
        </>
      ) : null}
    </>
  );
};
export default nameTag;
