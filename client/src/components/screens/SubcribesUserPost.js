import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../../App'
import{Link} from 'react-router-dom'

const Home = () =>{
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('/getsubpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    })

    const likePost = (id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        })
        .then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id==result.id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const unlikePost = (id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        })
        .then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id==result.id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id==result.id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        })
        .catch(err=>{
            console.log(err)
        })

    }
    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const deleteComment = (id)=>{
        fetch(`/deletecomment/${id}`,{
            method:"delete",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="home">
            {
                data.map(item=>{
                    return(
                        <div className="card home-card" key={item._id}>
                        <h5 style={{padding:"8px"}}><Link to={item.postedby._id !== state._id ? "/profile/"+item.postedby._id :"/profile"}>{item.postedby.name}</Link> 
                            {
                                item.postedby._id ==state._id && 
                                <i className="material-icons" style={{float:"right"}}
                                onClick={()=>deletePost(item._id)}>delete</i>
                            }
                        </h5>
                        <div className="card-image">
                            <img src={item.photo}/>
                        </div>
                        <div className="card-content">
                        <i className="material-icons" style={{color:"red"}}>favorite</i>
                            {item.likes.includes(state._id)
                            ?<i className="material-icons" 
                                onClick={()=>{unlikePost(item._id)}}>thumb_down</i>
                            :<i className="material-icons" 
                                onClick={()=>{likePost(item._id)}}>thumb_up</i>
                            }
                            
                            <h6>{item.likes.length} Likes</h6>
                            <h6>{item.title}</h6>
                            <h6>{item.body}</h6>
                            {
                                item.comments.map(record=>{
                                    return(
                                        <h6 key={record._id}>
                                            <span style={{fontWeight:"500"}}>{record.postedby.name}</span> {record.text}
                                            {
                                                record.postedby._id ==state._id && 
                                                <i className="material-icons" style={{float:"right"}}
                                                onClick={()=>deleteComment(record.postedby._id)}>delete</i>
                                            }       
                                        </h6>
                                    )
                                })
                            }
                            <form onSubmit={(e)=>{
                                e.preventDefault()
                                makeComment(e.target[0].value,item._id)
                            }}
                            >
                                <input type="text" placeholder="Add a Comment"/>
                            </form>
                        </div>
                    </div>
                    )
                })
            }
            

        </div>
    )
}

export default Home;