import {Navigate, Outlet, useRoutes} from "react-router-dom";
import {lazy, memo, Suspense} from "react";
import LayoutDefault from "@/Layout/LayoutDefault.tsx";
import {useAppSelector} from "@/redux/hook.ts";
import LayoutAuth from "@/Layout/LayoutAuth.tsx";


const Home = lazy(() => import("@/pages/Home/Home.tsx"))
const Login = lazy(() => import("@/pages/Auth/Login/Login.tsx"))
const BuuCuc = lazy(() => import("@/pages/BuuCuc/BuuCuc.tsx"))
const BuuTa = lazy(() => import("@/pages/BuuTa/BuuTa"))
const DonHang = lazy(() => import("@/pages/DonHang/DonHang.tsx"))
const PhanTuyen = lazy(() => import("@/pages/PhanTuyen/PhanTuyen.tsx"))

const ProtectedRouter = memo(() => {
    const isLogin = useAppSelector(e => e.isLogin)
    return isLogin ? <Outlet /> : <Navigate to={"/login"} />
})

const RejectRouter = memo(() => {
    const isLogin = useAppSelector(e => e.isLogin)
    return !isLogin ? <Outlet /> : <Navigate to={"/home"} />
})


const Router = () => {
    return useRoutes([
        {
            path: "",
            element: <ProtectedRouter />,
            children: [
                {
                    path: "",
                    element: <LayoutDefault />,
                    children: [
                        {
                            path: "/",
                            element:
                                <Suspense fallback={<div>Loading ....</div>}>
                                    <Home />
                                </Suspense>
                        },
                        {
                            path: "/buucuc",
                            element:
                                <Suspense fallback={<div>Loading ....</div>}>
                                    <BuuCuc />
                                </Suspense>
                        },
                        {
                            path: "/phantuyen",
                            element:
                                <Suspense fallback={<div>Loading ....</div>}>
                                    <PhanTuyen />
                                </Suspense>
                        },
                        {
                            path: "/buuta",
                            element:
                                <Suspense fallback={<div>Loading ....</div>}>
                                    <BuuTa />
                                </Suspense>
                        },
                        {
                            path: "/donhang",
                            element:
                                <Suspense fallback={<div>Loading ....</div>}>
                                    <DonHang />
                                </Suspense>
                        },
                    ]
                }
            ]
        },
        {
            path: "",
            element: <RejectRouter />,
            children: [
                {
                    path: "",
                    element: <LayoutAuth />,
                    children: [{
                        path: "/login",
                        element: <Suspense fallback={<div>Loading ...</div>} >
                            <Login />
                        </Suspense>
                    }]
                }
            ]
        },





    ])
}

export default Router