import { ReactNode } from "react";
import { Button } from "antd";

export default function ButtonHeader({ name, iconInput }: { name: string, iconInput?: ReactNode }) {
  return (
    <Button className="bg-[#D9D9D9] hover:!bg-[#D9D9D9]" type="text" icon={iconInput || null}>
      {name}
    </ Button>
  )
}