import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if(input.length > 0){
      navigate(`/gigs?search=${input}`);
    }
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Our freelancers<br/>
            will take it from here
          </h1>

          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                className="text-black"
                type="text"
                placeholder='Try "building mobile app"'
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button className="flex items-center justify-center" onClick={handleSubmit}><FaSearch /></button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>WordPress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/man.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
