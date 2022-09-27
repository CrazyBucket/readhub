import './news.css';
import React from 'react';
import Nav from '../../components/nav/nav.jsx'
import NewsList from '../../components/newsList/newsList.jsx'
import AdBox from '../../components/adbox/adBox.jsx'
import Backtop from '../../components/backTop/backtop';


const news = () => {
    
    return (
        <div>
            <Nav />
            <div className="box">
                <Backtop />
                <NewsList />
                <AdBox />
            </div >
        </div >
    )
}
export default news