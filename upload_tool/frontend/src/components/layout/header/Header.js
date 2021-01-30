import React, { Component } from "react";

import styles from "./Header.module.css";
import logo from "../../../../static/frontend/img/logo.png";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $("body").click(function (e) {
      if (e.target.id != "userlink_svg" && e.target.id != "userlink_span") {
        if (
          e.target.id == "dropdown" ||
          $(e.target).parents("#dropdown").length
        ) {
        } else {
          $('#dropdown').removeClass(`${styles.show}`);
        }
      }
    });

    $(window).scroll(function () {
      if ($(this).scrollTop() > 45) {
        $("#container").addClass(`${styles.container_scrolled}`);
      } else {
        $("#container").removeClass(`${styles.container_scrolled}`);
      }
    });

    // if ($(window).scrollTop() > 100) {
    //   $("#header").addClass("header-scrolled");
    // }

    // // Back to top button
    // $(window).scroll(function () {
    //   if ($(this).scrollTop() > 100) {
    //     $(".back-to-top").fadeIn("slow");
    //   } else {
    //     $(".back-to-top").fadeOut("slow");
    //   }
    // });
  }

  toogleDropdown = () => {
    const dropdown = document.getElementById("dropdown");

    if (dropdown.classList.length <= 1) {
      dropdown.classList.add(`${styles.show}`);
    } else {
      dropdown.classList.remove(`${styles.show}`);
    }
  };

  render() {
    return (
      <header className={styles.container} id="container">
        <nav>
          <ul>
            <li className={styles.li1}>
              <span className={styles.heading}>CSAAT</span>
            </li>

            <li className={styles.li1}>
              <span className={styles.heading2}>Video Uploader</span>
            </li>

            <li className={`${styles.adminlink} ${styles.li1}`}>
              <a href="#">Admin panel</a>
            </li>

            <li className={`${styles.userlink} ${styles.li1}`}>
              <span
                className={styles.userlink_span}
                id="userlink_span"
                onClick={this.toogleDropdown}
              >
                sachinAthu
              </span>

              <svg
                className={styles.userlink_svg}
                id="userlink_svg"
                onClick={this.toogleDropdown}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="28"
                viewBox="0 0 18 28"
              >
                <path d="M16.797 11.5c0 0.125-0.063 0.266-0.156 0.359l-7.281 7.281c-0.094 0.094-0.234 0.156-0.359 0.156s-0.266-0.063-0.359-0.156l-7.281-7.281c-0.094-0.094-0.156-0.234-0.156-0.359s0.063-0.266 0.156-0.359l0.781-0.781c0.094-0.094 0.219-0.156 0.359-0.156 0.125 0 0.266 0.063 0.359 0.156l6.141 6.141 6.141-6.141c0.094-0.094 0.234-0.156 0.359-0.156s0.266 0.063 0.359 0.156l0.781 0.781c0.094 0.094 0.156 0.234 0.156 0.359z"></path>
              </svg>

              <div className={styles.dropdown} id="dropdown">
                <div>
                  <span>Your Sessions</span>
                </div>
                <div>
                  <span>Your Videos</span>
                </div>
                <hr />
                <div>
                  <span>Logout</span>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
