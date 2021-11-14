const repoReducer = (state = {star: false, watch: false, fork: false}, action) => {
  switch (action.type) {
    case "star":
      return {...state, star: !state.star};
    case "watch":
      return {...state, watch: !state.watch};
    case "fork":
      return {...state, fork: !state.fork};
    default:
      return state;
  }
};
export default repoReducer;