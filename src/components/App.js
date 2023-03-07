import { Routes , Route, useNavigate} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Navbar from "./Navbar"
import Home from "./Home"
import Register from './Register'
import Allmemes from './Allmemes'
import Mymemes from './Mymemes'
import Login from "./Login"


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('')
  const [userId, setUserId] = useState('');
  const [memes, setMemes] = useState([])
  const [myMemes, setMyMemes] = useState([])
  const [search, setSearch] = useState("");
  
  const navigate = useNavigate()

  console.log(myMemes)

// login user
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
  
    fetch('https://dad-jokes-8fzp.onrender.com/login', {
      method: 'POST',
      body: formData,
    }) 
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        setIsAuthenticated(true);
        setUsername(data.username); 
        setUserId(data.userId);
        navigate('/allmemes');
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  console.log(userId)

  const handleLogout = (e) => {
    e.preventDefault();
    fetch('https://dad-jokes-8fzp.onrender.com/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        setIsAuthenticated(false);
        navigate('/login');
      } else {
        throw new Error('Failed to logout');
      }
    })
    .catch(error => console.error(error));
  };
  

// fetch all memes
useEffect(() => {
  fetch("https://dad-jokes-8fzp.onrender.com/memes")
    .then((r) => r.json())
    .then((response) => setMemes(response.memes));
}, []);



//  fetch memes of authenticated user
useEffect(() => {
  fetch(`https://dad-jokes-8fzp.onrender.com/my_memes/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setMyMemes(data.memes);
    })
    .catch((error) => console.error(error));
}, [userId]);

const handleSearchChange = (value) => {
  console.log(value)
  setSearch(value);
};

const displayedMemes = memes.filter((meme) => meme.title.toLowerCase().includes(search.toLowerCase()))


const renderMymemes = () => {
  if (isAuthenticated) {
    return <Mymemes
                userId={userId}
                myMemes={myMemes}
                setMyMemes={setMyMemes}
                handleDeleteMemes={handleDeleteMemes}
                handleAddMemes={handleAddMemes} 
                handleEditMeme={handleEditMeme}
            />
  } else {
    navigate('/login');
  }
}


// edit meme
const handleEditMeme = (id, updatedMeme) => {
  fetch(`https://dad-jokes-8fzp.onrender.com/users/${userId}/memes/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedMeme)
  })
    .then(response => {
      if (response.ok) {
        console.log(response)
        const updatedMemes = myMemes.map(meme => {
          if (meme.id === id) {
            return { ...meme, ...updatedMeme };
          }
          return meme;
        });
        console.log(updatedMemes)
        setMyMemes(updatedMemes);
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
};


  function handleDeleteMemes(id) {
    const updatedmemes = myMemes.filter((myMemes) => myMemes.id !== id);
    console.log("update delete message")
    setMyMemes(updatedmemes);
  }

  function handleAddMemes(newMyMemes) {
    setMyMemes([...myMemes, newMyMemes]);
  }



  return (
    <div className=" "  >
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} username={username} />
      <div className="container mx-auto " >
        <Routes> 
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} handleLogin={handleLogin} />} />
          <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          {isAuthenticated && (
            <>
              <Route path="/allmemes" element={<Allmemes memes={displayedMemes} displayedMemes={displayedMemes} handleSearchChange={handleSearchChange} />} />
              <Route path="/mymemes" element={renderMymemes()} />
            </>
          )}
        </Routes>
        </div>
    </div>
  
  );
}

export default App;