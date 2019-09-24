import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './style.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
//import db from 'src/config/config.js'
//import db from 'C:/Users/RALC/Desktop/Experencia de Usuario/Proyecto Iglesia UX/Iglesia_UX/src/config/config.js'
import firebaseApp from 'C:/Users/RALC/Desktop/Experencia de Usuario/Proyecto Iglesia UX/Iglesia_UX/src/config/config.js'
//import firebaseApp from '../config/config'

let db = firebaseApp.firestore();
db.settings({timestampsInSnapshots:true});

const localizer = momentLocalizer(moment);

class Calendar1 extends Component {
  state = {
    events :[]
  }

  componentDidMount() {
    db.collection('eventos').get().then((snapShots) => {
      this.setState({
        events: snapShots.docs.map(doc => {
           return {
                  title: doc.data().title,
                  start: doc.data().start,
                  end: doc.data().end,
                  desc: doc.data().desc,}
        })
     })
  }), error => {
     console.log(error)
  }
  console.log(this.state.events);
 }

  render() {
    return (
        <div style={{ height: '500pt'}}>
          <br/>
          <Calendar
            events={this.state.events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
            views={{
              month: true,
              agenda: true,
            }}
          />
          <br/>
        </div>
    );
  }
}
//http://blog.shahzeb.co/getting-react-big-calendar-to-work
//https://stackblitz.com/edit/big-calendar-demo?file=index.js

//https://codesandbox.io/s/react-big-calendar-example-88s9m

export default Calendar1;

/*import React, { Component } from 'react';
import * as dateFns from "date-fns";

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  renderHeader() {
    const dateFormat = "mmmm yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            pasado
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">futuro</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}*/