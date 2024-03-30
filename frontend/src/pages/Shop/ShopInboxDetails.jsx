import React from 'react'
import DashBoardHeader from '../../components/Shop/Layout/DashBoardHeader'
import ShopInbox from "../../components/Shop/ShopInbox.jsx"

const ShopInboxDetails = () => {
  return (
    <>
    <DashBoardHeader />
    <div className={`w-full mt-[70px] md:mt-[100px] fixed bg-gradient-to-r from-slate-50 to-slate-100 ...`}>
      <ShopInbox />
    </div>
  </>
  )
}

export default ShopInboxDetails
