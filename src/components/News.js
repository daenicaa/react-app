import React, { useState } from "react";
import { Link } from "react-router-dom";

import Article from '../components/Article';

function News(props){
		const [newsList, setNews] = useState({
				news: [
		      {
		        date:'2019.06.19',
		        img:'/assets/img/article-image.png',
		        title:'サンプルテキストサンプル ルテキストサンプルテキストサンプルテキストサンプル ルテキスト'
		      },
		      {
		        date:'2019.06.19',
		        img:'/assets/img/article-image.png',
		        title:'サンプルテキストサンプル ルテキストサンプルテキストサンプルテキストサンプル ルテキスト'
		      },
		      {
		        date:'2019.06.19',
		        img:'/assets/img/article-image.png',
		        title:'サンプルテキストサンプル ルテキストサンプルテキストサンプルテキストサンプル ルテキスト'
		      },
		      {
		        date:'2019.06.19',
		        img:'/assets/img/article-image.png',
		        title:'サンプルテキストサンプル ルテキストサンプルテキストサンプルテキストサンプル ルテキスト'
		      },
		      {
		        date:'2019.06.19',
		        img:'/assets/img/article-image.png',
		        title:'サンプルテキストサンプル ルテキストサンプルテキストサンプルテキストサンプル ルテキスト'
		      },
		      {
		        date:'2019.06.19',
		        img:'/assets/img/article-image.png',
		        title:'サンプルテキストサンプル ルテキストサンプルテキストサンプルテキストサンプル ルテキスト'
		      },
					{
		        date:'2019.06.19',
		        img:'/assets/img/article-image.png',
		        title:'サンプルテキストサンプル ルテキストサンプルテキストサンプルテキストサンプル ルテキスト'
		      },
		      {
		        date:'2019.06.19',
		        img:'/assets/img/article-image.png',
		        title:'サンプルテキストサンプル ルテキストサンプルテキストサンプルテキストサンプル ルテキスト'
		      },
		      {
		        date:'2019.06.19',
		        img:'/assets/img/article-image.png',
		        title:'サンプルテキストサンプル ルテキストサンプルテキストサンプルテキストサンプル ルテキスト'
		      },
		      {
		        date:'2019.06.19',
		        img:'/assets/img/article-image.png',
		        title:'サンプルテキストサンプル ルテキストサンプルテキストサンプルテキストサンプル ルテキスト'
		      },
		      {
		        date:'2019.06.19',
		        img:'/assets/img/article-image.png',
		        title:'サンプルテキストサンプル ルテキストサンプルテキストサンプルテキストサンプル ルテキスト'
		      },
		      {
		        date:'2019.06.19',
		        img:'/assets/img/article-image.png',
		        title:'サンプルテキストサンプル ルテキストサンプルテキストサンプルテキストサンプル ルテキスト'
		      },
		    ]
		})
		const [toShow, settoShow] = useState({ articlesToShow: 7	})

		function loadMore(e) {
			e.preventDefault();
	    settoShow((prev) => {
	      return { articlesToShow: prev.articlesToShow + 6 };
	    });
	  }

		return (
      <section className="news main">
			<div className="flex flex-space-between flex-align-center">
				<h2 className="section-title">NEWS</h2>
				{props.isLoggedIn ? (
					<Link className="button-underline" to="/create-post">Create New Post</Link>
				) : (<span></span>)}
			</div>
			<div className="news-container">

				{newsList.news.slice(0,(toShow.articlesToShow - 1)).map((item,id) => (
					<Article key={`article-${id}`} item={item} id={id}/>
				))}
			</div>
			{newsList.news.length > (toShow.articlesToShow - 1) ? (
				<div className="flex flex-center">
					<button className="button button-dark" onClick={loadMore}>LOAD MORE</button>
				</div>
			): (<span></span>)}
      </section>
		);

}

export default News;
