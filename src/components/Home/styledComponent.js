import styled from 'styled-components'

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => (props.dark ? '#181818' : '#f9f9f9')};
  width: 100%;
`

export const BodyContainer = styled.div`
  display: flex;
  max-height: 91vh;
`
export const Image = styled.img`
  width: 400px;
  height: 300px;
`

export const HomeContent = styled.div`
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
  background-color: ${props => (props.dark ? '#181818' : '#f9f9f9')};
`

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`

export const SearchInput = styled.input`
  width: 400px;
  height: 30px;
  padding-left: 10px;
  margin-right: 5px;
  outline: none;
  color: #94a3b8;
  background-color: ${props => (props.dark ? '#000000' : '#ffffff')};
  border: ${props => (props.dark ? '1px solid #94a3b8' : '1px solid #cccccc')};
`

export const SearchButton = styled.button`
  width: 55px;
  height: 31px;
  cursor: pointer;
  border: ${props => (props.dark ? '1px solid #616e7c' : '1px solid #cccccc')};
  background-color: ${props => (props.dark ? '#212121' : '#e2e8f0')};
  color: ${props => (props.dark ? '#94a3b8' : '#000000')};
`

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60vw;
  min-height: 70vh;
`

export const VideosList = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`

export const VideoCard = styled.li`
  margin: 13px 7px;
  display: flex;
  width: 30vw;
  max-width: 300px;
  flex-direction: column;
  @media screen and (max-width: 568px) {
    max-width: 100%;
    width: 100%;
  }
`

export const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
`

export const ChannelRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

export const ChannelLogo = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 6px;
  align-self: flex-start;
`

export const VideoTitle = styled.p`
  font-size: 17px;
  margin: 4px 0;
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
`

export const ChannelName = styled.p`
  margin: 4px 0;
  color: #616e7c;
`

export const ViewDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #616e7c;
`

export const FailureContainer = styled.div`
  text-align: center;
  padding: 30px;
`

export const RetryButton = styled.button`
  background-color: #4f46e5;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
`

export const NoResultContainer = styled.div`
  text-align: center;
  padding: 40px;
`
