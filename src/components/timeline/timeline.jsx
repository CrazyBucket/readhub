import React from "react";
import "./timeline.css";
import { returnDate, returnYear } from "../../utils/returnDate";

export const timeline = (props) => {
  const { timeline } = props;
  const flag = !(timeline.length === 0);
  return (
    <div>
      { flag ? (
        <div className="content_timeline">
          <div className="content_timeline_nav">事件追踪</div>
          <div className="content_timeline_border"></div>
          <div className="content_timeline_list">
            {timeline.map((item) => (
              <div key={item.id} className="content_timeline_news">
                <div className="content_timeline_timeBox">
                  <div className="content_timeline_year">
                    {returnYear(item.createdAt)}
                  </div>
                  <div>{returnDate(item.createdAt)}</div>
                </div>
                <div className="content_timeline_dot"></div>
                <div className="content_timeline_newsTitle">
                  <a onClick={()=> {
                        const w = window.open('_blank')
                        let url = `/topic/${item.id}`
                        w.location.href = url
                    }
                  }>{item.title}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default timeline;
