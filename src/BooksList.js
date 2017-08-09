import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import * as utils from './utils';

class BooksList extends React.Component {
  updateBooks(book, shelf) {
    BooksAPI
      .update(book, shelf)
      .then(() => {
        this.props.updateBooksState();
      });
  }

  render() {
    const books = this.props.books;
    const groupedBooks = utils.groupBy(books, 'shelf');
    const shelves = [
      {
        title: 'Currently Reading',
        name: 'currentlyReading',
      },
      {
        title: 'Want to Read',
        name: 'wantToRead',
      },
      {
        title: 'Read',
        name: 'read',
      },
    ];
    console.log('test', groupedBooks)

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              shelves
                .filter((shelf) => shelf.name in groupedBooks)
                .map((shelf) => (
                  <div key={shelf.name} className="bookshelf">
                    <h2 className="bookshelf-title">{shelf.title}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {groupedBooks[shelf.name].map((book) => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select onChange={(e) => this.updateBooks(book, e.target.value)} value={book.shelf}>
                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors.join(', ')}</div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))
            }
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BooksList;