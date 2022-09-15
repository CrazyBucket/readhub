import './topic.css';
import React from 'react';
import Nav from '../../components/nav/nav.jsx'
import TopicList from '../../components/topicList/topicList.jsx'
import AdBox from '../../components/adbox/adBox.jsx'
import Backtop from '../../components/backTop/backtop';

export const topic = () => {
    
    return (
        <div>
            <Nav />
            <div className="box">
                <Backtop />
                <TopicList />
                <AdBox />
            </div >
        </div >
    )
}
export default topic