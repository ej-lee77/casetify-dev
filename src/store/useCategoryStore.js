import { create } from "zustand";

const initialFilters = {
    colors: [],
    priceRange: [0, Infinity],
    caseCategories: [],
    freeShipping: false,
    devices: [],
};

export const useCategoryStore = create((set, get) => ({
    baseItems: [],
    displayItems: [],
    currentMiniCategory: null,

    isFilterOpen: false,
    isDeviceOpen: false,
    selectedBrand: "Apple",

    selectedFilters: initialFilters,

    colorOptions: [],
    caseCategoryOptions: [],
    brandDeviceOptions: {
        Apple: [],
        Samsung: [],
        Google: [],
    },
    deviceOptions: [],

    setBaseItems: (items, currentMiniCategory = null) => {
        set({
            baseItems: items,
            displayItems: items,
            currentMiniCategory,
            selectedFilters: initialFilters,
            selectedBrand: "Apple",
        });
        get().buildOptions(items);
    },

    buildOptions: (items) => {
        const colorSet = new Set();
        const caseCategorySet = new Set();

        const brandMap = {
            Apple: new Set(),
            Samsung: new Set(),
            Google: new Set(),
        };

        const deviceSet = new Set();

        items.forEach((item) => {
            const colors = Array.isArray(item.color) ? item.color : [];
            colors.forEach((color) => {
                if (color) colorSet.add(color);
            });

            if (item.caseCategory && item.caseCategory.trim() !== "") {
                caseCategorySet.add(item.caseCategory);
            }

            // 핸드폰처럼 객체 구조
            if (
                item.deviceCategory &&
                !Array.isArray(item.deviceCategory) &&
                typeof item.deviceCategory === "object" &&
                Object.keys(item.deviceCategory).length > 0
            ) {
                Object.entries(item.deviceCategory).forEach(([brand, models]) => {
                    if (brandMap[brand]) {
                        (models || []).forEach((model) => {
                            if (model) brandMap[brand].add(model);
                        });
                    }
                });
            }

            // 이어폰/노트북/워치/태블릿/캐리어처럼 배열 구조
            if (Array.isArray(item.deviceCategory)) {
                item.deviceCategory.flat().forEach((device) => {
                    if (device) deviceSet.add(device);
                });
            }
        });

        set({
            colorOptions: [...colorSet],
            caseCategoryOptions: [...caseCategorySet],
            brandDeviceOptions: {
                Apple: [...brandMap.Apple],
                Samsung: [...brandMap.Samsung],
                Google: [...brandMap.Google],
            },
            deviceOptions: [...deviceSet],
        });
    },

    openFilterPanel: () => {
        set({
            isFilterOpen: true,
            isDeviceOpen: false,
        });
    },

    openDevicePanel: () => {
        set({
            isDeviceOpen: true,
            isFilterOpen: false,
        });
    },

    closePanels: () => {
        set({
            isFilterOpen: false,
            isDeviceOpen: false,
        });
    },

    setSelectedBrand: (brand) => {
        set({ selectedBrand: brand });
    },

    toggleColor: (color) => {
        const prev = get().selectedFilters.colors;
        const next = prev.includes(color)
            ? prev.filter((v) => v !== color)
            : [...prev, color];

        set((state) => ({
            selectedFilters: {
                ...state.selectedFilters,
                colors: next,
            },
        }));

        get().applyFilters();
    },

    toggleCaseCategory: (category) => {
        const prev = get().selectedFilters.caseCategories;
        const next = prev.includes(category)
            ? prev.filter((v) => v !== category)
            : [...prev, category];

        set((state) => ({
            selectedFilters: {
                ...state.selectedFilters,
                caseCategories: next,
            },
        }));

        get().applyFilters();
    },

    toggleDevice: (device) => {
        const prev = get().selectedFilters.devices;
        const next = prev.includes(device)
            ? prev.filter((v) => v !== device)
            : [...prev, device];

        set((state) => ({
            selectedFilters: {
                ...state.selectedFilters,
                devices: next,
            },
        }));

        get().applyFilters();
    },

    setFreeShipping: (checked) => {
        set((state) => ({
            selectedFilters: {
                ...state.selectedFilters,
                freeShipping: checked,
            },
        }));

        get().applyFilters();
    },

    setPriceRange: (min, max) => {
        set((state) => ({
            selectedFilters: {
                ...state.selectedFilters,
                priceRange: [min, max],
            },
        }));

        get().applyFilters();
    },

    removeFilter: (type, value) => {
        const current = get().selectedFilters;

        if (type === "color") {
            set({
                selectedFilters: {
                    ...current,
                    colors: current.colors.filter((v) => v !== value),
                },
            });
        }

        if (type === "caseCategory") {
            set({
                selectedFilters: {
                    ...current,
                    caseCategories: current.caseCategories.filter((v) => v !== value),
                },
            });
        }

        if (type === "device") {
            set({
                selectedFilters: {
                    ...current,
                    devices: current.devices.filter((v) => v !== value),
                },
            });
        }

        if (type === "freeShipping") {
            set({
                selectedFilters: {
                    ...current,
                    freeShipping: false,
                },
            });
        }

        if (type === "priceRange") {
            set({
                selectedFilters: {
                    ...current,
                    priceRange: [0, Infinity],
                },
            });
        }

        get().applyFilters();
    },

    clearAllFilters: () => {
        set((state) => ({
            selectedFilters: initialFilters,
            displayItems: state.baseItems,
        }));
    },

    applyFilters: () => {
        const { baseItems, selectedFilters } = get();

        const filtered = baseItems.filter((item) => {
            const itemPrice = Number(item.price || 0);

            if (
                selectedFilters.colors.length > 0 &&
                !selectedFilters.colors.some((color) => (Array.isArray(item.color) ? item.color : []).includes(color))
            ) {
                return false;
            }

            const [min, max] = selectedFilters.priceRange;
            if (itemPrice < min || itemPrice > max) {
                return false;
            }

            if (
                selectedFilters.caseCategories.length > 0 &&
                !selectedFilters.caseCategories.includes(item.caseCategory)
            ) {
                return false;
            }

            if (
                selectedFilters.freeShipping &&
                !(item.badge || []).includes("무료 배송")
            ) {
                return false;
            }

            if (selectedFilters.devices.length > 0) {
                let deviceList = [];

                if (
                    item.deviceCategory &&
                    !Array.isArray(item.deviceCategory) &&
                    typeof item.deviceCategory === "object"
                ) {
                    deviceList = Object.values(item.deviceCategory).flat();
                } else if (Array.isArray(item.deviceCategory)) {
                    deviceList = item.deviceCategory.flat();
                }

                if (!selectedFilters.devices.some((device) => deviceList.includes(device))) {
                    return false;
                }
            }

            return true;
        });

        set({ displayItems: filtered });
    },
}));