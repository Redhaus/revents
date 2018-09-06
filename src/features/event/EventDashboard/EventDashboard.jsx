import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import cuid from 'cuid';

const eventsDashboard = [
  {
    id: "1",
    title: "Trip to Tower of London",
    date: "2018-03-06",
    category: "culture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: "Bob",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    attendees: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    ]
  },
  {
    id: "2",
    title: "Trip to Punch and Judy Pub",
    date: "2018-05-02",
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Punch & Judy, Henrietta Street, London, UK",
    hostedBy: "Tom",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    attendees: [
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      }
    ]
  }
];

class EventDashboard extends Component {


  state = {
    events: eventsDashboard,
    isOpen: false,
    selectedEvent: null
  };

  handleUpdateEvent = (updatedEvent) => {
    this.setState({

      // find event passing in via its id and update that event to the one passed in
      // So not to mutate state Object.assign place updatedEvent into empty Object and assigns it to cloned event
      // Basically it replaces the old object with the new one.
      events: this.state.events.map(event => {
        if (event.id === updatedEvent.id){
          return  Object.assign({}, updatedEvent);
        }else{
          return event;
        }
      }), 
      isOpen: false,
      selectedEvent: null
    })
  }


  //if not passing parms via another function you need another 
  // arrow function so you can pass params via onClick or other event
  handleOpenEvent = (eventToOpen) => () => {
    console.log(eventToOpen)
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true
    })
  }
  
 
  handleFormOpen = () => {
    this.setState({
      selectedEvent: null,
      isOpen: true
    })
  }

  handleCancel = () => {
    this.setState({
      isOpen: false
    })
  }

  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    //spread operator takes existing array and ads new event
    const updatedEvents = [...this.state.events, newEvent]

    this.setState({
      events: updatedEvents, 
      isOpen: false
    })
  }

  handleDeleteEvent = (eventId) => () => {
    // updatedEvents will be the filtered array minus the deleted eventId
    const updatedEvents = this.state.events.filter(e => e.id !== eventId)
    this.setState({
      events: updatedEvents
    })
  } 



  render() {

    const {selectedEvent} = this.state
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList deleteEvent={this.handleDeleteEvent} onEventOpen={this.handleOpenEvent} events={this.state.events} />
        </Grid.Column>

        <Grid.Column width={6}>
          <Button onClick={this.handleFormOpen} positive content="Create Event" />
          {this.state.isOpen && <EventForm updateEvent={this.handleUpdateEvent} selectedEvent={selectedEvent} createEvent={this.handleCreateEvent} handleCancel={this.handleCancel}/>}
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;
