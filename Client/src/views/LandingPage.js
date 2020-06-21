import React, { useEffect } from 'react'

export default function Landingpage() {
    const content = `
   <!-- ======= Header ======= -->
  <header id="header">
    <div class="container">

      <div class="logo float-left">
        <h1 class="text-light"><a href="index.html"><span>Online Interview</span></a></h1>        
      </div>

      <nav class="nav-menu float-right d-none d-lg-block">
        <ul>
          <li class="active"><a href="#">Home</a></li>
          <li><a href="http://recruitify-mlh-hackjaipur.herokuapp.com/home">Login/SignUp</a></li>        
        </ul>
      </nav><!-- .nav-menu -->

    </div>
  </header><!-- End Header -->

  <!-- ======= Hero Section ======= -->
  <section id="hero">
    <div class="hero-container">
      <div id="heroCarousel" class="carousel slide carousel-fade" data-ride="carousel">

        <ol class="carousel-indicators" id="hero-carousel-indicators"></ol>

        <div class="carousel-inner" role="listbox">

          <!-- Slide 1 -->
          <div class="carousel-item active" style="background-image: url("assets/img/slide/slide-1.jpg");">
            <div class="carousel-container">
              <div class="carousel-content container">
                <h2 class="animate__animated animate__fadeInDown">Welcome to <span>OnlineInterview</span></h2>
                <p class="animate__animated animate__fadeInUp">SignUp to begin your journey.</p>                
              </div>
            </div>
          </div>

          <!-- Slide 2 -->
          <div class="carousel-item" style="background-image: url("assets/img/slide/slide-2.jpg");">
            <div class="carousel-container">
              <div class="carousel-content container">
                <h2 class="animate__animated animate__fadeInDown">Easy to take Interviews</h2>
                <p class="animate__animated animate__fadeInUp">Let us help you in becoming a great recruiter.</p>
                
              </div>
            </div>
          </div>

        </div>

        <a class="carousel-control-prev" href="#heroCarousel" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon icofont-rounded-left" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#heroCarousel" role="button" data-slide="next">
          <span class="carousel-control-next-icon icofont-rounded-right" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>

      </div>
    </div>
  </section><!-- End Hero -->

  <main id="main">



    <!-- ======= Counts Section ======= -->
    <section class="counts section-bg">
      <div class="container">

        <div class="row">

          <div class="col-lg-3 col-md-6 text-center" data-aos="fade-up">
            <div class="count-box">
              <i class="icofont-simple-smile" style="color: #20b38e;"></i>
              <span data-toggle="counter-up">232</span>
              <p>Happy Clients</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 text-center" data-aos="fade-up" data-aos-delay="200">
            <div class="count-box">
              <i class="icofont-document-folder" style="color: #c042ff;"></i>
              <span data-toggle="counter-up">521</span>
              <p>Interviews</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 text-center" data-aos="fade-up" data-aos-delay="400">
            <div class="count-box">
              <i class="icofont-live-support" style="color: #46d1ff;"></i>
              <span data-toggle="counter-up">1,463</span>
              <p>Hours Of Support</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 text-center" data-aos="fade-up" data-aos-delay="600">
            <div class="count-box">
              <i class="icofont-users-alt-5" style="color: #ffb459;"></i>
              <span data-toggle="counter-up">15</span>
              <p>Hard Workers</p>
            </div>
          </div>

        </div>

      </div>
    </section><!-- End Counts Section -->

    <!-- ======= Services Section ======= -->
    <section id="services" class="services">
      <div class="container">

        <div class="section-title">
          <h2>Services</h2>
        </div>

        <div class="row">
          <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up">
            <div class="icon"><i class="icofont-computer"></i></div>
            <h4 class="title"><a href="">Online Recruitments</a></h4>
            <p class="description">Easy and effective Recruitments.</p>
          </div>
          <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="100">
            <div class="icon"><i class="icofont-chart-bar-graph"></i></div>
            <h4 class="title"><a href="">Online Video Conferencing</a></h4>
            <p class="description">Get in touch with Candidates through Video interviews.</p>
          </div>
          <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="200">
            <div class="icon"><i class="icofont-earth"></i></div>
            <h4 class="title"><a href="">Online Notepad</a></h4>
            <p class="description">Real-time notepad for conducting white board interviews.</p>
          </div>          
        </div>

      </div>
    </section><!-- End Services Section -->

    <!-- ======= Our Portfolio Section ======= -->
    
    <!-- ======= Our Team Section ======= -->
    <section id="team" class="team">
      <div class="container">

        <div class="section-title">
          <h2>Our Team</h2>
          <p>The Alma matter of this project.</p>
        </div>

        <div class="row">

          <div class="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up">
            <div class="member">
              <div class="pic"><img src="assets/img/team/team-1.jpg" class="img-fluid" alt=""></div>
              <div class="member-info">
                <h4>Arun Vishwakarma</h4>
                <span>Full Stack Web Developer</span>
                <div class="social">
                  <a href=" https://twitter.com/Arun88164207?s=08"><i class="icofont-twitter"></i></a>                 
                  <a href="https://www.linkedin.com/in/arun-vishwakarma-891246136"><i class="icofont-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div class="member">
              <div class="pic"><img src="assets/img/team/team-2.jpg" class="img-fluid" alt=""></div>
              <div class="member-info">
                <h4>Atulya Raj</h4>
                <span>Full Stack Web Developer</span>
                <div class="social">
                  <a href="https://twitter.com/atulya_raj29"><i class="icofont-twitter"></i></a>              
                  <a href="https://www.linkedin.com/in/atulyar29/"><i class="icofont-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div class="member">
              <div class="pic"><img src="assets/img/team/team-3.jpg" class="img-fluid" alt=""></div>
              <div class="member-info">
                <h4>Mukul Kumar</h4>
                <span>Machine Learning Expert</span>
                <div class="social">
                  <a href="https://twitter.com/Mukul639384?s=08"><i class="icofont-twitter"></i></a>
                  <a href="https://www.linkedin.com/in/mukul-kumar-a958aa151/"><i class="icofont-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div class="member">
              <div class="pic"><img src="assets/img/team/team-4.jpg" class="img-fluid" alt=""></div>
              <div class="member-info">
                <h4>Drishti Beohar</h4>
                <span>Web Developer</span>
                <div class="social">
                  <a href=""><i class="icofont-twitter"></i></a>
                  <a href=""><i class="icofont-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section><!-- End Our Team Section -->

    <!-- ======= Frequently Asked Questions Section ======= -->
    
    <!-- ======= Contact Us Section ======= -->
    <section id="contact" class="contact">
      <div class="container">

        <div class="section-title">
          <h2>Contact Us</h2>
        </div>

        <div class="row">

          <div class="col-lg-6 d-flex align-items-stretch" data-aos="fade-up">
            <div class="info-box">
              <i class="bx bx-map"></i>
              <h3>Our Address</h3>
              <p>MANIT Bhopal</p>
            </div>
          </div>

          <div class="col-lg-3 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
            <div class="info-box">
              <i class="bx bx-envelope"></i>
              <h3>Email Us</h3>
              <p>atulya.raj2904@gmail.com</p>
            </div>
          </div>       


        </div>

      </div>
    </section><!-- End Contact Us Section -->

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  <footer id="footer">
    <div class="footer-top">  
      </div>

    
  </footer><!-- End Footer -->

  <a href="#" class="back-to-top"><i class="icofont-simple-up"></i></a>`

    useEffect(() => {

        const script1 = document.createElement("script");
        script1.src = "./assets/vendor/jquery/jquery.min.js";
        script1.async = true;
        document.body.appendChild(script1);

        const script2 = document.createElement("script");
        script2.src = "./assets/vendor/bootstrap/js/bootstrap.bundle.min.js";
        script2.async = true;
        document.body.appendChild(script2);

        const script3 = document.createElement("script");
        script3.src = "./assets/vendor/jquery.easing/jquery.easing.min.js";
        script3.async = true;
        document.body.appendChild(script3);

        const script4 = document.createElement("script");
        script4.src = "./assets/vendor/php-email-form/validate.js";
        script4.async = true;
        document.body.appendChild(script4);

        const script5 = document.createElement("script");
        script5.src = "./assets/vendor/jquery-sticky/jquery.sticky.js";
        script5.async = true;
        document.body.appendChild(script5);

        const script6 = document.createElement("script");
        script6.src = "./assets/vendor/venobox/venobox.min.js";
        script6.async = true;
        document.body.appendChild(script6);

        const script7 = document.createElement("script");
        script7.src = "./assets/vendor/waypoints/jquery.waypoints.min.js";
        script7.async = true;
        document.body.appendChild(script7);

        const script8 = document.createElement("script");
        script8.src = "./assets/vendor/counterup/counterup.min.js";
        script8.async = true;
        document.body.appendChild(script8);

        const script9 = document.createElement("script");
        script9.src = "./assets/vendor/owl.carousel/owl.carousel.min.js";
        script9.async = true;
        document.body.appendChild(script9);

        const script10 = document.createElement("script");
        script10.src = "./assets/vendor/isotope-layout/isotope.pkgd.min.js";
        script10.async = true;
        document.body.appendChild(script10);

        const script11 = document.createElement("script");
        script11.src = "./assets/vendor/aos/aos.js";
        script11.async = true;
        document.body.appendChild(script11);

        const script12 = document.createElement("script");
        script12.src = "./assets/js/main.js";
        script12.async = true;
        document.body.appendChild(script12);
    });

    return (
            <div dangerouslySetInnerHTML={{ __html: content }} />
    );
}
