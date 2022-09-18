import './nav.css'
import React from 'react'
import img1 from '../../../public/img/readhub.png'
import img2 from '../../../public/img/wuma.png'
import { NavLink } from "react-router-dom";
import { useState } from 'react';
import Search from '../search/search.jsx'

export const nav = () => {
    const [mask,setMask] = useState(false)
    const close = () => {
        setMask(!mask)
    }
    return (
        <div>
            <Search mask={mask} close={close}/>
            <div className="nav">
                <div className="container">
                    <div className="left1">
                        <div className="logo_box">
                            <img src={img2} height="15px"/>
                            <div className='separate'></div>
                            <img src={img1} width="80px" />
                        </div>
                        <NavLink to='/topic' className = {({ isActive }) => isActive ? 'selected' : 'header'}><div>热门话题</div></NavLink>
                        <NavLink to='/daily' className = {({ isActive }) => isActive ? 'selected' : 'header'}><div>每日早报</div></NavLink>
                        <NavLink to='/news' className = {({ isActive }) => isActive ? 'selected' : 'header'}><div>科技动态</div></NavLink>
                        <NavLink to='/tech' className = {({ isActive }) => isActive ? 'selected' : 'header'}><div>技术资讯</div></NavLink>
                    </div>
                    <div className="right1">
                        <div className="search_box"onClick={() => {
                            setMask(!mask)
                        }}>
                        <div className="searchImg"></div></div>
                        <div className="login"><a href="/login">登陆</a></div>
                    </div>
                </div>
            </div> 
        </div>
    )
}
export default nav