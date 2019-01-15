import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Carousel } from 'antd';
import style from './style.less';

const carouselImgs = [
  require('../../assets/banner_1.png'),
  require('../../assets/banner_2.png'),
  require('../../assets/banner_3.png'),
];

export default class Banner extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this,
    );
    this.renderCarousel = this.renderCarousel.bind(this);
  }

    renderCarousel = imgs => imgs.map((item, index) => (
        <div key={index} className={style.carouselImgContainer}>
            <img src={item} />
        </div>
    ))

    render() {
      return <Carousel autoplay>{this.renderCarousel(carouselImgs)}</Carousel>;
    }
}
