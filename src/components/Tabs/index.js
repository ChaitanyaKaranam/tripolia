import { useState } from "react"

export default function Tabs({ tabs, onChange, defaultTab }){

    let [activeTab, setActiveTab] = useState(defaultTab)

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