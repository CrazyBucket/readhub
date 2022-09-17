import './content.css';
import React from 'react';
import Nav from '../../components/nav/nav.jsx'
import { useParams } from 'react-router-dom';

export const content = () => {
    const {id} = useParams();
    
    return (
        <div>
            <Nav />
        
        </div >
    )
}
export default content