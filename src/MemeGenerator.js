// import React, {Component} from "react";

import React, { useEffect, useState } from 'react'

function MemeGenerator() {
    const [memeData, setMemeData] = useState([])
    const [text, setText] = useState({
        topText: '',
        bottomText: ''
    })
    useEffect(()=>{
        fetch("http://127.0.0.1:9292/memes")
            .then(res => res.json())
            .then(data => setMemeData(data))
    },[])

    console.log(memeData)


    function handleTop(event){
        console.log("working!")
        setText({...text, topText: event.target.value})
    }
    function handleBottom(event){
        console.log("working!")
        setText({...text, bottomText: event.target.value})
    }

    function handleSubmit(event){
        event.preventDefault()
        console.log(text)
        // const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        // const randMemeImg = this.state.allMemeImgs[randNum].url
        // this.setState({ randomImg: randMemeImg})
    }

    function randNum(){
        return(Math.floor(Math.random() * 15) + 1)
    }

    return (
        <>
            <form className="meme-form" onSubmit={handleSubmit}>
                <input
                    type = "text"
                    name = "topText"
                    placeholder="Top Text"
                    value = {text.topText}
                    onChange = {handleTop}
                />
                <input
                    type = "text"
                    name = "bottomText"
                    placeholder="Bottom Text"
                    value = {text.bottomText}
                    onChange = {handleBottom}
                />
                <button>Generate</button>
                <h1>{randNum()}</h1>


           
            </form>

            <div className='meme' >
                 <img src={memeData[2].url} alt= "img">

                 </img>
                
                <h2 className="bottom">{text.bottomText}</h2>
            </div>
          
        
        </>
    )
}


// class MemeGenerator extends Component {
//     constructor(){
//         super()
//         this.state = {
//             topText: "",
//             bottomText:"",
//             randomImg: "https://i.imgflip.com/261o3j.jpg",
//             allMemeImgs: []
//         }
//         this.handleChange = this.handleChange.bind(this)
//         this.handleSubmit = this.handleSubmit.bind(this)
//     }
//     componentDidMount() {
//         fetch("http://127.0.0.1:9292/memes")
//             .then(response => response.json())
//             .then(response => {
//                 const {memes} = response.memes
//                 console.log("Hi")
//                 console.log(memes)
//                 this.setState({allMemeImgs: memes})
//             })
//     }
//     handleChange(event){
//          console.log("working!")
//         const {name, value} = event.target
//         this.setState({[name]: value})
//     }
//     handleSubmit(event){
//         event.preventDefault()
//         const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
//         const randMemeImg = this.state.allMemeImgs[randNum].url
//         this.setState({ randomImg: randMemeImg})
//     }
//     render(){
//         return(
//              <div>
//                 <form className="meme-form" onSubmit={this.handleSubmit}>
//                     <input
//                         type = "text"
//                         name = "topText"
//                         placeholder="Top Text"
//                         value = {this.state.topText}
//                         onChange = {this.handleChange}
//                     />
//                     <input
//                         type = "text"
//                         name = "bottomText"
//                         placeholder="Bottom Text"
//                         value = {this.state.bottomText}
//                         onChange = {this.handleChange}
//                     />
//                     <button>Generate</button>
//                 </form>
//                 <div className="meme">
//                     <img src={this.state.randomImg} alt=""/>
//                     <h2 className="top">{this.state.topText}</h2>
//                     <h2 className="bottom">{this.state.bottomText}</h2>
//                 </div>
//              </div>
//         )
//     }
// }
export default MemeGenerator