import React, { useState, useContext, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import $ from 'jquery';
import Moment from 'moment';

import Breadcrumbs from '../components/Breadcrumbs';
import Comments from '../components/Comments';

import { useParams, useHistory }  from  "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { SINGLE_POST, UPDATE_POST_MUTATION } from '../graphql/queries'
import { AuthContext } from '../context/auth';

function NewsPage(props) {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const { id } =  useParams();
  const [ editPost, setEditPost ] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const { loading, error, data } = useQuery(SINGLE_POST, {
    variables: { postId: parseInt(id) },
    pollInterval: 500,
  })

  useEffect(() => {
      if (user.token) {
        setIsLoggedIn(true)
      }
  }, [user])

  useEffect(() => {
    if (data) {
      setTitle(data.post.title);
      setContent(data.post.content);
      setImagePreviewUrl(data.post.image)
    }
  }, [data])

  const handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    const imageFile = e.target.files[0];
    reader.onloadend = () => {
      const image = reader.result;
      setImagePreviewUrl(image);
    };
    reader.readAsDataURL(imageFile);
  };

  const handleEditClick = () => {
    setEditPost(true);
  }

  const handleCancelClick = () => {
    $(".mask").addClass("active");
  }

  const closeEditClick = (event) => {
    $(".mask").removeClass("active");
    setEditPost(false);
  }

  const closeAlertModal = (event) => {
    $(".mask").removeClass("active");
  }

  const handleRemoveImage = () => {
    setImagePreviewUrl('');
  }

  const [updatePost] = useMutation(UPDATE_POST_MUTATION, {
    variables: {
      id: parseInt(id),
      title: title,
      image: imagePreviewUrl,
      content: content
    },
    pollInterval: 500,
    onError(err){
      console.log(err)
    }
  });

  const savePost = (e) => {
    e.preventDefault();
    updatePost();
    history.push(`/news/${id}`);
    setEditPost(false);
  }

		return (

      <main className="news news-page">
      {loading ?
           (<p>Loading posts...</p>)
        : (
          <div>
    				<Breadcrumbs link={data.post.title}/>

    				<div className="mask" role="dialog"></div>
              <div className="modal" role="alert">
              <h2>Are you sure you want to discard changes?</h2>
              <div className="row flex-space-between">
                <button className="col-lg-6 button button-dark" onClick={closeEditClick}>Yes</button>
                <button className="col-lg-5 button" onClick={closeAlertModal}>No</button>
              </div>
            </div>
            <div className="l-container flex flex-end">
              {isLoggedIn
                ? [
                  editPost
                    ? <div className="flex flex-end">
                        <button className="button-underline" onClick={savePost}>Save Post</button>
                        <button className="button-underline" onClick={handleCancelClick}>Cancel</button>
                      </div>
                    : <button className="button-underline" onClick={handleEditClick}>Edit Post</button>
                ]
                : <span className="button-underline"></span>
              }
            </div>
            <div className="l-container">
              <time>{Moment(data.post.createdAt).format("YYYY.MM.d")}</time>
              {editPost ? (
                <textarea
                  className="form-control news-textarea"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                ></textarea>
              ): (
                <h1 className="news-title">{data.post.title}</h1>
              )}
              <div className="news-image">
                { editPost ?
                  <div className="edit-post-image">
                    <div className="button-browse-container">
                        <div className="button button-dark">
                          <span>UPLOAD IMAGE</span>

                          <input type="file" className="button-browse" name="image" id="upload-photo" onChange={handleImageChange} />
                          { imagePreviewUrl == [] ?
                            <span></span>
                             :
                            <button className="upload-remove" onClick={handleRemoveImage}>x</button>
                          }
                      </div>
                    </div>
                    <img src={imagePreviewUrl} alt="" className="upload-preview" />
                  </div>
                  :
                  ( data.post.image == [] ?
                  null
                   :
                  <div className="news-detail-img">
                    <img src={data.post.image} alt={data.post.title} />
                  </div>
                  )
                }
              </div>
              {editPost ? (
                <textarea
                  className="form-control news-textarea content"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                ></textarea>
              ): (
                <div className="news-content">
                  { ReactHtmlParser(data.post.content) }
                </div>
              )}
              <Comments comments={data.post.comments} id={id}/>
    				</div>
          </div>
        )}
      </main>
		);

}

export default NewsPage;
