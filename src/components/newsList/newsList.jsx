import React from 'react'
import './newsList.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useState,useEffect } from 'react';
import dayjs from 'dayjs';
import { calculate } from '../../utils/calculateTime';

const newsList = () => {
    dayjs().format();
    const [list, setList] = useState([]);
    const id = Date.parse(new Date());
    useEffect(() => {
        axios({
            method:'GET',
            url:'/api/news/list?size=10&type=1&page=1',
        })
            .then(res => {
                let newlist = res.data.data.items
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
            let url = '/api/news/list?size=10&type=1&max_news_id='+list[list.length-1].uid+'&page=1';
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
                list.map((item) =>
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
export default newsList