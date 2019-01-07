import React, { Component } from "react";
import axios from "axios";
import { observer } from "mobx-react";

// Components
import BookTable from "./BookTable";
import Loading from "./Loading";
import bookStore from "./stores/BookStore";
import authorStore from "./stores/AuthorStore";

class AuthorDetail extends Component {
  render() {
    let authorID = this.props.match.params.authorID;
    const author = authorStore.getAuthorById(authorID);
    const books = author.books.map(bookID => bookStore.getBookById(bookID));
    console.log("[AuthorDetail.js] " + author.books);

    if (authorStore.loading) {
      return <Loading />;
    } else {
      return (
        <div className="author">
          <div>
            <h3>{author.first_name + " " + author.last_name}</h3>
            <img
              src={author.imageUrl}
              className="img-thumbnail img-fluid"
              alt={author.first_name + " " + author.last_name}
            />
          </div>
          <BookTable books={books} />
        </div>
      );
    }
  }
}

export default observer(AuthorDetail);
