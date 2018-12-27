import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { setup, resize } from '../../lib/Canvaspipeline';
import style from '../../reset.css';

export default class Open extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this,
    );
  }

  componentDidMount() {
    // 执行canvas逻辑
    window.addEventListener('load', setup);
    window.addEventListener('resize', resize);
  }

  render() {
    return (
        <main>
            <div className={`${style.content} content-canvas`}>
                <h2 className={style.title}> Scs </h2>
            </div>
        </main>
    );
  }
}
