import React from "react";
import cx from "classnames";

function TextWithRoundImage({ textLeft = true, imgSrc, imgAlt, children }) {
  return (
    <div
      className={cx("flex justify-center items-center flex-wrap text-black", {
        "flex-row-reverse": !textLeft,
      })}
    >
      <div
        className={cx(
          "w-full lg:w-2/5 mb-6 lg:mb-0",
          textLeft ? "lg:pr-32" : "lg:pl-32"
        )}
      >
        {children}
      </div>
      <div className="w-full lg:w-3/5">
        <img src={imgSrc} className="rounded-xl w-full" alt={imgAlt} />
      </div>
    </div>
  );
}

export default TextWithRoundImage;
