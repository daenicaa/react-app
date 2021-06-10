import React, {useState, useRef} from 'react';
import moment from 'moment';
import { ADD_COMMENT_MUTATION } from '../graphql/queries'

import { useParams }  from  "react-router-dom";
import { useMutation } from '@apollo/client';

function CommentsAdd(props){
	
	const { id } = useParams();
  const commentInputRef = useRef(null);
  const [comment, setComment] = useState("");

  const [addComment] = useMutation(ADD_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.focus();
    },
    variables: {
      postId: parseInt(id),
      content: comment
    },
    pollInterval: 500,
    onError(err){
      console.log(err)
    }
  });
		return (
			<div className="comment-form">
				<form>
				<textarea
					className="form-control"
					placeholder="Write Comment"
					name="comment"
					defaultValue={comment.content}
					onChange={(event) => setComment(event.target.value)}
					ref={commentInputRef}
				 >
				 </textarea>
					<button
						className="button button-dark"
						onClick={addComment}
					>
					Submit
					</button>
				</form>
			</div>
		);

}

export default CommentsAdd;
