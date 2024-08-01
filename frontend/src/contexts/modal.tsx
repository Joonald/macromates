import {
  Dispatch,
  ReactNode,
  createContext,
  useReducer,
  useContext,
} from "react";

export type ModalState = {
  isLoginOpen: boolean;
  isSignUpOpen: boolean;
};

type ACTIONTYPE =
  | { type: "OPEN_SIGNUP" }
  | { type: "CLOSE_SIGNUP" }
  | { type: "OPEN_LOGIN" }
  | { type: "CLOSE_LOGIN" };

export const ModalContext = createContext<ModalState>({
  isLoginOpen: false,
  isSignUpOpen: false,
});
export const ModalDispatchContext = createContext<Dispatch<ACTIONTYPE>>(
  () => {}
);

function modalReducer(state: ModalState, action: ACTIONTYPE): ModalState {
  switch (action.type) {
    case "OPEN_SIGNUP":
      return { ...state, isSignUpOpen: true };
    case "CLOSE_SIGNUP":
      return { ...state, isSignUpOpen: false };
    case "OPEN_LOGIN":
      return { ...state, isLoginOpen: true };
    case "CLOSE_LOGIN":
      return { ...state, isLoginOpen: false };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const initialState = { isSignUpOpen: false, isLoginOpen: false };
  const [state, dispatch] = useReducer(modalReducer, initialState);

  return (
    <ModalContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
}

export function useSignUpModalState() {
  return useContext(ModalContext);
}

export function useSignUpModalDispatch() {
  return useContext(ModalDispatchContext);
}
