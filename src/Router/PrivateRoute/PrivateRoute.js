import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import Loader from '../../Shared/Loader/Loader';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loader></Loader>
    }
    if (user) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace true></Navigate>
}

export default PrivateRoute;