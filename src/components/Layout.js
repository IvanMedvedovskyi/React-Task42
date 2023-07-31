import {Outlet} from "react-router-dom";
import Nav from "./Nav";

const Layout = () => (
        <main className='container'>
            <Nav/>
            <Outlet></Outlet>
        </main>
);


export default Layout;