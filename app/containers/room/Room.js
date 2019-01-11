import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import style from './style.css';
import aniStyle from '../../lib/animate.css';

class Room extends Component {
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
        <div className={`${style.box} `}>
            <div className={style.cards} ref={(mol) => { this.cards = mol; }}>
                <h3>尚成帅的小屋</h3>
                <h1>欢迎哦</h1>
                <div className={`${style.card} ${style.card__one} ${aniStyle.animated} ${aniStyle.bounceInLeft}`} onClick={() => { history.push('/articles'); }}>
                    <div className={style.card__bg} id="card_bg" />
                    <img className={style.card__img} src={require('./3dr_mono.png')} id="card_img" />
                    <div className={style.card__text}>
                        <p className={style.card__title}>Personal Blog</p>
                    </div>
                </div>
                <div className={`${style.card} ${style.card__two} ${aniStyle.animated} ${aniStyle.bounceInLeft}`}>
                    <div className={style.card__bg} id="card_bg" />
                    <img className={style.card__img} src={require('./3dr_chihiro.png')} id="card_img" />
                    <div className={style.card__text}>
                        <p className={style.card__title}>Spirited Away</p>
                    </div>
                </div>
                <div className={`${style.card} ${style.card__three} ${aniStyle.animated} ${aniStyle.bounceInLeft}`}>
                    <div className={style.card__bg} id="card_bg" />
                    <img className={style.card__img} src={require('./3dr_howlcastle.png')} id="card_img" />
                    <div className={style.card__text}>
                        <p className={style.card__title}> Howl&apos;s Moving Castle </p>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
export default Room;
