import { useRecoilValue } from "recoil";
import dashboardUser from '../../atoms/dashboardUser'

const DashboardHome = () => {
    const user = useRecoilValue(dashboardUser);
    console.log(user)
    return (
        <>
            <h1 className="dashboard-title">Hejka, {user?.login}</h1>
        </>
    );
};

export default DashboardHome;
