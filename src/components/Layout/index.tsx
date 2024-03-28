import Header from "./Header";
import Footer from "./Footer";
import "./styles.scss"

type LayoutProps = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app-container">
      <Header />
      <main className="children-container">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
