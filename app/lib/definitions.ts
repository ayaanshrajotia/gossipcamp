export type BtnPropsType = {
    children: string;
    bgColor: string;
    textColor: string;
    type: string;
    className?: string;
} & Record<string, any>;

export type ContainerPropsType = {
    children: string;
    bgColor: string;
    textColor: string;
    className?: string;
} & Record<string, any>;

export type DropdownPropsType = {
    title: string;
    options?: optionType[];
    handleOptions: (data: string) => void;
};

export type optionType = {
    id: number;
    name: string;
};
