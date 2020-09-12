import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';
import Pagination from './Pagination';

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
  constructor(props) {
    super(props);
    this.state = {
      question: [],
      nextPage: undefined,
      previousPage: undefined,
      idToDelete: null,
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    params.get('page')
    axios.get('http://localhost:3001/api/questions', { params })
      .then(response => {
        this.setState({
          question: response.data.results,
          nextPage: response.data.next.page,
          previousPage: response.data.previous.page,
        })
        if (!this.state.nextPage && !this.state.previousPage) {
          this.setState({ nextPage: 2 })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  questionsList() {
    return this.state.question.map(currentQuestion => {
      return <Question question={currentQuestion} />;
    })
  }

  render() {
    const nextPage = this.state.nextPage;
    const previousPage = this.state.previousPage;
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
              { this.questionsList() }
            </tbody>
          </Table>
          <Pagination nextPage={nextPage} previousPage={previousPage} />
        </Container>
      </>
    );
  }
}

export default Questions;
