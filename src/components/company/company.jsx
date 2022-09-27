import React from "react";
import "../../pages/content/content.css";
import "./company.css";

const company = (props) => {
  const { company } = props;
  let flag = false;
  for (let i = 0; i < company.length; i++) {
    if (company[i] != null) {
      flag = true;
    }
  }
  return (
    <div>
      {flag ? (
        <div className="content_company">
          <div className="content_company_title">公司市值</div>
          {company.map((item) => (
            <div className="content_company_box">
              <div className="content_company_text">
                <span className="content_company_tag">公司</span>
                <span className="content_company_name">{item.name}</span>
              </div>
              <div className="content_company_text">
                <span className="content_company_tag">代码</span>
                <span className="content_company_name">{item.code}</span>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default company;
