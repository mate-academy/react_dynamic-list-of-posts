import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Store } from "../store";

export const useAppSelector: TypedUseSelectorHook<Store> = useSelector;
