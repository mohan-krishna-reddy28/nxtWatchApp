import styled from 'styled-components'

export const BannerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  padding: 20px;

  height: 200px;
  background-size: cover;
  margin-bottom: 20px;
  border-radius: 8px;
`

export const BannerLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const BannerLogo = styled.img`
  width: 150px;
`

export const BannerText = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 14px 0;
  color: #1e293b;
`

export const BannerButton = styled.button`
  background-color: transparent;
  border: 1px solid #181818;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  color: #181818;
`

export const BannerImage = styled.img`
  width: 300px;
`

export const BannerCloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  align-self: flex-start;
  font-size: 20px;
  color: #1e293b;
`
