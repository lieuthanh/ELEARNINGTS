import React from "react";
import "./Spinner.scss";
import { HashLoader } from "react-spinners";
import { useSelector } from "react-redux";

export default function Spinner() {
  const { isLoading } = useSelector((state) => state.spinnerSlice);

  return isLoading ? (
    <div className="c-spinner">
      <HashLoader color="#38BCF7" />
    </div>
  ) : null;
}
