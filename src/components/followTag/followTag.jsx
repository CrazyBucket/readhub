import React from "react";
import "../../pages/content/content.css";
import { subscribe } from "../../utils/subscribe";

const followTag = (props) => {
  const { timeline } = props;
  const flag = !(timeline.length === 0);
  return (
    <>
      {flag ? (
        <div className="content_tag">
          <div className="content_tagName">事件追踪</div>
          <div
            className="content_add_btn"
            onClick={() => {
              subscribe();
            }}
          ></div>
          <span
            className="content_subscribe"
            onClick={() => {
              subscribe();
            }}
          >
            订阅
          </span>
        </div>
      ) : null}
    </>
  );
};
export default followTag;
