import "@/App.css";
import LoginPage from "@/pages/login-page/login-page";
import PersonalPage from "@/pages/personal-page/personal-page";
import { AppRoute } from "@/utils/constant";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import EmptyCategory from "./components/empty-category/empty-category";
import Loader from "./components/loader/loader";
import UnauthorizedRoute from "./components/unauthorized-route/unauthorized-route";
import PrivateRoute from "./components/private-route/private-route";
import { useAppSelector } from "./hooks/store-hooks";
import ProfilePage from "./pages/profile-page/profile-page";
import PermissionProvider from "./providers/permission-provider/permission-provider";
import { getAllUserPermissions } from "./store/role/selectors";
import ErrorPage from "./pages/error-page/error-page";

const CatalogPage = lazy(() => import("./pages/catalog-page/catalog-page"));
const ReportsPage = lazy(() => import("./pages/reports-page/reports-page"));
const RolesPage = lazy(() => import("./pages/roles-page/roles-page"));
const EditRolePage = lazy(() => import("./pages/roles-page/edit-role-page"));
const EditCompanyPage = lazy(
  () => import("./pages/company-page/edit-company-page")
);
const MarketplacesPage = lazy(
  () => import("./pages/marketplaces-page/marketplaces-page")
);
const GroupCompanyPage = lazy(
  () => import("./pages/group-company-page/group-company-page")
);
const EmployeesPage = lazy(
  () => import("./pages/employees-page/employees-page")
);
const EditEmploeePage = lazy(
  () => import("./pages/employees-page/edit-emploee-page")
);
const CompanyPage = lazy(() => import("./pages/company-page/company-page"));
const AddEmploeePage = lazy(
  () => import("./pages/employees-page/add-employee-page")
);
const EditGroupCompany = lazy(
  () => import("./pages/group-company-page/edit-group-company-page")
);
function App() {
  const permissions = useAppSelector(getAllUserPermissions);

  return (
    <PermissionProvider permissions={permissions}>
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route
            path={AppRoute.Auth}
            element={
              <UnauthorizedRoute>
                <LoginPage />
              </UnauthorizedRoute>
            }
          />
          <Route
            path={AppRoute.Personal}
            element={
              <PrivateRoute>
                <PersonalPage />
              </PrivateRoute>
            }
          >
            <Route index element={<EmptyCategory />} />
            <Route path={AppRoute.Profile} element={<ProfilePage />} />
            <Route
              path={AppRoute.GroupCompanies}
              element={<GroupCompanyPage />}
            />
            <Route
              path={AppRoute.EditGroupCompany}
              element={<EditGroupCompany />}
            />
            <Route path={AppRoute.Companies} element={<CompanyPage />} />
            <Route path={AppRoute.EditCompany} element={<EditCompanyPage />} />

            <Route path={AppRoute.Employees} element={<EmployeesPage />} />
            <Route path={AppRoute.EditEmployee} element={<EditEmploeePage />} />
            <Route path={AppRoute.AddEmployee} element={<AddEmploeePage />} />

            <Route path={AppRoute.Catalog} element={<CatalogPage />} />
            <Route path={AppRoute.Reports} element={<ReportsPage />} />
            <Route path={AppRoute.Roles} element={<RolesPage />} />
            <Route path={AppRoute.EditRole} element={<EditRolePage />} />
            <Route
              path={AppRoute.Marketplaces}
              element={<MarketplacesPage />}
            />
          </Route>
          <Route
            path="*"
            element={
              <PrivateRoute>
                <ErrorPage />
              </PrivateRoute>
            }
          />
        </Routes>{" "}
      </Suspense>
    </PermissionProvider>
  );
}

export default App;
