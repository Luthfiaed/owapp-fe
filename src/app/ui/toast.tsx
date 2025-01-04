import React, { ReactNode } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

interface ToastProps {
  type: string;
  title: string;
  children: ReactNode;
}

export default function Toast({ type = "info", title, children }: ToastProps) {
  const icons = {
    success: <CheckCircleIcon className="h-5 w-5 text-green-600" />,
    error: <ExclamationCircleIcon className="h-5 w-5 text-red-600" />,
    info: <InformationCircleIcon className="h-5 w-5 text-blue-600" />,
  };

  const backgrounds = {
    success: "bg-green-400",
    error: "bg-red-400",
    info: "bg-blue-400",
  };

  let selectedIcon;
  let selectedBg;
  switch (type) {
    case "success":
      selectedIcon = icons.success;
      selectedBg = backgrounds.success;
      break;
    case "error":
      selectedIcon = icons.error;
      selectedBg = backgrounds.error;
      break;
    default:
      selectedIcon = icons.info;
      selectedBg = backgrounds.info;
  }

  return (
    <div className={`flex ${selectedBg} mt-4 rounded-md p-2 text-[#222222]`}>
      {selectedIcon}
      <div className="ml-2">
        <h2 className="text-md font-bold font-medium">{title}</h2>
        <p className="mt-2">{children}</p>
      </div>
    </div>
  );
}
