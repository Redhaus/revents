import React from "react";
import { connect } from 'react-redux'
import { Grid } from "semantic-ui-react";
import EventDetailChat from "./EventDetailChat";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailSidebar from "./EventDetailSidebar";


// with connect you can pass in store state, and component props
const mapState = (state, compProps) => {
  const eventId = compProps.match.params.id;

  let event = {};

  // if there is an id and array has data filter array to what matches IDBCursor
  // array is returned so get first item in array
  if(eventId && state.events.length > 0){
    event = state.events.filter(event => event.id === eventId)[0]
  }

  return {event}

}

// deconstruct props object by {event} to get the even on props
const EventDetail = ({event}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event} />
        <EventDetailInfo event={event} />
        <EventDetailChat />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventDetailSidebar attendees={event.attendees}/>
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapState)(EventDetail);
