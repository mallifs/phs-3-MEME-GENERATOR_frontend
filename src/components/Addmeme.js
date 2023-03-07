import {useState} from "react"

const Addmeme = ({ handleAddMemes, userId }) => {
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")
 
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`https://dad-jokes-8fzp.onrender.com/users/${userId}/memes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        message: message,
      }),
    })
      .then((r) => r.json())
      .then((newMessage) => {
        handleAddMemes(newMessage);
        setMessage("");
        setTitle("");
      });
    
  }
  

  return (  
    <div className="mr-10 mt-10">
      <form className="max-w-sm mx-auto  bg-slate-300 rounded-xl p-6  "  onSubmit={handleSubmit}>
        <h1 className="text-gray-900 text-2xl font-bold text-center pb-6">Create a meme</h1>
        <div className="mb-4">
          <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="title">
            first
          </label>
          <input className=" bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-700" 
            name="title"
            type="text"
            placeholder="Enter first sentence..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="message">
            second
          </label>
          <textarea
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-700" 
            id="message"
            name="message"
            rows="3"
            placeholder="enter second sentence..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-teal-800 hover:bg-teal-500 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline" type="submit">
            create
          </button>
        </div>
      </form>
    </div>
  );
}
 
export default Addmeme;