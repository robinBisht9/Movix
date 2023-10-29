import { useState } from "react";
import "./style.scss";
const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [leftStyle, setLeftStyle] = useState(0);

  const activeTab = (tab, index) => {
    setLeftStyle(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => {
          return (
            <span
              key={index}
              className={`tabItem ${index === selectedTab ? "active" : ""} `}
              onClick={() => activeTab(tab, index)}
            >
              {tab}
            </span>
          );
        })}
        <span className="movingBg" style={{ left: leftStyle }} />
      </div>
    </div>
  );
};
export default SwitchTabs;
