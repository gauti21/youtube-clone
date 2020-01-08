import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchWord: 'reactjs',
      videosList: [],
      statusbar: null ,
      videoUrl: '',
      comment: '',
      commentsList: [],
      statusLike: 'Like',
      errorLoading: false
    };
  }


setSearchValue = (event) => {

this.setState({
  searchWord: event.target.value
})
console.log(this.state.searchWord)
}
searchVideo = async () => {
    this.setState({
    statusbar: "Please Wait",
    errorLoading: false
  })
const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&q=${this.state.searchWord}&type=video&videoDefinition=high&key=AIzaSyCRpGjlMMaW9oOzPtyuIYqs64Av_WMiRdA`);
const myJson = await response.json();
console.log("myJson " , myJson);
if(myJson.items.length == 0) {
  this.setState({
    errorLoading: true
  })
}
this.setState({
  videosList: myJson.items
})
console.log(this.state.videosList)
  this.setState({
    statusbar: "Wait"
  })
}
showMostPopularVideos = async () => {
  this.setState({
    statusbar: 'wait'
  })
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=15&regionCode=IN&key=AIzaSyDAyYIU0uRJadfSwFyYvrEhv86RfTGuqnM`);
const myJson = await response.json();
console.log("myJson " , myJson);
this.setState({
  videosList: myJson.items,
  statusbar: "wait"
})
console.log(this.state.videosList)
this.setState({
  videoUrl: this.state.videosList[0].id.videoId
})
console.log("videoUrl" , this.state.videoUrl)
}
componentDidMount() {
  this.showMostPopularVideos()
  console.log("videosList" , this.state.videosList)
}
setCurrentUrl = (id) => {

  this.setState({
    videoUrl: id
  })
}
setComment = (event) => {
  this.setState({
    comment: event.target.value
  })
}
addComment = () => {
  this.setState({
    commentsList: [...this.state.commentsList, this.state.comment],
    comment: ''
  })
}
likeButton = () => {
  if(this.state.statusLike == "Like"){
  this.setState({
    statusLike: 'Liked'
  })
  } else {
      this.setState({
    statusLike: 'Like'
  })
  }

}



  render() {
    let videos = this.state.videosList.map(eachVideo => (
<img src={eachVideo.snippet.thumbnails.high.url} style={{ height: '300px', cursor:'pointer'}} onClick={()=> this.setCurrentUrl(eachVideo.id.videoId)} />
        ))
    return (
    
      <div >
        <input  style={{ marginLeft:"450px",width:"430px"}} placeholder="Search" onChange={this.setSearchValue} />
        <button  onClick={this.searchVideo}>Search</button>
        <br/>
      <div>
      <hr/>
      
{this.state.errorLoading ? (<h1>Nothing there</h1>): (
  <iframe src={`https://www.youtube.com/embed/${this.state.videoUrl}`} style={{height: '350px', width: '850px', float : 'left'}}/>
)}


      </div>
      <br/>
     
        <br/>
        <br/>
        <br/>
        <div style={{ width: '430px', marginTop:"-70px", float : 'right'}}>
        {this.state.statusbar == "LOADING" ? (<h1>Loading...</h1>) : (videos) }
        </div>
         <div style={{display: 'block', float: 'left'}}>
    <button  style={ {
  marginLeft: "795px" ,backgroundColor:" red",padding:'12px'}}onClick={this.likeButton}>{this.state.statusLike}</button>
{this.state.commentsList.map(eachComment => (
  <li>{eachComment}</li>
))}
         <h3> Comments</h3>
    <input style ={{outline: 0 ,border: '0',
    borderBottom: '2px solid #484a56',width:'300px'}} onChange={this.setComment} placeholder= "upgrad" value={this.state.comment}/>

    <input  style ={{outline: 0,
    border: '0',
    borderBottom: '2px solid #484a56',
    marginLeft:"45px", width:'300px'}}onChange={this.setComment} placeholder="Best Education Content" value={this.state.comment}/> 
    <br/><br/>
    <button  style={{marginLeft:'580px', width:'120px'}}onClick={this.addComment}> Comment</button>
    <button onClick={this.addComment} style={{marginLeft:"20px" ,width:'120px'}}> Cancel</button>
    

      </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));