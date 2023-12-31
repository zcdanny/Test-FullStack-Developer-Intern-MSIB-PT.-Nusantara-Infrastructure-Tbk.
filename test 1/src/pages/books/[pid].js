import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiClient from "lib/axios/config.js";
import { getCookie } from "cookies-next";

export default function Book() {
  const [book, setBook] = useState({});
  const [error, setError] = useState("");
  const router = useRouter();
  const { pid } = router.query;

  useEffect(() => {
    if (router.asPath !== router.route) {
    }
    getBook();
  }, [router]);

  const token = getCookie("token");

  const getBook = async () => {
    try {
      await apiClient
        .get(`/api/books/${pid}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const books = response.data;
          setBook(books);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await apiClient
        .delete(`/api/books/${pid}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const books = response.data;
          router.push("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="card h-auto vh-100">
        <div className="card-body">
          <div className="row d-flex flex-column">
            <h5 className="text-center card-title">
              {book.title} <small>({book.pages} Pages)</small>
            </h5>
            <p className="text-center card-text">{book.subtitle}</p>
          </div>
          <div className="row text-center border border-dark py-5">
            <div className="col-md-4">Author: {book.author}</div>
            <div className="col-md-4">Published: {book.published}</div>
            <div className="col-md-4">Publisher: {book.publisher}</div>
          </div>
          <div className="row text-center border border-dark">
            <div className="col-md-4">
              <span></span>
            </div>
            <div className="col-md-4">ISBN: {book.isbn}</div>
            <div className="col-md-4">
              <span></span>
            </div>
          </div>
          <div className="description  py-3">
            Description: {book.description}
          </div>
        </div>
        <div className="p-3 text-center ">
          <a
            href={`/books/${pid}/edit`}
            className="btn btn-dark text-center w-100"
          >
            Edit
          </a>
          <button
            type="button"
            className="btn btn-danger w-100 my-3"
            onClick={(e) => handleDelete(e)}
          >
            Delete
          </button>
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
