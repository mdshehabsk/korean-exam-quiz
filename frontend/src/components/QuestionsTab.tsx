import { useEffect, useState } from "react";

type TTab = {
  name: "Reading" | "Listening";
  select: boolean;

};

type TProps = {
  getActiveTab: (arg0: "Reading" | "Listening" ) => void
  activeTab: string
}

const QuestionsTab = (props:TProps) => {
  const {getActiveTab,activeTab} = props
  const [tabs, setTabs] = useState<TTab[]>([
    {
      name: "Reading",
      select: activeTab === 'Reading' ? true: false,
    },
    {
      name: "Listening",
      select: activeTab === 'Listening' ? true: false,
    },
  ]);

  const tabControlFn = (tab: TTab) => {
    setTabs((prev) =>
      prev.map((prevTab) => {
        if (prevTab.name === tab.name)
          return {
            ...prevTab,
            select: true,
          };
        return {
          ...prevTab,
          select: false,
        };
      })
    );
  };
  useEffect(() => {
    const activeTab = tabs.find(tab => tab.select) as TTab;
      getActiveTab(activeTab?.name)
    
  }, [tabs, getActiveTab]);
  return (
    <div className="p-4 md:p-5 space-y-4">
      <div className="border-b border-gray-200 ">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 ">
          {tabs?.map((tab, index) => (
            <li
              key={index}
              onClick={() => tabControlFn(tab)}
              className="me-2 cursor-pointer"
            >
              <a
                className={`inline-flex items-center justify-center p-4 border-b-2 ${
                  tab.select
                    ? "text-blue-600 border-blue-600"
                    : "border-transparent"
                }  rounded-t-lg  `}
              >
                {tab.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionsTab;
