import React from 'react';
import { render } from 'react-dom';
import Card from 'react-credit-cards';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from './utils';
import styles from './styles.css';

import 'react-credit-cards/es/styles-compiled.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';
import firebaseApp from 'C:/Users/RALC/Desktop/Experencia de Usuario/Proyecto Iglesia UX/Iglesia_UX/src/config/config.js'
const firebaseConf = firebaseApp;

let db = firebaseApp.firestore();
db.settings({ timestampsInSnapshots: true });
var num = false;
export default class App extends React.Component {
  notify = () => toast.success("¡Ha contribuido con la obra de Dios!");
  
  
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null,
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    firebaseConf.database().ref('ofrenda').push(this.state).then(() => {
      console.log('Se hizo')
    }).catch(() => {
      console.log('Cagada')
    });
    this.form.reset();
  };
  componentDidMount() {
    if(num){
      num != num
      this.notify = () => toast.success("¡Ha contribuido con la obra de Dios!");
    }else{
      num != num
      this.notify = () => toast.error("¡Fondos Insuficientes!");
    }
  }

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;
    return (
      <div key="Payment">
        <div className="App-payment">
          <br />
          <br />
          <h1>Ofrendar</h1>
          <h4>¡Colabora con la obra de Dios!</h4>
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Numero de tarjeta"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Nombre Completo"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            <div className="form-actions">
              <button className="btn btn-primary btn-block" onClick={this.notify}>Ofrendar</button>
              <ToastContainer />
            </div>
          </form>
          {formData && (
            <div className="App-highlight">
              
            </div>
          )}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
