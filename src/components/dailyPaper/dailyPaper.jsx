import './dailyPaper.css'
import React from 'react'
import moment from 'moment'
import axios from 'axios';
import { useState,useEffect } from 'react';

export const dailyPaper = () => {
  function returnDate(now) {
    switch(now){
      case 7:
        return "星期天";
      case 1:
        return "星期一";
      case 2:
        return "星期二";
      case 3:
        return "星期三";
      case 4:
        return "星期四";
      case 5:
        return "星期五";
      case 6:
        return "星期六";
    }
  }
  const [list, setList] = useState([]);
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
  return (
    <div className='daily'>
      <div className="father">
        <div className="daily_head">
          <img src="../../../public/img/daily.png" width='134px'/>
          <div className="date_box">
            <div className="date">{moment().format('YYYY.MM.DD')}</div>
            <div className='week'>{returnDate(parseInt(moment().format('d')))}</div>
          </div>
        </div>
      </div>
        <ul className='list'>
          {
            list.map((item,index) => 
              <div key={item.id}>
                <a><li className='daily_news'>{item.title}</li></a>
              </div>
            )
          }
        </ul>
    </div>
  )
}
export default dailyPaper