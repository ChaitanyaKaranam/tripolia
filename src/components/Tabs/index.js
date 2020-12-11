import { useState } from "react"

export default function Tabs({ tabs, onChange }){

    let [activeTab, setActiveTab] = useState(tabs && tabs[0] ? tabs[0] : null)

    function onTabClick(tab){
        onChange(tab);
        setActiveTab(tab);
    }

    return(
        <div className="tabs">
            { tabs.map(tab => <span key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => onTabClick(tab)}>{tab}</span> )}
        </div>
    )
}