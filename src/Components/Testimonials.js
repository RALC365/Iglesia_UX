import React, { Component } from 'react';
//import { getHeapSnapshot } from 'v8';
//import db from '../config/config'
import firebaseApp from '../config/config'

let db = firebaseApp.firestore();
db.settings({timestampsInSnapshots:true});

class Testimonials extends Component {
   state = {
      testimonials: []
   }

   componentDidMount() {
      db.collection('testimonios').get().then((snapShots) => {
         this.setState({
            testimonials: snapShots.docs.map(doc => {
               //return {id: doc.text, data:doc.user}
               return <li key={doc.id}>
                  <blockquote>
                     <p>{doc.data().text}</p>
                     <cite>{doc.data().user}</cite>
                  </blockquote>
               </li>
            })
         })
      }), error => {
         console.log(error)
      }
      //console.log({testimonials});
   }

   render() {  
      var {testimonials} = this.state;
      return (
         <section id="testimonials">
            <div className="text-container">
               <div className="row">

                  <div className="two columns header-col">
                     <h1><span>Testimonios</span></h1>
                  </div>

                  <div className="ten columns flex-container">
                     <hr></hr>
                     <ul className="slides">
                        {testimonials}
                     </ul>
                  </div>
               </div>
            </div>
         </section>
      );
   }
}

export default Testimonials;
