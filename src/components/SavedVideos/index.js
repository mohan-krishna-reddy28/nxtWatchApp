import {MdWhatshot} from 'react-icons/md'
import SavedVideosItem from '../SavedVideosItem'
import ThemeContext from '../../context/ThemeContext'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

import './index.css'

const SavedVideos = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark, savedVideos} = value

      if (savedVideos.length === 0) {
        return (
          <div
            data-testid="savedVideos"
            className={isDark ? 'video-detail-bg dark-bg' : 'video-detail-bg'}
          >
            <Navbar />
            <div className="body-container">
              <Sidebar
                activeTab="4"
                isDark={isDark}
                isSidebarOpen={value.isSidebarOpen}
              />
              <div className={isDark ? 'home-content dark-bg' : 'home-content'}>
                <div className="no-saved-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                    className="no-saved-image"
                  />
                  <h1 className={isDark ? 'dark-text' : ''}>
                    No Saved Videos Found
                  </h1>
                  <p className={isDark ? 'dark-text' : ''}>
                    You can save your videos while watching them
                  </p>
                  <p className={isDark ? 'dark-text' : ''}>
                    Save your videos by clicking a button
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }

      return (
        <div
          data-testid="savedVideos"
          className={isDark ? 'video-detail-bg dark-bg' : 'video-detail-bg'}
        >
          <Navbar />
          <div className="body-container">
            <Sidebar activeTab="4" isDark={isDark} />

            <div className={isDark ? 'saved-content dark-bg' : 'saved-content'}>
              <div className={isDark ? 'saved-nav dark-nav-bg' : 'saved-nav'}>
                <div className="saved-icon-container">
                  <MdWhatshot size={30} />
                </div>
                <h1
                  className={
                    isDark ? 'dark-text saved-heading' : 'saved-heading'
                  }
                >
                  Saved Videos
                </h1>
              </div>

              <ul className="saved-videos-list">
                {savedVideos.map(eachVideo => (
                  <li key={eachVideo.id}>
                    <SavedVideosItem eachVideo={eachVideo} isDark={isDark} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default SavedVideos
