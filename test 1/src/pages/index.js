import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import apiClient from "lib/axios/config.js";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const token = getCookie("token");

  const getBooks = async () => {
    try {
      await apiClient
        .get("/api/books", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          const books = response.data;
          setBooks(books.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-flex flex-fill card h-100">
        <div className="card-body">
          <div className="p-3 text-center ">
            <a href="/books/add" className="btn btn-dark text-center w-100">
              Add Books
            </a>
          </div>
          <div className="row d-flex flex-column">
            <h5 className="text-center card-title">
              Welcome to Nadela Book Store
            </h5>
            <p className="card-text">
              Here's make your life easier to find your favorite book
            </p>
          </div>
          <div className="row">
            {books.map((book) => (
              <a className="card mb-3" key={book.id} href={`/books/${book.id}`}>
                <div className="row g-0">
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        {book.title} <small>({book.pages} Pages)</small>
                      </h5>
                      <p className="card-text">{book.description}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          {book.author} - {book.published}
                        </small>
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card-body">
                      <b className="book-number">ISBN{book.isbn}</b>
                      <p className="card-text">{book.publisher}</p>
                      <a
                        className="card-text"
                        href={book.website}
                        target="_blank"
                      >
                        <small className="text-muted">{book.website}</small>
                      </a>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const token = getCookie("token", { req, res });
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
