import { Card } from "../Components/Card/Card";
import Footer from "../Components/Footer/Footer";
import Swiper from "../Components/Swiper/Swiper";

export default function HomePage() {
  return (
    <>
      <Swiper />
      <div className="container py-5">
        <h1 className="fw-bold mb-3" style={{ color: "#fff" }}>
          Find the right <span className="text-primary">Mediciation</span>{" "}
          instantly
        </h1>
        <p className="lead mb-4" style={{ color: "#f1f1f1" }}>
          Search 50,000+ medications, check real-time availability at nearby
          pharmacies, and discover safe alternatives — all in one place.
        </p>
        <div className="catalog-section mb-4">
          <p className="catalog-label">DRUG CATALOG</p>

          <h3 className="catalog-title">Popular Medications</h3>

          <p className="catalog-count">6 medications found</p>
        </div>
        <div className="row g-4 justify-content-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              className="col-12 col-sm-6 col-lg-4 col-xl-3 justify-content-center"
              key={index}
            >
              <Card />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
