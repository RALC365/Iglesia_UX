import React, { Component } from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import Testimonials from './Components/Testimonials';
import Portfolio from './Components/Portfolio';
import Calendar from './Components/Calendar/Calendar1';
import Card from './Components/Card/Card';
import 'firebase/database';
import { firebaseConfig } from './config/config'
import Login from './Components/Login/Login'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {},
    };
    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);
    //requerir la conexion
    //this.app = firebase.initializeApp(firebase);
    /*//referencia a base de datos
    this.db = this.app.database().ref.child('Notes');
    //this.db.push('Nota nueva');*/
  }



  getResumeData() {
    $.ajax({
      url: '/resumeData.json',
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount() {
    this.getResumeData();
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeData.main} />
        <About />
        <Resume data={this.state.resumeData.resume} />
        <Portfolio data={this.state.resumeData.portfolio} />
        <Testimonials />
        <center><Calendar /></center>
        <center><Card /></center>
        <center>
        <Contact /></center>
        <Footer data={this.state.resumeData.main} />

      </div>
    );
  }
}

export default App;
