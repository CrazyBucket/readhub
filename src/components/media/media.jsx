import React from "react";
import "./media.css";

export const media = (props) => {
  const { news } = props;
  return (
    <div>
      {news ? (
        <div className="content_media">
          <div className="content_media_nav">媒体报道</div>
          <div className="content_media_border"></div>
          <div className="content_media_list">
            {news.map((item) => (
              <div key={item.id} className="content_media_news">
                <div className="content_media_newsTitle">
                  <a href={item.url} target="_blank">
                    {item.title}
                  </a>
                </div>
                <div className="content_media_siteName">{item.siteName}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default media;
