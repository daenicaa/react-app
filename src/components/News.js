import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Moment from 'moment';

import { GET_POSTS } from '../graphql/queries';

import Article from '../components/Article';

function News(props){

		const [toShow, settoShow] = useState(7)
		let posts = '';
		
	  const { loading, data, fetchMore } = useQuery(GET_POSTS, {
	    variables: { offset: 0, limit: 7 }
	  });

	  if (data) {
	    posts = data.posts;
	  }

		function loadMore(e) {
			e.preventDefault();

			fetchMore({
        variables: {
          offset: toShow,
					limit: 6
        },
				updateQuery: (previousResult, { fetchMoreResult }) => {

          if (!fetchMoreResult) return previousResult.posts;

					const previousPosts = previousResult.posts;
          const newPosts = fetchMoreResult.posts;

          return {
            posts: [...previousPosts, ...newPosts]
          };
        }
      })
			settoShow(toShow + 6);
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
						posts.slice(0,(toShow - 1)).map((item,id) => (
						<Article key={`article-${id}`} item={item} id={id}/>
					))
				}
				</div>
				{
					posts &&
						posts.length > (toShow - 1) ?
						<div className="flex flex-center">
							<button className="button button-dark" onClick={loadMore}>LOAD MORE</button>
						</div>
					: null }
      </section>
		);

}

export default News;
