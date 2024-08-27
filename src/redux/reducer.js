export default function userId(state, action) {
  if (state === undefined) {
    return { user: 1 };
  }

  switch (action.type) {
    case 'SET_USER': return { user: action.payload }
    default: return state;
  }
}