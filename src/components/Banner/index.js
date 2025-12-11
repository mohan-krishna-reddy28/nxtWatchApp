import {Component} from 'react'
import {
  BannerContainer,
  BannerLeft,
  BannerLogo,
  BannerText,
  BannerButton,
  BannerCloseButton,
} from './styledComponents'

class Banner extends Component {
  state = {showBanner: true}

  closeBanner = () => {
    this.setState({showBanner: false})
  }

  render() {
    const {showBanner} = this.state
    const {isDark} = this.props

    if (!showBanner) {
      return null
    }

    return (
      <BannerContainer isDark={isDark} data-testid="banner">
        <BannerLeft>
          <BannerLogo
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="nxt watch logo"
          />
          <div>
            <BannerText isDark={isDark}>
              Buy Nxt Watch Premium prepaid plans with UPI
            </BannerText>

            <BannerButton isDark={isDark} type="button">
              GET IT NOW
            </BannerButton>
          </div>
        </BannerLeft>

        <BannerCloseButton
          type="button"
          onClick={this.closeBanner}
          data-testid="close"
          isDark={isDark}
        >
          ✕
        </BannerCloseButton>
      </BannerContainer>
    )
  }
}

export default Banner
