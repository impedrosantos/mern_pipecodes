import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Pagination extends Component {
  render() {
    const { nextPage, previousPage } = this.props;
    return (
      <nav>
        <ul className="pagination justify-content-center">
          {previousPage && 
            <li className="page-item">
            <Link
              to={`/questions/?page=${previousPage}`}
              className="page-link">&#60;</Link>
            </li>
          }
          {nextPage && 
            <li className="page-item">
              <Link
                to={`/questions/?page=${nextPage}`}
                className="page-link">&#62;</Link>
            </li>
          }
        </ul>
      </nav>
    );
  }
}

export default Pagination;
