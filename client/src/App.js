import React,{useEffect,useContext,createContext,useReducer} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route, Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import SignIn from './components/screens/Login'
import Profile from './components/screens/Profile'
import SignUp from './components/screens/SignUp';
import CreatePost from './components/screens/CreatePost';
import {initials,reducer} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribesUserPost from './components/screens/SubcribesUserPost'

export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    
    if(user){
      dispatch({type:"USER",payload:user})
      
    }
    else{
      history.push('/signin')
    }
  },[])
  return (
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/signin">
        <SignIn/>
      </Route>
      <Route exact path="/profile">
        <Profile/>
      </Route>
      <Route path="/signup">
        <SignUp/>
      </Route>
      <Route path="/create">
        <CreatePost/>
      </Route>
      <Route path="/profile/:userid">
        <UserProfile/>
      </Route>
      <Route path="/mysubcribedposts">
        <SubscribesUserPost/>
      </Route>
    </Switch>
  );
}

function App() {
  const [state,dispatch] = useReducer(reducer,initials)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <NavBar/>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
