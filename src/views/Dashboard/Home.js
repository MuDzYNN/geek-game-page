import { useRecoilValue } from "recoil";
import dashboardUser from '../../atoms/dashboardUser'

const DashboardHome = () => {
    const user = useRecoilValue(dashboardUser);
    return (
        <>
            <h1 className="dashboard-title">Hejka, {user?.login}</h1>
            <h3 className="dashboard-title">A może zagramy?</h3>
        </>
    );
};

export default DashboardHome;
