import { title } from "process";
import React, { useMemo, useState } from "react";
import Tabs from "./components/Tabs";
import { TabDetailsType } from "./types";
import { generateUUIDv4 } from "./util";
const TABS = ["one", "two", "three", "four", "five"];
function App() {
  const tabsWithID = useMemo<TabDetailsType[]>(
    () => TABS.map((tab) => ({ id: generateUUIDv4(), title: tab })),
    []
  );
  return (
    <div className="App">
      <Tabs tabs={tabsWithID}>
        {(seletedTab: string) => <>Selected item {seletedTab}</>}
      </Tabs>
    </div>
  );
}

export default App;
