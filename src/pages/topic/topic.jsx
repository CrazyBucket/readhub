import './topic.css';
import React from 'react';
import Nav from '../../components/nav/nav.jsx'
import NewsList from '../../components/newsList/newsList.jsx'
import AdBox from '../../components/adbox/adBox.jsx'
import Backtop from '../../components/backTop/backtop';

export const topic = () => {
    
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
export default topic