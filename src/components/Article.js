import React from "react";
import { Link } from "react-router-dom";

function Article(props) {
		const {img, title, date, id} = props.item;
		const keyId = props.id;
		return (
      <article className="article-item" key={`news-${keyId}`}>
        <Link to={`/news/${id}`}>
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
