import Header from "./header";
import { Totalframe } from "./layoutStyle";


const Layout = ({ isHeader, children }: { isHeader: boolean; children: React.ReactNode }) => {
    return (
        <Totalframe>
            {isHeader && <Header />}
            {children}
        </Totalframe>
    );
 }

export default Layout;