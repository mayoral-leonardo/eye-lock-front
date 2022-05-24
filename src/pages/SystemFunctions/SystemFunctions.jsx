import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function SystemFunctions() {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <section className='system-functions'>
      <Sidebar
        onClose={() => setShowDrawer(false)}
        visible={showDrawer}
      />
      <div className='system-functions__main-content'>
        <button onClick={() => setShowDrawer(true)}>Sidebar</button>
      </div>
    </section>
  )
}