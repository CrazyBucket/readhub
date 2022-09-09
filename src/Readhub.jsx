import axios from "axios";
import React, { useState, useEffect } from 'react';
import './Readhub.css';
import img1 from './logo.png'
import dayjs from 'dayjs/esm/index.js'
import InfiniteScroll from 'react-infinite-scroll-component';
import { createRoot } from 'react-dom/client';
import classnames from 'classnames';

const container = document.getElementById('root');
const root = createRoot(container);

export default function Readhub() {
    dayjs().format();
    const [list, setList] = useState([]);
    const [show,setShow] = useState(false)
    useEffect(() => {
        axios({
            method:'GET',
            url:'/api',
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
    
    //监听滚动距离来决定回到顶部按钮是否显示
    window.onscroll = function scrollListen() {
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollY>=1000){
            setShow(true);
        }else{
            setShow(false);
        }
    }
    useEffect(() => {
        requestList();
    }, [])
    //请求下一组数据
    const requestList = () => {
        setTimeout(async () => {
            let url = '/api?lastCursor=' + list[list.length - 1].order + '&pageSize=10';
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
    //点击返回顶部
    function backTop() {
        const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
        const frameFunc = () => {
        if (document.documentElement.scrollTop > 0) {
            document.documentElement.scrollTop -= 80;
            rAF(frameFunc)
            }
        }
        rAF(frameFunc)
    }
    return (
        <div>
            <div className="nav">
                <div className="container">
                    <div className="left1">
                        <div className="logo">
                            <img src={img1} width="130px" />
                        </div>
                        <a href="#" className="header"><div className="hot" >热门话题</div></a>
                        <a href="#"><div className="header">每日早报</div></a>
                        <a href="#"><div className="header">科技动态</div></a>
                        <a href="#"><div className="header">技术资讯</div></a>
                    </div>
                    <div className="right1">
                        <div className="searchImg"></div>
                        <a href="#"><div className="login">登陆</div></a>
                    </div>
                </div>
            </div>
            <div className="box">
                <div className="left2" >
                    <div className={show?"backtop":""} onClick={() => {
                        backTop()
                    }}>
                       <div className={show?"line":""}></div>
                        <div className={show?"arrow":""}></div>
                   </div>
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
                                <div class="spinner">
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
                <div className="right2">
                    <div className="sponsor">年度赞助商</div>
                    <div className="adBox">
                        <div className="ad1"><img src="https://resource.nocode.com/upload/20210402/39eb5103-5f8f-4492-9866-0c72061ca8b0" alt="error" className="adImg" /></div>
                        <div className="ad2"><img src="https://resource.nocode.com/assets/partner/jksjqyb-retina.png" alt="error" className="adImg" /></div>
                        <div className="ad1"><img src="https://resource.nocode.com/upload/20210402/9fe5c26c-8d14-4659-9ee2-17fe15e9d96d" alt="error" className="adImg" /></div>
                        <div className="ad2"><img src="https://resource.nocode.com/upload/20210402/fd9f97a3-6438-4cc9-a251-7b8f3f9033c8" alt="error" className="adImg" /></div>
                        <div className="ad1"><img src="https://resource.nocode.com/upload/20210402/70f78256-062a-478e-aaca-ebbf68bdf2f6" alt="error" className="adImg" /></div>
                        <div className="ad2"><img src="https://resource.nocode.com/upload/20210402/62052206-9d08-42ca-b647-0f89f8cf8f5c" alt="error" className="adImg" /></div>
                        <div className="ad1"><img src="https://resource.nocode.com/upload/20210402/9c1db9ae-dc07-4c2f-b858-902fc0a8c885" alt="error" className="adImg" /></div>
                        <div className="ad2"><img src="https://resource.nocode.com/upload/20210402/6f4c3437-5efb-451f-947c-329ed73a6426" alt="error" className="adImg" /></div>
                        <div className="ad3">
                            <img src="https://cdn.readhub.cn/next_images/minaCodeFromTopicsScan@2x.png" alt="error" className="adImg2" />
                            <div className="adText">
                                <p>扫描二维码，</p>
                                <p>打开Readhub小程序</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
root.render(<Readhub />);