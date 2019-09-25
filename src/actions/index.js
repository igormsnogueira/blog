import jsonPlaceholder from "../apis/jsonPlaceholder";
import _ from "lodash";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  //lembre que o getState é usado pelo redux thunk , e pega todo o state da store.
  await dispatch(fetchPost()); //precisamos fazer manualmente o dispatch de uma outra action creator dentro dessa action creator, se nao ele só retorna a função do fetchPost, mas o redux nao faz o dispatch
  //1 executamos fetchPost
  //2 fetchPost retorna a função interna dela
  //3 fazemos o dispatch dessa função interna
  //4 dai o redux thunk recebe ela, e a processa/executa corretamente.
  //5 devemos usar o await para garantir que o codigo so seguira apos tudo ter sido concluido internamente dispatchs e requisições
  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

export const fetchPost = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");
  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = userId => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${userId}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};
