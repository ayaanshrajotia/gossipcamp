import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function ImageMenu({
    file,
    closeFileMenu,
}: {
    file: string | undefined;
    closeFileMenu: () => void;
}) {
    return (
        <div className="absolute bottom-[55px] right-0 gap-2 flex flex-col">
            <div className="bg-white rounded-xl border-[1px] border-stone-400 dark:border-college-dark-gray-3 dark:bg-college-dark-gray-2 flex justify-between p-3 items-center py-2">
                <span className="text-[#565759] dark:text-college-dark-white-2">
                    IMAGE
                </span>
                <XMarkIcon
                    className="w-5 h-5 stroke-[#565759] dark:stroke-college-dark-white-2 cursor-pointer"
                    onClick={closeFileMenu}
                />
            </div>
            <div className=" bg-white rounded-xl border-[1px] border-stone-400 dark:border-college-dark-gray-3 dark:bg-college-dark-gray-2 p-3 w-[320px]">
                <Image
                    src={file ?? ""}
                    alt="image"
                    width={0}
                    height={0}
                    sizes="33vw"
                    className="rounded-lg"
                    style={{ width: "100%", height: "auto" }}
                />
            </div>
        </div>
    );
}
