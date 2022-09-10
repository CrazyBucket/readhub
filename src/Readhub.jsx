import './Readhub.css';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { useState } from 'react';
import Nav from './components/nav/nav.jsx'
import NewsList from './components/newsList/newsList.jsx'
import AdBox from './components/adbox/adBox.jsx'

const container = document.getElementById('root');
const root = createRoot(container);

export default function Readhub() {
    const [show,setShow] = useState(false)
    //监听滚动距离来决定回到顶部按钮是否显示
    window.onscroll = function scrollListen() {
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollY>=1000){
            setShow(true);
        }else{
            setShow(false);
        }
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
            <Nav />
            <div className="box">
                <NewsList />
                <div className={show?"backtop":""} onClick={() => {
                        backTop()
                    }}>
                       <div className={show?"line":""}></div>
                        <div className={show?"arrow":""}></div>
                   </div>
                   <AdBox />
            </div >
        </div >
    )
}
root.render(<Readhub />);