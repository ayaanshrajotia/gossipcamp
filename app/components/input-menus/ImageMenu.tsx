import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ImageMenu({
    file,
    closeFileMenu,
}: {
    file: string | undefined;
    closeFileMenu: () => void;
}) {
    return (
        <motion.div
            key="image-modal"
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 800, opacity: 0 }}
            className="absolute bottom-[55px] right-0 gap-2 flex flex-col"
        >
            <div className="bg-college-dark-gray-1 text-white flex items-center justify-between h-[50px] px-4 rounded-xl dark:bg-college-dark-gray-3">
                <span className="uppercase text-sm dark:text-college-dark-white-2">
                    Image
                </span>
                <XMarkIcon
                    className="w-5 h-5 stroke-white dark:stroke-college-dark-white-2 cursor-pointer"
                    onClick={closeFileMenu}
                />
            </div>
            <div className=" bg-white rounded-xl border-[1px] border-stone-400 dark:border-college-dark-gray-3 dark:bg-college-dark-gray-3 p-3 w-[320px]">
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
        </motion.div>
    );
}
