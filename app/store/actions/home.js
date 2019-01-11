import axios from 'axios';

const actionTypes = {
  SAVE_ARTICLES_LIST: 'SAVE_ARTICLES_LIST',
};

export function saveArticlesList(data) {
  return {
    type: actionTypes.SAVE_ARTICLES_LIST,
    payload: data,
  };
}

export function getArticlesList({ keyword, likes, state, pageNum, pageSize }) {
  return (dispatch) => {
    axios
      .get('/api/getArticleList', {
        params: {
          keyword,
          likes,
          state,
          pageNum,
          pageSize,
        },
      })
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(saveArticlesList(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
