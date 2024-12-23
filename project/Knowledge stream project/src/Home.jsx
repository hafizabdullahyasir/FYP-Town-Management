// import Navbar from "./components/Navbar";
// import Searchbar from "./components/Searchbar";
// import Hero from "./Hero";

// const Home = () => {
//   const backgroundImageStyle = {
//     backgroundImage: "url('/images/main.png')",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     height: "100vh",
//     width: "100%", // Corrected: Added quotes around 100%
//   };

//   return (
//     <div className="" style={backgroundImageStyle}>
//       <Navbar />
//       <Searchbar />
//       <Hero />
//     </div>
//   );
// };

// export default Home;
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";

import Hero from "./Hero";


const Home = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen w-full"
      style={{ backgroundImage: "url('/images/main.png')" }}
    >
      <Navbar />
      <Searchbar />
      <Hero />
     
    </div>
  );
};

export default Home;
