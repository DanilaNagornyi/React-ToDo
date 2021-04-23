const initState = () => {
  const state = {
    todos: [],
    users: {
      email: '',
      name: '',
      isAuth: false,
      id: '',
    }
  }
  const fromLS = JSON.parse(window.localStorage.getItem('myApp'))
  return fromLS ? fromLS : state
}
export default initState;
