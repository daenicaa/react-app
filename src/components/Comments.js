import React from 'react';
import Moment from 'moment';
import { useParams }  from  "react-router-dom";

import CommentsAdd from '../components/CommentsAdd';

function Comments(props){
	const { id } = useParams();
		return (
			<section className="comments">
				<div className="l-container">
					<h2 className="comments-title">COMMENTS</h2>
						{props.comments ? props.comments.map((item, id) => (
							<div className="comment" key={`comment-${id}`}>
								{item.content}
								<time className="comment-date">{Moment(item.createdAt).format("YYYY.MM.d")}</time>
							</div>
						)) : null }
					<CommentsAdd id={id}/>
				</div>
			</section>
		);

}

export default Comments;
