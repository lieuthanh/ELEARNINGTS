import React from "react";
import "../Modal.scss";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import successCheck from "./successCheck.json";
import { setIsSuccess } from "../../../redux/modalSlice";

export default function SuccessModal() {
  const dispatch = useDispatch();

  const { isSuccess, modalText } = useSelector((state) => state.modalSlice);

  return isSuccess ? (
    <div
      onClick={() => {
        dispatch(setIsSuccess(false));
      }}
      className="c-modal"
    >
      <div className="c-modal__overlay">
        <div className="c-modal__wrapper">
          {/*content*/}
          <div className="c-modal__content">
            {/*header*/}
            <Lottie
              animationData={successCheck}
              loop={false}
              className="c-modal__animation"
            />
            {/*body*/}
            <p className="c-modal__text">{modalText}</p>
            {/*footer*/}
            <button
              onClick={() => {
                dispatch(setIsSuccess(false));
              }}
              className="btn btn-default btn-primary"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
