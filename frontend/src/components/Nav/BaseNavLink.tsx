import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  to: string;
  end?: boolean;
  children: React.ReactNode;
  className?: string;
};

const BaseNavLink = (props: Props) => {
  return (
    <NavLink
      className={props.className || "p-1 rounded-full w-[100px] text-center"}
      to={props.to}
      end={props.end}
    >
      {props.children}
    </NavLink>
  );
};

export default BaseNavLink;
