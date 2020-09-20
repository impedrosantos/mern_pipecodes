import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQuestion, clearMessages } from '../actions/questionsActions';
import PropTypes from 'prop-types';
import * as moment from 'moment'
import DatePicker from "react-datepicker";
import { Button, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import ErrorNotice from '../misc/ErrorNotice';
import SuccessNotice from '../misc/SuccessNotice';

class Home extends Component {
  state = {
    question: {
      name: null,
      email: null,
      obs: null,
      date: new Date()
    }
  };

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
          { this.props.successMessage &&
            <SuccessNotice message={this.props.successMessage} clearMessage={() => this.props.clearMessages()} /> }
          { this.props.errorMessage &&
            <ErrorNotice message={this.props.errorMessage} clearMessage={() => this.props.clearMessages()} /> }
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
              <Button onClick={() => this.props.addQuestion(this.state.question)}>
                Submit
              </Button>
            </Form>
        </Container>
      </>
    );
  }
}

Home.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string
}

const mapStateToProps = state => ({
  successMessage: state.questions.successMessage,
  errorMessage: state.questions.errorMessage
})

export default connect(mapStateToProps, { addQuestion, clearMessages })(Home);
