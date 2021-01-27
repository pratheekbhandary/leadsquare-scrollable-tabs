import React, { FC } from "react";
import CloseIcon from "@material-ui/icons/Close";

import "./TabItem.css";

const TabItem: FC<{
  title: string;
  isSelected: boolean;
  onSelection: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  onClose: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  disableClose: boolean;
}> = ({ title, isSelected, onSelection, onClose, disableClose }) => {
  return (
    <li
      className={`item${isSelected ? " selected" : ""}`}
      onClick={onSelection}
    >
      {!disableClose && (
        <CloseIcon
          className="close"
          fontSize="small"
          style={{ display: "none" }}
          onClick={onClose}
        />
      )}
      {title}
    </li>
  );
};

export default TabItem;
