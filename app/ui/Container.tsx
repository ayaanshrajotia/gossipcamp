import { BtnPropsType, ContainerPropsType } from "../utils/definitions";

function Container({
    children,
    bgColor = "bg-blue-600",
    textColor,
    className = "",
    ...props
}: ContainerPropsType) {
    return (
        <div
            className={`relative w-full border-1 border-black rounded-lg font-secondary ${textColor} ${className} bg-white p-4`}
            style={{ color: textColor }}
            {...props}
        >
            {children}
            {/* <div
                className={`absolute w-full h-12 rounded-lg translate-x-1 translate-y-1 z-[-1] ${bgColor}`}
            ></div> */}
        </div>
    );
}

export default Container;
