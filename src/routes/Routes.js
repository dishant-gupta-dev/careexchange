import { useSelector } from 'react-redux';
import React from "react";
import { BrowserRouter as Router, Routes as ReactRoutes, Route, Navigate, Outlet } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import ProviderRoutes from "./ProviderRoutes";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import { routes } from '../utlis/admin/routes.utlis';
import { routes as userRoutes } from '../utlis/user/routes.utlis';


const AdminRoute = ({ redirectPath = routes.login }) => {
    const { careexchange: currentUser } = useSelector((state) => state.auth);
    if (!currentUser) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

const UserRoute = ({ redirectPath = userRoutes.login }) => {
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

                {ProviderRoutes.map((authRoute, index) => {
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

                <Route element={<AdminRoute isAllowed={(currentUser?.data?.adminUser?.user_type==4 ? true : false)} />}>
                    {AdminRoutes.map((admiRoute, index) => {
                        return (
                            <Route element={<admiRoute.layout />} key={index}>
                                <Route path={admiRoute.path} exact={admiRoute.exact} element={<admiRoute.component />} />
                            </Route>
                        );
                    })}
                </Route>

                <Route element={<UserRoute isAllowed={(currentUser?.data?.user?.user_type==1 ? true : false)} />}>
                    {UserRoutes.map((userRoute, index) => {
                        return (
                            <Route element={<userRoute.layout />} key={index}>
                                <Route path={userRoute.path} exact={userRoute.exact} element={<userRoute.component />} />
                            </Route>
                        );
                    })}
                </Route>

            </ReactRoutes>
        </Router>
    );
};

export default Routes; 