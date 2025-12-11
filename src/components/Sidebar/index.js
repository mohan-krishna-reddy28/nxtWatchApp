import {Link} from 'react-router-dom'
import {FaHome} from 'react-icons/fa'
import {MdWhatshot} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'
import {RiSaveFill} from 'react-icons/ri'

import './index.css'

const Sidebar = props => {
  const {activeTab, isDark, isSidebarOpen} = props

  const tabs = [
    {id: '1', label: 'Home', icon: <FaHome />, path: '/'},
    {id: '2', label: 'Trending', icon: <MdWhatshot />, path: '/trending'},
    {id: '3', label: 'Gaming', icon: <SiYoutubegaming />, path: '/gaming'},
    {
      id: '4',
      label: 'Saved Videos',
      icon: <RiSaveFill />,
      path: '/saved-videos',
    },
  ]

  return (
    <div
      className={`
    sidebar-container
    ${isDark ? 'dark-sidebar' : ''}
    ${isSidebarOpen ? 'sidebar-open' : ''}
  `}
    >
      <ul className="tabs-container">
        {tabs.map(tab => (
          <li
            key={tab.id}
            className={
              tab.id === activeTab
                ? 'tab-items-container active-tab'
                : 'tab-items-container'
            }
          >
            <Link
              to={tab.path}
              className={isDark ? 'tab-link text-white' : 'tab-link text-dark'}
            >
              <p className={tab.id === activeTab ? 'tab-red' : ''}>
                {tab.icon}
              </p>
              <p className={isDark ? 'text-white' : 'text-dark'}>{tab.label}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="contacts-container">
        <p className="contacts-heading">CONTACT US</p>

        <div className="social-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
            className="social"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
            className="social"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
            className="social"
          />
        </div>

        <p className="contact-text">
          Enjoy! Now to see your channels and recommendations!
        </p>
      </div>
    </div>
  )
}

export default Sidebar
