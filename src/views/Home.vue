<template>
  <div>
    <!-- 
  <video class="header-video" title="Advertisement" autoplay="true" poster="/images/concept.png" muted="muted" src="videos/finleDawen.mp4"
    loop></video>-->

    <header>
      <div class="hero"></div>
      <!-- <div class="moving-clouds"></div> -->
      <!-- <div class="intro_bg">
        <img src="@/assets/images/Main.svg" alt="My Image" />
      </div>-->
      <div class="intro">
        <div class="intro_info">
          <h1>
            <span>M</span>
            <span>A</span>
            <span>N</span>
            <span>G</span>
            <span>E</span>
            <span>X</span>
          </h1>
          <h2>Manage Expneses, Manage Your Life</h2>
          <div class="actions">
            <router-link :to="{name:'auth'}" class="box foo">Login</router-link>
            <a class="box foo" target="_blank">Sign Up</a>
          </div>
        </div>
      </div>
    </header>
    <div class="wrapper">
      <!-- <%- include('../includes/side-nav.ejs') %> -->

      <section id="services">
        <div class="services-item gradient-green">
          <i class="fas fa-dollar-sign"></i>
          <h3>FREE</h3>
          <p>It Costs Nothing</p>
        </div>
        <div class="services-item gradient-purpel">
          <i class="fas fa-wrench"></i>
          <h3>Updated</h3>
          <p>Always Up To Date</p>
        </div>
        <div class="services-item gradient-blue">
          <i class="fas fa-fingerprint"></i>
          <h3>Secure</h3>
          <p>Safe To Use</p>
        </div>
      </section>
      <section id="service-info">
        <h4>How It Works</h4>
        <video src="https://www.youtube.com/watch?v=NTUoqKk4UqQ"></video>
        <div class>
          <article>
            <p>
              <span class="c-w">Main goal and foucs is to let you track your expenses in</span>
              Easy, Rich and Free Experiance
            </p>
            <button class="btn btn-success c-b">Try It Out Now</button>
          </article>
        </div>
      </section>
      <footer>
        <div class="contactus">
          <p>Start a converstion</p>
          <div class="contactus-lists">
            <ul class="contactus-lists-subMenu">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>abdelrhmanm525@gmail.com</li>
            </ul>
          </div>
        </div>
        <div class="creator-info">
          <div class="creator-info-logo">
            <p>Made With ❤️ By</p>
            <img src="@/assets/images/word.png" />
          </div>
          <div class="creator-info-media">
            <i class="fab fa-facebook"></i>
            <i class="fab fa-youtube"></i>
            <i class="fab fa-twitter"></i>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
.hero {
    background: url('~@/assets/images/Main.svg') no-repeat center center;
    /* position: absolute; */
    z-index: 3;
    /* bottom: 0; */
    /* left: 50%; */
    width: 100%;
    /* -webkit-transform: translateX(-50%); */
    /* transform: translateX(-50%); */
    /* height: 43.75em; */
    background-size: cover;
    /* -webkit-animation: cloudLoop 20s linear infinite; */
    animation: cloudLoop 20s linear infinite;
}

@keyframes cloudLoop {
  0% {
    -webkit-transform: translate3d(20%, 0, 0);
    transform: translate3d(20%, 0, 0);
  }
  50% {
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-20%, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(20%, 0, 0);
    transform: translate3d(20%, 0, 0);
  }
}
@media only screen and (min-width: 320px) and (max-width: 767px) {
  #services {
    /* grid-template-columns: 1fr; */
    font-size: 14px;
  }
  .moving-clouds {
    width: 50.625em;
  }
}
</style>