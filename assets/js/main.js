/**
* Template Name: FlexStart
* Updated: Jun 19 2023 with Bootstrap v5.3.0
* Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 10
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        aos_init();
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfokio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Animation on scroll
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

  on('click', '.link-button,.platform-link', function(e) {
      // 加载远程本地JSON文件
    let versions = {
      "version": "v1.0.4",
      "notes": "Test version",
      "pub_date": "2020-06-22T19:25:57Z",
      "platforms": {
        "darwin-x86_64": {
          "signature": "dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVTWkZMNTdQb2VyYW95V1REU1dhS1phYkp4MCtXbFk4bi8zeHM0THZJNGZCWk1BZkRTMTZGZzhBSXJEMEpuL3drSXBVNWNJdHRVb2FrMVhhbWdUWFhPMHBqMW8rSXZYQ1FrPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNjg5MzI0MDAzCWZpbGU6QUlQdXRpbmcuYXBwLnRhci5negpMWnp2UWppOXpMWURhanA3a2NSeWZ0eEIvdEdjZzBOcUEyQitHK1VOcWcyM0FGVmJFWFlDbmZQNkVsNXJmM0RjWGZFQ2h4MVBERjNPMjRYQU13UWZEdz09Cg==",
          "url": "https://ghproxy.com/https://github.com/Neo110/AIPutingHome/releases/download/v1.0.4/AIPuting_1.0.4_darwin_x86_x64.app.tar.gz"
        },
        "darwin-aarch64": {
          "signature": "dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVTWkZMNTdQb2VyYWlTck1aZ1BOWGpUQkwzRVJqdUUwN1FTYnJvY2JHYWpHQ3d3cUFsOGN2VFFDbkJLdDlVVXc2RDdCQk5uNGp3WlI5ZDVJU2JacmhpdXJGcEJaNVNKL0EwPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNjg5MzIyNjgwCWZpbGU6QUlQdXRpbmcuYXBwLnRhci5nego1cm5QVlVIbjd4UnFyaWxmeEVTbmFlY0JPaDFLclJzQVVSSzIrY1VaZFh3cTRmK082dGpkeG9BZW52TGZ0d1U4ckpoLzlZejM5dHNob0Jmdy80d05EUT09Cg==",
          "url": "https://ghproxy.com/https://github.com/Neo110/AIPutingHome/releases/download/v1.0.4/AIPuting_1.0.4_darwin_aarch64.app.tar.gz"
        },
        "linux-x86_64": {
          "signature": "Content of app.AppImage.tar.gz.sig",
          "url": "https://ghproxy.com/https://github.com/Neo110/AIPutingHome/releases/download/v1.0.4/AIPuting_1.0.2_aarch64.dmg"
        },
        "linux-aarch64": {
          "signature": "Content of app.AppImage.tar.gz.sig",
          "url": "https://ghproxy.com/https://github.com/Neo110/AIPutingHome/releases/download/v1.0.4/AIPuting_1.0.2_aarch64.dmg"
        },
        "windows-x86_64": {
          "signature": "dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVTWkZMNTdQb2VyYWxJcGt4czk3TGJFZWVYS2N2MVV1SFVzZkc0NFpueGcvbHlSc3l3bG5VZlN3TC9oczNSMWIzY2dKTmU3dEJKK29IOWpIU1FYcm9PMHhvOGY2QWY2b0FjPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNjg5MzI1OTY1CWZpbGU6QUlQdXRpbmdfMS4wLjRfeDY0X2VuLVVTLm1zaS56aXAKZnUxV2UvOEhQTW4vQkNOdEs3K1ZPSm5KNkNCYks2bWZIUDF2Q3J1N203ZVNPd3N5U0NibGp5TW1mcE05N01naDUzbTFobkpScXhGcnpRcjRKRDJ1Qnc9PQo=",
          "url": "https://ghproxy.com/https://github.com/Neo110/AIPutingHome/releases/download/v1.0.4/AIPuting_1.0.4_windows_x86_64.msi.zip"
        },
        "windows-aarch64": {
          "signature": "dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVTWkZMNTdQb2VyYWdaL3lhbUF0bjIyRmNKdngxSlBkdC8rWEhJOUlyeFBSeXl0NGlnSXBsdWVqN3VIZjV2VE40TStnZzhnbjBzT2VTOFlsV1RQVDBaV21LRExoMFlReHdVPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNjg5MzE2NDIzCWZpbGU6QUlQdXRpbmdfMS4wLjRfeDY0X2VuLVVTLm1zaS56aXAKc0x6TCt3VXdVV3o1dTVDNlZ4RjZvQTJFNmt0d1MyMGlRMzZtUk1ETEIwVDRFRVJNSm1tWitqbHZ0REZ1SDVTa2JCTlNUdFZwWmRnbmlBSjhLOVdsQlE9PQo=",
          "url": "https://ghproxy.com/https://github.com/Neo110/AIPutingHome/releases/download/v1.0.4/AIPuting_1.0.4_windows_aarch64.msi.zip"
        }
      },
      "install":{
        "darwin-x86_64":"https://ghproxy.com/https://github.com/Neo110/AIPutingHome/releases/download/v1.0.4/AIPuting_1.0.4_darwin_x86_x64.dmg",
        "darwin-aarch64":"https://ghproxy.com/https://github.com/Neo110/AIPutingHome/releases/download/v1.0.4/AIPuting_1.0.4_darwin_aarch64.dmg",
        "linux-dep-x86_64": "",
        "linux-dep-aarch64":"",
        "linux-rpm-x86_64": "",
        "linux-rpm-aarch64":"",
        "windows-x86_64":"https://ghproxy.com/https://github.com/Neo110/AIPutingHome/releases/download/v1.0.4/AIPuting_1.0.4_windows_aarch64.msi",
        "windows-aarch64":"https://ghproxy.com/https://github.com/Neo110/AIPutingHome/releases/download/v1.0.4/AIPuting_1.0.4_windows_x86_64.msi"
      }
    };
      // console.log(versions);

      // 如何获取html data-os 属性值
      var dataOs = this.getAttribute('data-os');
      var dataArch = this.getAttribute('data-arch');
     // 判断系统是什么系统什么版本下载对应的软件
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if(isAndroid){
        window.location.href = "https://www.pgyer.com/5Q1L";
      }
      if(isiOS){
        window.location.href = "https://www.pgyer.com/5Q1L";
      }
      // Windows x86 64
      
      var platform = navigator.platform.toLowerCase();
      var userAgent = navigator.userAgent.toLowerCase();

      let os = "unknown";
      let arch = "unknown";

      if (platform.includes("win")) {
        os = "windows";
        arch = userAgent.includes("wow64") || userAgent.includes("win64")
          ? "x86_64"
          : "x86"; // 32-bit Windows or 64-bit Windows
      } else if (platform.includes("mac") || platform.includes("darwin")) {
        os = "darwin";
        arch = userAgent.includes("arm") ? "aarch64" : "x86_64"; // Apple Silicon (M1) or Intel
      } else if (platform.includes("linux")) {
        os = "linux";
        arch = userAgent.includes("arm64") ? "aarch64" : "x86_64"; // ARM64 or x86_64
      }

      // console.log(os + "-" + arch);
      if(dataArch == "auto"){
        if ( dataOs == "win" && arch == "x86_64" ) {
          window.open(versions.install["windows-x86_64"], "_blank");
        }
        if ( dataOs == "win" && arch == "aarch64" ) {
          window.open(versions.install["windows-aarch64"], "_blank");
        }
        if ( dataOs == "mac" && arch == "x86_64" ) {
          window.open(versions.install["darwin-x86_64"], "_blank");
        }
        if ( dataOs == "mac" && arch == "aarch64" ) {
          window.open(versions.install["darwin-aarch64"], "_blank");
        }
        if ( dataOs == "linux64_deb" && arch == "x86_64" ) {
          window.location.href =  versions.install["linux-deb-x86_64"];
        }
        if ( dataOs == "linux64_deb" && arch == "aarch64" ) {
          window.location.href =  versions.install["linux-deb-aarch64"];
        }

        if ( dataOs == "linux64_rpm" && arch == "x86_64" ) {
          window.location.href =  versions.install["linux-rpm-x86_64"];
        }
        if ( dataOs == "linux64_rpm" && arch == "aarch64" ) {
          window.location.href =  versions.install["linux-rpm-aarch64"];
        }

      }else {
        if ( dataOs == "win64user" && dataArch == "x86_64" ) {
          window.location.href =  versions.install["windows-x86_64"];
        }
        if ( dataOs == "win32arm64user" && dataArch == "aarch64" ) {
          window.location.href =  versions.install["windows-aarch64"];
        }
        
        if ( dataOs == "winzip" && dataArch == "x86_64" ) {
          window.location.href =  versions.platforms["windows-x86_64"].url;
        }
        if ( dataOs == "win32arm64zip" && dataArch == "aarch64" ) {
          window.location.href =  versions.platforms["windows-aarch64"].url;
        }


        if ( dataOs == "darwinx64" && dataArch == "x86_64" ) {
          window.location.href =  versions.install["darwin-x86_64"];
        }
        if ( dataOs == "darwinarm64" && dataArch == "aarch64" ) {
          window.location.href =  versions.install["darwin-aarch64"];
        }

        if ( dataOs == "darwinx64tar" && dataArch == "x86_64" ) {
          window.location.href =  versions.platforms["darwin-x86_64"].url;
        }
        if ( dataOs == "darwinarm64tar" && dataArch == "aarch64" ) {
          window.location.href =  versions.platforms["darwin-aarch64"].url;
        }


        if ( dataOs == "linux64_deb" && dataArch == "x86_64" ) {
          window.location.href =  versions.install["linux-deb-x86_64"];
        }
        if ( dataOs == "linuxarm64_deb" && dataArch == "aarch64" ) {
          window.location.href =  versions.install["linux-deb-aarch64"];
        }

        if ( dataOs == "linux64_rpm" && dataArch == "x86_64" ) {
          window.location.href =  versions.isntall["linux-rpm-x86_64"];
        }
        if ( dataOs == "linuxarm64_rpm" && dataArch == "aarch64" ) {
          window.location.href =  versions.install["linux-rpm-aarch64"];
        }


        if ( dataOs == "linux64tar" && dataArch == "x86_64" ) {
          window.location.href =  versions.platforms["linux-tar-x86_64"].url;
        }
        if ( dataOs == "linuxarm64tar" && dataArch == "aarch64" ) {
          window.location.href =  versions.platforms["linux-tar-aarch64"].url;
        }

      }


    //  alert("This is a link button");
  },true);

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})();