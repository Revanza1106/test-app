import Dashboard from "./components/Dashboard";
import SideBar from "./components/SideBar";



export default function Home(){
    return(

        <>
            <div className="d-flex">
                <SideBar/>
                <Dashboard/>
            </div>
        </>
    )
}