import { useState } from 'react'
// import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from './pages/Home'
import EditorialBoard from './pages/EditorialBoard'
import MissionPage from './pages/MissionPage'
import VisionPage from './pages/VisionPage'
import AimScopePage from './pages/AimScopePage'
import AuthorsPage from './pages/AuthorsPage'
import PaperSubmissionForm from './pages/PaperSubmissionForm'
import EditorialProcess from './pages/EditorialProcess'
import PublicationEthics from './pages/PublicationEthics'
import ArticleProcessing from './pages/ArticleProcessing'
import ContactPage from './pages/ContactPage'
import Login from './pages/Login'
import Account from './pages/Account'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import CurrentIssue from './pages/CurrentIssue'
import PaperDetails from './pages/PaperDetails'
import Indexing from './pages/Indexing'
import PastIssue from './pages/PastIssue'
import SubmissionDetails from './pages/SubmissionDetails';
import IssueDetails from './pages/IssueDetails';




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ScrollToTop /> 
      <Routes>

           <Route path='/' element={<Home/>}/>
           <Route path='/editorial-board' element={<EditorialBoard/>} />
           <Route path='/about-mission' element={<MissionPage/>} />
           <Route path='/about-vision' element={<VisionPage/>}/>
           <Route path='/aim-scope' element={<AimScopePage/>}/>
           <Route path='/author' element={<AuthorsPage/>}/>
           {/* <Route path='/paper-submit' element={<PaperSubmissionForm/>}/> */}
           <Route path='/editoral-process' element={<EditorialProcess/>}/>
           <Route path='/ethics' element={<PublicationEthics/>}/>
            <Route path='/article' element={<ArticleProcessing/>}/>
           <Route path='/contact' element={<ContactPage/>}/>
           <Route path='/login' element={<Login/>}/>
           <Route path='/account' element={<Account/>}/>
           <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
           <Route path='/user-dashboard' element={<UserDashboard/>}/>
           <Route path='/current-issue' element={<CurrentIssue/>}/>
           <Route path='/past-issue' element={<PastIssue/>}/>
           <Route path='/paper-details/:id' element={<PaperDetails/>}/>
           <Route path='/indexing' element={<Indexing/>}/>
            <Route path="/admin-dashboard/submission/:id" element={<SubmissionDetails />} />
            <Route path='issues/:year/:volume/:issue' element={<IssueDetails/>}/>
      </Routes>
    </>
  )
}

export default App
