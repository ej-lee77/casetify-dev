export const filterConfigMap = {
    case: {
        device: {
            phone: ["model", "magsafe", "price", "color", "stock"],
            earphone: ["model", "price", "color", "stock"],
            laptop: ["model", "price", "color", "stock"],
            watch: ["model", "price", "color", "stock"],
            tablet: ["model", "price", "color", "stock"],
        },
        design: {
            color: ["model", "magsafe", "price", "color", "stock"],
            pattern: ["model", "magsafe", "price", "color", "stock"],
            signature: ["model", "magsafe", "price", "color", "stock"],
        },
        magsafe: {
            default: ["model", "price", "color", "stock"],
        },
        screenprotector: {
            default: ["model", "price", "stock"],
        },
    },

    accessory: {
        strap: {
            default: ["price", "color", "stock"],
        },
        magsafe: {
            default: ["price", "color", "stock"],
        },
        carrier: {
            default: ["price", "color", "stock"],
        },
        etc: {
            default: ["price", "color", "stock"],
        },
    },
};

export const filterLabelMap = {
    model: "기종선택",
    magsafe: "맥세이프 여부",
    price: "가격범위",
    color: "색상",
    stock: "품절여부",
};