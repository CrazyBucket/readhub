import './content.css';
import React from 'react';
import Nav from '../../components/nav/nav.jsx'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { calculate } from '../../utils/calculateTime';
import Media from '../../components/media/media.jsx'
import Qrcode from '../../components/content_qrcode/content_qrcode.jsx'

export const content = () => {
    dayjs().format();
    const {id} = useParams();
    const [list, setList] = useState([]);
    const [tag, setTag] = useState([]);
    const [news, setNews] = useState([]);
    useEffect(() => {
        axios({
            method:'GET',
            url:`/api/topic/${id}`,
        })
            .then(res => {
                let newlist = res.data
                setList(newlist)
                setTag(newlist.tags)
                setNews(newlist.newsArray.reverse())
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])
    console.log(list)
    return (
        <div>
            <Nav />
            <div className="box">
                <div className="content_left">
                    <div className="content_title">{list.title}</div>
                    <div className="content_time">{calculate(dayjs(list.createdAt).unix())}</div>
                    <div className="content_text">{list.summary}</div>
                    <div className="content_tags">
                        {
                            tag.map((item) =>
                                <div
                                    key={item.uid}
                                    className="content_tag"
                                >
                                    <div className="content_tagName">{item.name}</div>
                                    <div className="content_add_btn"></div>
                                    订阅
                                </div>
                            )
                        }
                    </div>
                    <Media news={news}/>
                </div>
                <div className="content_right">
                    <Qrcode />
                </div>
            </div>
        </div >
    )
}
export default content