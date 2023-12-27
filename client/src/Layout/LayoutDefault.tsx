import React from "react";
import {Outlet} from "react-router-dom";
import AppBar from "@/Layout/Common/AppBar.tsx";


export interface LayoutDefaultProps {
}

const LayoutDefault = ({}: LayoutDefaultProps) => {
    return <div className={"bg-slate-100"}>
        <AppBar />
        <Outlet />
    </div>
}

export default LayoutDefault