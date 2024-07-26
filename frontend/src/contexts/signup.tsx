// import {
//   Dispatch,
//   ReactNode,
//   createContext,
//   useReducer,
//   useContext,
// } from "react";

// export const SignUpModalContext = createContext<boolean>(false);
// export const SignUpModalDispatchContext = createContext<Dispatch<ACTIONTYPE>>(
//   () => {}
// );

// type ACTIONTYPE = { type: "OPEN_MODAL" } | { type: "CLOSE_MODAL" };

// function signupModalReducer(state: boolean, action: ACTIONTYPE): boolean {
//   switch (action.type) {
//     case "OPEN_MODAL":
//       return true;
//     case "CLOSE_MODAL":
//       return false;
//     default:
//       throw new Error(`Unhandled action type: ${action}`);
//   }
// }

// export function SignUpProvider({ children }: { children: ReactNode }) {
//   const initialState = false;
//   const [state, dispatch] = useReducer(signupModalReducer, initialState);

//   return (
//     <SignUpModalContext.Provider value={state}>
//       <SignUpModalDispatchContext.Provider value={dispatch}>
//         {children}
//       </SignUpModalDispatchContext.Provider>
//     </SignUpModalContext.Provider>
//   );
// }

// export function useSignUpModalState() {
//   return useContext(SignUpModalContext);
// }

// export function useSignUpModalDispatch() {
//   return useContext(SignUpModalDispatchContext);
// }
