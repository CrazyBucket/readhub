import React from 'react'
import './copyright.css'
import img from '../../../public/img/police.png'

export const copyright = () => {
  return (
    <div className='background'>
        <p>© 2022 NoCode 无码科技（杭州）有限公司 浙ICP备17005035号-6 联系我们 加入我们</p>
        <div className='police'><img src={img}/><p>record 浙公网安备 33010902002965 号 浙 B2-20181004</p></div>
    </div>
  )
}
export default copyright