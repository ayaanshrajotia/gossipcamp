import { BtnPropsType } from "../lib/definitions";

function Button({ title, bgColor, textColor }: BtnPropsType) {
    return (
        <button
            className={`btn relative w-full h-12 border-1 border-black rounded-lg flex items-center justify-center  font-secondary font-semibold  cursor-pointer `}
            style={{ color: textColor }}
        >
            {title}
            <div
                className={`btn-inner absolute w-full h-12 rounded-lg translate-x-1.5 translate-y-1.5 z-[-999]`}
                style={{ backgroundColor: bgColor }}
            ></div>
        </button>
    );
}

export default Button;
