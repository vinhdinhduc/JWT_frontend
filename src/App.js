import { BrowserRouter, Route, Link, Routes, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Home from "./pages/Home";
import Default from "./pages/Default";
import NavBar from "./components/navigation/NavBar";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import User from "./components/manageUser/Users";
import { useContext, useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import AppRoutes from "./routes/AppRoutes";
import { UserContext } from "./context/UserContext";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      {user && user.isLoading ? (
        <div className="loading-container">
          <Bars
            height="200"
            width="200"
            color="#4fa94d"
            ariaLabel="Loading data......"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <div className="app-header">
            <NavBar />
          </div>
          <div className="app-container">
            <AppRoutes />
          </div>
        </>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
