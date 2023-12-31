import { setCookie, getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import apiClient from "lib/axios/config.js";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    setError("");
    try {
      await apiClient
        .post("/api/register", {
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        })
        .then((response) => {
          router.push("/login");
        });
    } catch (error) {
      console.log(error);
      setError(error.message);
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
                  <h5 className="card-title text-center">Register</h5>
                  <div className="form-label-group py-2">
                    <input
                      type="text"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Name"
                      name="email"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <label for="inputEmail">Name</label>
                  </div>
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
                  <div className="form-label-group py-2">
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Confirmation Password"
                      name="password"
                      value={password_confirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      required
                    />
                    <label for="inputPassword">Confirmation Password</label>
                  </div>
                  <button
                    className="btn btn-lg btn-dark btn-block text-uppercase w-100 py-2 fw-bold"
                    type="submit"
                  >
                    Register
                  </button>
                  <div className="d-flex justify-content-center align-items-center h-25 w-100">
                    {error && password_confirmation !== password && (
                      <p className="text-danger">
                        Make sure to input valid email and confirmation password
                      </p>
                    )}
                    <Image
                      className="text-center"
                      src="/logo.svg"
                      width={80}
                      height={80}
                    />
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
