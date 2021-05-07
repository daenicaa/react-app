import React from "react";

//import Hero from '../components/Hero';
import News from '../components/News';

function Home(props) {

		return (
      <main>
        
        <div className="l-main l-container">
          <News isLoggedIn={props.isLoggedIn}/>
        </div>
      </main>
		);

}

export default Home;
