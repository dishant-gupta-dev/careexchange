import { useSelector } from 'react-redux';
import React from "react";
import { BrowserRouter as Router, Routes as ReactRoutes, Route, Navigate, Outlet } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import ProviderRoutes from "./ProviderRoutes";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import StaffRoutes from "./StaffRoutes";
import { routes } from '../utlis/admin/routes.utlis';
import { routes as userRoutes } from '../utlis/user/routes.utlis';
import { routes as providerRoutes } from '../utlis/provider/routes.utlis';
import { routes as staffRoutes } from '../utlis/staff/routes.utlis';


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

const ProviderRoute = ({ redirectPath = providerRoutes.login }) => {
    const { careexchange: currentUser } = useSelector((state) => state.auth);
    if (!currentUser) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

const StaffRoute = ({ redirectPath = staffRoutes.login }) => {
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

                <Route element={<ProviderRoute isAllowed={(currentUser?.data?.user?.user_type==2 ? true : false)} />}>
                    {ProviderRoutes.map((providerRoute, index) => {
                        return (
                            <Route element={<providerRoute.layout />} key={index}>
                                <Route path={providerRoute.path} exact={providerRoute.exact} element={<providerRoute.component />} />
                            </Route>
                        );
                    })}
                </Route>

                <Route element={<StaffRoute isAllowed={(currentUser?.data?.user?.user_type==3 ? true : false)} />}>
                    {StaffRoutes.map((staffRoute, index) => {
                        return (
                            <Route element={<staffRoute.layout />} key={index}>
                                <Route path={staffRoute.path} exact={staffRoute.exact} element={<staffRoute.component />} />
                            </Route>
                        );
                    })}
                </Route>

            </ReactRoutes>
        </Router>
    );
};

export default Routes; 