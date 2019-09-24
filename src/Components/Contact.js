// Añadimos React & nuestro archivo de configuración
import React, { Component } from 'react';
import firebaseApp from '../config/config'
//import firebaseConf from './Firebase';
//import notifier from "simple-react-notifications";
//import "simple-react-notifications/dist/index.css";
//import ReactNotification from 'react-notifications-component'
//import 'react-notifications-component/dist/theme.css'
//import { store } from 'react-notifications-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  // minified version is also included
  // import 'react-toastify/dist/ReactToastify.min.css';

const firebaseConf = firebaseApp;

let db = firebaseApp.firestore();
db.settings({ timestampsInSnapshots: true });

/*notifier.configure({
   autoClose: 3000,
   width: 275,
   position: "bottom-right",
   delay: 0,
   closeOnClick: true,
   pauseOnHover: true,
   onlyLast: false,
   rtl: false,
   newestOnTop: true,
   animation: {
      in: "fadeIn",
      out: "fadeOut",
      duration: 400
   }
});*/

/*const notification = {
   title: "Wonderful!",
   message: "Configurable",
   type: "success",
   insert: "top",
   container: "top-right",
   animationIn: ["animated", "fadeIn"],
   animationOut: ["animated", "fadeOut"]
 };*/

class Contact extends Component {

   notify = () => toast("¡Se ha enviado con éxito!");
   // inicializamos nuestro estado inicial
   constructor(props) {
      super(props);
      this.state = {
         form: [],
         alert: false,
         alertData: {},
         aboutus: []
      };
   }

   componentDidMount() {
      db.collection('aboutus').doc('1tx6DLqKnCpwbqZvLeiE').get().then((snapShots) => {
         this.setState({
            aboutus: snapShots.data()
         })
      })
   }


   // Mostrar una alerta cuando se envia el formulario
   showAlert(type, message) {
      this.setState({
         alert: true,
         alertData: { type, message }
      });
      setTimeout(() => {
         this.setState({ alert: false });
      }, 4000)
   }

   // Con esta funcion borramos todos los elementos del formulario
   resetForm() {
      this.refs.contactForm.reset();
   }

   // Funcion para enviar la informacion del formulario a Firebase Database
   sendMessage(e) {
      // Detiene la acción predeterminada del elemento
      e.preventDefault();

      // Creamos un objeto con los valores obtenidos de los inputs
      const params = {
         name: this.inputName.value,
         email: this.inputEmail.value,
         city: this.inputCity.value,
         phone: this.inputPhone.value,
         message: this.textAreaMessage.value
      };

      // Validamos que no se encuentren vacios los principales elementos de nuestro formulario
      if (params.name && params.email && params.phone && params.phone && params.message) {
         // enviamos nuestro objeto "params" a firebase database
         firebaseConf.database().ref('form').push(params).then(() => {
            // Si todo es correcto, actualizamos nuestro estado para mostrar una alerta.
            //this.showAlert('success', 'Your message was sent successfull');
            //notifier.success("Se ha enviado");
            /*store.addNotification({
               notification,
               type: 'danger'
             });*/
            //notifier.error("Something went wrong, try again.");
            

            

         }).catch(() => {
            // Si ha ocurrido un error, actualizamos nuestro estado para mostrar el error 
            //this.showAlert('danger', 'Your message could not be sent');
            //notifier.error("Something went wrong, try again.");
            
         });
         // limpiamos nuestro formulario llamando la funcion resetform
         this.resetForm();
      } else {
         // En caso de no llenar los elementos necesario despliega un mensaje de alerta
         //this.showAlert('warning', 'Please fill the form');
      };
   }

   render() {
      
      //<ReactNotification />
      var { aboutus } = this.state;
      var name = aboutus.name;
      var street = aboutus.street;
      var city = aboutus.city;
      var state = aboutus.state;
      var zip = aboutus.zip;
      var phone = aboutus.phone;

      return (
         <section id="contact">
            {this.state.alert && <div className={`alert alert-${this.state.alertData.type}`} role='alert'>
               <div className='container'>
                  {this.state.alertData.message}
               </div>
            </div>}
            <div className="row section-head">
               <div className="two columns header-col">
                  <h1 align="center"><span>Mantente en contacto</span></h1>
               </div>
               <div className="ten columns">
                  <p className="lead" align="center">¡Tú no estás solo, Cristo y nosotros queremos apoyarte!</p>
               </div>
            </div>
            <div className="row">
               <div className="eight columns" align="center">
                  <form onSubmit={this.sendMessage.bind(this)} ref='contactForm' >
                     <div className='form-group'>
                        <label htmlFor='name'>Nombre</label>
                        <input type='text' className='form-control' id='name'
                           placeholder='Name' ref={name => this.inputName = name}
                        />
                     </div>
                     <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>Correo</label>
                        <input type='email' className='form-control' id='email'
                           placeholder='Email' ref={email => this.inputEmail = email}
                        />
                     </div>
                     <div className='form-group'>
                        <label htmlFor='city'>Ciudad</label>
                        <select className='form-control' id='city' ref={city => this.inputCity = city}>
                           <option value='México'>Honduras</option>
                           <option value='Guadalajara'>Guatemala</option>
                           <option value='México'>El Salvador</option>
                           <option value='México'>Brasil</option>
                           <option value='México'>Canada</option>
                           <option value='México'>Estados Unidos</option>
                           <option value='México'>Argentina</option>
                        </select>
                     </div>
                     <div className='form-group'>
                        <label htmlFor='phone'>Teléfono</label>
                        <input type='number' className='form-control' id='phone'
                           placeholder='+504' ref={phone => this.inputPhone = phone}
                        />
                     </div>
                     <div className='form-group'>
                        <label htmlFor='message'>Mensaje</label>
                        <textarea className='form-control' id='message'
                           rows='3' ref={message => this.textAreaMessage = message}>
                        </textarea>
                     </div>
                     <button type='submit' className='btn btn-primary' onClick={this.notify}>Enviar</button>
                     <ToastContainer />
                  </form>
                  <div id="message-warning"> ¡Ups! Ocurrió un error</div>
                  <div id="message-success">
                     <i className="fa fa-check"></i>El mensaje ha sido enviado ¡Dios lo bendiga!<br />
                  </div>
               </div>


               <aside className="four columns footer-widgets" align="right">
                  <div className="widget widget_contact" >
                     <h4>Dirrección y correo</h4>
                     <p className="address">
                        {name}<br />
                        {street} <br />
                        {city}, {state} {zip}<br />
                        <span>{phone}</span>
                     </p>
                     <br />
                  </div>

                  <div className="widget widget_tweets">
                     <h4 className="widget-title"></h4>
                     <ul id="twitter">
                        <li>
                           <a href="https://www.escuelabiblica.com/testimonios-cristianos.php" target="_blank">
                              <span>
                                 Nuevos testimonios
                        </span>
                           </a>
                           <b><a href="">2 Days Ago</a></b>
                        </li>
                        <li>
                           <a href="https://www.bibliatodo.com/NoticiasCristianas/" target="_blank">
                              <span>
                                 Últimas Noticias Cristianas
                        </span>
                           </a>
                           <b><a href="">3 Days Ago</a></b>
                        </li>
                        <li>
                           <a href="https://friendlychat-aad65.firebaseapp.com" target="_blank">
                              <span>
                                 CHAT
                        </span>
                           </a>
                           <b><a href="">Comunicate en tiempo real con nosotros</a></b>
                        </li>
                     </ul>
                  </div>
               </aside>
            </div>
         </section>

      );
   }
}




/*import React, { Component } from 'react';
//import db from '../config/config'
import firebaseApp from '../config/config'
import notifier from "simple-react-notifications";
import "simple-react-notifications/dist/index.css";


let db = firebaseApp.firestore();
db.settings({timestampsInSnapshots:true});

notifier.configure({
   autoClose: 3000,
   width: 275,
   position: "bottom-right",
   delay: 0,
   closeOnClick: true,
   pauseOnHover: true,
   onlyLast: false,
   rtl: false,
   newestOnTop: true,
   animation: {
     in: "fadeIn",
     out: "fadeOut",
     duration: 400
   }
 });

class Contact extends Component {

   

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
      var street = aboutus.street;
      var city = aboutus.city;
      var state = aboutus.state;
      var zip = aboutus.zip;
      var phone = aboutus.phone;


      return (
         <section id="contact">

            <div className="row section-head">
               <div className="two columns header-col">

                  <h1 align="center"><span>Mantente en contacto</span></h1>

               </div>

               <div className="ten columns">

                  <p className="lead" align="center">¡Tú no estás solo, Cristo y nosotros queremos apoyarte!</p>

               </div>

            </div>

            <div className="row">
               <div className="eight columns" align="center">

                  <form action="" method="post" id="contactForm" name="contactForm">
                     <fieldset>

                        <div>
                           <label htmlFor="contactName">Nombre <span className="required">*</span></label>
                           <input type="text" defaultValue="" size="35" id="contactName" name="contactName" onChange={this.handleChange} />
                        </div>

                        <div>
                           <label htmlFor="contactEmail">Correo <span className="required">*</span></label>
                           <input type="text" defaultValue="" size="35" id="contactEmail" name="contactEmail" onChange={this.handleChange} />
                        </div>

                        <div>
                           <label htmlFor="contactSubject">Tema</label>
                           <input type="text" defaultValue="" size="35" id="contactSubject" name="contactSubject" onChange={this.handleChange} />
                        </div>

                        <div>
                           <label htmlFor="contactMessage">Mensaje <span className="required">*</span></label>
                           <textarea cols="50" rows="15" id="contactMessage" name="contactMessage"></textarea>
                        </div>

                        <div>
                           <button className="submit">Enviar</button>
                           <span id="image-loader">
                              <img alt="" src="images/loader.gif" />
                           </span>
                        </div>
                     </fieldset>
                  </form>

                  <div id="message-warning"> ¡Ups! Ocurrió un error</div>
                  <div id="message-success">
                     <i className="fa fa-check"></i>El mensaje ha sido enviado ¡Dios lo bendiga!<br />
                  </div>
               </div>


               <aside className="four columns footer-widgets" align="right">
                  <div className="widget widget_contact" >

                     <h4>Dirrección y correo</h4>
                     <p className="address">
                        {name}<br />
                        {street} <br />
                        {city}, {state} {zip}<br />
                        <span>{phone}</span>
                     </p>
                     <br/>
                  </div>

                  <div className="widget widget_tweets">
                     <h4 className="widget-title"></h4>
                     <ul id="twitter">
                        <li>
                           <a href="https://www.escuelabiblica.com/testimonios-cristianos.php">
                              <span>
                                 Nuevos testimonios
                        </span>
                           </a>
                           <b><a href="">2 Days Ago</a></b>
                        </li>
                        <li>
                           <a href="https://www.bibliatodo.com/NoticiasCristianas/">
                              <span>
                                 Últimas Noticias Cristianas
                        </span>
                           </a>
                           <b><a href="">3 Days Ago</a></b>
                        </li>
                     </ul>
                  </div>
               </aside>
            </div>
         </section>
      );
   }
}*/

export default Contact;
