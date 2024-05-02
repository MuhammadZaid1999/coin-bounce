import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css"

function Navbar(){
    const isAuthenticated = false;
    return(
        <>
            <nav className={styles.navbar}>
                <NavLink 
                    to="/"
                    className={`${styles.logo} ${styles.inActiveSytle}`}>
                    CoinBounce
                </NavLink>
                <NavLink
                    to="/"
                    className={({isActive}) => isActive ? styles.activeStyle : styles.inActiveSytle}
                >Home</NavLink>
                <NavLink 
                    to="crypto"
                    className={({isActive}) => isActive ? styles.activeStyle : styles.inActiveSytle}
                >CryptoCurrencies</NavLink>
                <NavLink 
                    to="blogs"
                    className={({isActive}) => isActive ? styles.activeStyle : styles.inActiveSytle}
                >Blogs</NavLink>
                <NavLink 
                    to="submit"
                    className={({isActive}) => isActive ? styles.activeStyle : styles.inActiveSytle}
                >Submit a blog</NavLink>
                {
                    isAuthenticated ? <div><NavLink><button className={styles.signOutButton}>Sign Out</button></NavLink></div>
                    :
                    <div>
                        <NavLink 
                            to="log-in"
                            className={({isActive}) => isActive ? styles.activeStyle : styles.inActiveSytle}
                        > 
                        <button className={styles.logInButton}>Log In</button>
                        </NavLink>
                        <NavLink 
                            to="sign-up"
                            className={({isActive}) => isActive ? styles.activeStyle : styles.inActiveSytle}
                        >
                        <button className={styles.signUpButton}>Sign Up</button> 
                        </NavLink>
                    </div>
                }
            </nav>
            <div className={styles.separator}></div>
        </>
    )
}
export default Navbar;