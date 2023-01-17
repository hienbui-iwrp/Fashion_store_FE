import { ReactNode } from "react";
import { Button } from "antd";

export default function ButtonHeader({ name, iconInput }: { name: string, iconInput?: ReactNode }) {
  return (
    <Button icon={iconInput || null}>
      {name}
    </ Button>
  )
}