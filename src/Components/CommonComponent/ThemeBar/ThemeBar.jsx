import { Button } from "@mui/material";
import {
  ArrowsClockwise,
  Check,
  MoonStars,
  Plus,
  Sun,
  X,
} from "@phosphor-icons/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setthemeCollapse } from "../../../Redux/Slices/ThemeSlices/ThemeCollapseSlice";
import { setSemiTheme } from "../../../Redux/Slices/ThemeSlices/SemiThemeSlice";
import { use } from "react";
import { useAuth } from "../../../Context/ApiCaller";
import { useEditThemeMutation } from "../../../Redux/Slices/ThemeSlices/ThemeApi";
import { toastAlert, toastError } from "../../../Utils/ToastUtil";
import { set } from "date-fns";
import GetDecodedToken from "../../../Utils/GetDecodedToken";

function DefaultTheme(theme) {
  if (theme?.color == "default") {
    return "themeBlue";
  }
  return theme?.color;
}

function updateBlueTheme() {
  document.documentElement.style.setProperty("--primary", "#3d73ff");
  document.documentElement.style.setProperty("--primary2", "#384bf6");
  document.documentElement.style.setProperty(
    "--primaryLight",
    "rgb(61 115 255 /20%)"
  );
}
function updatePurpleTheme() {
  document.documentElement.style.setProperty("--primary", "#a523f6");
  document.documentElement.style.setProperty("--primary2", "#870bd4");
  document.documentElement.style.setProperty(
    "--primaryLight",
    "rgb(165 35 246 /20%)"
  );
}
function updateNavyBlueTheme() {
  document.documentElement.style.setProperty("--primary", "#3b479d");
  document.documentElement.style.setProperty("--primary2", "#293274");
  document.documentElement.style.setProperty(
    "--primaryLight",
    "rgb(59 71 157 /20%)"
  );
}
function updateGreenTheme() {
  document.documentElement.style.setProperty("--primary", "#19d219");
  document.documentElement.style.setProperty("--primary2", "#0caf0c");
  document.documentElement.style.setProperty(
    "--primaryLight",
    "rgb(25 210 25 /20%)"
  );
}
function updateOrangeTheme() {
  document.documentElement.style.setProperty("--primary", "#f4a734");
  document.documentElement.style.setProperty("--primary2", "#f0831c");
  document.documentElement.style.setProperty(
    "--primaryLight",
    "rgb(244 167 52 /20%)"
  );
}

const themes = [
  { theme: "themeBlue", updateTheme: updateBlueTheme, class: "thm_blue" },
  {
    theme: "themeViolet",
    updateTheme: updateNavyBlueTheme,
    class: "thm_navyblue",
  },
  { theme: "themePurple", updateTheme: updatePurpleTheme, class: "thm_purple" },
  { theme: "themeGreen", updateTheme: updateGreenTheme, class: "thm_green" },
  { theme: "themeOrange", updateTheme: updateOrangeTheme, class: "thm_orange" },
];

const ThemeBar = ({ toggleClass, setToggleClass }) => {
  const dispatch = useDispatch();
  const { themeData } = useAuth();
  const [colorTheme, setColorTheme] = useState("themeBlue");
  const [semiTheme, setSemTheme] = useState(false);
  const [themeCollapse, setThemeCollapse] = useState(true);
  const [isLight, setIsLight] = useState(true);

  async function uploadTheme() {
    try {
      await editTheme({
        id: GetDecodedToken().id,
        color: colorTheme,
        is_semiDark: semiTheme,
        is_collapse: themeCollapse,
        is_light_theme: isLight,
      });
      toastAlert("Theme Updated");
    } catch {
      toastError("Theme Update Failed");
    }
  }

  useEffect(() => {
    themes.find((theme) => theme?.theme === colorTheme).updateTheme();
  }, [colorTheme]);

  const [editTheme, { isLoading: editThemeLoading }] = useEditThemeMutation();

  useEffect(() => {
    setColorTheme(DefaultTheme(themeData) || "themeBlue");
    dispatch(setSemiTheme(themeData?.is_semiDark));
    dispatch(setthemeCollapse(themeData?.is_collapse));
    let light = document.getElementById("themeLight");
    let dark = document.getElementById("themeDark");

    light.checked = themeData?.is_light_theme;
    dark.checked = !themeData?.is_light_theme;
    if (themeData?.is_light_theme) {
      document.body.setAttribute("theme", "light");
    } else {
      document.body.setAttribute("theme", "dark");
    }
    setIsLight(themeData?.is_light_theme);
    setSemTheme(themeData?.is_semiDark);
    setThemeCollapse(themeData?.is_collapse);
  }, [themeData]);

  useEffect(() => {
    let light = document.getElementById("themeLight");
    let dark = document.getElementById("themeDark");

    light.addEventListener("click", (e) => {
      const checked = e.target.checked;
      dark.checked = !checked;
      setIsLight(true);
      document.body.setAttribute("theme", checked ? "light" : "dark");
    });
    dark.addEventListener("click", (e) => {
      const checked = e.target.checked;
      light.checked = !checked;
      setIsLight(false);
      document.body.setAttribute("theme", checked ? "dark" : "light");
    });

    return () => {
      light.removeEventListener("click", () => {});
      dark.removeEventListener("click", () => {});
    };
  }, []);

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
              {themes.map((theme, index) => (
                <li key={index}>
                  <div className="themeBox">
                    <input
                      type="radio"
                      name="theme-color"
                      id={theme.theme}
                      checked={colorTheme === theme.theme}
                      onChange={() => {
                        setColorTheme(theme.theme);
                      }}
                    />
                    <label htmlFor={theme.theme} className="border-0">
                      <div className="themeBoxIn">
                        <span className={`themeColorPalette ${theme.class}`}>
                          <Check className="colorCheck" />
                        </span>
                      </div>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="themeBarBox">
            <h6 className="themeBarHeading">Themes</h6>
            <ul>
              <li>
                <div
                  className="themeBox"
                  onClick={() => {
                    dispatch(setSemiTheme(false));
                    setSemTheme(false);
                  }}
                >
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
                <div
                  className="themeBox"
                  onClick={() => {
                    dispatch(setSemiTheme(true));
                    setSemTheme(true);
                  }}
                >
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
                <div
                  className="themeBox"
                  onClick={() => {
                    dispatch(setthemeCollapse(false));
                    setThemeCollapse(false);
                  }}
                >
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
                <div
                  className="themeBox"
                  onClick={() => {
                    dispatch(setthemeCollapse(true));
                    setThemeCollapse(true);
                  }}
                >
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
        <div className="themeBarFooter">
          <Button
            variant="contained"
            color="primary"
            onClick={() => uploadTheme()}
            disabled={editThemeLoading}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default ThemeBar;
