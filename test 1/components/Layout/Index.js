import Footer from "components/Footer";
import Header from "components/Header";

export default function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="d-flex flex-column flex-fill bg-secondary p-3">
        {children}
      </main>
      <Footer />
    </div>
  );
}
