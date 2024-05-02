import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Router, Route, Routes} from 'react-router-dom';
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import styles from "./App.module.css";
import Protected from "./components/Protected/Protected";
import Error from "./pages/Error/Error";

function App() {
  const isAuth = true;
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <div className={styles.layout}>
          <Navbar/>
          <Routes>
            <Route
              path = '/'
              exact
              element={
                <div className={styles.main}>
                  <Home/>
                </div>
              }
            />
            <Route
              path = 'crypto'
              exact
              element={<div className={styles.main}>Crypto Page</div>}
            />
            <Route
              path = 'blogs'
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}>Create Blogs</div>
                </Protected>
              }
            />
            <Route
              path = 'submit'
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}>Submit a blog Page</div>
                </Protected>
              }
            />
            <Route
              path = 'signup'
              exact
              element={<div className={styles.main}>Sign up Page</div>}
            />
            <Route
              path = 'login'
              exact
              element={<div className={styles.main}>Log in Page</div>}
            />

            <Route
              path = '*'
              exact
              element={<div className={styles.main}><Error/></div>}
            />
          </Routes>
          <Footer/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
