import {Link} from "react-router-dom";
import {Button} from "antd";
import {CiLogout} from "react-icons/ci";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {setIsLogin} from "@/redux/root.slice.ts";

const AppBar = () => {
  const dispatch = useAppDispatch()
  const role = useAppSelector(e => e.role)
  console.log(role)
  return <div className={"w-full flex justify-center items-center gap-5  py-3 bg-orange-300"}>
    <Link to={"/home"} className={"px-3 py-2 hover:bg-slate-300"}>Tài khoản</Link>

    {role === 0 && <>
      <Link to={"/buucuc"} className={"px-3 py-2 hover:bg-slate-300"}>Bưu cục</Link>
      <Link to={"/buuta"} className={"px-3 py-2 hover:bg-slate-300"}>Bưu tá</Link>
      <Link to={"/donhang"} className={"px-3 py-2 hover:bg-slate-300"}>Đơn hàng</Link>
      <Link to={"/phantuyen"} className={"px-3 py-2 hover:bg-slate-300"}>Phân tuyến</Link>
    </>}

    {role === 1 && <>
      <Link to={"/phantuyen"} className={"px-3 py-2 hover:bg-slate-300"}>Hành trình</Link>

    </>}
    <Button icon={<CiLogout />} className={"bg-red-400"} onClick={() => dispatch(setIsLogin(false))} />
  </div>

}

export default AppBar