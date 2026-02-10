import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ResponsiveNavbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import BottomBar from './components/BottomBar/BottomBar'
import ChatDashboard from './pages/ChatBotPage/ChatDashboard'
import CourseList from "./pages/Courses/CourseList/CourseList"
import CourseDetail from "./pages/Courses/CourseDetails/CourseDetails"
import InterestQuiz from "./pages/Courses/InterestQuiz/InterestQuiz"
import coursesData from "./data/CourseData"
import WellnessChatbot from './pages/WellnessQuiz/WellnessQuiz'
import VRSpeechTrainer from './components/VRSpeechTrainer.jsx/vr-speech-trainer'
import Streamlit from './components/streamlit/Streamlit'
import ProfilePage from './pages/Profile/profile'
import { CommunityDashboard } from './components/community/community-dashboard'
import { CommunityDetail } from './components/community/community-detail'


function App() {

  return (
    <>
      <ResponsiveNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cognichat" element={<ChatDashboard />} />
        <Route path="/study-zone" element={<CourseList courses={coursesData} />} />
        <Route path="/study-zone/:id" element={<CourseDetail courses={coursesData} />} />
        <Route path="/courseQuiz" element={<InterestQuiz courses={coursesData} />} />
        <Route path="/focus-zone" element={<Streamlit port={8501} page="Meditation_Coach" title="Focus Zone - Meditation Coach" />} />
        <Route path="/destress-zone" element={<Streamlit port={8501} page="Stress_Detection" title="Destress Zone - Stress Detection" />} />
        <Route path="/serenity-zone" element={<Streamlit port={8501} page="Wellness_Chatbot" title="Serenity Zone - Wellness Chatbot" />} />
        <Route path="/vr-speech" element={<VRSpeechTrainer />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/colab-zone" element={<CommunityDashboard />} />
        <Route path="/colab-zone/:id" element={<CommunityDetail />} />
      </Routes>
      <BottomBar />
    </>
  )
}

export default App
