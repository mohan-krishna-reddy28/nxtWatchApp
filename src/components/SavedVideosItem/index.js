import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import './index.css'

const SavedVideosItem = props => {
  const {eachVideo, isDark} = props

  return (
    <div className="saved-video-wrapper">
      <Link
        to={`/videos/${eachVideo.id}`}
        className={isDark ? 'saved-link link-dark' : 'saved-link'}
      >
        <div className="thumbnail-image-container">
          <img
            src={eachVideo.thumbnailUrl}
            alt="video thumbnail"
            className="saved-thumbnail"
          />
        </div>

        <div className="saved-video-details">
          <p className={isDark ? 'dark-text title' : 'title'}>
            {eachVideo.title}
          </p>

          <p className="channel-name">{eachVideo.channel.name}</p>

          <div className="view-details-container">
            <p>{eachVideo.viewCount} Views</p>
            <p>•</p>
            <p>{formatDistanceToNow(new Date(eachVideo.publishedAt))}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SavedVideosItem
