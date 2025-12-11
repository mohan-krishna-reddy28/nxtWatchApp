import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ThemeContext from './context/ThemeContext'

import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetail from './components/VideoItemDetail'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

class App extends Component {
  state = {
    isDark: false,
    savedVideos: [],
    isSidebarOpen: false,
  }

  toggleSidebar = () => {
    this.setState(prev => ({isSidebarOpen: !prev.isSidebarOpen}))
  }

  changeTheme = () => {
    this.setState(prev => ({isDark: !prev.isDark}))
  }

  addVideo = video => {
    this.setState(prev => {
      const alreadySaved = prev.savedVideos.some(v => v.id === video.id)
      if (alreadySaved) return null
      return {savedVideos: [...prev.savedVideos, video]}
    })
  }

  removeVideo = id => {
    this.setState(prev => ({
      savedVideos: prev.savedVideos.filter(each => each.id !== id),
    }))
  }

  render() {
    const {isDark, savedVideos, isSidebarOpen} = this.state

    return (
      <ThemeContext.Provider
        value={{
          isDark,
          changeTheme: this.changeTheme,
          savedVideos,
          addVideo: this.addVideo,
          isSidebarOpen,
          removeVideo: this.removeVideo,
          toggleSidebar: this.toggleSidebar,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetail}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
