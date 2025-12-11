import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsMoon} from 'react-icons/bs'
import {MdWbSunny} from 'react-icons/md'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const Navbar = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark, changeTheme, toggleSidebar} = value
      const {history} = props

      const logout = () => {
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const popupStyle = {
        width: '320px',
        height: '150px',
        backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
        color: isDark ? '#ffffff' : '#000000',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
      }

      const popupContent = close => (
        <div className="logout-popup-container">
          <p>Are you sure, you want to logout</p>
          <div className="logout-btns">
            <button
              type="button"
              className="popup-button-cancel"
              onClick={close}
            >
              Cancel
            </button>

            <button
              type="button"
              className="popup-button-confirm"
              onClick={logout}
            >
              Confirm
            </button>
          </div>
        </div>
      )

      return (
        <nav
          className={isDark ? 'nav-container nav-dark-theme' : 'nav-container'}
        >
          {/* LOGO */}
          <Link to="/" className="nav-logo-container">
            <img
              src={
                isDark
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
              }
              alt="website logo"
              className="logo"
            />
          </Link>

          <div className="options-container">
            {/* THEME BUTTON */}
            <button
              data-testid="theme"
              type="button"
              className="theme-btn"
              onClick={changeTheme}
            >
              {isDark ? (
                <MdWbSunny size={24} style={{color: 'white'}} />
              ) : (
                <BsMoon size={24} />
              )}
            </button>

            {/* PROFILE ICON (Desktop only) */}
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              className="profile"
            />

            {/* HAMBURGER MENU ICON */}
            <button
              className="hamburger-btn"
              type="button"
              onClick={toggleSidebar}
            >
              <GiHamburgerMenu
                size={28}
                style={{color: isDark ? 'white' : 'black'}}
              />
            </button>

            {/* MOBILE LOGOUT ICON -> Popup */}
            <Popup
              modal
              trigger={
                <button type="button" className="mobile-logout-btn">
                  <FiLogOut
                    size={26}
                    style={{color: isDark ? 'white' : 'black'}}
                  />
                </button>
              }
              contentStyle={popupStyle}
            >
              {popupContent}
            </Popup>

            {/* DESKTOP LOGOUT POPUP */}
            <Popup
              modal
              trigger={
                <button
                  type="button"
                  className={isDark ? 'logout-dark-btn' : 'logout-light-btn'}
                >
                  Logout
                </button>
              }
              contentStyle={popupStyle}
            >
              {popupContent}
            </Popup>
          </div>
        </nav>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Navbar)
