import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiClient from "lib/axios/config.js";
import { getCookie } from "cookies-next";

function useLoading() {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return loading;
}

export default function Edit() {
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
  const { pid } = router.query;

  useEffect(() => {
    if (!pid) {
      return;
    }
    const initBook = async () => {
      const book = await getBook();

      setTitle(book.title);
      setSubtitle(book.subtitle);
      setDescription(book.description);
      setPages(book.pages);
      setPublisher(book.publisher);
      setPublished(book.published);
      setWebsite(book.website);
      setIsbn(book.isbn);
      setAuthor(book.author);
    };

    initBook();
  }, [router]);

  const token = getCookie("token");

  const getBook = async () => {
    try {
      const response = await apiClient.get(`/api/books/${pid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const books = response.data;
      return books;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiClient
        .put(
          `/api/books/${pid}/edit`,
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
        )
        .then((response) => {
          console.log(response);
        });
      router.push(`/books/${pid}`);
    } catch (error) {
      if (error.response.status === 401) {
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
                <h5 className="card-title text-center">Edit Book</h5>
                <form className="form-signin" onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-label-group py-2">
                    <input
                      type="text"
                      id="inputTitle"
                      className="form-control"
                      placeholder="Title"
                      value={title}
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
                      value={subtitle}
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
                      value={author}
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
                      value={publisher}
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
                      value={pages}
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
                      value={website}
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
                      value={published}
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
                      value={isbn}
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
                      value={description}
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
                      Submit
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
