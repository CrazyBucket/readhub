import './nav.css'
import React from 'react'
import img1 from '/src/logo.png'

export const nav = () => {
  return (
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
            <div className="login"><a href="#">登陆</a></div>
        </div>
    </div>
  </div>
  )
}
export default nav