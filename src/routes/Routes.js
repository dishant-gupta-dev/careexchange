import { useSelector } from 'react-redux';
import React from "react";
import { BrowserRouter as Router, Routes as ReactRoutes, Route, Navigate, Outlet } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import AdminRoutes from "./AdminRoutes";
import { routes } from '../utlis/routes.utlis';


const AdminRoute = ({ redirectPath = routes.login }) => {
    const { careexchange: currentUser } = useSelector((state) => state.auth);
    if (!currentUser) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

const Routes = (props) => {
    const { careexchange: currentUser } = useSelector((state) => state.auth);
    
    return (
        <Router>
            <ReactRoutes>

                {AuthRoutes.map((authRoute, index) => {
                    return (
                        <Route element={<authRoute.layout />} key={index}>
                            <Route
                                path={authRoute.path}
                                exact={authRoute.exact}
                                element={<authRoute.component />}
                            />
                        </Route>
                    );
                })}

                <Route element={<AdminRoute isAllowed={currentUser} />}>
                    {AdminRoutes.map((admiRoute, index) => {
                        return (
                            <Route element={<admiRoute.layout />} key={index}>
                                <Route path={admiRoute.path} exact={admiRoute.exact} element={<admiRoute.component />} />
                            </Route>
                        );
                    })}
                </Route>

            </ReactRoutes>
        </Router>
    );
};

export default Routes; 