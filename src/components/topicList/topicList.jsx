import React from 'react'
import './topicList.css'
import dayjs from 'dayjs';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useState,useEffect } from 'react';
import classnames from 'classnames';

export const topicList = () => {
    dayjs().format();
    const [list, setList] = useState([]);
    useEffect(() => {
        axios({
            method:'GET',
            url:'/api/topic',
        })
            .then(res => {
                let newlist = [...res.data.data]
                for (let i = 0; i < newlist.length; i++) {
                    newlist[i].isShow = true
                    newlist[i].isBorder = true
                }
                setList(newlist)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    function overYear(timestamp) {
        if (timestamp === 0 || timestamp == null) {
            return ''
        } else {
            let date = new Date(timestamp * 1000)
            let Y = date.getFullYear() + '-'
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
            let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
            return Y + M + D
        }
    }
    function mouth_Day(timestamp) {
        if (timestamp === 0 || timestamp == null) {
            return ''
        } else {
            let date = new Date(timestamp * 1000)
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
            let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
            return M + D
        }
    }
    //通过时间戳来计算新闻发布时间为多久之前
    function calculate(timestamp) {
        let mistiming = Math.round(new Date() / 1000) - timestamp;
        mistiming = Math.abs(mistiming)
        let arrn = [31536000, 259200, 172800, 86400, 3600, 60, 1];
        let t1 = Math.floor(mistiming / arrn[0])
        if (t1 != 0) {
            return overYear(timestamp)
        }
        let t2 = Math.floor(mistiming / arrn[1])
        if (t2 != 0) {
            return mouth_Day(timestamp)
        }
        let t3 = Math.floor(mistiming / arrn[2])
        if (t3 != 0) {
            return '前天'
        }
        let t4 = Math.floor(mistiming / arrn[3])
        if (t4 != 0) {
            return '昨天'
        }
        let t5 = Math.floor(mistiming / arrn[4])
        if (t5 != 0) {
            return t5 + '小时前'
        }
        let t6 = Math.floor(mistiming / arrn[5])
        if (t6 != 0) {
            return t6 + '分钟前'
        }
        let t7 = Math.floor(mistiming / arrn[6])
        if (t7 != 0) {
            return t7 + '秒前'
        }
    }
    
    
    useEffect(() => {
        requestList();
    }, [])
    //请求下一组数据
    const requestList = () => {
        setTimeout(async () => {
            let url = '/api/topic?lastCursor=' + list[list.length - 1].order + '&pageSize=10';
            axios.get(url)
                .then(res => {
                    let newlist = [...res.data.data]
                    for (let i = 0; i < res.data.data.length; i++) {
                        newlist[i].isShow = true
                        newlist[i].isBorder = true
                    }
                    setList(list.concat(newlist))
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, 1000);
    };
    //点击展开
    const unFold = (id) => {
        let newlist = [...list]
        newlist[id].isShow = !newlist[id].isShow
        for (let i = 0; i < list.length; i++) {
            newlist[i].isBorder = true
        }
        if (!newlist[id].isShow) {
            newlist[id].isBorder = false
        }
        setList(newlist)
    }
  return (
    <div className="left2" >        
        <InfiniteScroll
            className="roll"
            dataLength={list.length}
            next={requestList}
            hasMore={true}
            endMessage={
                <h2 className="load">End</h2>
            }
            loader={
                <div className="center">
                    <div className="spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            }
        >
            {
                list.map((item, index) =>
                    <div
                        key={item.id}
                        className={classnames({
                            fold: item.isShow,
                            unfold: !item.isShow,
                            border: !item.isBorder
                        })}
                        onClick={() => {
                            unFold(index)
                        }}
                    >
                        <div className="head">
                            <div className="title">
                                <a>{item.title}</a>
                                <span className="time">{calculate(dayjs(item.createdAt).unix())}</span>
                            </div>
                        </div>
                        <div className={item.isShow === true ? "content" : "unfoldContent"}>{item.summary}</div>
                        <ul className={item.isShow === true ? "news" : "newsShow"}>
                            {
                                item.newsArray.map((item1) =>
                                    <li
                                        key={item1.id}
                                        className="newsArr"
                                    >
                                        <a href="#" className="new">
                                            {item1.title}
                                        </a>
                                        <div className="from">
                                            {item1.siteName}
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                        <div className={item.isShow === true ? "news" : "seeTopic"}>
                            <span>查看话题</span>
                            <div className="triangle"></div>
                        </div>
                    </div>
                )
            }
        </InfiniteScroll>
    </div>
  )
}
export default topicList