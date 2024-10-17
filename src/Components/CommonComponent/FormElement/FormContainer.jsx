import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useLocation, useNavigate } from 'react-router-dom';
import { Log } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPreviousRoute } from '../../../Redux/Slices/BreadCrumbSlices/PreviousRoute';


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
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [pathnames, setPathnames] = useState([]);

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
        <div className="pageHeader">
            {mainTitleRequired && (
                <div className="pageTitle">

                    <h2>{mainTitle}</h2>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="textPrimary" key={base}>
                            {base}
                        </Link>

                        {pathnames.map((value, index) =>
                            (location.pathname.split("/")[2] === value) ? <Typography key={value}>{value}</Typography> :
                                <Link to={`/${base}/${value}`} key={value}>{value}</Link>
                        )}




                    </Breadcrumbs>

                    {link && buttonAccess && (
                        <div className="form_heading_action d-flex ">
                            <Link to={link}>
                                <button
                                    title={"Add New " + mainTitle}
                                    className={`btn cmnbtn btn_sm btn-primary ${addNewButtonName && "text_button"
                                        }`}
                                >
                                    {/* {addNewButtonName ? addNewButtonName : <FaUserPlus />} */}
                                    {addNewButtonName ? addNewButtonName : "Add"}
                                </button>
                            </Link>
                            {link && newbutton && (
                                <Link to={newbuttonRouting}>
                                    <button
                                        title={"Add " + mainTitle}
                                        className={`btn cmnbtn btn_sm btn-success ${newbuttonName && "text_button"
                                            }`}
                                    >
                                        {/* {newbuttonName ? newbuttonName : <FaUserPlus />} */}
                                        {newbuttonName ? newbuttonName : "Add"}
                                    </button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            )}
            {!link && (
                <div className="card shadow mb24">
                    <div className="card-header d-flex flex-row align-items-center justify-content-between">
                        {accordionButtons.length === 0 && (
                            <div className="card_header_title tabbtn_header">
                                <h2>{title}</h2>
                            </div>
                        )}
                        <div
                            className="input-component"
                            style={{
                                display: `${TitleHeaderComponentDisplay}`,
                                width: "100%",
                                justifyContent: "flex-end",
                                alignItems: "flex-end",
                                gap: "10px",
                            }}
                        >
                            {Titleheadercomponent}
                        </div>
                        <div
                            className="btn-group w-100"
                            style={{
                                display: `${TitleHeaderComponentDisplay === "none" ? "" : "none"
                                    }`,
                            }}
                        >
                            {accordionButtons.map((buttonName, index) => (
                                <button
                                    key={index}
                                    className={
                                        activeAccordionIndex === index
                                            ? `btn cmnbtn btn-primary`
                                            : "btn cmnbtn btn-outline-primary"
                                    }
                                    onClick={() => onAccordionButtonClick(index)}
                                >
                                    {buttonName}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="thm_form">
                            <form onSubmit={handleSubmit} className="needs-validation">
                                <div className="row">{children}</div>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        {accordionButtons.length == 0 && submitButton && (
                                            <button
                                                className="btn cmnbtn btn-primary"
                                                style={{ marginRight: "5px" }}
                                                type="submit"
                                            >
                                                Submit
                                            </button>
                                        )}

                                        {activeAccordionIndex === accordionButtons.length - 1 &&
                                            submitButton && (
                                                <button
                                                    className={`btn cmnbtn ${loading ? "btn-danger" : "btn-success"
                                                        }`}
                                                    style={{ marginRight: "5px" }}
                                                    type="submit"
                                                    disabled={loading}
                                                >
                                                    {loading ? "Submiting" : "Submit"}
                                                </button>
                                            )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormContainer;