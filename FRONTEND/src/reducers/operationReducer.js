import {
  deleteConcept,
  getAllMedia,
  getTransactions,
} from '../services/operations/operationServices';

const initialState = {
  concepts: [],
  images: [],
  video: [],
  texto: [],
  role: '',
  username: '',
  userId: '',
  loading: false,
  fetching: false,
  updating: false,
  error: null,
};

// Constants
const GET_CONCEPTS = 'GET_CONCEPTS';
const GET_CONCEPTS_SUCCESS = 'GET_CONCEPTS_SUCCESS';
const GET_CONCEPTS_FAILURE = 'GET_CONCEPTS_FAILURE';

const ADD_DATAUSER = 'ADD_DATAUSER';

const GET_ALL_MEDIA = 'GET_ALL_MEDIA';
const GET_ALL_MEDIA_SUCCESS = 'GET_ALL_MEDIA_SUCCESS';
const GET_ALL_MEDIA_FAILURE = 'GET_ALL_MEDIA_FAILURE';

const UPDATE_CONCEPTS = 'UPDATE_CONCEPTS';
const UPDATE_CANCELED = 'UPDATE_CANCELED';
const UPDATE_SAVE_CONCEPTS = 'UPDATE_SAVE_CONCEPTS';
const UPDATE_SAVE_CONCEPTS_SUCCESS = 'UPDATE_SAVE_CONCEPTS_SUCCESS';
const UPDATE_SAVE_CONCEPTS_FAILURE = 'UPDATE_SAVE_CONCEPTS_FAILURE';

const DELETE_CONCEPTS = 'DELETE_CONCEPTS';
const DELETE_CONCEPTS_SUCCESS = 'DELETE_CONCEPTS_SUCCESS';
const DELETE_CONCEPTS_FAILURE = 'DELETE_CONCEPTS_FAILURE';

const LOGOUT = 'LOGOUT';

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONCEPTS:
      return {
        ...state,
        loading: true,
      };
    case GET_CONCEPTS_SUCCESS:
      return {
        ...state,
        loading: false,
        concepts: action.payload,
      };
    case GET_CONCEPTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_DATAUSER:
      return {
        ...state,
        username: action.payload.username,
        userId: action.payload.userId,
        role: action.payload.role,
      };

    case GET_ALL_MEDIA:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        images: action.payload.images,
        video: action.payload.videos,
        texto: action.payload.texto,
      };

    case GET_ALL_MEDIA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_CONCEPTS:
      return {
        ...state,
        loading: false,
        updating: true,
        // concepts: action.payload,
      };

    case UPDATE_CANCELED:
      return {
        ...state,
        updating: false,
      };

    case UPDATE_SAVE_CONCEPTS:
      return {
        ...state,
        loading: false,
        updating: false,
      };
    case UPDATE_SAVE_CONCEPTS_SUCCESS:
      return {
        ...state,
        loading: false,
        updating: false,
        concepts: action.payload,
      };

    case UPDATE_SAVE_CONCEPTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_CONCEPTS:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CONCEPTS_SUCCESS:
      return {
        ...state,
        loading: false,
        concepts: action.payload,
      };
    case DELETE_CONCEPTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

// Action creators
export const getConceptsAction = () => {
  return (dispatch) => {
    dispatch({ type: GET_CONCEPTS });

    try {
      getTransactions()
        .then((res) => {
          let oper = [];
          oper = res.payload;

          dispatch({
            type: GET_CONCEPTS_SUCCESS,
            payload: oper,
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: GET_CONCEPTS_FAILURE,
            payload: err,
          });
        });
    } catch (error) {
      console.log('operationReducer', error);
    }
  };
};

export const addDataUserAction = (data) => {
  return (dispatch) => {
    dispatch({
      type: ADD_DATAUSER,
      payload: data,
    });
  };
};

export const getAllMediaAction = (data, token) => {
  return (dispatch) => {
    dispatch({ type: GET_ALL_MEDIA });
    try {
      getAllMedia(data, token)
        .then((res) => {
          const val = res.allDataMedia;
          dispatch({
            type: GET_ALL_MEDIA_SUCCESS,
            payload: val,
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: GET_ALL_MEDIA_FAILURE,
            payload: err,
          });
        });
    } catch (error) {
      console.log('operationReducer', error);
    }
  };
};

export const updateConceptAction = () => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CONCEPTS,
    });
  };
};

export const deleteConceptAction = (tematic, role, token) => {
  return (dispatch, getState) => {
    dispatch({ type: DELETE_CONCEPTS });
    try {
      const data = getState();
      const valueFilter = data.operations.concepts.filter(
        (value) => value.concept !== tematic
      );

      deleteConcept(tematic, role, token)
        .then((res) => {
          dispatch({
            type: DELETE_CONCEPTS_SUCCESS,
            payload: valueFilter,
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: DELETE_CONCEPTS,
            payload: err,
          });
        });
    } catch (error) {
      console.log('operationReducer', error);
    }
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};
