import React from "react";

const DividerIcon = ({ size = 100, color = "#d4af37" }) => {
  return (
    <div
      className="divider"
      style={{
        height: `${size / 5}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="line"
        style={{
          width: `${size}px`,
          height: "1px" /* Viền đường ngang mỏng hơn */,
          backgroundColor: color,
          position: "relative",
        }}
      >
        <div
          className="diamond"
          style={{
            width: `${size / 10}px`,
            height: `${size / 10}px`,
            border: "1px solid " + color /* Viền mỏng cho hình thoi rỗng */,
            backgroundColor: "transparent" /* Hình thoi rỗng */,
            transform: "rotate(45deg)",
            position: "absolute",
            left: "50%",
            marginLeft: `${-size / 20}px`,
            top: `${-(
              size / 20 -
              0.5
            )}px` /* Căn giữa theo trục y dựa trên tỉ lệ */,
          }}
        />
      </div>
    </div>
  );
};

export default DividerIcon;
