import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useIsAuthorized = () => {
    return useContext(AuthContext)
}
export default useIsAuthorized