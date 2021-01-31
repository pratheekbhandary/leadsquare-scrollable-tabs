import { IconButton } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import React, { FC, useCallback, useRef, useState } from "react";
import "./TabRow.css";

const TabRow: FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrollRef = useRef<HTMLUListElement | null>(null);
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showRightChevron, setShowRightChevron] = useState(false);

  const onScroll = useCallback(() => {
    const firstEleCoords = scrollRef.current?.firstElementChild?.getBoundingClientRect();
    const lastEleCoords = scrollRef.current?.lastElementChild?.getBoundingClientRect();
    let windowWidth = document.documentElement.clientWidth;
    if (firstEleCoords && lastEleCoords && windowWidth) {
      const isFirstEleVisible = firstEleCoords.x > 0;
      const isLastEleVisible =
        lastEleCoords.x + lastEleCoords.width < windowWidth;
      if (isFirstEleVisible) {
        setShowLeftChevron(false);
      } else {
        setShowLeftChevron(true);
      }
      if (isLastEleVisible) {
        setShowRightChevron(false);
      } else {
        setShowRightChevron(true);
      }
    }
  }, []);

  const onLeftArrowClick = useCallback(() => {
    scrollRef.current?.firstElementChild?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);
  const onRightArrowClick = useCallback(() => {
    scrollRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="row-container">
      {showLeftChevron && (
        <IconButton className="left-chevron" onClick={onLeftArrowClick}>
          <ArrowBackIos />
        </IconButton>
      )}
      <ul className="row" ref={scrollRef} onScroll={onScroll}>
        {children}
      </ul>
      {showRightChevron && (
        <IconButton className="right-chevron" onClick={onRightArrowClick}>
          <ArrowForwardIos />
        </IconButton>
      )}
    </div>
  );
};

export default TabRow;
