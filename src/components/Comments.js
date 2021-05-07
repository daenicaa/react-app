import React, { useState } from "react";
import moment from 'moment';

function Comments(){

	const [comments, setComments] = useState({
		comments: [
			{
				date:'3 months ago',
				comment: 'ここにはテキストが入ります。ここにはテキストが入りますここにはテキストが入りますここにはテキストが入りますここにはテキストが入ります。ここにはテキストが入ります。ここにはテキストが入りますここにはテキストが入りますここにはテキストが入りますここにはテキストが入ります。'
			},
			{
				date:'3 months ago',
				comment: 'ここにはテキストが入ります。ここにはテキストが入りますここにはテキストが入りますここにはテキストが入りますここにはテキストが入ります。ここにはテキストが入ります。ここにはテキストが入りますここにはテキストが入りますここにはテキストが入りますここにはテキストが入ります。'
			}
		]
	})
	const [comment, setComment] = useState({ comment: '' })

  // function handleChange(event) {
  //   this.setComment({comment: event.target.value});
  // }

  function handleSubmit(e) {
		e.preventDefault();
    let date_created = moment().format("DD-MM-YYYY");
    setComments({
      comments: comments.comments.concat({ date:date_created, comment: comment.comment })
    })
  }
		return (
			<section className="comments">
				<div className="l-container">
					<h2 className="comments-title">COMMENTS</h2>
						{comments.comments.map((item, id) => (
							<div className="comment" key={`comment-${id}`}>
								{item.comment}
								<time className="comment-date">{item.date}</time>
							</div>
						))}
					<div className="comment-form">
						<form>
							<textarea className="form-control" placeholder="Write Comment" value={comment.comment} onChange={(e) => setComment({ comment: e.target.value})} ></textarea>
							<button className="button button-dark" onClick={handleSubmit}>SUBMIT</button>
						</form>
					</div>
				</div>
			</section>
		);

}

export default Comments;
