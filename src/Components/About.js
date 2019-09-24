import React, { Component } from 'react';
//import db from '../config/config'
import firebaseApp from '../config/config'

let db = firebaseApp.firestore();
db.settings({timestampsInSnapshots:true});

class About extends Component {
   state = {
      aboutus: []
   }

   componentDidMount() {
      db.collection('aboutus').doc('1tx6DLqKnCpwbqZvLeiE').get().then((snapShots) => {
         this.setState({
            aboutus: snapShots.data()
         })
      })
   }


   render() {
      var { aboutus } = this.state;
      var name = aboutus.name;
      var profilepic = "images/profilepic.jpg";
      var bio = aboutus.history;
      var street = aboutus.street;
      var city = aboutus.city;
      var state = aboutus.state;
      var zip = aboutus.zip;
      var phone = aboutus.phone;
      var email = aboutus.email;


      return (
         <section id="about">
            <div className="row">
               <div  className="three columns" >
                  <center>
                  <img className="profile-pic" src={profilepic} alt="Iglesia de la ciudad" />
                  </center>
               </div>
               <div className="nine columns main-col">
                  <h2>Acerca de Nosotros</h2>

                  <p align="justify">{bio}</p>
                  <div className="row">
                     <div className="columns contact-details">
                        <br/>
                        <h2>Ubicación</h2>
                        <p className="address">
                           <span>{name}</span><br />
                           <span>{street}<br />
                              {city} {state}, {zip}
                           </span><br />
                           <span>{phone}</span><br />
                           <span>{email}</span>
                        </p>
                     </div>
                  </div>
               </div>
            </div>

         </section>
      );
   }
}

export default About;
