import { Button } from "@mui/material";
import {
  ArrowsClockwise,
  Check,
  MoonStars,
  Plus,
  Sun,
  X,
} from "@phosphor-icons/react";
import React from "react";

const ThemeBar = ({ toggleClass, setToggleClass }) => {
  return (
    <>
      <div className={`themeBar ${toggleClass}`}>
        <div className="themeBarHeader">
          <div className="themeBarTitle">
            <h5>Theme Customizer</h5>
            <p>Customize and preview in real time</p>
          </div>
          <div className="themeBarAction">
            <Button className="iconBtn d-none">
              <ArrowsClockwise />
            </Button>
            <Button
              className="iconBtn"
              onClick={() =>
                setToggleClass((prev) => {
                  if (prev === "") return "themebarActive";
                  else return "";
                })
              }
            >
              <X />
            </Button>
          </div>
        </div>
        <div className="themeBarBody">
          <div className="themeBarBox">
            <h6 className="themeBarHeading">Style (Mode)</h6>
            <ul>
              <li>
                <div className="themeBox">
                  <input type="radio" name="theme-style" id="themeLight" />
                  <label htmlFor="themeLight">
                    <div className="themeBoxIn">
                      <i>
                        <Sun />
                      </i>
                    </div>
                  </label>
                </div>
                <p>Light</p>
              </li>
              <li>
                <div className="themeBox">
                  <input type="radio" name="theme-style" id="themeDark" />
                  <label htmlFor="themeDark">
                    <div className="themeBoxIn">
                      <i>
                        <MoonStars />
                      </i>
                    </div>
                  </label>
                </div>
                <p>Dark</p>
              </li>
            </ul>
          </div>
          <div className="themeBarBox">
            <h6 className="themeBarHeading">Color Style</h6>
            <ul>
              <li>
                <div className="themeBox">
                  <input type="radio" name="theme-color" id="themePurple" />
                  <label htmlFor="themePurple" className="border-0">
                    <div className="themeBoxIn">
                      <span className="themeColorPalette thm_blue">
                        <Check className="colorCheck" />
                      </span>
                    </div>
                  </label>
                </div>
              </li>
              <li>
                <div className="themeBox">
                  <input type="radio" name="theme-color" id="themeBlue" />
                  <label htmlFor="themeBlue" className="border-0">
                    <div className="themeBoxIn">
                      <span className="themeColorPalette thm_purple">
                        <Check className="colorCheck" />
                      </span>
                    </div>
                  </label>
                </div>
              </li>
              <li>
                <div className="themeBox">
                  <input type="radio" name="theme-color" id="themeViolet" />
                  <label htmlFor="themeViolet" className="border-0">
                    <div className="themeBoxIn">
                      <span className="themeColorPalette thm_navyblue">
                        <Check className="colorCheck" />
                      </span>
                    </div>
                  </label>
                </div>
              </li>
              <li>
                <div className="themeBox">
                  <input type="radio" name="theme-color" id="themeGreen" />
                  <label htmlFor="themeGreen" className="border-0">
                    <div className="themeBoxIn">
                      <span className="themeColorPalette thm_green">
                        <Check className="colorCheck" />
                      </span>
                    </div>
                  </label>
                </div>
              </li>
              <li>
                <div className="themeBox">
                  <input type="radio" name="theme-color" id="themeOrange" />
                  <label htmlFor="themeOrange" className="border-0">
                    <div className="themeBoxIn">
                      <span className="themeColorPalette thm_orange">
                        <Check className="colorCheck" />
                      </span>
                    </div>
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div className="themeBarBox">
            <h6 className="themeBarHeading">Themes</h6>
            <ul>
              <li>
                <div className="themeBox">
                  <input type="radio" name="theme-type" id="themeDefault" />
                  <label htmlFor="themeDefault">
                    <div className="themeBoxIn">
                      <img src="/assets/images/themebar/default-dark.svg" />
                    </div>
                  </label>
                </div>
                <p>Default</p>
              </li>
              <li>
                <div className="themeBox">
                  <input type="radio" name="theme-type" id="themeSemiDark" />
                  <label htmlFor="themeSemiDark">
                    <div className="themeBoxIn">
                      <img src="/assets/images/themebar/semi-dark-dark.svg" />
                    </div>
                  </label>
                </div>
                <p>Semi Dark</p>
              </li>
            </ul>
          </div>
          <div className="themeBarBox">
            <h6 className="themeBarHeading">Menu (Navigation)</h6>
            <ul>
              <li>
                <div className="themeBox">
                  <input type="radio" name="theme-menu" id="themeCollapsed" />
                  <label htmlFor="themeCollapsed">
                    <div className="themeBoxIn">
                      <img src="/assets/images/themebar/collapsed-dark.svg" />
                    </div>
                  </label>
                </div>
                <p>Collapsed</p>
              </li>
              <li>
                <div className="themeBox">
                  <input type="radio" name="theme-menu" id="themeExpanded" />
                  <label htmlFor="themeExpanded">
                    <div className="themeBoxIn">
                      <img src="/assets/images/themebar/expanded-dark.svg" />
                    </div>
                  </label>
                </div>
                <p>Expanded</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemeBar;
