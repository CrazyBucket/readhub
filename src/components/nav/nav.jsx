import './nav.css'
import React from 'react'
import img1 from '../../../public/img/logo.png'
import { NavLink, Route, Routes } from "react-router-dom";

export const nav = () => {
  return (
    <div className="nav">
        <div className="container">
            <div className="left1">
                <div className="logo">
                    <img src={img1} width="130px" />
                </div>
                <NavLink to='/topic' className = {({ isActive }) => isActive ? 'selected' : 'header'}><div>热门话题</div></NavLink>
                <NavLink to='/daily' className = {({ isActive }) => isActive ? 'selected' : 'header'}><div>每日早报</div></NavLink>
                <NavLink to='/news' className = {({ isActive }) => isActive ? 'selected' : 'header'}><div>科技动态</div></NavLink>
                <NavLink to='/tech' className = {({ isActive }) => isActive ? 'selected' : 'header'}><div>技术资讯</div></NavLink>
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