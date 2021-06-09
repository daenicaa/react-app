import React, { useContext, useEffect, useState } from 'react';
//import Hero from '../components/Hero';
import News from '../components/News';
import { AuthContext } from '../context/auth';

function Home() {
	const { user } = useContext(AuthContext);

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
			if (user.token) {
				setIsLoggedIn(true)
			}
	}, [user]);

	return (
    <main>
      <div className="l-main l-container">
        <News isLoggedIn={isLoggedIn} />
      </div>
    </main>
	);

}

export default Home;
