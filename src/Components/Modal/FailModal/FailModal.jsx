import React from "react";
import "../Modal.scss";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import failExclamation from "./failExclamation.json";
import { setIsFail } from "../../../redux/modalSlice";

export default function FailModal() {
  const dispatch = useDispatch();

  const { isFail, modalText } = useSelector((state) => state.modalSlice);

  return isFail ? (
    <div className="c-modal">
      <div className="c-modal__overlay">
        <div className="c-modal__wrapper">
          {/*content*/}
          <div className="c-modal__content">
            {/*header*/}
            <Lottie
              animationData={failExclamation}
              loop={false}
              className="c-modal__animation"
            />
            {/*body*/}
            <p className="c-modal__text">{modalText}</p>
            {/*footer*/}
            <button
              onClick={() => {
                dispatch(setIsFail(false));
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
