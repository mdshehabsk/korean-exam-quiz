import React from "react";


type TProps = {
    isOn:boolean,
    switchToggle : React.Dispatch<boolean>
}

const Switch = (props:TProps) => {
    const {isOn,switchToggle} = props
    const switchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switchToggle(event.target.checked)
    }
  return (
    <label className="inline-flex  items-center cursor-pointer"  >
      <input type="checkbox" value="" className="sr-only peer" checked={isOn} onChange={switchChange} />
      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
      <span className="ms-3 text-sm font-medium text-gray-900">
        Title Question
      </span>
    </label>
  );
};

export default Switch;
