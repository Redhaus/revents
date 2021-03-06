import React, { Component } from "react";
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { Link } from 'react-router-dom'

class EventListItem extends Component {
  render() {
    const { event,  deleteEvent } = this.props; //onEventOpen,

    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as="a">{event.title}</Item.Header>
                <Item.Description>
                  Hosted by <a>{event.hostedBy}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {event.date} |<Icon name="marker" />{" "}
            {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {/* if event attendees = event.attendees && */}
            {event.attendees &&
              event.attendees.map(attendee => (
                <EventListAttendee key={attendee.id} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          {/* event in this case is the event item not a click event */}
          
          <Button
            onClick={deleteEvent(event.id)}
            as="a"
            color="red"
            floated="right"
            content="Delete"
          />
          
          <Button

            as={Link}
            to={`/event/${event.id}`}
            color="teal"
            floated="right"
            content="View"
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
