import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import Banner from '../Banner'
import Sidebar from '../Sidebar'

import ThemeContext from '../../context/ThemeContext'

import {
  PageContainer,
  BodyContainer,
  HomeContent,
  SearchContainer,
  SearchInput,
  SearchButton,
  LoaderWrapper,
  VideosList,
  VideoCard,
  Image,
  Thumbnail,
  ChannelRow,
  ChannelLogo,
  VideoTitle,
  ChannelName,
  ViewDetails,
  FailureContainer,
  RetryButton,
  NoResultContainer,
} from './styledComponent'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProcess: 'INPROCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchText: '',
    videosList: [],
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProcess})

    const jwtToken = Cookies.get('jwt_token')
    const {searchText} = this.state

    const response = await fetch(
      `https://apis.ccbp.in/videos/all?search=${searchText}`,
      {
        method: 'GET',
        headers: {Authorization: `Bearer ${jwtToken}`},
      },
    )

    const data = await response.json()

    if (response.ok) {
      const updated = data.videos.map(each => ({
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
        videosList: updated,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchText = event => {
    this.setState({searchText: event.target.value})
  }

  renderSuccess = isDark => {
    const {videosList} = this.state

    if (videosList.length === 0) {
      return (
        <NoResultContainer>
          <Image
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
          />
          <h1 style={{color: isDark ? '#ffffff' : '#000000'}}>
            No Search Results Found
          </h1>
          <p style={{color: isDark ? '#ffffff' : '#000000'}}>
            Try different key words or remove search filter
          </p>

          <RetryButton type="button" onClick={this.getVideos}>
            Retry
          </RetryButton>
        </NoResultContainer>
      )
    }

    return (
      <VideosList>
        {videosList.map(each => (
          <VideoCard key={each.id}>
            <Link
              to={`/videos/${each.id}`}
              style={{
                textDecoration: 'none',
                color: isDark ? 'white' : 'black',
              }}
            >
              <Thumbnail src={each.thumbnailUrl} alt="video thumbnail" />

              <ChannelRow>
                <ChannelLogo
                  src={each.channel.profileImageUrl}
                  alt="channel logo"
                />

                <div>
                  <VideoTitle dark={isDark}>{each.title}</VideoTitle>
                  <ChannelName>{each.channel.name}</ChannelName>

                  <ViewDetails>
                    <p>{each.viewCount} Views</p>
                    <p>•</p>
                    <p>{formatDistanceToNow(new Date(each.publishedAt))}</p>
                  </ViewDetails>
                </div>
              </ChannelRow>
            </Link>
          </VideoCard>
        ))}
      </VideosList>
    )
  }

  renderFailure = isDark => (
    <FailureContainer>
      <img
        src={
          isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        }
        alt="failure view"
      />
      <h1 style={{color: isDark ? '#ffffff' : '#000000'}}>
        Oops! Something Went Wrong
      </h1>
      <p>Please try again.</p>
      <p>We are having some trouble</p>

      <RetryButton type="button" onClick={this.getVideos}>
        Retry
      </RetryButton>
    </FailureContainer>
  )

  renderProcess = () => (
    <LoaderWrapper data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </LoaderWrapper>
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
    const {searchText} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value

          return (
            <PageContainer dark={isDark} data-testid="home">
              <Navbar />

              <BodyContainer>
                <Sidebar
                  activeTab="1"
                  isDark={isDark}
                  isSidebarOpen={value.isSidebarOpen}
                />

                <HomeContent dark={isDark}>
                  <Banner />

                  <SearchContainer>
                    <SearchInput
                      dark={isDark}
                      type="search"
                      placeholder="Search"
                      value={searchText}
                      onChange={this.onChangeSearchText}
                    />

                    <SearchButton
                      type="button"
                      dark={isDark}
                      data-testid="searchButton"
                      onClick={this.getVideos}
                    >
                      <BsSearch />
                    </SearchButton>
                  </SearchContainer>

                  {this.renderBody(isDark)}
                </HomeContent>
              </BodyContainer>
            </PageContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
