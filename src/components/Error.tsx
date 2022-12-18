import { Fragment } from "react";
import { ERROR_MESSAGE } from "../constants/constants";
const Error: React.FC<{  }> = () => (
  <Fragment>
    <div className="w-full flex justify-center items-center">
      <h1 className="font-bold text-2xl text-white">{ERROR_MESSAGE}</h1>
    </div>
  </Fragment>
);

export default Error;
