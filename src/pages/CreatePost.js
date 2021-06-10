import React, {useState} from 'react';
import $ from 'jquery';
import { useHistory } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { CREATE_POST_MUTATION, GET_POSTS } from '../graphql/queries';
import { useForm } from '../util/hooks';

const CreateNewPost = (props) => {
  const history = useHistory();
  const [baseImage, setBaseImage] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  }

  function convertBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      }
    });
  };

  function handleCancelClick(){
    history.push('/');
  }

  const { handleSubmit, handleChange, values } = useForm(createPostCallback, {
     title: '',
     content: '',
     image: ''
   });

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    update (client, result) {
      const data = client.readQuery({
        query: GET_POSTS
      })
      const new_post = result.data.posts
      client.writeQuery({
        query: GET_POSTS,
        data: { new_post }
      })
      values.title= '';
      values.content= '';
      values.image= '';
      history.push(`/news/${result.data.addPost.id}`);
      window.location.reload();
    },
    variables: {
      title: values.title,
      content: values.content,
      image: baseImage
    },
    onError(err){
      console.log(err);
    }
  });

  function createPostCallback() {
    createPost();
  }

	function cancelEditTrigger(e){
		e.preventDefault();
		$(".mask").addClass("active");
	}

	function closeAlertModal(){
		$(".mask").removeClass("active");
	}

  const link = 'Create New Post';
  const today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  return (
    <main className="create-post">
      <Breadcrumbs link={link}/>
			<div className="mask" role="dialog"></div>
			<div className="modal" role="alert">
				<h2>Are you sure you want to Cancel?</h2>
				<div className="row flex-space-between">
					<button className="col-lg-6 button button-dark" onClick={handleCancelClick}>Yes</button>
					<button className="col-lg-5 button" onClick={closeAlertModal}>No</button>
				</div>
			</div>
      <div className="l-container">
          <form onSubmit={handleSubmit}>
						<div className="l-container flex flex-end">
		          <button className="button-underline" type="submit">Save Post</button>
		          <button className="button-underline" onClick={cancelEditTrigger}>Cancel</button>
		        </div>

            <time>{date}</time>
            <textarea placeholder="Title"
                name="title"
                onChange={handleChange}
                defaultValue={values.title}
                className="form-control news-textarea">
            </textarea>
						<div className="create-post-image">
	            <div className="button-browse-container">
	              <div className="button button-dark">
	                <span>UPLOAD IMAGE</span>
	                <input type="file" className="button-browse" onChange={handleUpload}/>
	              </div>
	            </div>
	            <img src={baseImage} alt="" className="upload-preview" />
	          </div>

            <textarea onChange={handleChange}
                name="content"
                defaultValue={values.content}
                className="form-control news-textarea content"
                placeholder="Content">
            </textarea>
          </form>
      </div>
    </main>
  )

}


export default CreateNewPost;
