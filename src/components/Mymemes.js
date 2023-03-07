import { useState } from "react";
import Delete from "./Delete"
import Addmeme from "./Addmeme"

const Mymeme = ({ userId, myMemes, handleDeleteMemes, handleAddMemes, handleEditMeme }) => {
  const [editableMemeId, setEditableMemeId] = useState(null)

  const allMemes = myMemes && myMemes.length > 0 ? 
    myMemes.map((meme) => (
      <div key={meme.id} className={`text-gray-900 p-2 mb-5 mt-5 bg-slate-100 border ml-20 rounded-lg shadow-md ${
          editableMemeId === meme.id ? "border-gray-200" : ""
        }`}
      >
        <div className="flex justify-end">
          <div className="mr-2">
            <Delete
              userId={userId}
              id={meme.id}
              myMemes={myMemes}
              handleDeleteMemes={handleDeleteMemes}
            />
          </div>
          <div>
            <ion-icon
              name="create-outline"
              onClick={() => setEditableMemeId(meme.id)}
              className="text-2xl cursor-pointer"
            ></ion-icon>
          </div>
        </div>
        <p className="">
          {" "}
          <span className="text-gray-900 font-bold"></span>{" "}
          {editableMemeId === meme.id ? (
            <input
              type="text"
              value={meme.title}
              onChange={(e) => handleEditMeme(meme.id, { ...meme, title: e.target.value })}
            />
          ) : (
            <span className="font-bold">"{meme.title}"</span>
          )}{" "}
        </p>
        <p className="">
          {" "}
          <span className="text-gray-900 font-bold"></span>{" "}
          {editableMemeId === meme.id ? (
            <input
              type="text"
              value={meme.message}
              onChange={(e) => handleEditMeme(meme.id, { ...meme, message: e.target.value })}
            />
          ) : (
            <span className="font-bold">"{meme.message}"</span>
          )}{" "}
        </p>
        {editableMemeId === meme.id ? (
          <button
            onClick={() => {
              setEditableMemeId(null);
            }}
            className="bg-teal-700 rounded-xl text-white py-2 px-4  mt-3"
          >
            Save
          </button>
        ) : null}
      </div>
    ))
  : <p className="text-gray-900 font-bold mt-10 ml-20 text-xl">You don't have any memes. Fill the form and create your own!</p>;

  return (
    <div className="grid grid-cols-2">
      <div className=" ">{allMemes}</div>
      <Addmeme handleAddMemes={handleAddMemes} userId={userId} />
    </div>
  );
};

export default Mymeme;
