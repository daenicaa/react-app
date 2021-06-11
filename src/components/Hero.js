import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { useQuery } from "@apollo/client";
import Moment from 'moment';

import { GET_POSTS, GET_HEROPOSTS, SINGLE_POST } from '../graphql/queries';

function Hero(props){
  var lastElem = null;
  var lastElemIndex = null;
  var slideWidth = null;
  //this.triggerClick = this.triggerClick.bind(this);

  useEffect(() => {
    const triggers = $(".js-hero-triggers li");
    const slides = $(".js-hero-item");
    const mask = $(".js-hero-carousel");

       lastElem = triggers.length-1;
      lastElemIndex = lastElem - 1;
      slideWidth = slides.width();

      triggers.first().addClass('selected');
      mask.css('width', slideWidth*(lastElem+1) +'px');
      slides.css('width', slideWidth +'px')

  });

  function sliderResponse(target) {
    $(".js-hero-carousel").stop(true,false).animate({'left':'-'+ slideWidth*target +'px'},300);
    $(".js-hero-triggers li").removeClass('selected').eq(target).addClass('selected');
  }

  function triggerClick(event) {
    let index = event.currentTarget.getAttribute("data-index");
    let triggerSelectedIndex = Number($('.js-hero-triggers li.selected').attr("data-index"));
    if(index){
      if ( !$(event.currentTarget).hasClass('selected') ) {
        let target = Number(event.currentTarget.getAttribute("data-index"));
        sliderResponse(target);
      }
    } else {
      let direction = event.currentTarget.getAttribute("data-direction");
      if(direction === 'next'){
        triggerSelectedIndex === lastElem ? triggerSelectedIndex = 0 : triggerSelectedIndex = triggerSelectedIndex + 1;
      }else {
        triggerSelectedIndex === 0 ? triggerSelectedIndex = lastElem : triggerSelectedIndex = triggerSelectedIndex-1;
      }
      sliderResponse(triggerSelectedIndex);
    }
  }

  const { loading, data } = useQuery(GET_HEROPOSTS, {
    variables: { offset: 0, limit: 3 }
  });

		return (
        <div className="l-hero hero-wrapper">
          <ul className="hero-triggers js-hero-triggers">
          {loading ? (
               <p>Loading posts...</p>
           ) : (
              data &&
                data.posts.map((item,index) => (
                <li key={`trigger-${index}`} data-index={index} onClick={triggerClick}></li>
              ))
            )}
          </ul>
          <ul className="hero-controls">
            <li className="hero-control prev js-previous" data-direction='previous' onClick={triggerClick}>
              <i className=""></i>
            </li>
            <li className="hero-control next js-next" data-direction='next' onClick={triggerClick}>
              <i className=""></i>
            </li>
          </ul>
          <div className="hero-flex">
            <div className="hero js-hero-carousel">
              {loading ? (
                  <p>Loading posts...</p>
               ) : (
                  data &&
                  data.posts.map((item,id) => (
                    <div className="hero-item js-hero-item" key={`hero-${id}`}>
                      <div className="l-container hero-container">
                        <div className="hero-content">
                          <span className="hero-heading">{item.title}</span>
                          <time className="hero-time">{Moment(item.createdAt).format('YYYY.MM.d')}</time>
                        </div>
                      </div>
                      <img className="img-full" src={item.image} alt={item.title}/>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

  )

}

export default Hero;
