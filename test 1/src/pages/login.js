import Image from "next/image";
import { useState } from "react";
import apiClient from "lib/axios/config.js";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    setError("");

    try {
      await apiClient
        .post("/api/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          setCookie("token", response.data.token, { maxAge: 60 * 6 * 24 });
          router.push("/");
        });
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex flex-fill justify-content-center align-items-center container">
        <div className="row h-50 w-100">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin h-100">
              <div className="d-flex card-body">
                <form
                  className="form-signin w-100 p-3"
                  onSubmit={(e) => handleLogin(e, email, password)}
                >
                  <h5 className="card-title text-center">Sign In</h5>
                  <div className="form-label-group py-2">
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email address"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label for="inputEmail">Email address</label>
                  </div>
                  <div className="form-label-group py-2">
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label for="inputPassword">Password</label>
                  </div>
                  <button
                    className="btn btn-lg btn-dark btn-block text-uppercase w-100 py-2 fw-bold"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Sign in"}
                  </button>
                  <a className="pt-50" href="/register">
                    Create an account
                  </a>
                  <div className="d-flex justify-content-center align-items-center h-50 w-100">
                    <Image
                      className="text-center"
                      src="/logo.svg"
                      width={80}
                      height={80}
                    />
                    {error && <p className="text-danger">User is Invalid</p>}
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

export async function getServerSideProps(context) {
  const { req, res } = context;
  const token = getCookie("token", { req, res });
  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
