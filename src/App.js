import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BooksList from './BooksList';
import Search from './Search';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  updateBooksState() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  componentDidMount() {
    this.updateBooksState();
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          // component={BooksList}
          render={() => (
            <BooksList
              books={this.state.books}
              updateBooksState={this.updateBooksState.bind(this)}
            />
          )}
        />
        <Route
          exact
          path="/search"
          component={Search}
        />
      </div>
    );
  }
}

export default BooksApp;
