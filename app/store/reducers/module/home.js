
const types = {
  ACTIVE_NAV: 'ACTIVE_NAV',
  RECEIVE_NAV: 'RECEIVE_NAV',
};

// 初始化状态
const initNavList = {
  activeNav: 'home', // 过渡动画样式
  navMain: ['home', 'me'],
};

export function home(state = initNavList, action) {
  switch (action.type) {
    case types.ACTIVE_NAV:
      return {
        ...state,
        activeNav: action.activeNav,
      };
    case types.RECEIVE_NAV:
      return {
        ...state,
        navMain: action.navMain,
      };
    default:
      return state;
  }
}
