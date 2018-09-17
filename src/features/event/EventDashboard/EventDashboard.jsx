import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../EventList/EventList";

import { connect } from "react-redux";
import {  deleteEvent } from "../eventActions";

class EventDashboard extends Component {


  //if not passing parms via another function you need another
  // arrow function so you can pass params via onClick or other event
  // handleOpenEvent = eventToOpen => () => {
  //   console.log(eventToOpen);
  //   this.setState({
  //     selectedEvent: eventToOpen,
  //     isOpen: true
  //   });
  // };

 

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };



  render() {
    const { events } = this.props;

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            deleteEvent={this.handleDeleteEvent}
           
            events={events}
          />
        </Grid.Column>

        <Grid.Column width={6}>
         
        </Grid.Column>
      </Grid>
    );
  }
}

//mapStateToProps
const mapState = state => ({
  events: state.events
});

// dispatchActionsToProps
const actions = {

  deleteEvent
};

export default connect(
  mapState,
  actions
)(EventDashboard);
