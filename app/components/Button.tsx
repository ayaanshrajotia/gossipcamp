import { BtnPropsType } from "../utils/definitions";

function Button({
  children,
  type = "button",
  bgcolor = "bg-blue-600",
  textColor,
  className = "",
  ...props
}: BtnPropsType) {
  return (
    <button
      className={`btn border-1 font-secondary relative flex h-12 w-full cursor-pointer items-center justify-center  rounded-lg border-black  font-bold ${textColor} ${className}`}
      style={{ color: textColor }}
      type={type}
      {...props}
    >
      {children}
      <div
        className={`btn-inner absolute z-[-999] h-12 w-full translate-x-1.5 translate-y-1.5 rounded-lg ${bgcolor}`}
      ></div>
    </button>
  );
}

export default Button;
