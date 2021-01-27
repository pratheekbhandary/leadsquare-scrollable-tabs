import React, { FC } from "react";
import "./TabRow.css";

const TabRow: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ul className="row">{children}</ul>;
};

export default TabRow;
