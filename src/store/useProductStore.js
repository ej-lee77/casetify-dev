import { create } from "zustand";
import { caseData } from "../data/caseData";

export const useProductStore = create((set, get)=>({

    items: [],

    onFetchItems: async()=>{
        const caseItems = caseData;
        console.log(caseItems);
    }

}));