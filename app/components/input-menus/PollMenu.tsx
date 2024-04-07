import { PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

export default function PollMenu({ closePollMenu }: any) {
    const [inputs, setInputs] = useState([{ poll: "" }]);

    const handleAddInput = () => {
        setInputs([...inputs, { poll: "" }]);
    };

    const handleChange = (event: any, index: any) => {
        let { name, value } = event.target;
        let onChangeValue: any = [...inputs];
        onChangeValue[index][name] = value;
        setInputs(onChangeValue);
    };

    const handleDeleteInput = (index: any) => {
        const newArray = [...inputs];
        newArray.splice(index, 1);
        setInputs(newArray);
    };

    console.log(inputs);

    return (
        <div className="absolute bottom-[55px] left-0 gap-2 flex flex-col w-[calc(100%-330px)]">
            <div className="bg-college-dark-gray-1 text-white flex items-center justify-between h-[50px] px-4 rounded-xl dark:bg-college-dark-gray-3">
                <span className="uppercase text-sm dark:text-college-dark-white-2">
                    Options
                </span>
                <XMarkIcon
                    className="w-5 h-5 stroke-white dark:stroke-college-dark-white-2 cursor-pointer"
                    onClick={closePollMenu}
                />
            </div>
            <div className="flex flex-col bg-white p-4 border-[1px] border-stone-400 rounded-xl gap-2 dark:bg-college-dark-gray-3 dark:border-none">
                {inputs.map((item, index) => (
                    <div className="flex flex-col gap-2" key={index}>
                        <div className="flex items-center bg-gray-100 p-2 px-4 pr-2 rounded-xl dark:bg-college-dark-gray-2">
                            <input
                                name="poll"
                                type="text"
                                value={item.poll}
                                className="bg-transparent outline-none w-full  placeholder:text-college-dark-white-2 break-words"
                                onChange={(event) => handleChange(event, index)}
                                placeholder="Add"
                            />
                            {inputs.length > 1 && (
                                <TrashIcon
                                    className="w-5 h-5 cursor-pointer text-[#565759] dark:text-college-dark-white-2"
                                    onClick={() => handleDeleteInput(index)}
                                />
                            )}
                        </div>
                        {index === inputs.length - 1 && inputs.length < 5 && (
                            <PlusIcon
                                className="w-6 h-6 cursor-pointer text-[#565759] dark:text-college-dark-white-2 self-end mr-1"
                                onClick={() => handleAddInput()}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
