import React, { Component } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class ShowQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      date: '',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/questions/id/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.question.name,
          email: response.data.question.email,
          date: response.data.question.date,
        })
      })
  };

  render() {
    const questionData = this.state;
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
                <td>{questionData.name}</td>
                <td>{questionData.email}</td>
                <td>{questionData.obs}</td>
                <td>{questionData.date.substring(0,10)}</td>
              </tr>
            </tbody>
          </Table>
          <Link to={'/questions'}>Back to Questions</Link>
        </Container>
      </>
    );
  }
}

export default ShowQuestion;
