import React from 'react'

const ThemeContext = React.createContext({
  isDark: false,
  changeTheme: () => {},
  savedVideos: [],
  addVideo: () => {},
  removeVideo: () => {},
})

export default ThemeContext
