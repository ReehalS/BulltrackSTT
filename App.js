import React from 'react'
import Home from './components/Home'
import { LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); 
LogBox.ignoreAllLogs();


const App = () => {     
    return (
        <Home/>
    )
}

export default App