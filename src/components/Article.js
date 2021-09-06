import React from "react";
import { Link } from "react-router-dom";
import Moment from 'moment';

function Article(props) {
		const {image, title, createdAt: date , id} = props.item;
		const keyId = props.id;
		return (
      <article className="article-item" key={`news-${keyId}`}>
        <Link to={`/news/${id}`}>
          <div className="article-image">
            <img src={image} alt={title} />
          </div>
          <div className="article-content">
            <time className="article-date">{Moment(date).format('YYYY.MM.d')}</time>
            <h3 className="article-title">{title}</h3>
          </div>
        </Link>
      </article>
		);

}

export default Article;
