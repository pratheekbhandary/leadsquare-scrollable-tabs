import React, { useMemo } from "react";
import Tabs from "./components/Tabs";
import { TabDetailsType } from "./types";
import { generateUUIDv4 } from "./util";
import "./App.css";

const TABS = ["one", "two", "three", "four", "five"];
function App() {
  const tabsWithID = useMemo<TabDetailsType[]>(
    () => TABS.map((tab) => ({ id: generateUUIDv4(), title: tab })),
    []
  );
  return (
    <div className="App">
      <Tabs tabs={tabsWithID} maxTabCount={10}>
        {(seletedTab: string) => (
          <div className="tab-display-content">
            <img
              src={`https://source.unsplash.com/random/${seletedTab}`}
              alt="image not available"
            />
            <span>Selected tab {seletedTab}</span>
          </div>
        )}
      </Tabs>
    </div>
  );
}

export default App;
