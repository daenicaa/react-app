import React from "react";
import { Link } from "react-router-dom";

function Article(props) {

		const {img, title, date} = props.item;
		const id = props.id;
		return (
      <article className="article-item" key={`news-${id}`}>
        <Link to={`/news/${title}`}>
          <div className="article-image">
            <img src={img} alt={title} />
          </div>
          <div className="article-content">
            <time className="article-date">{date}</time>
            <h3 className="article-title">{title}</h3>
          </div>
        </Link>
      </article>
		);

}

export default Article;
