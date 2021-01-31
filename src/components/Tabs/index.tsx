import React, { FC, useState, useCallback, useRef } from "react";
import TabItem from "../TabItem";
import TabRow from "../TabRow";
import IconButton from "@material-ui/core/IconButton";
import Done from "@material-ui/icons/Done";
import Close from "@material-ui/icons/Close";
import AddTabIcon from "@material-ui/icons/Add";
import "./Tabs.css";
//@ts-ignore
import ReactDragListView from "react-drag-listview";
import { TabDetailsType } from "../../types";
import Modal from "../Modal";
import { InputType } from "zlib";
import { generateUUIDv4 } from "../../util";
const { DragColumn } = ReactDragListView;
interface ITabsProp {
  tabs: TabDetailsType[];
  children: (selectedTab: string) => React.ReactNode;
  maxTabCount: number;
}

const Tabs: FC<ITabsProp> = ({ tabs, children, maxTabCount }) => {
  const [selectedTab, setSeletedTab] = useState<string>(tabs[0]?.id || "");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [tabsInDragOrder, setTabsInDragOrder] = useState<TabDetailsType[]>(
    tabs
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const tabSelection = useCallback(
    (id: string) => () => {
      setSeletedTab(id);
    },
    []
  );

  const onDragEnd = useCallback(
    (fromIndex, toIndex) => {
      const data = [...tabsInDragOrder];
      const item = data.splice(fromIndex, 1)[0];
      data.splice(toIndex, 0, item);
      setTabsInDragOrder(data);
      setSeletedTab(item.id);
    },
    [tabsInDragOrder]
  );

  const onClose = useCallback(
    (id: string) => (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      event.stopPropagation();
      if (tabsInDragOrder.length <= 1) {
        return;
      }
      const filteredTabs = tabsInDragOrder.filter(
        ({ id: idLoop }) => id != idLoop
      );
      setTabsInDragOrder(filteredTabs);
      setSeletedTab(filteredTabs[0].id);
    },
    [tabsInDragOrder]
  );

  const onAddNewTabConfirmation = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    const newTab = { id: generateUUIDv4(), title: inputRef.current.value };
    setTabsInDragOrder([...tabsInDragOrder, newTab]);
    setShowModal(false);
    setSeletedTab(newTab.id);
  }, [tabsInDragOrder]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onAddNewTabConfirmation();
      }
    },
    [onAddNewTabConfirmation]
  );

  return (
    <div className="tab-container">
      <DragColumn nodeSelector="li" handleSelector="li" onDragEnd={onDragEnd}>
        <TabRow>
          {tabsInDragOrder.map((tab) => (
            <TabItem
              key={`tab-item${tab.id}`}
              isSelected={selectedTab === tab.id}
              title={tab.title}
              onSelection={tabSelection(tab.id)}
              onClose={onClose(tab.id)}
              disableClose={tabsInDragOrder.length === 1}
            />
          ))}
          <IconButton
            className="new-tab"
            style={{ padding: "8px" }}
            onClick={() => setShowModal(true)}
            disabled={maxTabCount <= tabsInDragOrder.length}
          >
            <AddTabIcon fontSize="small" />
          </IconButton>
        </TabRow>
      </DragColumn>
      <div className="tab-content">{children(selectedTab)}</div>

      {showModal && (
        <Modal>
          <div className="new-tab-modal">
            Enter tab name:
            <input type="text" ref={inputRef} autoFocus onKeyDown={onKeyDown} />
            <IconButton onClick={onAddNewTabConfirmation}>
              <Done />
            </IconButton>
            <IconButton onClick={() => setShowModal(false)}>
              <Close />
            </IconButton>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Tabs;
