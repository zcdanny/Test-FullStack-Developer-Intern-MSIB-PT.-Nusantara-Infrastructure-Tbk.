import { useRouter } from "next/router";
import { useState } from "react";
import apiClient from "lib/axios/config.js";
import { getCookie, deleteCookie } from "cookies-next";

export default function Add() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [pages, setPages] = useState("");
  const [publisher, setPublisher] = useState("");
  const [published, setPublished] = useState("");
  const [website, setWebsite] = useState("");
  const [isbn, setIsbn] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const token = getCookie("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post(
        "/api/books/add",
        {
          isbn: isbn,
          title: title,
          subtitle: subtitle,
          author: author,
          published: published,
          publisher: publisher,
          pages: Number(pages),
          description: description,
          website: website,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      router.push("/");
    } catch (error) {
      if (error.response.status === 401) {
        deleteCookie("token");
        router.push("/login");
        return;
      }
      setError(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Add Book</h5>
                <form className="form-signin" onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-label-group py-2">
                    <input
                      type="text"
                      id="inputTitle"
                      className="form-control"
                      placeholder="Title"
                      required
                      onChange={(e) => setTitle(e.target.value)}
                      autofocus
                    />
                    <label for="inputTitle">Title</label>
                  </div>
                  <div className="form-label-group py-2">
                    <input
                      type="text"
                      id="inputSubTitle"
                      className="form-control"
                      placeholder="SubTitle"
                      required
                      onChange={(e) => setSubtitle(e.target.value)}
                    />
                    <label for="inputSubTitle">SubTitle</label>
                  </div>
                  <div className="form-label-group py-2">
                    <input
                      type="text"
                      id="inputAuthor"
                      className="form-control"
                      placeholder="Author"
                      onChange={(e) => setAuthor(e.target.value)}
                      required
                    />
                    <label for="inputAuthor">Author</label>
                  </div>
                  <div className="form-label-group py-2">
                    <input
                      type="text"
                      id="inputPublisher"
                      className="form-control"
                      placeholder="Publisher"
                      onChange={(e) => setPublisher(e.target.value)}
                      required
                    />
                    <label for="inputPublisher">Publisher</label>
                  </div>
                  <div className="form-label-group py-2">
                    <input
                      type="number"
                      id="inputPages"
                      className="form-control"
                      placeholder="Pages"
                      onChange={(e) => setPages(e.target.value)}
                      required
                    />
                    <label for="inputPages">Pages</label>
                  </div>
                  <div className="form-label-group py-2">
                    <input
                      type="text"
                      id="inputWebsite"
                      className="form-control"
                      placeholder="Website"
                      onChange={(e) => setWebsite(e.target.value)}
                      required
                    />
                    <label for="inputWebsite">Website</label>
                  </div>
                  <div className="form-label-group py-2">
                    <input
                      type="text"
                      id="inputYear"
                      className="form-control"
                      placeholder="Year"
                      onChange={(e) => setPublished(e.target.value)}
                      required
                    />
                    <label for="inputYear">Year</label>
                  </div>
                  <div className="form-label-group py-2">
                    <input
                      type="text"
                      id="inputISBN"
                      className="form-control"
                      placeholder="ISBN"
                      onChange={(e) => setIsbn(e.target.value)}
                      required
                    />
                    <label for="inputISBN">ISBN</label>
                  </div>
                  <div className="form-label-group py-2">
                    <textarea
                      type="text"
                      id="inputDescription"
                      className="form-control"
                      placeholder="Description"
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                    <label for="inputDescription">Description</label>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-lg btn-dark btn-block text-uppercase"
                      type="submit"
                    >
                      Add Book
                    </button>
                  </div>
                  <div className="d-flex justify-content-center">
                    {error && (
                      <p className="text-danger">
                        Insert all form with right format!
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
