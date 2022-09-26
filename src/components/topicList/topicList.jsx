import React from 'react'
import './topicList.css'
import dayjs from 'dayjs';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useState,useEffect } from 'react';
import classnames from 'classnames';
import { calculate } from '../../utils/calculateTime';

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
    const jump = (id) => {
        const w = window.open('_blank')
        let url = `/topic/${id}`
        w.location.href = url
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
                                <a onClick={()=> {
                                    jump(item.id)
                                }}>{item.title}</a>
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
                                        <a href={item1.url} target="_blank" className="new">
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
                            <span onClick={()=> {
                                    jump(item.id)
                                }}>查看话题</span>
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