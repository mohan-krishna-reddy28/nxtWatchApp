import styled from 'styled-components'

export const PageBg = styled.div`
  min-height: 100vh;
  background-color: ${props => (props.dark ? '#0f0f0f' : '#f9f9f9')};
`

export const ContentWrapper = styled.div`
  display: flex;
`

export const HomeContent = styled.div`
  width: 90vw;
  max-height: 91vh;
  overflow: auto;
  background-color: ${props => (props.dark ? '#0f0f0f' : '#f9f9f9')};
`

export const VideoContainer = styled.div`
  padding: 20px;
  height: 91vh;
`

export const VideoTitle = styled.p`
  font-size: 24px;
  margin-top: 15px;
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
`

export const ViewsLikesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`

export const ViewDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${props => (props.dark ? '#cccccc' : '#475569')};
`

export const ActionContainer = styled.div`
  display: flex;
  gap: 15px;
`

export const ActionButton = styled.button`
  width: 80px;
  height: 25px;
  display: flex;
  align-items: center;
  gap: 4px;
  border: none;
  cursor: pointer;
  background: transparent;
  color: #64748b; /* inactive color */
  font-size: 14px;
`

export const ActiveButton = styled(ActionButton)`
  color: #2563eb !important; /* active */
`

export const Separator = styled.hr`
  border: 1px solid ${props => (props.dark ? '#383838' : '#e5e5e5')};
  margin-top: 15px;
`

export const ProfileContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`

export const ChannelLogo = styled.img`
  width: 50px;
  height: 50px;
`

export const ChannelText = styled.p`
  margin: 4px 0;
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
`

export const Description = styled.p`
  margin-top: 12px;
  color: ${props => (props.dark ? '#e2e8f0' : '#475569')};
`

export const FailureContainer = styled.div`
  text-align: center;
  padding: 30px;
`

export const RetryButton = styled.button`
  background-color: #4f46e5;
  color: #ffffff;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`
