import React from 'react'
import './techList.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useState,useEffect } from 'react';
import dayjs from 'dayjs';

export const techList = () => {
    dayjs().format();
    const [list, setList] = useState([]);
    useEffect(() => {
        axios({
            method:'GET',
            url:'/api/news/list?size=10&type=2&page=1',
        })
            .then(res => {
                let newlist = res.data.data.items
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
            let url = '/api/news/list?size=10&type=2&max_news_id='+list[list.length-1].uid+'&page=1';
            axios.get(url)
                .then(res => {
                    console.log(res)
                    let newlist = res.data.data.items
                    setList(list.concat(newlist))
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, 1000);
    };

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
                        className="fold"
                    >
                        <div className="head">
                            <div className="title">
                                <a href={item.url} target="_blank">{item.title}</a>
                            </div>
                        </div>
                        <div className="content">{item.summary}</div>
                        <div className="bottom">
                            <div className="author">{item.siteNameDisplay}</div>
                            <div className="time">{calculate(dayjs(item.createdAt).unix())}</div>
                        </div>
                    </div>
                )
            }
        </InfiniteScroll>
    </div>
  )
}
export default techList