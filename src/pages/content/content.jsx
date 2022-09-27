import "./content.css";
import React from "react";
import Nav from "../../components/nav/nav.jsx";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { calculate } from "../../utils/calculateTime";
import Media from "../../components/media/media.jsx";
import Qrcode from "../../components/content_qrcode/content_qrcode.jsx";
import Timeline from "../../components/timeline/timeline.jsx";
import FollowTag from "../../components/followTag/followTag";
import Copyright from "../../components/copyright/copyright";
import NameTag from "../../components/nameTag/nameTag";
import Tag from "../../components/tag/tag";
import Company from "../../components/company/company";

const content = () => {
  dayjs().format();
  const { id } = useParams();
  const [list, setList] = useState([]);
  const [tag, setTag] = useState([]);
  const [news, setNews] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [name, setName] = useState([]);
  const [company, setCompany] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/topic/${id}`,
    })
      .then((res) => {
        let newlist = res.data;
        let data = [];
        setList(newlist);
        setTag(newlist.tags);
        setNews(newlist.newsArray);
        setTimeline(newlist.timeline.topics);
        setName(newlist.entityTopics);
        setCompany(newlist.entityTopics);
        let j = 0;
        for (let i = 0; i < newlist.entityTopics.length; i++) {
          if (newlist.entityTopics[i].finance != null) {
            data[j] = newlist.entityTopics[i].finance;
            j++;
          }
        }
        setCompany(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  console.log(company)
  return (
    <div>
      <Nav />
      <div className="box">
        <div className="content_left">
          <div className="content_title">{list.title}</div>
          <div className="content_time">
            {calculate(dayjs(list.createdAt).unix())}
          </div>
          <div className="content_text">{list.summary}</div>
          <div className="content_tags">
            <NameTag name={name} />
            <Tag tag={tag} />
            <FollowTag timeline={timeline} />
          </div>
          <Media news={news} />
          <Timeline timeline={timeline} />
        </div>
        <div className="content_right">
          <Company company={company} />
          <Qrcode />
        </div>
      </div>
      <Copyright />
    </div>
  );
};
export default content;
