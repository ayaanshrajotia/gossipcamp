export type BtnPropsType = {
    children: string;
    bgcolor: string;
    textColor: string;
    // type: string;
    className?: string;
} & Record<string, any>;

export type ContainerPropsType = {
    children: string;
    bgcolor: string;
    textColor: string;
    className?: string;
} & Record<string, any>;

export type RoomPropsType = {
    roomName: string;
    roomId: string;
    textColor: string;
    className?: string;
    isPrivate: boolean;
    imgUrl: string;
    totalParticipants: number;
} & Record<string, any>;

export type PrivateRoomPropsType = {
    roomName: string;
    roomId: string;
    bgcolor: string;
    textColor: string;
    className?: string;
    isPrivate: boolean;
    imgUrl: string;
    totalParticipants: number;
} & Record<string, any>;

export type RoomBoxPropsType = {
    roomName: string;
    roomId: string;
    roomType: string;
    roomUsername: string;
    roomDP: string;
    roomDescription: string;
    bgcolor: string;
    textColor: string;
    className?: string;
    isPrivate: boolean;
    totalParticipants: number;
} & Record<string, any>;

export type UserBoxPropsType = {
    userName: string;
    userId: string;
    followers: number;
    bgcolor: string;
    textColor: string;
    bio?: string;
    className?: string;
    isPrivate: boolean;
    isFollowing: boolean;
    profileId: string;
    avatar: string;
} & Record<string, any>;

export type RoomBoxBiggerPropsType = {
    roomName: string;
    roomId: string;
    roomType: string;
    roomUsername: string;
    roomDP: string;
    roomDescription: string;
    bgcolor: string;
    textColor: string;
    className?: string;
    isPrivate: boolean;
    totalParticipants: number;
} & Record<string, any>;

export type DropdownPropsType = {
    options?: any[];
    className?: string;
    handleOptions: (data: string) => void;
} & Record<string, any>;

export type TextImageBoxPropsType = {
    // children: any;
    bgcolor?: string;
    messageType: string;
    textColor?: string;
    className?: string;
    date: string;
    profileUrl: string;
    postImgUrl?: string;
    user: string;
    description: string;
    isUser: boolean;
    likesCount: number;
    isLiked: boolean;
    gossipVotesCount: number;
    isGossipVoted: boolean;
} & Record<string, any>;

export type GossipMessagePropsType = {
    id: string;
    bgcolor?: string;
    messageType: string;
    textColor?: string;
    className?: string;
    date: string;
    profileUrl: string;
    postImgUrl?: string;
    user: string;
    description: string;
    isUser: boolean;
} & Record<string, any>;

export type GossipBoxPropsType = {
    // children: any;
    bgcolor?: string;
    messageType: string;
    textColor?: string;
    className?: string;
    date: string;
    profileUrl: string;
    postImgUrl?: string;
    user: string;
    description: string;
    isUser: boolean;
    likesCount: number;
    isLiked: boolean;
    gossipVotesCount: number;
    isGossipVoted: boolean;
} & Record<string, any>;

export type ImageBoxPropsType = {
    // children: any;
    bgcolor?: string;
    messageType: string;
    textColor?: string;
    className?: string;
    date: string;
    profileUrl: string;
    postImgUrl?: string;
    user: string;
    description: string;
    isUser: boolean;
    likesCount: number;
    isLiked: boolean;
} & Record<string, any>;

export type PollBoxPropsType = {
    // children: any;
    bgcolor?: string;
    messageType: string;
    textColor?: string;
    className?: string;
    date: string;
    profileUrl: string;
    postImgUrl?: string;
    isLiked: boolean;
    user: string;
    description: string;
    isUser: boolean;
    pollIndex: string;
} & Record<string, any>;

export type JoinLeaveBoxPropsType = {
    // children: any;
    bgcolor?: string;
    textColor?: string;
    messageType: string;
    className?: string;
    date: string;
    profileUrl: string;
    postImgUrl?: string;
    user: string;
    description: string;
    isUser: boolean;
} & Record<string, any>;

export type MessagesBoxPropsType = {
    // children: any;
    bgcolor?: string;
    textColor?: string;
    messageType: string;
    className?: string;
    date: string;
    profileUrl: string;
    postImgUrl?: string;
    user: string;
    description: string;
    isUser: boolean;
    isLiked: boolean;
    likesCount: number;
} & Record<string, any>;

export type optionType = {
    id: number;
    name: string;
};

export type PeopleCountPropType = {
    width: string;
    height: string;
    margin: string;
    totalParticipants?: number;
    className?: string;
};

export type MessagesContainerProps = {
    roomId: string; // this is becuase of the nextjs useParam hook
};
