"use client";

import { useState } from "react";

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

export function Tabs({ tabs }: { tabs: TabItem[] }) {
  const [i, setI] = useState(0);
  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist">
        {tabs.map((t, k) => (
          <button
            key={k}
            role="tab"
            aria-selected={k === i}
            className={`tabs__tab ${k === i ? "tabs__tab--active" : ""}`}
            onClick={() => setI(k)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="tabs__panel" role="tabpanel">
        {tabs[i].content}
      </div>
    </div>
  );
}
