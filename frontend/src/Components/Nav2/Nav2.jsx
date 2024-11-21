import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import hamburger from "../Assets/icons8-hamburger-menu-100.png";
import axios from "axios";

const DB_URL = process.env.REACT_APP_API_URL;

const Nav2 = () => {
  const [menu, setMenu] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const location = useLocation();

  const menutoggle = () => {
    setMenu((prevMenu) => !prevMenu);
  };

  // Page flags based on current route
  const isyoutubeip = location.pathname.includes("/youtubeip");
  const isinstgramip = location.pathname.includes("/instagramip");
  const isinfluencer = location.pathname.includes("/influencer");
  const isWatsapp = location.pathname.includes("/watsapp");

  const getUserData = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLogged(false);
      setLoading(false);
    } else {
      setIsLogged(true);

      axios
        .get(`${DB_URL}data`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          setAuthUser(res.data);
          setLoading(false);
          console.log("User data:", res.data);
        })
        .catch((err) => {
          console.log("Error fetching user data:", err.message);
          setLoading(false);
          if (err.response && err.response.status === 401) {
            localStorage.removeItem("token");
          }
        });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLinkClick = () => {
    setMenu(false);
  };

  return (
    <Fragment>
      <nav className="navcontainer">
        <img
          className="hamburger"
          src={hamburger}
          alt="menu"
          onClick={menutoggle}
        />
        <h1>Ads Connects.com</h1>

        {/* Menu for Youtube, Instagram, and Watsapp */}
        {(isyoutubeip || isinstgramip || isWatsapp) && (
          <ul className={menu ? "reset" : "navcontent"}>
            {isLogged && <li>Welcome, {authUser?.name || "User"}</li>}

            <li>
              <Link
                to={"/"}
                style={{ color: "white", textDecoration: "none" }}
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>

            {isLogged && !isWatsapp && (
              <li>
                <Link
                  to={"/form/buyer"}
                  style={{ color: "white", textDecoration: "none" }}
                  onClick={handleLinkClick}
                >
                  Register
                </Link>
              </li>
            )}

            {/* Display Register button for Watsapp */}
            {isWatsapp && isLogged && (
              <li>
                <Link
                  to={"/form/watsapp"}
                  style={{ color: "white", textDecoration: "none" }}
                  onClick={handleLinkClick}
                >
                  Register for Watsapp Group
                </Link>
              </li>
            )}

           
          </ul>
        )}

        {/* Menu for Influencer Page */}
        {isinfluencer && (
          <ul className={menu ? "reset" : "navcontent"}>
            <li>
              <Link
                to={"/"}
                style={{ color: "#03045e", textDecoration: "none" }}
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </Fragment>
  );
};

export default Nav2;
