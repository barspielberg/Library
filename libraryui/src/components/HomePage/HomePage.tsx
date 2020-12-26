import React from "react";
import Book from "../../models/Book";
import BookCard from "../UIComponents/BookCard";

const HomePage: React.FC = () => {
  return (
    <div>
      <BookCard
        book={new Book("1", "The title!", "Author author", new Date(), 25.3)}
      />
    </div>
  );
};

export default HomePage;
