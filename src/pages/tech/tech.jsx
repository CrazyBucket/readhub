import './tech.css';
import React from 'react';
import Nav from '../../components/nav/nav.jsx'
import TechList from '../../components/techList/techList.jsx'
import AdBox from '../../components/adbox/adBox.jsx'
import Backtop from '../../components/backTop/backtop';


const tech = () => {
    
    return (
        <div>
            <Nav />
            <div className="box">
                <Backtop />
                <TechList />
                <AdBox />
            </div >
        </div >
    )
}
export default tech