import {
  Dispatch,
  ReactNode,
  createContext,
  useReducer,
  useContext,
} from "react";

export const ModalContext = createContext<boolean>(false);
export const ModalDispatchContext = createContext<Dispatch<ACTIONTYPE>>(
  () => {}
);

type ACTIONTYPE = { type: "OPEN_MODAL" } | { type: "CLOSE_MODAL" };

function modalReducer(state: boolean, action: ACTIONTYPE): boolean {
  switch (action.type) {
    case "OPEN_MODAL":
      return true;
    case "CLOSE_MODAL":
      return false;
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
}

export function SignUpProvider({ children }: { children: ReactNode }) {
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
