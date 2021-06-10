import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Moment from 'moment';

import { GET_POSTS } from '../graphql/queries';

import Article from '../components/Article';

function News(props){
		
		const [toShow, settoShow] = useState({ articlesToShow: 7	})

		function loadMore(e) {
			e.preventDefault();
	    settoShow((prev) => {
	      return { articlesToShow: prev.articlesToShow + 6 };
	    });
	  }

		let posts = '';
	  const { loading, data } = useQuery(GET_POSTS);

	  if (data) {
	    posts = data.posts;
	    //console.log("home data", data.posts)
	  }

		return (
      <section className="news main">
				<div className="flex flex-space-between flex-align-center">
					<h2 className="section-title">NEWS</h2>
					{props.isLoggedIn ?
						<Link className="button-underline" to="/create-post">Create New Post</Link>
					 : null }
				</div>
				<div className="news-container">
				{loading ?
						 <p>Loading posts...</p>
				  :
				 	posts &&
						posts.slice(0,(toShow.articlesToShow - 1)).map((item,id) => (
						<Article key={`article-${id}`} item={item} id={id}/>
					))
				}
				</div>
				{posts.length > (toShow.articlesToShow - 1) ? (
					<div className="flex flex-center">
						<button className="button button-dark" onClick={loadMore}>LOAD MORE</button>
					</div>
				): (<span></span>)}
      </section>
		);

}

export default News;
