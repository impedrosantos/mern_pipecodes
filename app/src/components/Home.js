import React, { Component } from 'react';
import axios from 'axios';
import * as moment from 'moment'
import DatePicker from "react-datepicker";
import { Button, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import ErrorNotice from '../misc/ErrorNotice';
import SuccessNotice from '../misc/SuccessNotice';

class Home extends Component {
  state = {
    data: [],
    question: {
      name: null,
      email: null,
      obs: null,
      date: new Date()
    },
    errorMessage: undefined,
    successMessage: undefined,
  };

  storeQuestion = (question) => {
    axios.post('http://localhost:3001/api/questions', { question })
    .then(response => {
      this.setState({
        successMessage: response.data,
        errorMessage: undefined
      });
    })
    .catch((error) => {
      this.setState({
        errorMessage: error.response.data.message,
        successMessage: undefined
      });
    })
  };

  clearMessage(){
    this.setState({errorMessage: undefined, successMessage: undefined})
  }

  handleDateChange = date => {
    this.setState({ question: {...this.state.question, date: date}});
  };

  preventInputData = e => {
    e.preventDefault();
  };

  render() {
    return (
      <>
        <Container>
          <h1>Add new Question</h1>
          { this.state.successMessage &&
            <SuccessNotice message={this.state.successMessage} clearMessage={() => this.clearMessage()} /> }
          { this.state.errorMessage &&
            <ErrorNotice message={this.state.errorMessage} clearMessage={() => this.clearError()} /> }
            <Form>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Name *</Form.Label>
                    <FormControl
                      type="text"
                      onChange={(e) => this.setState({ question: {...this.state.question, name: e.target.value}})}
                      />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                  <Form.Label>Email *</Form.Label>
                  <FormControl
                    type="email"
                    onChange={(e) => this.setState({ question: {...this.state.question, email: e.target.value}})}
                    />
                </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Date *</Form.Label>
                    <DatePicker
                      selected={this.state.question.date}
                      onChange={this.handleDateChange}
                      onChangeRaw={this.preventInputData}
                      dateFormat="dd/MM/yyyy"
                      filterDate = {(date) => {
                        return moment() < date;
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Obs</Form.Label>
                    <FormControl
                      as="textarea"
                      rows="2"
                      resize="none"
                      onChange={(e) => this.setState({ question: {...this.state.question, obs: e.target.value}})}
                      />
                  </Form.Group>
                </Col>
              </Row>
              <Button onClick={() => this.storeQuestion(this.state.question)}>
                Submit
              </Button>
            </Form>
        </Container>
      </>
    );
  }
}

export default Home;
