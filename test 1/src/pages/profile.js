import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie, deleteCookie } from "cookies-next";
import apiClient from "lib/axios/config.js";

export default function Profile() {
  const [user, setUser] = useState({});
  const router = useRouter();
  const { pid } = router.query;

  useEffect(() => {
    if (router.asPath !== router.route) {
    }
    getUser();
  }, [router]);

  const token = getCookie("token");

  const getUser = async () => {
    try {
      await apiClient
        .get(`/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const user = response.data;
          setUser(user);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await apiClient
        .delete(`/api/user/logout`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const data = response.data;
          deleteCookie("token");
          router.push("/login");
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
            <h5 className="text-center card-title">{user.name}</h5>
          </div>
          <div className="row text-center border border-dark">
            <div className="col-md-4">
              <span></span>
            </div>
            <div className="col-md-4">{user.email}</div>
            <div className="col-md-4">
              <span></span>
            </div>
          </div>
        </div>
        <div className="p-3 text-center ">
          <button
            type="button"
            className="btn btn-danger w-100 my-3"
            onClick={(e) => handleLogout(e)}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
