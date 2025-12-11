import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdWhatshot} from 'react-icons/md'
import SavedVideosItem from '../SavedVideosItem'
import ThemeContext from '../../context/ThemeContext'

import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProcess: 'INPROCESS',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosList: [],
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProcess})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedList = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))

      this.setState({
        videosList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccess = isDark => {
    const {videosList} = this.state

    return (
      <ul className="trending-video-list">
        {videosList.map(eachVideo => (
          <SavedVideosItem
            key={eachVideo.id}
            eachVideo={eachVideo}
            isDark={isDark}
          />
        ))}
      </ul>
    )
  }

  renderFailure = isDark => (
    <div className="failure-container">
      <img
        src={
          isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        }
        alt="failure"
        className="failure-image"
      />
      <h1 className={isDark ? 'dark-text' : ''}>Oops! Something Went Wrong</h1>
      <p>Please try again later.</p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.getTrendingVideos}
      >
        Retry
      </button>
    </div>
  )

  renderProcess = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderBody = isDark => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess(isDark)
      case apiStatusConstants.failure:
        return this.renderFailure(isDark)
      case apiStatusConstants.inProcess:
        return this.renderProcess()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value

          return (
            <div
              data-testid="trending"
              className={isDark ? 'trending-bg dark-bg' : 'trending-bg'}
            >
              <Navbar />
              <div className="body-container">
                <Sidebar
                  activeTab="2"
                  isDark={isDark}
                  isSidebarOpen={value.isSidebarOpen}
                />

                <div
                  className={
                    isDark ? 'trending-content dark-bg' : 'trending-content'
                  }
                >
                  <div
                    className={
                      isDark
                        ? 'trending-header dark-theme-header'
                        : 'trending-header'
                    }
                  >
                    <div className="saved-icon-container">
                      <MdWhatshot size={30} />
                    </div>
                    <h1
                      className={
                        isDark ? 'dark-text saved-heading' : 'saved-heading'
                      }
                    >
                      Trending
                    </h1>
                  </div>

                  {this.renderBody(isDark)}
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Trending
