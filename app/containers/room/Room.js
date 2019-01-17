import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from 'prop-types';
import './index.less';
import aniStyle from '../../lib/animate.css';

class Room extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this,
    );
  }

  componentDidMount() {
    const { cards } = this;
    // refs 只取最后一个 这里改用原生取法
    const images = document.querySelectorAll('#card_img');
    const backgrounds = document.querySelectorAll('#card_bg');
    const range = 20;

    // 调试旋转幅度
    const calcValue = function calcValue(a, b) { return (a / b * range - range / 2).toFixed(1); };

    let timeout = 0;
    document.addEventListener('mousemove', (_ref) => {
      const { x } = _ref; const { y } = _ref;
      if (timeout) {
        // 用于取消这个函数
        window.cancelAnimationFrame(timeout);
      }
      // requestAnimationFrame比timeout好的一点就是 不用设置频率 而且每一帧的动画并不会重绘,减少更少的CPU和GPU的使用量
      timeout = window.requestAnimationFrame(() => {
        const yValue = calcValue(y, window.innerHeight);
        const xValue = calcValue(x, window.innerWidth);
        cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;
        [].forEach.call(images, (image) => {
          image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
        });

        [].forEach.call(backgrounds, (background) => {
          background.style.backgroundPosition = `${xValue * 0.45}px ${-yValue * 0.45}px`;
        });
      });
    }, false);
  }

  render() {
    const { history } = this.props;
    console.log(history);
    return (
        <div className="box">
            <div className="cards" ref={(mol) => { this.cards = mol; }}>
                <h3>尚成帅的小屋</h3>
                <h1>欢迎哦</h1>
                <div className={`card card_one ${aniStyle.animated} ${aniStyle.bounceInLeft}`} onClick={() => { history.push('/articles'); }}>
                    <div className="card_bg" id="card_bg" />
                    <img className="card_img" src={require('../../assets/3dr_mono.png')} id="card_img" />
                    <div className="card_text">
                        <p className="card_title">Personal Blog</p>
                    </div>
                </div>
                <div className={`card card_two ${aniStyle.animated} ${aniStyle.bounceInLeft}`}>
                    <div className="card_bg" id="card_bg" />
                    <img className="card_img" src={require('../../assets/3dr_chihiro.png')} id="card_img" />
                    <div className="card_text">
                        <p className="card_title">Spirited Away</p>
                    </div>
                </div>
                <div className={`card card_three ${aniStyle.animated} ${aniStyle.bounceInLeft}`}>
                    <div className="card_bg" id="card_bg" />
                    <img className="card_img" src={require('../../assets/3dr_howlcastle.png')} id="card_img" />
                    <div className="card_text">
                        <p className="card_title"> Howl&apos;s Moving Castle </p>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
export default Room;
