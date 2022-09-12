import React from 'react'
import Topic from './pages/topic/topic.jsx'
import Tech from './pages/tech/tech.jsx'
import Daily from './pages/daily/daily.jsx'
import News from './pages/news/news.jsx'
import { Routes, Route } from 'react-router-dom'
import './Global.css'

export const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Topic />}></Route>
        <Route path="/topic" element={<Topic />}></Route>
        <Route path="/daily" element={<Daily />}></Route>
        <Route path="/news" element={<News />}></Route>
        <Route path="/tech" element={<Tech />}></Route>
    </Routes>
  )
}
export default App