import React, { Component } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createEvent,  updateEvent } from '../../event/eventActions';
import cuid from 'cuid';



class EventForm extends Component {

  state= {
    event: Object.assign({}, this.props.event)
  }


  onFormSubmit = (evt) => {
    evt.preventDefault();
    // console.log(this.state.event);

    // On submit
    // if event has id it already exists so call update function 
    // if not call the create function
    if(this.state.event.id){
      this.props.updateEvent(this.state.event);
      this.props.history.goBack()
    } else {
      const newEvent = {
        ...this.state.event, 
        id: cuid(),
        hostPhotoURL: '/assets/user.png'
      }
      this.props.createEvent(newEvent)
      this.props.history.push('/events')
    }

  };

  onInputChange = (evt) => {

    const newEvent = this.state.event;
    newEvent[evt.target.name] = evt.target.value

    this.setState({
      event: newEvent
    })
  
  };
  
  render() {

    const {event} = this.state;

    return (
            <Segment>
              <Form onSubmit={this.onFormSubmit}>
                <Form.Field>
                  <label>Event Title</label>
                  <input name="title" value={event.title} onChange={this.onInputChange} placeholder="Event Title" />
                </Form.Field>
                <Form.Field>
                  <label>Event Date</label>
                  <input name="date" value={event.date} onChange={this.onInputChange} type="date" placeholder="Event Date" />
                </Form.Field>
                <Form.Field>
                  <label>City</label>
                  <input name="city" value={event.city} onChange={this.onInputChange} placeholder="City event is taking place" />
                </Form.Field>
                <Form.Field>
                  <label>Venue</label>
                  <input name="venue" value={event.venue} onChange={this.onInputChange} placeholder="Enter the Venue of the event" />
                </Form.Field>
                <Form.Field>
                  <label>Hosted By</label>
                  <input name="hostedBy" value={event.hostedBy} onChange={this.onInputChange} placeholder="Enter the name of person hosting" />
                </Form.Field>
                <Button positive type="submit">
                  Submit
                </Button>
                <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
              </Form>
            </Segment>
    )
  }
}



const mapState = (state, ownProps) => {

  // use ownProps to get id from url
  const eventId = ownProps.match.params.id;

  let event = {
   
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  }

  // if eventId exists and events exist return filter event Arraythat
  // matches event id. get first index in array to get event object
  if(eventId && state.events.length > 0){
    event = state.events.filter( event => event.id === eventId )[0];
  }

  return {
    event
  }
}

const actions = {
  updateEvent,
  createEvent
}

export default connect(mapState, actions)(EventForm);