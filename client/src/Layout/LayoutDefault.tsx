import React, {ReactNode} from "react";
import {Outlet} from "react-router-dom";
import AppBar from "@/Layout/Common/AppBar.tsx";


export interface LayoutDefaultProps {
}

const LayoutDefault = ({}: LayoutDefaultProps) => {
    return <>
        <AppBar />
        <Outlet />
    </>
}

export default LayoutDefault