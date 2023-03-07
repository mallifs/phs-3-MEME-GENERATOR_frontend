import joker from "../images/toys-3644073_640.png"

const Home = () => {
  return (
    <div className="b-contain bg-no-repeat bg-center h-screen" style={{ backgroundImage: `url(${joker})`, backgroundSize: "cover", backgroundPosition: "center center", backgroundRepeat: "no-repeat" }}>
    <div className="flex items-center justify-center">
      <div className="text-3xl text-center mt-14 text-teal-500 w-2/3 font-bold">
        <h1> Happiness is an activity!</h1>
      </div>
    </div>  
  </div>
  
  
  );
};

export default Home;
