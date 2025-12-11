import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {FaRegThumbsUp, FaRegThumbsDown} from 'react-icons/fa'
import {RiSaveFill} from 'react-icons/ri'

import ThemeContext from '../../context/ThemeContext'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

import {
  PageBg,
  ContentWrapper,
  HomeContent,
  VideoContainer,
  VideoTitle,
  ViewsLikesContainer,
  ViewDetails,
  ActionContainer,
  ActionButton,
  ActiveButton,
  Separator,
  ProfileContainer,
  ChannelLogo,
  ChannelText,
  Description,
  FailureContainer,
  RetryButton,
  LoaderContainer,
} from './styledComponent'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProcess: 'INPROCESS',
  failure: 'FAILURE',
}

class VideoItemDetail extends Component {
  state = {
    videoDetails: {},
    apiStatus: apiStatusConstants.initial,
    isLiked: false,
    isDisliked: false,
    // isSaved state removed as it is redundant and should be managed by context
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProcess})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {id} = match.params

    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    })

    const data = await response.json()

    if (response.ok) {
      const v = data.video_details

      this.setState({
        videoDetails: {
          id: v.id,
          title: v.title,
          videoUrl: v.video_url,
          thumbnailUrl: v.thumbnail_url,
          channel: {
            name: v.channel.name,
            profileImage: v.channel.profile_image_url,
            subscriberCount: v.channel.subscriber_count,
          },
          viewCount: v.view_count,
          publishedAt: v.published_at,
          description: v.description,
        },
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  /* BUTTON ACTION LOGIC */
  onLike = () => {
    this.setState(prev => ({
      isLiked: !prev.isLiked,
      isDisliked: false,
    }))
  }

  onDislike = () => {
    this.setState(prev => ({
      isDisliked: !prev.isDisliked,
      isLiked: false,
    }))
  }

  // MODIFIED: Accepts isAlreadySaved to determine the action
  onSave = (addVideo, removeVideo, isAlreadySaved) => {
    const {videoDetails} = this.state

    if (isAlreadySaved) {
      removeVideo(videoDetails.id)
    } else {
      addVideo(videoDetails)
    }
    // No local state update needed, context handles re-render
  }

  renderSuccess = (isDark, addVideo, removeVideo, isAlreadySaved) => {
    // isSaved removed from destructuring
    const {videoDetails, isLiked, isDisliked} = this.state
    const {
      title,
      videoUrl,
      viewCount,
      publishedAt,
      channel,
      description,
    } = videoDetails

    const saveButtonText = isAlreadySaved ? 'Saved' : 'Save'
    const SaveButtonComponent = isAlreadySaved ? ActiveButton : ActionButton

    return (
      <VideoContainer>
        <ReactPlayer url={videoUrl} controls width="100%" />

        <VideoTitle dark={isDark}>{title}</VideoTitle>

        <ViewsLikesContainer>
          <ViewDetails dark={isDark}>
            <p>{viewCount} Views</p>
            <p>•</p>
            <p>{formatDistanceToNow(new Date(publishedAt))} ago</p>
          </ViewDetails>

          <ActionContainer>
            {isLiked ? (
              <ActiveButton onClick={this.onLike}>
                <FaRegThumbsUp /> Like
              </ActiveButton>
            ) : (
              <ActionButton onClick={this.onLike}>
                <FaRegThumbsUp /> Like
              </ActionButton>
            )}

            {isDisliked ? (
              <ActiveButton onClick={this.onDislike}>
                <FaRegThumbsDown /> Dislike
              </ActiveButton>
            ) : (
              <ActionButton onClick={this.onDislike}>
                <FaRegThumbsDown /> Dislike
              </ActionButton>
            )}

            {/* MODIFIED: Rely solely on isAlreadySaved from context */}
            <SaveButtonComponent
              onClick={() => this.onSave(addVideo, removeVideo, isAlreadySaved)}
            >
              <RiSaveFill /> {saveButtonText}
            </SaveButtonComponent>
          </ActionContainer>
        </ViewsLikesContainer>

        <Separator dark={isDark} />

        <ProfileContainer>
          <ChannelLogo src={channel.profileImage} alt="channel logo" />

          <div>
            <ChannelText dark={isDark}>{channel.name}</ChannelText>
            <ChannelText>{channel.subscriberCount} subscribers</ChannelText>
            <Description dark={isDark}>{description}</Description>
          </div>
        </ProfileContainer>
      </VideoContainer>
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

      <RetryButton onClick={this.getDetails}>Retry</RetryButton>
    </FailureContainer>
  )

  renderProcess = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </LoaderContainer>
  )

  renderBody = (isDark, addVideo, removeVideo, isAlreadySaved) => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess(isDark, addVideo, removeVideo, isAlreadySaved)
      case apiStatusConstants.failure:
        return this.renderFailure(isDark)
      case apiStatusConstants.inProcess:
        return this.renderProcess()
      default:
        return null
    }
  }

  render() {
    const {videoDetails} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark, addVideo, removeVideo, savedVideos} = value
          const isAlreadySaved = savedVideos.some(
            each => each.id === videoDetails.id,
          )

          return (
            <PageBg dark={isDark} data-testid="videoItemDetails">
              <Navbar />
              <ContentWrapper>
                <Sidebar activeTab="1" isDark={isDark} />
                <HomeContent dark={isDark}>
                  {this.renderBody(
                    isDark,
                    addVideo,
                    removeVideo,
                    isAlreadySaved,
                  )}
                </HomeContent>
              </ContentWrapper>
            </PageBg>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetail
