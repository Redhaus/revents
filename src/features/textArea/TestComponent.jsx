import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react';
import { incrementCounter, decrementCounter  } from './TestActions'

class TestComponent extends Component {
  render() {

    const {incrementCounter, decrementCounter, data} = this.props;
    return (
      <div>
        <h1>test component</h1>
        <h3>the answer is: {data}</h3>
        <Button onClick={incrementCounter} color="green" content="+"/>
        <Button onClick={decrementCounter} color="red" content="-"/>
     
      </div>
    )
  }
}

const mapState = (state) => ({
  data: state.test.data
})

const actions = {
  incrementCounter, 
  decrementCounter
}

export default connect(mapState, actions)(TestComponent);