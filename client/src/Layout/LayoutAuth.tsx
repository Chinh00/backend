import {Outlet} from "react-router-dom";

const LayoutAuth = () => {
    return <div className={"w-full bg-slate-100 min-h-screen"}>
        <Outlet />
    </div>
}

export default LayoutAuth