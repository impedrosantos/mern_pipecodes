import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { showQuestion } from '../actions/questionsActions';
import PropTypes from 'prop-types';

class ShowQuestion extends Component {
  componentDidMount() {
    this.props.showQuestion(this.props.match.params.id);
  };

  render() {
    const { question } = this.props;
    return (
      <>
        <Container>
          <h1>Question</h1>
          <Table striped bordered hover>
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Obs.</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{question.name}</td>
                <td>{question.email}</td>
                <td>{question.obs}</td>
                <td>{question.date && question.date.substring(0,10)}</td>
              </tr>
            </tbody>
          </Table>
          <Link to={'/questions'}>Back to Questions</Link>
        </Container>
      </>
    );
  }
}

ShowQuestion.propTypes = {
  showQuestion: PropTypes.func.isRequired,
  question: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    date: PropTypes.string,
    obs: PropTypes.string
  }).isRequired,
}

const mapStateToProps = state => ({
  question: state.questions.getQuestion,
})

export default connect(mapStateToProps, { showQuestion })(ShowQuestion);
