import { ReactNode } from "react";
import { Button, Typography } from "antd";

export default function ButtonClientPrimary({ htmlType, name, iconInput }: { htmlType?: any, name?: string, iconInput?: ReactNode }) {
  return (
    <Button htmlType={htmlType}
      className="flex justify-center px-2 items-center bg-[#6A983C] text-white font-bold border-4 rounded-xl border-[#46760A] !w-auto hover:!text-white hover:!bg-[#46760A]"
      type="text" icon={iconInput || null}>
      {
        name ? <Typography className='px-6 text-white'>
          {name}
        </Typography> :
          null
      }
    </ Button>
  )
}