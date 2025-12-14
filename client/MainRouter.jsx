import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './src/about'
import Contact from './src/contact'
import Services from './src/services'
import Project from './src/project'
import Layout from './components/Layout'
import Signup from "./src/auth/Signup.jsx";
import Signin from "./src/auth/Signin.jsx";



const MainRouter = () => {
    return (<div>
            <Layout/>
            <div>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/services" element={<Services />} />
                <Route exact path="/project" element={<Project />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/signin" element={<Signin />} />
            </Routes>
            </div>
    </div>
    )
}
export default MainRouter