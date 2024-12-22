/* eslint-disable no-undef */
import "../assets/js/jquery-3.3.1.min.js";
import "../assets/js/bootstrap.bundle.min.js";
import "../assets/js/jquery.magnific-popup.min.js";
import "../assets/js/masonry.pkgd.min.js";
import "../assets/js/jquery.barfiller.js";
import "../assets/js/jquery.slicknav.js";
import "../assets/js/owl.carousel.min.js";
import "../assets/js/main.js";

import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import GetInTouch from "./GetInTouch";
import OffCanvasMenu from "./OffCanvasMenu.jsx";
import { useEffect } from "react";
import Loading from "./Loading.jsx";
import { useGlobal } from "../contexts/GlobalProvider.jsx";
import NotFound from "../pages/NotFound.jsx";

const Layout = () => {
  const location = useLocation();
  const { settings, loading, errors, fetchSettings } = useGlobal();

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    // Preloader
    $(".loader").fadeOut();
    $("#preloder").delay(300).fadeOut("slow");

    // Background Set
    $(".set-bg").each(function () {
      var bg = $(this).data("setbg");
      var currentBg = $(this).css("background-image");
      if (!currentBg || currentBg === "none") {
        $(this).css("background-image", "url(" + bg + ")");
      }
    });

    // Canvas Menu
    $(document).on("click", ".canvas-open", function () {
      $(".offcanvas-menu-wrapper").addClass("show-offcanvas-menu-wrapper");
      $(".offcanvas-menu-overlay").addClass("active");
    });

    $(document).on(
      "click",
      ".canvas-close, .offcanvas-menu-overlay",
      function () {
        $(".offcanvas-menu-wrapper").removeClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").removeClass("active");
      }
    );

    // Search model
    $(document).on("click", ".search-switch", function () {
      $(".search-model").fadeIn(400);
    });

    $(document).on("click", ".search-close-switch", function () {
      $(".search-model").fadeOut(400, function () {
        $("#search-input").val("");
      });
    });

    // Masonry
    $(".gallery").masonry({
      itemSelector: ".gs-item",
      columnWidth: ".grid-sizer",
      gutter: 10,
    });

    // Navigation
    $(".mobile-menu").slicknav({
      prependTo: "#mobile-menu-wrap",
      allowParentLinks: false,
    });

    // Carousel Slider
    $(".hs-slider").owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      items: 1,
      dots: false,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      navText: [
        '<i class="fa fa-angle-left"></i>',
        '<i class="fa fa-angle-right"></i>',
      ],
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: false,
    });

    // Team Slider
    $(".ts-slider").owlCarousel({
      loop: true,
      margin: 0,
      items: 3,
      dots: true,
      dotsEach: 2,
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: true,
      responsive: {
        320: { items: 1 },
        768: { items: 2 },
        992: { items: 3 },
      },
    });

    // Testimonial Slider
    $(".ts_slider").owlCarousel({
      loop: true,
      margin: 0,
      items: 1,
      dots: false,
      nav: true,
      navText: [
        '<i class="fa fa-angle-left"></i>',
        '<i class="fa fa-angle-right"></i>',
      ],
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: true,
    });

    // Image Popup
    $(".image-popup").magnificPopup({ type: "image" });

    // Video Popup
    $(".video-popup").magnificPopup({ type: "iframe" });

    // Barfiller
    $("#bar1").barfiller({ barColor: "#ffffff", duration: 2000 });
    $("#bar2").barfiller({ barColor: "#ffffff", duration: 2000 });
    $("#bar3").barfiller({ barColor: "#ffffff", duration: 2000 });

    // Table Controls
    $(document).on("click", ".table-controls ul li", function () {
      var tsfilter = $(this).data("tsfilter");
      $(".table-controls ul li").removeClass("active");
      $(this).addClass("active");

      if (tsfilter === "all") {
        $(".class-timetable").removeClass("filtering");
        $(".ts-meta").removeClass("show");
      } else {
        $(".class-timetable").addClass("filtering");
      }
      $(".ts-meta").each(function () {
        $(this).removeClass("show");
        if ($(this).data("tsmeta") === tsfilter) {
          $(this).addClass("show");
        }
      });
    });

    // Cleanup any event listeners on unmount
    return () => {
      $(document).off("click", ".canvas-open");
      $(document).off("click", ".canvas-close, .offcanvas-menu-overlay");
      $(document).off("click", ".search-switch");
      $(document).off("click", ".search-close-switch");
      $(document).off("click", ".table-controls ul li");
    };
  }, [location, settings]);

  if (loading.settings) return <Loading index={true} />;
  if (errors?.settings) return <NotFound />;

  return (
    <>
      {/* <Loading /> */}
      <OffCanvasMenu settings={settings} />

      <Header location={location} settings={settings} />

      <Outlet />

      <GetInTouch settings={settings} />
      <Footer settings={settings} />
    </>
  );
};

export default Layout;
