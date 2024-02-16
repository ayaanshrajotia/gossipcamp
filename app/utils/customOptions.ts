const collegesOptions = [
    { id: 0, name: "Choose Your College" },
    { id: 1, name: "LNCT Bhopal" },
    { id: 2, name: "Oriental Institute of Science & Technology" },
    { id: 3, name: "TIT Bhopal" },
];

const firstNames = [
    { id: 0, name: "Choose First Name" },
    { id: 1, name: "black" },
    { id: 2, name: "sexy" },
    { id: 3, name: "handsome" },
];

const lastNames = [
    { id: 0, name: "Choose Last Name" },
    { id: 1, name: "donkey" },
    { id: 2, name: "musician" },
    { id: 3, name: "bear" },
];

const topTypeOptions = [
    { id: 1, name: "NoHair" },
    { id: 2, name: "Eyepatch" },
    { id: 3, name: "Hat" },
    { id: 4, name: "Hijab" },
    { id: 5, name: "Turban" },
    { id: 6, name: "WinterHat1" },
    { id: 7, name: "WinterHat2" },
    { id: 8, name: "WinterHat3" },
    { id: 9, name: "WinterHat4" },
    { id: 10, name: "LongHairBigHair" },
    { id: 11, name: "LongHairBob" },
    { id: 12, name: "LongHairBun" },
    { id: 13, name: "LongHairCurly" },
    { id: 14, name: "LongHairCurvy" },
    { id: 15, name: "LongHairDreads" },
    { id: 16, name: "LongHairFrida" },
    { id: 17, name: "LongHairFro" },
    { id: 18, name: "LongHairFroBand" },
    { id: 19, name: "LongHairNotTooLong" },
    { id: 20, name: "LongHairShavedSides" },
    { id: 21, name: "LongHairMiaWallace" },
    { id: 22, name: "LongHairStraight" },
    { id: 23, name: "LongHairStraight2" },
    { id: 24, name: "LongHairStraightStrand" },
    { id: 25, name: "ShortHairDreads01" },
    { id: 26, name: "ShortHairDreads02" },
    { id: 27, name: "ShortHairFrizzle" },
    { id: 28, name: "ShortHairShaggyMullet" },
    { id: 29, name: "ShortHairShortCurly" },
    { id: 30, name: "ShortHairShortFlat" },
    { id: 31, name: "ShortHairShortRound" },
    { id: 32, name: "ShortHairShortWaved" },
    { id: 33, name: "ShortHairSides" },
    { id: 34, name: "ShortHairTheCaesar" },
    { id: 35, name: "ShortHairTheCaesarSidePart" },
];

const accessoriesTypeOptions = [
    { id: 1, name: "Blank" },
    { id: 2, name: "Kurt" },
    { id: 3, name: "Prescription01" },
    { id: 4, name: "Prescription02" },
    { id: 5, name: "Round" },
    { id: 6, name: "Sunglasses" },
    { id: 7, name: "Wayfarers" },
];

const hairColorOptions = [
    { id: 1, name: "Auburn" },
    { id: 2, name: "Black" },
    { id: 3, name: "Blonde" },
    { id: 4, name: "BlondeGolden" },
    { id: 5, name: "Brown" },
    { id: 6, name: "BrownDark" },
    { id: 7, name: "PastelPink" },
    { id: 8, name: "Blue" },
    { id: 9, name: "Platinum" },
    { id: 10, name: "Red" },
    { id: 11, name: "SilverGray" },
];

const facialHairTypeOptions = [
    { id: 1, name: "Blank" },
    { id: 2, name: "BeardMedium" },
    { id: 3, name: "BeardLight" },
    { id: 4, name: "BeardMajestic" },
    { id: 5, name: "MoustacheFancy" },
    { id: 6, name: "MoustacheMagnum" },
];

const facialHairColorOptions = [
    { id: 1, name: "Auburn" },
    { id: 2, name: "Black" },
    { id: 3, name: "Blonde" },
    { id: 4, name: "BlondeGolden" },
    { id: 5, name: "Brown" },
    { id: 6, name: "BrownDark" },
    { id: 7, name: "Platinum" },
    { id: 8, name: "Red" },
];

const clotheTypeOptions = [
    { id: 1, name: "BlazerShirt" },
    { id: 2, name: "BlazerSweater" },
    { id: 3, name: "CollarSweater" },
    { id: 4, name: "GraphicShirt" },
    { id: 5, name: "Hoodie" },
    { id: 6, name: "Overall" },
    { id: 7, name: "ShirtCrewNeck" },
    { id: 8, name: "ShirtScoopNeck" },
    { id: 9, name: "ShirtVNeck" },
];

const eyeTypeOptions = [
    { id: 1, name: "Close" },
    { id: 2, name: "Cry" },
    { id: 3, name: "Default" },
    { id: 4, name: "Dizzy" },
    { id: 5, name: "EyeRoll" },
    { id: 6, name: "Happy" },
    { id: 7, name: "Hearts" },
    { id: 8, name: "Side" },
    { id: 9, name: "Squint" },
    { id: 10, name: "Surprised" },
    { id: 11, name: "Wink" },
    { id: 12, name: "WinkWacky" },
];

const eyebrowTypeOptions = [
    { id: 1, name: "Angry" },
    { id: 2, name: "AngryNatural" },
    { id: 3, name: "Default" },
    { id: 4, name: "DefaultNatural" },
    { id: 5, name: "FlatNatural" },
    { id: 6, name: "RaisedExcited" },
    { id: 7, name: "RaisedExcitedNatural" },
    { id: 8, name: "SadConcerned" },
    { id: 9, name: "SadConcernedNatural" },
    { id: 10, name: "UnibrowNatural" },
    { id: 11, name: "UpDown" },
    { id: 12, name: "UpDownNatural" },
];

const mouthTypeOptions = [
    { id: 1, name: "Concerned" },
    { id: 2, name: "Default" },
    { id: 3, name: "Disbelief" },
    { id: 4, name: "Eating" },
    { id: 5, name: "Grimace" },
    { id: 6, name: "Sad" },
    { id: 7, name: "ScreamOpen" },
    { id: 8, name: "Serious" },
    { id: 9, name: "Smile" },
    { id: 10, name: "Tongue" },
    { id: 11, name: "Twinkle" },
    { id: 12, name: "Vomit" },
];

const skinColorOptions = [
    { id: 1, name: "Tanned" },
    { id: 2, name: "Yellow" },
    { id: 3, name: "Pale" },
    { id: 4, name: "Light" },
    { id: 5, name: "Brown" },
    { id: 6, name: "DarkBrown" },
    { id: 7, name: "Black" },
];

export {
    collegesOptions,
    firstNames,
    lastNames,
    skinColorOptions,
    mouthTypeOptions,
    eyeTypeOptions,
    eyebrowTypeOptions,
    clotheTypeOptions,
    facialHairColorOptions,
    facialHairTypeOptions,
    hairColorOptions,
    accessoriesTypeOptions,
    topTypeOptions,
};
