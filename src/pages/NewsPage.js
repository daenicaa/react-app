import React, { useState } from "react";
import ReactHtmlParser from 'react-html-parser';
import $ from 'jquery';

import Breadcrumbs from '../components/Breadcrumbs';
import Comments from '../components/Comments';

function NewsPage(props) {

    let defaultArticle = {
      date:'2019.06.19',
      img:'/assets/img/hero-img.png',
      title:'サンプルテキストサンプル ルテキストサンプルテキストサンプルテキストサンプル ルテキスト',
      content: '<p>ここにはテキストが入ります。ここにはテキストが入りますここにはテキストが入りますここにはテキストが入りますここにはテキストが入ります。ここにはテキストが入ります。ここにはテキストが入りますここにはテキストが入りますここにはテキストが入りますここにはテキストが入ります。ここにはテキストが入ります。ここにはテキストが入りますここにはテキストが入りますここにはテキストが入りますここにはテキストが入ります。</p><p>ここにはテキストが入ります。ここにはテキストが入りますここにはテキストが入りますここにはテキストが入りますここにはテキストが入ります。ここにはテキストが入ります。ここにはテキストが入りますここにはテキストが入りますここにはテキストが入りますここにはテキストが入ります。ここにはテキストが入ります。ここにはテキストが入りますここにはテキストが入りますここにはテキストが入りますここにはテキストが入ります。</p>'
    }

    const { title } = defaultArticle
    const [article, setArticle] = useState(defaultArticle)
  	const [action, setAction] = useState({ isEditing: false, changeContent: false })

		function handleEditClick() {
	    setAction({ ...action, isEditing: true });
	  }

	  function saveEditClick() {
	    setAction({isEditing: false, changeContent: false });
	    setArticle({ ...article, title: article.title, img: article.img, content: article.content });
      defaultArticle = article;
	  }

	  const cancelEditTrigger = (event) => {
	    if(action.changeContent){
	      $(".mask").addClass("active");
	    } else{
        setArticle(defaultArticle);
	      setAction({isEditing: false, changeContent: false });
	    }
	    //setState({isEditing: false});
	  }

	  const closeAlertModal = (event) => {
	    $(".mask").removeClass("active");
	  }

	  const closeEditClick = (event) => {
	    $(".mask").removeClass("active");
	    setAction({isEditing: false, changeContent: false });
	    //setArticle({ img: editedArticle.img, title: editedArticle.title, content: editedArticle.content });
	  }

		return (
      <main className="news news-page">
				<Breadcrumbs link={title}/>
				<div className="mask" role="dialog"></div>
          <div className="modal" role="alert">
          <h2>Are you sure you want to discard changes?</h2>
          <div className="row flex-space-between">
            <button className="col-lg-6 button button-dark" onClick={closeEditClick}>Yes</button>
            <button className="col-lg-5 button" onClick={closeAlertModal}>No</button>
          </div>
        </div>
        <div className="l-container flex flex-end">
          {props.isLoggedIn
            ? [
              action.isEditing
                ? <div className="flex flex-end">
                    <button className="button-underline" onClick={saveEditClick}>Save Post</button>
                    <button className="button-underline" onClick={cancelEditTrigger}>Cancel</button>
                  </div>
                : <button className="button-underline" onClick={handleEditClick}>Edit Post</button>
            ]
            : <span className="button-underline"></span>
          }
        </div>
        <div className="l-container">
          <time>{article.date}</time>
          {action.isEditing ? (
            <textarea className="form-control news-textarea" value={article.title} onChange={(e) => setArticle({...article, title: e.target.value})} ></textarea>
          ): (
            <h1 className="news-title">{article.title}</h1>
          )}
          <div className="news-image">
            {action.isEditing ? (
              <div className="button-browse-container">
                <div className="button button-dark">
                  <span>UPLOAD IMAGE</span>
                  <input type="file" className="button-browse" />
                </div>
              </div>
            ): (
              <span></span>
            )}
            <img src={article.img} alt=""/>
          </div>
          {action.isEditing ? (
            <textarea className="form-control news-textarea content" value={article.content} onChange={(e) => setArticle({...article, content: e.target.value})}></textarea>
          ): (
            <div className="news-content">
              { ReactHtmlParser(article.content) }
            </div>
          )}
          <Comments />
				</div>
      </main>
		);

}

export default NewsPage;
