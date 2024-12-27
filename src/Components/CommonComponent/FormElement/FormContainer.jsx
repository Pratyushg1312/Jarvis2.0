import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useLocation, useNavigate } from "react-router-dom";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPreviousRoute } from "../../../Redux/Slices/BreadCrumbSlices/PreviousRoute";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import { Button } from "@mui/material";

const FormContainer = ({
  mainTitle,
  title,
  link,
  buttonAccess,
  newbutton,
  newbuttonRouting,
  newbuttonName,
  children,
  handleSubmit,
  submitButton = true,
  activeAccordionIndex,
  addNewButtonName,
  accordionButtons = [],
  onAccordionButtonClick,
  loading = false,
  mainTitleRequired = true,
  Titleheadercomponent,
  TitleHeaderComponentDisplay = "none",
  LinkButtons,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserRole = GetDecodedToken().role_id;
  const [pathnames, setPathnames] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [links, setLinks] = useState([]);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    setButtons(LinkButtons?.filter((item) => item?.type === "button"));
    setLinks(LinkButtons?.filter((item) => item?.type === "link"));
    setElements(LinkButtons?.filter((item) => item?.type === "element"));
  }, [LinkButtons]);

  const { base, previousRoute } = useSelector((state) => state.previousRoute);

  useEffect(() => {
    // Store the current location as previous when the location changes
    dispatch(setPreviousRoute(location.pathname));
  }, [location]);
  useEffect(() => {
    setPathnames(previousRoute);
  }, [previousRoute]);

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="pageHeader">
        {mainTitleRequired && (
          <div className="pageTitle">
            <h2>{mainTitle}</h2>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="textPrimary" key={base}>
                {base}
              </Link>

              {pathnames.map((value, index) =>
                location.pathname.split("/")[2] === value ? (
                  <Typography key={value}>{value}</Typography>
                ) : (
                  <Link to={`/${base}/${value}`} key={value}>
                    {value}
                  </Link>
                )
              )}
            </Breadcrumbs>
          </div>
        )}
        <div className="pageAction">
          {links?.length > 0 && (
            <div className="pageMenu">
              <ul>
                {links?.map((item, index) => {
                  const hasAccess = item?.access?.indexOf(UserRole);
                  const isShow = item?.condition ? item.condition() : true;
                  if (hasAccess !== -1) {
                    if (isShow)
                      return (
                        <li key={item.name}>
                          <Link to={item.link}>{item.name}</Link>
                        </li>
                      );
                  }
                })}
              </ul>
            </div>
          )}
          {elements?.length > 0 && (
            <div className="pageForms">
              {elements?.map((item) => {
                const hasAccess = item?.access?.indexOf(UserRole);
                const isShow = item?.condition ? item.condition() : true;
                if (hasAccess !== -1) {
                  if (isShow) return item?.element;
                }
              })}
            </div>
          )}
          {buttons?.length > 0 &&
            buttons?.map((item) => {
              const hasAccess = item?.access?.indexOf(UserRole);
              const isShow = item?.condition ? item.condition() : true;
              const color = item?.color ? item.color : "primary";
              const variant = item?.variant ? item.variant : "contained";
              if (hasAccess !== -1) {
                if (isShow)
                  return (
                    <Button
                      variant={variant}
                      color={color}
                      title={item?.title && item?.title()}
                      disabled={item?.disabled && item?.disabled()}
                      key={item.name}
                      onClick={() => item?.onClick && item?.onClick()}
                    >
                      {item.name}
                    </Button>
                  );
              }
            })}
        </div>
      </div>
    </>
  );
};

export default FormContainer;
