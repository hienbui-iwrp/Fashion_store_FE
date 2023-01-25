import { ReactNode } from "react";
import { Button } from "antd";

export default function ButtonClientPrimary({ htmlType, name, iconInput }: { htmlType?: any, name?: string, iconInput?: ReactNode }) {
  return (
    <Button htmlType={htmlType}
      className="flex justify-center pl-8 pr-8 items-center bg-[#6A983C] text-white font-bold border-4 rounded-xl border-[#46760A] !w-auto
    hover:!text-white hover:!bg-[#46760A]"
      type="text" icon={iconInput || null}>
      {name}
    </ Button>
  )
}