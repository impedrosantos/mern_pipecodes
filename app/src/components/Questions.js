import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';
import Pagination from './Pagination';
import { getQuestions } from '../actions/questionsActions';
import PropTypes from 'prop-types';

const Question = props => (
  <tr>
    <td>{props.question.name}</td>
    <td>{props.question.email}</td>
    <td>{props.question.obs}</td>
    <td>{props.question.date.substring(0,10)}</td>
    <td>
      <Link to={`/id/${props.question._id}`}>view</Link>
    </td>
  </tr>
)

class Questions extends Component {
  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    params.get('page')
    this.props.getQuestions(params);
  }

  questionsList = () => {
    return this.props.question.map(currentQuestion => {
      return <Question key={currentQuestion._id} question={currentQuestion} />;
    })
  }

  render() {
    const { question, nextPage, previousPage } = this.props;
    return (
      <>
        <Container>
          <h1>Questions</h1>
          <Table striped bordered hover>
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Obs.</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { question && this.questionsList() }
            </tbody>
          </Table>
          <Pagination nextPage={nextPage} previousPage={previousPage} />
        </Container>
      </>
    );
  }
}

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.object
}

const mapStateToProps = state => ({
  question: state.questions.question,
  nextPage: state.questions.nextPage,
  previousPage: state.questions.previousPage,
})

export default connect(mapStateToProps, { getQuestions })(Questions);
