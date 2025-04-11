import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Navbar from "./components/Navbar";
import Video from "./video";
import Audio from "./audio";
import Pdf from "./pdf";
import WebGL from "./webgl";
import Navbar from "./navbar";
import Footer from "./footer";
import Signup from "./signup";
import Login from "./login";

const App = () => {
  return (
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Video/>}/>
        <Route path="/video" element={<Video />} />
        <Route path="/audio" element={<Audio />} />
        <Route path="/pdf" element={<Pdf />} />
        <Route path="/webgl" element={<WebGL />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
     
      </Routes>
    <Footer/>
    </Router>
  );
};

export default App;
