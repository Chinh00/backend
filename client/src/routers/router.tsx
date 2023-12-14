import {useRoutes} from "react-router-dom";
import {lazy, Suspense} from "react";
import LayoutDefault from "@/Layout/LayoutDefault.tsx";



const Home = lazy(() => import("@/pages/Home/Home.tsx"))
const Login = lazy(() => import("@/pages/Auth/Login/Login.tsx"))



const Router = () => {
    return useRoutes([
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
                    path: "/login",
                    element:
                        <Suspense fallback={<div>Loading ....</div>}>
                            <Login />
                        </Suspense>
                }
            ]
        }



    ])
}

export default Router