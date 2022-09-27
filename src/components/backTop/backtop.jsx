import React from 'react'
import { useState } from 'react'
import './backTop.css'

const backtop = () =>{
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
    <div className={show?"backtop":""} onClick={() => {
        backTop()
    }}>
        <div className={show?"line":""}></div>
        <div className={show?"arrow":""}></div>
   </div>
  )
}
export default backtop