const numberToBoxOffice = number => {
    console.log(number >= 1.0e6 || number < 1.0e9);
    switch (true) {
        case number >= 1.0e9:
            return `${(Math.abs(number) / 1.0e9).toFixed(3)} Billion`;
        case number >= 1.0e6 && number < 1.0e9:
            return `${(Math.abs(number) / 1.0e6).toFixed(3)} Million`;
        case number >= 1.0e3 && number < 1.0e6:
            return `${(Math.abs(number) / 1.0e3).toFixed(3)} Thousand`;
        case number < 0:
            return `No Box Office update!`;
        default:
            return number;
    }
};

export default numberToBoxOffice;
