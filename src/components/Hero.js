import React from "react";
import $ from 'jquery';

function Hero(props){
  //constructor(props){
    //super(props)
    this.lastElem = null;
    this.lastElemIndex = null;
    this.slideWidth = null;
    this.triggerClick = this.triggerClick.bind(this);
  //}

  componentDidMount(){
    const triggers = $(".js-hero-triggers li");
    const slides = $(".js-hero-item");
    const mask = $(".js-hero-carousel");

    this.lastElem = triggers.length-1;
    this.lastElemIndex = this.lastElem - 1;
    this.slideWidth = slides.width();

    triggers.first().addClass('selected');
    mask.css('width', this.slideWidth*(this.lastElem+1) +'px');
    slides.css('width', this.slideWidth +'px')
  }

  sliderResponse(target) {
    $(".js-hero-carousel").stop(true,false).animate({'left':'-'+ this.slideWidth*target +'px'},300);
    $(".js-hero-triggers li").removeClass('selected').eq(target).addClass('selected');
  }

  triggerClick(event) {
    let index = event.currentTarget.getAttribute("data-index");
    let triggerSelectedIndex = Number($('.js-hero-triggers li.selected').attr("data-index"));
    if(index){
      if ( !$(event.currentTarget).hasClass('selected') ) {
        let target = Number(event.currentTarget.getAttribute("data-index"));
        this.sliderResponse(target);
      }
    } else {
      let direction = event.currentTarget.getAttribute("data-direction");
      if(direction === 'next'){
        triggerSelectedIndex === this.lastElem ? triggerSelectedIndex = 0 : triggerSelectedIndex = triggerSelectedIndex + 1;
      }else {
        triggerSelectedIndex === 0 ? triggerSelectedIndex = this.lastElem : triggerSelectedIndex = triggerSelectedIndex-1;
      }
      this.sliderResponse(triggerSelectedIndex);
    }
  }


    const sliders = [
      {
        date:'2019.06.19',
        img:'/assets/img/hero-img.png',
        text:'サンプルテキスト サンプル ルテキストサンプルテキスト'
      },
      {
        date:'2019.06.19',
        img:'/assets/img/hero-img.png',
        text:'サンプルテキスト サンプル ルテキストサンプルテキスト'
      },
      {
        date:'2019.06.19',
        img:'/assets/img/hero-img.png',
        text:'サンプルテキスト サンプル ルテキストサンプルテキスト'
      }
    ];

		return (
      <div className="l-hero hero-wrapper">
        <ul className="hero-triggers js-hero-triggers">
        {sliders.map((item,index) => (
          <li key={`trigger-${index}`} data-index={index} onClick={this.triggerClick}></li>
        ))}
        </ul>
        <ul className="hero-controls">
          <li className="hero-control prev js-previous" data-direction='previous' onClick={this.triggerClick}></li>
          <li className="hero-control next js-next" data-direction='next' onClick={this.triggerClick}></li>
        </ul>
        <div className="hero-flex">
          <div className="hero js-hero-carousel">
          {sliders.map((item,id) => (
            <div className="hero-item js-hero-item" key={`hero-${id}`}>
              <div className="l-container hero-container">
                <div className="hero-content">
                  <span className="hero-heading">{item.text}</span>
                  <time className="hero-time">{item.date}</time>
                </div>
              </div>
              <img className="img-full" src={item.img} alt="サンプルテキスト"/>
            </div>
          ))}
          </div>
        </div>
      </div>
		);

}

export default Hero;
