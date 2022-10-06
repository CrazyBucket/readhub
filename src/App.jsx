import React from "react";
import Topic from "./pages/topic/topic.jsx";
import Tech from "./pages/tech/tech.jsx";
import Daily from "./pages/daily/daily.jsx";
import News from "./pages/news/news.jsx";
import Login from "./pages/login/login.jsx";
import Content from "./pages/content/content.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import "./Global.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/topic" />}></Route>
      {/* 路由重定向 */}
      <Route path="/topic" element={<Topic />}></Route>
      <Route path="/daily" element={<Daily />}></Route>
      <Route path="/news" element={<News />}></Route>
      <Route path="/tech" element={<Tech />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/topic/:id" element={<Content />}></Route>
    </Routes>
  );
};
export default App;
