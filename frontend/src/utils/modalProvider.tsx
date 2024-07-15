import {
  Dispatch,
  ReactNode,
  createContext,
  useReducer,
  useContext,
} from "react";

export const ModalContext = createContext(false);
export const ModalDispatchContext = createContext<Dispatch<ACTIONTYPE>>(
  () => null
);

type ACTIONTYPE = "OPEN_MODAL" | "CLOSE_MODAL";

function modalReducer(state: boolean, action: ACTIONTYPE): boolean {
  switch (action) {
    case "OPEN_MODAL":
      return true;
    case "CLOSE_MODAL":
      return false;
    default:
      return false;
  }
}

export default function ModalProvider({ children }: { children: ReactNode }) {
  const initialState = false;
  const [state, dispatch] = useReducer(modalReducer, initialState);

  return (
    <ModalContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
}

export function useModalState() {
  return useContext(ModalContext);
}

export function useModalDispatch() {
  return useContext(ModalDispatchContext);
}
