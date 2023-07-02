import React,{useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {UserContext} from '../App'

const NavBar = () => {
    const {state,dispatch} = useContext(UserContext)
    const history = useNavigate()
    const renderList = ()=>{
        if(state){
            return [
                <li class="nav-item"><Link to="/create">Create Post</Link></li>,
                <li class="nav-item"><Link to="/profile">Profile</Link></li>,
                <li class="nav-item"><Link to="/mysubcribedposts">Subscribed Posts</Link></li>,
                <li class="nav-item">
                    <button className="btn #c62828 red darken3" type="submit" onClick={()=>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/signin')
                    }}>SignOut</button>
                </li>
            ]
        }else{
            return [
                <li class="nav-item"><Link to="/signin">SignIn</Link></li>,
                <li class="nav-item"><Link to="/signup">SignUp</Link></li>
            ]
        }
    }
    return(
        <nav  className="navbar navbar-expand-lg navbar-light bg-light white">
            <Link to={state?"/":"/signin"} className="navbar-brand brand-logo left"  style={{marginLeft:"10px"}}>InstaBook</Link>
            <button class="navbar-toggler right border-0" type="button" data-toggle="collapse"
                    data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                    aria-label="Toggle navigation">
                <i class="fa fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ml-auto mobile-nav right" style={{marginRight:"10px"}}>
                    {renderList()}    
                </ul>
            </div>
        </nav>
    )
}

{/*     <nav>
            <div className="nav-wrapper white" style={{color:"black"}}>
                <Link to={state?"/":"/signin"} className="brand-logo left"  style={{marginLeft:"10px"}}>InstaBook</Link>
                <ul id="nav-mobile" className="right" style={{marginRight:"10px"}}>
                    {renderList()}    
                </ul>
            </div>
        </nav> */}

export default NavBar;