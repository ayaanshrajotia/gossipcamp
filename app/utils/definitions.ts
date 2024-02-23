export type BtnPropsType = {
    children: string;
    bgColor: string;
    textColor: string;
    // type: string;
    className?: string;
} & Record<string, any>;

export type ContainerPropsType = {
    children: string;
    bgColor: string;
    textColor: string;
    className?: string;
} & Record<string, any>;

export type RoomPropsType = {
    roomName: string;
    roomId: string;
    bgColor: string;
    textColor: string;
    className?: string;
    isPrivate: boolean;
} & Record<string, any>;

export type RoomBoxPropsType = {
    roomName: string;
    roomId: string;
    bgColor: string;
    textColor: string;
    className?: string;
    isPrivate: boolean;
} & Record<string, any>;

export type UserBoxPropsType = {
    userName: string;
    userId: string;
    bgColor: string;
    textColor: string;
    className?: string;
    isPrivate: boolean;
} & Record<string, any>;

export type RoomBoxBiggerPropsType = {
    roomName: string;
    roomId: string;
    bgColor: string;
    textColor: string;
    className?: string;
    isPrivate: boolean;
} & Record<string, any>;

export type DropdownPropsType = {
    options?: optionType[];
    className?: string;
    handleOptions: (data: string) => void;
};

export type PostBoxPropsType = {
    // children: any;
    bgColor?: string;
    textColor?: string;
    className?: string;
    date: string;
    profileUrl: string;
    postImgUrl?: string;
    user: string;
    description: string;
    isUser: boolean;
} & Record<string, any>;

export type optionType = {
    id: number;
    name: string;
};

export type PeopleCountPropType = {
    width: string;
    height: string;
    margin: string;
};
