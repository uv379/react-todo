import db from "../../firebase";
import * as types from "./actionType";

const addInfo = () => ({
  type: types.ADD_INFO,
});

export const addInfoInitiale = (info) => {
  return function (dispatch) {
    db.collection("infos").doc().set(info);
    dispatch(addInfo());
  };
};

const getInfos = (infos) => ({
  type: types.GET_INFOS,
  payload: infos,
});

export const getInfosInitiale = () => {
  return function (dispatch) {
    db.collection("infos").onSnapshot((querySnapshot) => {
      const infos = [];
      querySnapshot.forEach((doc) => {
        infos.push({ ...doc.data(), id: doc.id });
      });
      dispatch(getInfos(infos));
    });
  };
};

const deleteInfo = () => ({
  type: types.DELETE_INFO,
});

export const deleteInfoInitiale = (id) => {
  return function (dispatch) {
    db.collection("infos").doc(id).delete();
    dispatch(deleteInfo());
  };
};

const getInfo = (info) => ({
  type: types.GET_INFO,
  payload: info,
});
export const getInfoInitiale = (id) => {
  return function (dispatch) {
    db.collection("infos")
      .doc(id)
      .get()
      .then((info) => {
        dispatch(getInfo({ ...info.data() }));
      })
      .catch((error) => console.log(error));
  };
};
const editInfo = () => ({
  type: types.UPDATE_INFO,
});

export const editInfoInitiale = (id, info) => {
  return function (dispatch) {
    db.collection("infos").doc(id).update(info);
    dispatch(editInfo());
  };
};
