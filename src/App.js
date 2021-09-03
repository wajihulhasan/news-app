import './App.css';
import React,{useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App=()=>{
  const apiKey=process.env.REACT_APP_API_KEY
  const[progress,setProgress]=useState(0);

  const updateProgress=(progress)=>{
    setProgress(progress);

  }


    return (
      <Router>
        <NavBar/>
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Switch>
          <Route exact path="/"><News updateProgress={updateProgress} apiKey={apiKey} key="general" country="in" category="general" /></Route>
          <Route exact path="/business"><News updateProgress={updateProgress} apiKey={apiKey} key="business" country="in" category="business" /></Route>
          <Route exact path="/entertainment"><News updateProgress={updateProgress} apiKey={apiKey} key="entertainment" country="in" category="entertainment" /></Route>
          <Route exact path="/health"><News updateProgress={updateProgress} apiKey={apiKey} key="health" country="in" category="health" /></Route>
          <Route exact path="/science"><News updateProgress={updateProgress} apiKey={apiKey} key="science" country="in" category="science" /></Route>
          <Route exact path="/sports"><News updateProgress={updateProgress} apiKey={apiKey} key="sports" country="in" category="sports" /></Route>
          <Route exact path="/technology"><News updateProgress={updateProgress} apiKey={apiKey} key="technology" country="in" category="technology" /></Route>
        </Switch>
      </Router>
    )
}

export default App