import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import { useGetAllBrandQuery } from "../../../Redux/Slices/SalesSlices/BrandApi";
import { useGetAllAccountTypeQuery } from "../../../Redux/Slices/SalesSlices/SalesAccountTypeApi";
import { useGetAllCompanyTypeQuery } from "../../../Redux/Slices/SalesSlices/CompanyTypeApi";
import {
  useEditBrandCategoryTypeMutation,
  useGetAllBrandCategoryTypeQuery,
} from "../../../Redux/Slices/SalesSlices/BrandCategoryTypeApi";
import { useGetAllDocumentTypeQuery } from "../../../Redux/Slices/SalesSlices/DocumentTypeApi";
import {
  useGetDepartmentListQuery,
  useUpdateDepartmentMutation,
} from "../../../Redux/Slices/SalesSlices/DepartmentApi";
import { useGetCountryCodeQuery } from "../../../Redux/Slices/CountryCodeSlices/CountryCodeApi";
import {
  useAddAccountMutation,
  useEditAccountMutation,
  useGetSingleAccountQuery,
  useGetSingleAccountSalesBookingQuery,
} from "../../../Redux/Slices/SalesSlices/SalesAccountApi";
import {
  useEditPOCMutation,
  useGetSinglePOCQuery,
} from "../../../Redux/Slices/SalesSlices/PointOfContactApi";
import DateISOtoNormal from "../../../Utils/DateISOtoNormal";
import { useGetAllSalesUsersQuery } from "../../../Redux/Slices/SalesSlices/UserIncentiveDashboardApi";
import {
  useEditDocumentMutation,
  useGetDocumentByIdQuery,
} from "../../../Redux/Slices/SalesSlices/AccountDocumentApi";
import { setLoader, toastAlert, toastError } from "../../../Utils/ToastUtil";
import CreateBrandCategory from "../../../Components/Sales/salesAccount/CreateBrandCategory";
import CreateAccountType from "../../../Components/Sales/salesAccount/CreateAccountType";
import CreateBrand from "../../../Components/Sales/salesAccount/CreateBrand";
import CreateCompanyType from "../../../Components/Sales/salesAccount/CreateCompanyType";
import CreateDepartment from "../../../Components/Sales/salesAccount/CreateDepartment";
import ShareIncentive from "../../../Components/Sales/CommonComponent/Incentive/ShareIncentive";
import AccountSubmitDialog from "../../../Components/Sales/salesAccount/AccountSubmitDialog";
import PageHeader from "../../../Components/CommonComponent/FormElement/PageHeader";
import DocumentUpload from "../../../Components/Sales/salesAccount/DocumentUpload";
import FieldContainer from "../../../Components/CommonComponent/FormElement/FieldContainer";
import CustomSelect from "../../../Components/CommonComponent/FormElement/CustomSelect";
import SocialComponent from "../../../Components/Sales/salesAccount/SocialComponent";
import IndianStatesMui from "../../../Components/CommonComponent/FormElement/IndianStatesMui";
import IndianCitiesMui from "../../../Components/CommonComponent/FormElement/IndianCitiesMui";
import PointOfContact from "../../../Components/Sales/salesAccount/PointOfContact";
import View from "../../../Components/CommonComponent/View/View";
import { ViewAccountTypeColumns } from "../../../Components/Sales/salesAccount/ViewAccountTypeColumns";
import { ViewCompanyTypeColumns } from "../../../Components/Sales/salesAccount/ViewCompanyTypeColumns";
import Button from "@mui/material/Button";
import { Eye, Plus } from "@phosphor-icons/react";

const socialOptions = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "twitter", label: "Twitter" },
  { value: "linkedin", label: "LinkedIn" },
];

const CreateSalesAccount = () => {
  const { id } = useParams();
  const normalToken = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const token = GetDecodedToken();
  const [selectedBrand, setSelectedBrand] = useState(null);
  const loginUserRole = token.role_id;

  const loginUserId = token.id;
  const {
    data: allBrands,
    error: allBrandsError,
    isLoading: allBrandsLoading,
  } = useGetAllBrandQuery();
  const {
    data: allAccountTypes,
    error: allAccountTypesError,
    isLoading: allAccountTypesLoading,
  } = useGetAllAccountTypeQuery();

  const {
    data: allCompanyType,
    error: allCompanyTypeError,
    isLoading: allCompanyTypeLoading,
  } = useGetAllCompanyTypeQuery();

  const {
    data: allBrandCatType,
    error: allBrandCatTypeError,
    isLoading: allBrandCatTypeLoading,
  } = useGetAllBrandCategoryTypeQuery();

  const {
    data: allDocType,
    error: allDocTypeError,
    isLoading: allDocTypeLoading,
  } = useGetAllDocumentTypeQuery();

  const {
    data: departments = [],
    isLoading: departmentsLoading,
    isError: departmentError,
  } = useGetDepartmentListQuery();

  const { data: countryCodeData } = useGetCountryCodeQuery();
  const countries = countryCodeData;

  const [
    createSalesAccount,
    {
      isLoading: isCreateSalesLoading,
      isSuccess: isAccountCreationSuccess,
      isError: isAccountCreationError,
    },
  ] = useAddAccountMutation();

  const { data: singleAccountData, isLoading: accountDataLoading } =
    useGetSingleAccountQuery(id, {
      skip: id == 0,
    });

  const [accountName, setAccountName] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState(null);
  const [selectedCompanyType, setSelectedCompanyType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [website, setWebsite] = useState("");
  const [turnover, setTurnover] = useState("");
  const [officesCount, setOfficesCount] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [fields, setFields] = useState([{ platform: null, link: "" }]);

  const [gifts, setGifts] = useState(false);
  const [connectedOffice, setConnectedOffice] = useState("");
  const [connectedBillingStreet, setConnectedBillingStreet] = useState("");
  const [connectedBillingCity, setConnectedBillingCity] = useState("");
  const [connectedBillingState, setConnectedBillingState] = useState("");
  const [connectedBillingCountry, setConnectedBillingCountry] =
    useState("India");
  const [headOffice, setHeadOffice] = useState("");
  const [headBillingStreet, setHeadBillingStreet] = useState("");
  const [headBillingCity, setHeadBillingCity] = useState("");
  const [headBillingState, setHeadBillingState] = useState("");
  const [headBillingCountry, setHeadBillingCountry] = useState("");
  const [headPinCode, setHeadPincode] = useState(null);
  const [conPinCode, setConPinCode] = useState(null);
  const [companyEmail, setCompanyEmail] = useState(null);
  // const [description, setDescription] = useState("");
  const [modalContentType, setModalContentType] = useState(false);
  const [fillHeadFields, setFillHeadFields] = useState(false);
  const [accountMasterData, setAccountMasterData] = useState();
  const [isBrandModal, setIsBrandModal] = useState(false);
  const [gstDetails, setGstDetails] = useState();
  const [pocs, setPocs] = useState([
    {
      contact_name: "",
      contact_no: "",
      alternative_contact_no: "",
      email: "",
      department: "",
      designation: "",
      description: "",
      social_platforms: [{ platform: socialOptions[0], link: "" }],
    },
  ]);
  const [documents, setDocuments] = useState([
    {
      file: null,
      document_master_id: "",
      document_no: "",
    },
  ]);
  const [accountId, setAccountId] = useState();
  const [isValid, setIsValid] = useState({
    account_name: false,
    account_type_id: false,
    company_type_id: false,
    category_id: false,
    account_owner_id: false,
    brand_id: false,
  });

  const accountNameRef = useRef(null);
  const accountTypeRef = useRef(null);
  const companyTypeRef = useRef(null);
  const categoryRef = useRef(null);
  const accountOwnerRef = useRef(null);

  const [isValidPoc, setIsValIDPoc] = useState({});
  const [isValidDoc, setIsValidDoc] = useState({});
  const [updateSalesAccount, { isLoading: editAccountLoading }] =
    useEditAccountMutation();
  const [editDep, { isLoading: depload }] = useUpdateDepartmentMutation();
  //get Documents with account_id
  const { data: singleAccountDocuments, isLoading: DocumentsLoading } =
    useGetDocumentByIdQuery(accountId, { skip: !accountId });

  //get POC with account_id
  const { data: singlePoc, isLoading: pocLoading } = useGetSinglePOCQuery(
    accountId,
    {
      skip: !accountId,
    }
  );

  //update POC
  const [updatePocs, { isLoading: editPocLoading }] = useEditPOCMutation();

  //update Document
  const [updateDocs, { isLoading: editDocumentLoading }] =
    useEditDocumentMutation(accountId, {
      skip: !accountId,
    });
  const [edit, { isLoading }] = useEditBrandCategoryTypeMutation();

  const { data: singleAccountBillingData } =
    useGetSingleAccountSalesBookingQuery(
      Number(singleAccountData?.account_id),
      { skip: !singleAccountData?.account_id && !id }
    );

  const handelDepEdit = async (row, setEditFlag) => {
    const payload = {
      id: row._id,
      department_name: row.department_name,
    };
    try {
      await editDep(payload).unwrap();
      setEditFlag(false);
    } catch (error) {}
  };
  const handleEdit = async (row, setEditFlag) => {
    const payload = {
      id: row._id,
      brand_category_name: row.brand_category_name,
    };
    try {
      await edit(payload).unwrap();
      setEditFlag(false);
    } catch (error) {}
  };
  const ViewBrandCategoryColumns = [
    {
      key: "Serial_no",
      name: "S.NO",
      renderRowCell: (row, index) => index + 1,
      width: 100,
      sortable: true,
    },
    {
      key: "brand_category_name",
      name: "Brand Category Name",
      renderRowCell: (row) => row.brand_category_name,
      width: 100,
      sortable: true,
      showCol: true,
      editable: true,
    },
    {
      key: "created_date",
      name: "Created Date",
      renderRowCell: (row) => DateISOtoNormal(row.created_date),
      width: 100,
      sortable: true,
      showCol: true,
    },
    {
      key: "action",
      name: "Actions",
      renderRowCell: (
        row,
        index,
        setEditFlag,
        editflag,
        handelchange,
        column
      ) => {
        if (editflag === false)
          return (
            <button
              className="icon-1"
              onClick={() => {
                setEditFlag(index);
              }}
            >
              <i className="bi bi-pencil" />
            </button>
          );
        if (index === editflag)
          return (
            <div className="d-flex gap-">
              <button
                className="icon-1"
                onClick={() => {
                  setEditFlag(false);
                }}
              >
                <i className="bi bi-x" />
              </button>

              <button
                className="icon-1"
                onClick={() => {
                  handleEdit(row, setEditFlag);
                }}
              >
                <i className="bi bi-save" />
              </button>
            </div>
          );
      },
      width: 100,
      sortable: true,
      showCol: true,
    },
  ];
  const { data: accOwnerNameData, isLoading: accOwnerLoading } =
    useGetAllSalesUsersQuery();
  useEffect(() => {
    if (accOwnerNameData) setSelectedOwner(loginUserId);
  }, [accOwnerNameData]);

  const transformPlatformData = (data) => {
    return data.map((item) => ({
      platform: {
        value: item.platform,
        label:
          socialOptions.find((option) => option?.value === item.platform)
            ?.label || item.platform,
      },
      link: item.link,
    }));
  };

  useEffect(() => {
    if (id && singleAccountData) {
      const {
        account_id,
        account_name,
        account_type_id,
        company_type_id,
        category_id,
        account_owner_id,
        website,
        turn_over,
        brand_id,
        company_email,
        account_image_url,
        is_rewards_sent,
      } = singleAccountData;

      setAccountId(account_id);
      setAccountName(account_name);
      setSelectedAccountType(account_type_id);
      setSelectedCompanyType(company_type_id);
      setSelectedCategory(category_id);
      setSelectedOwner(account_owner_id);
      setWebsite(website);
      setTurnover(turn_over);
      setSelectedBrand(brand_id);
      setCompanyEmail(company_email);
      setPreviewUrl(account_image_url);
      setGifts(is_rewards_sent);

      const {
        how_many_offices,
        connected_office,
        connect_billing_street,
        connect_billing_city,
        connect_billing_state,
        connect_billing_country,
        connect_billing_pin_code,
        head_office,
        head_billing_street,
        head_billing_city,
        head_billing_state,
        head_billing_country,
        head_billing_pin_code,
        social_platforms,
      } = singleAccountBillingData;
      setOfficesCount(how_many_offices);
      setConnectedOffice(connected_office);
      setConnectedBillingStreet(connect_billing_street);
      setConnectedBillingCity(connect_billing_city);
      setConnectedBillingState(connect_billing_state);
      setConnectedBillingCountry(connect_billing_country);
      setConPinCode(connect_billing_pin_code);
      setHeadOffice(head_office);
      setHeadBillingStreet(head_billing_street);
      setHeadBillingCity(head_billing_city);
      setHeadBillingState(head_billing_state);
      setHeadBillingCountry(head_billing_country);
      setHeadPincode(head_billing_pin_code);
      const transformedData = transformPlatformData(social_platforms);
      setFields(
        transformedData.length > 0
          ? transformedData
          : [{ platform: null, link: "" }]
      );
      if (
        connect_billing_street === head_billing_street &&
        connect_billing_city === head_billing_city &&
        connect_billing_state === head_billing_state &&
        connect_billing_country === head_billing_country &&
        connect_billing_pin_code === head_billing_pin_code
      ) {
        setFillHeadFields(true);
      }
    }
  }, [id, singleAccountData, singleAccountBillingData]);

  useEffect(() => {
    if (accountId || singlePoc || singleAccountDocuments) {
      setPocs(singlePoc);
      setDocuments(singleAccountDocuments);
    }
  }, [accountId, singlePoc, singleAccountDocuments]);

  useEffect(() => {
    setAccountName(gstDetails?.legal_name?.value);
    if (gstDetails?.constitution?.value === "Private Limited Company") {
      setSelectedCompanyType("6655bd2f0f9216140c64f94b");
    }

    if (gstDetails?.constitution?.value === "Public Limited Company") {
      setSelectedCompanyType("6655bd6b0f9216140c64f956");
    }
  }, [gstDetails]);

  const handleAddPoc = () => {
    setPocs([
      ...pocs,
      {
        contact_name: "",
        contact_no: "",
        alternative_contact_no: "",
        email: "",
        department: "",
        designation: "",
        description: "",
        social_platforms: [],
      },
    ]);
  };

  const handleAddDocument = () => {
    console.log("documents", documents);

    setDocuments([
      ...documents,
      {
        file: null,
        document_master_id: "",
        document_no: "",
      },
    ]);
  };

  const LinkButtons = useMemo(
    () => [
      {
        type: "button",
        name: "Add Document",
        onClick: handleAddDocument,
        access: [1, 4],
      },
    ],
    [documents]
  );

  const handleAddMore = () => {
    setFields([...fields, { platform: null, link: "" }]);
  };

  const handleLinkChange = (index, event) => {
    const newFields = fields.map((field, i) => {
      if (i === index) {
        return { ...field, link: event.target.value };
      }
      return field;
    });
    setFields(newFields);
  };

  const handleDelete = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const handlePlatformChange = (index, selectedOption) => {
    const newFields = fields.map((field, i) => {
      if (i === index) {
        return { ...field, platform: selectedOption };
      }
      return field;
    });
    setFields(newFields);
  };

  const getAvailableOptions = (index) => {
    const selectedValues = fields
      .map((field) => field.platform?.value)
      .filter(Boolean);
    return socialOptions.filter(
      (option) =>
        !selectedValues.includes(option.value) ||
        fields[index].platform?.value === option.value
    );
  };

  const handleCheckboxChange = () => {
    setFillHeadFields(!fillHeadFields);
    if (!fillHeadFields) {
      setHeadOffice(connectedOffice);
      setHeadBillingStreet(connectedBillingStreet);
      setHeadBillingCity(connectedBillingCity);
      setHeadBillingState(connectedBillingState);
      setHeadBillingCountry(connectedBillingCountry);
      setHeadPincode(conPinCode);
    } else {
      setHeadOffice("");
      setHeadBillingStreet("");
      setHeadBillingCity("");
      setHeadBillingState("");
      setHeadBillingCountry("");
      setHeadPincode("");
    }
  };

  function isValidEmail(email) {
    if (!email) return true;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
  function isValidPinCode(pinCode) {
    if (!pinCode) return true;
    const regex = /^\d{6}$/;
    return regex.test(pinCode);
  }

  const validateForm = () => {
    const validation = {
      account_name: accountName,
      account_type_id: selectedAccountType,
      company_type_id: selectedCompanyType,
      category_id: selectedCategory,
      account_owner_id: selectedOwner,
    };

    setIsValid(validation);
    // setIsValIDPoc(pocValidation);
    const invalidField = Object.keys(validation).find(
      (key) => !validation[key]
    );
    if (invalidField) {
      scrollToField(invalidField);
    }
    // isValidPoc.map((poc) => {
    //   let invalidField = Object.keys(poc).find((key) => !poc[key]);
    //   return object.values(pocValidation).every((value) => value);
    // })
    return Object.values(validation).every((value) => value);
  };

  const scrollToField = (field) => {
    switch (field) {
      case "account_name":
        accountNameRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "account_type_id":
        accountTypeRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "company_type_id":
        companyTypeRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "category_id":
        categoryRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "account_owner_id":
        accountOwnerRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  const handleSubmitWithValidation = (e) => {
    if (validateForm()) {
      handleSubmit(e);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const payloads = {
      account_name: accountName,
      account_type_id: selectedAccountType,
      company_type_id: selectedCompanyType,
      category_id: selectedCategory,
      account_owner_id: selectedOwner,
      brand_id: selectedBrand,
      website: website,
      turn_over: Number(turnover),
      how_many_offices: Number(officesCount),
      is_rewards_sent: gifts,
      connected_office: connectedOffice,
      connect_billing_street: connectedBillingStreet,
      connect_billing_city: connectedBillingCity,
      connect_billing_state: connectedBillingState,
      connect_billing_country: connectedBillingCountry,
      connect_billing_pin_code: Number(conPinCode),
      head_office: headOffice,
      head_billing_street: headBillingStreet,
      head_billing_city: headBillingCity,
      head_billing_state: headBillingState,
      head_billing_country: headBillingCountry,
      head_billing_pin_code: Number(headPinCode),
      created_by: loginUserId,
      company_email: companyEmail,
      account_image: selectedImage,
    };

    const fieldsPayload = fields.map((field) => ({
      platform: field.platform?.value,
      link: field.link,
    }));

    if (fields.length > 0) {
      payloads.social_platform = fieldsPayload;
    }

    const filteredDocuments = documents.filter(
      (element) => element.document_no && element.document_master_id
    );
    const filteredPocs = pocs.filter(
      (element) =>
        element.contact_name && element.contact_no && element.department
    );

    if (filteredPocs.length === 0) {
      toastError("Please add all the required fields in Point of Contact");
      setIsValIDPoc(pocs);
      return;
    }

    const formData = new FormData();
    Object.entries(payloads).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          Object.entries(item).forEach(([subKey, subValue]) => {
            formData.append(`${key}[${index}][${subKey}]`, subValue);
          });
        });
      } else {
        formData.append(key, value);
      }
    });

    try {
      if (id == 0) {
        if (pocs.length > 0) {
          pocs.forEach((poc, index) => {
            Object.entries(poc).forEach(([key, value]) => {
              formData.append(`account_poc[${index}][${key}]`, value);
            });
          });
        }

        const response = await createSalesAccount(formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).unwrap();

        const newAccountId = await response.data.accountBilling.account_id;

        if (documents?.length > 0) {
          await Promise.all(
            filteredDocuments.map((element) => {
              const documentFormData = new FormData();
              documentFormData.append("account_id", newAccountId);
              documentFormData.append("document_no", element.document_no);
              documentFormData.append(
                "document_master_id",
                element.document_master_id
              );
              documentFormData.append("document_image_upload", element.file);
              documentFormData.append("created_by", loginUserId);

              return axios.post(
                `${baseUrl}accounts/add_document_overview`,
                documentFormData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${normalToken}`,
                  },
                }
              );
            })
          );
        }

        toastAlert("Account Created Successfully");
        setAccountMasterData(response?.data?.accountMaster);
        openModal("SubmitDialogSuccess");
      } else {
        setIsValIDPoc(pocs);
        setIsValidDoc(documents);
        // await updateSalesAccount({ ...payloads, id }).unwrap();
        await axios.put(`${baseUrl}accounts/edit_account/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${normalToken}`,
          },
        });

        await Promise.all(
          filteredDocuments.map((element) => {
            const documentFormData = new FormData();
            element?._id && documentFormData.append("id", element._id);
            documentFormData.append(
              "account_id",
              singleAccountData?.account_id
            );
            documentFormData.append("document_no", element?.document_no);
            documentFormData.append(
              "document_master_id",
              element?.document_master_id
            );
            documentFormData.append("document_image_upload", element?.file);

            return axios.put(
              `${baseUrl}accounts/update_document_overview`,
              documentFormData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${normalToken}`,
                },
              }
            );
          })
        );

        await updatePocs({
          account_poc: pocs,
          updated_by: loginUserId,
          id: accountId,
        }).unwrap();

        toastAlert("Updated Successfully");
        openModal("SubmitDialogSuccess");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      openModal("SubmitDialogError");
      toastError(error?.data?.message || error.message);
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = (contentType) => {
    if (contentType === "addBrand") {
      setIsBrandModal(true);
    }
    setModalContentType(contentType);
  };

  const closeModal = () => {
    setModalContentType(null);
    setIsBrandModal(false);
  };

  const renderModalContent = () => {
    switch (modalContentType) {
      case "brandCategory":
        return (
          <CreateBrandCategory
            loginUserId={loginUserId}
            closeModal={closeModal}
          />
        );
      case "accountType":
        return (
          <CreateAccountType
            loginUserId={loginUserId}
            closeModal={closeModal}
          />
        );
      case "addBrand":
        return (
          <CreateBrand
            allBrandCatType={allBrandCatType}
            loginUserId={loginUserId}
            closeModal={closeModal}
            accountName={accountName}
            setSelectedBrand={setSelectedBrand}
            setSelectedAccountType={setSelectedAccountType}
            openModal={openModal}
            setSelectedCategoryParent={setSelectedCategory}
          />
        );
      case "companyType":
        return (
          <CreateCompanyType
            loginUserId={loginUserId}
            closeModal={closeModal}
          />
        );
      case "viewBrandCategory":
        return (
          <View
            title={"Industry Category View"}
            data={allBrandCatType}
            columns={ViewBrandCategoryColumns}
            isLoading={allBrandCatTypeLoading}
            tableName={"createViewBrandCategory"}
          />
        );
      case "viewCompanyType":
        return (
          <View
            title={"Company Type"}
            data={allCompanyType}
            columns={ViewCompanyTypeColumns}
            isLoading={allCompanyTypeLoading}
            tableName={"createViewCompanyType"}
          />
        );
      case "viewAccountType":
        return (
          <View
            title={"Account Type"}
            data={allAccountTypes}
            columns={ViewAccountTypeColumns}
            isLoading={allAccountTypesLoading}
            tableName={"createViewAccountType"}
          />
        );
      case "addDepartment":
        return (
          <CreateDepartment loginUserId={loginUserId} closeModal={closeModal} />
        );

      case "viewDepartment":
        return (
          <View
            title={"Department"}
            data={departments}
            columns={ViewDepartmentColumns}
            isLoading={departmentsLoading}
            tableName={"salesViewDepartment"}
          />
        );

      case "shareIncentive":
        return <ShareIncentive />;

      case "SubmitDialogSuccess":
        return (
          <AccountSubmitDialog
            response="Success"
            id={id}
            accountMasterData={accountMasterData}
          />
        );

      case "SubmitDialogError":
        return (
          <AccountSubmitDialog response="Reject" closeModal={closeModal} />
        );

      default:
        return null;
    }
  };
  useEffect(() => {
    if (selectedAccountType !== null)
      setIsValid({ ...isValid, account_type_id: selectedAccountType });
  }, [selectedAccountType]);
  useEffect(() => {
    if (selectedCompanyType !== null)
      setIsValid({ ...isValid, company_type_id: selectedCompanyType });
  }, [selectedCompanyType]);
  useEffect(() => {
    if (selectedCategory !== null)
      setIsValid({ ...isValid, category_id: selectedCategory });
  }, [selectedCategory]);
  useEffect(() => {
    if (selectedOwner !== null)
      setIsValid({ ...isValid, account_owner_id: selectedOwner });
  }, [selectedOwner]);
  useEffect(() => {
    if (selectedBrand !== null)
      setIsValid({ ...isValid, brand_id: selectedBrand });
  }, [selectedBrand]);

  let loaderview;
  if (
    allAccountTypesLoading ||
    allCompanyTypeLoading ||
    allBrandCatTypeLoading ||
    allDocTypeLoading ||
    isCreateSalesLoading ||
    accountDataLoading ||
    editAccountLoading ||
    DocumentsLoading ||
    pocLoading ||
    editPocLoading ||
    editDocumentLoading ||
    allBrandCatTypeLoading ||
    allBrandsLoading ||
    allCompanyTypeLoading ||
    allDocTypeLoading ||
    allAccountTypesLoading ||
    allCompanyTypeLoading ||
    allBrandCatTypeLoading ||
    allDocTypeLoading ||
    allBrandsLoading
  )
    loaderview = true;
  else loaderview = false;

  const handlePincode = (e, state) => {
    const { value } = e.target;

    if (value.length <= 6) {
      if (state === "head") {
        setHeadPincode(value);
      } else {
        setConPinCode(value);
      }
    }
  };
  const ViewDepartmentColumns = [
    {
      key: "Serial_no",
      name: "S.NO",
      renderRowCell: (row, index) => index + 1,
      width: 50,
      showCol: true,
      sortable: true,
    },
    { key: "department_name", name: "Department", width: 100, editable: true },
    {
      key: "action",
      name: "Actions",
      width: 100,
      renderRowCell: (
        row,
        index,
        setEditFlag,
        editflag,
        handelchange,
        column
      ) => {
        if (editflag === false)
          return (
            <button
              className="icon-1"
              onClick={() => {
                setEditFlag(index);
              }}
            >
              <i className="bi bi-pencil" />
            </button>
          );

        if (index === editflag)
          return (
            <div className="d-flex gap-2">
              <button
                className="icon-1"
                onClick={() => {
                  setEditFlag(false);
                }}
              >
                <i className="bi bi-x" />
              </button>
              <button
                className="icon-1"
                onClick={() => {
                  handelDepEdit(row, setEditFlag);
                }}
              >
                <i className="bi bi-save" />
              </button>
            </div>
          );
      },
    },
  ];

  useCallback(() => {
    setLoader(isLoading);
  }, [isLoading]);
  return (
    <div>
      <Modal
        className="salesModal"
        isOpen={modalContentType}
        onRequestClose={closeModal}
        contentLabel="modal"
        preventScroll={true}
        appElement={document.getElementById("root")}
        shouldCloseOnOverlayClick={false}
        style={{
          overlay: {
            position: "fixed",
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            height: "100vh",
          },
          content: {
            position: "absolute",
            maxWidth: isBrandModal ? "none" : "900px", // Adjust maxWidth based on modalContentType
            minWidth: isBrandModal ? "1000px" : "none", // Adjust minWidth based on modalContentType
            minHeight: isBrandModal ? "550px" : "none", // Adjust minHeight based on modalContentType
            // top: "50px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
            maxHeight: "650px",
          },
        }}
      >
        <div className="d-flex">
          <div className="icon-1 flex-end" onClick={() => closeModal()}>
            <i className="bi bi-x" />
          </div>
        </div>
        {renderModalContent()}
      </Modal>

      <PageHeader
        mainTitle={id == 0 ? "Add Your 10cr Brand 😉" : "Accounts Master"}
        link={true}
        LinkButtons={LinkButtons}
      />

      <div className=" mt24">
        <DocumentUpload
          documents={documents}
          toastError={toastError}
          toastAlert={toastAlert}
          setDocuments={setDocuments}
          documentTypes={allDocType}
          isValidDoc={isValidDoc}
          setIsValidDoc={setIsValidDoc}
          id={id}
          setGstDetails={setGstDetails}
        />
        <div className="card">
          <div className="card-header">
            <div className="cardHeading">
              <h5 className="cardTitle">Account Details</h5>
            </div>
            <div className="cardInfo">
              <p>
                Brand name & Account name can be different eg: Brand Name:
                Myfitness, AccountName: Mensa Brands
              </p>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 col-12" ref={accountNameRef}>
                <FieldContainer
                  label="Account Name"
                  fieldGrid={12}
                  astric
                  value={accountName}
                  onChange={(e) => {
                    setAccountName(e.target.value);
                    setIsValid({ ...isValid, account_name: e.target.value });
                  }}
                  placeholder="Enter billing name"
                  required
                />
                {isValid.account_name === "" && (
                  <div className="form-error">Please Enter Account Name</div>
                )}
              </div>
              <div className="col-md-4 col-12">
                <div className="flexCenter colGap8">
                  <div
                    className={loginUserRole === 1 ? "w-100" : "w-100"}
                    ref={accountTypeRef}
                  >
                    <CustomSelect
                      fieldGrid={12}
                      label="Account Type"
                      dataArray={allAccountTypes}
                      optionId="_id"
                      optionLabel="account_type_name"
                      selectedId={selectedAccountType}
                      setSelectedId={setSelectedAccountType}
                      required
                    >
                      {loginUserRole === 1 && (
                        <>
                          <Button
                            type="button"
                            className="icon"
                            onClick={() => openModal("accountType")}
                          >
                            <Plus />
                          </Button>
                          <Button
                            type="button"
                            className="icon"
                            onClick={() => openModal("viewAccountType")}
                          >
                            <Eye />
                          </Button>
                        </>
                      )}
                    </CustomSelect>

                    {isValid.account_type_id === null && (
                      <div className="form-error">
                        Please Select Account Type
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="flexCenter colGap8">
                  <div className="w-100">
                    <CustomSelect
                      fieldGrid={12}
                      label="Brand"
                      dataArray={allBrands}
                      optionId="_id"
                      optionLabel="brand_name"
                      selectedId={selectedBrand}
                      setSelectedId={setSelectedBrand}
                      required
                      astric
                      // disabled={
                      //   allAccountTypes?.find(
                      //     (data) => data._id === selectedAccountType
                      //   )?.account_type_name !== "Agency"
                      //     ? false
                      //     : true
                      // }
                    >
                      <Button
                        type="button"
                        onClick={() => openModal("addBrand")}
                      >
                        <Plus />
                      </Button>
                    </CustomSelect>
                  </div>
                </div>
                {isValid.selectedBrand && (
                  <div className="form-error">Please select a brand</div>
                )}
              </div>
              <div className="col-md-4 col-12">
                <div className="flexCenter colGap8">
                  <div
                    className={loginUserRole === 1 ? "w-100" : "w-100"}
                    ref={companyTypeRef}
                  >
                    <CustomSelect
                      fieldGrid={12}
                      label="Company Type"
                      dataArray={allCompanyType}
                      optionId="_id"
                      optionLabel="company_type_name"
                      selectedId={selectedCompanyType}
                      setSelectedId={setSelectedCompanyType}
                      required
                    >
                      {loginUserRole === 1 && (
                        <>
                          <Button
                            type="button"
                            className="icon"
                            onClick={() => openModal("companyType")}
                          >
                            <Plus />
                          </Button>
                          <Button
                            type="button"
                            className="icon"
                            onClick={() => openModal("viewCompanyType")}
                          >
                            <Eye />
                          </Button>
                        </>
                      )}
                    </CustomSelect>
                    {isValid.company_type_id === null && (
                      <div className="form-error">
                        Please Select Company Type
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="flexCenter colGap8">
                  <div className="w-100">
                    <CustomSelect
                      fieldGrid={12}
                      label="Industry Name (Auto Select)"
                      dataArray={allBrandCatType}
                      optionId="_id"
                      optionLabel="brand_category_name"
                      selectedId={selectedCategory}
                      setSelectedId={setSelectedCategory}
                      required
                    >
                      {loginUserRole == 1 && (
                        <>
                          <Button
                            type="button"
                            className="icon"
                            onClick={() => openModal("brandCategory")}
                          >
                            <Plus />
                          </Button>
                          <Button
                            type="button"
                            className="icon"
                            onClick={() => openModal("viewBrandCategory")}
                          >
                            <Eye />
                          </Button>
                        </>
                      )}
                    </CustomSelect>
                    {isValid.category_id === null && (
                      <div className="form-error">
                        Please Select Industry Name
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <FieldContainer
                  fieldGrid={12}
                  label="Upload Brand Image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {previewUrl && (
                  <div>
                    <h3>Image Preview:</h3>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="cardHeading">
              <h5 className="cardTitle">Socials</h5>
            </div>
            <div className="cardAction">
              {fields?.length !== socialOptions?.length && (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleAddMore}
                >
                  Add Another Social
                </Button>
              )}
            </div>
          </div>
          <div className="card-body">
            <SocialComponent
              fields={fields}
              handlePlatformChange={handlePlatformChange}
              handleLinkChange={handleLinkChange}
              getAvailableOptions={getAvailableOptions}
              handleDelete={handleDelete}
            />
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="cardHeading">
              <h5 className="cardTitle">Details</h5>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div
                className="col-lg-4 col-md-4 col-sm-12 col-12"
                ref={accountOwnerRef}
              >
                <CustomSelect
                  label="Account Owner Name"
                  dataArray={accOwnerNameData}
                  optionId="user_id"
                  optionLabel="user_name"
                  selectedId={selectedOwner}
                  setSelectedId={setSelectedOwner}
                  required
                  disabled={true}
                />
                {isValid.account_owner_id === null && (
                  <div className="form-error">
                    Please Select Account Owner Name
                  </div>
                )}
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <FieldContainer
                  label="Website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Enter website"
                  required
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12 flex-row">
                <FieldContainer
                  label="Turnover (in cr)"
                  type="number"
                  value={turnover}
                  required={false}
                  onChange={(e) => setTurnover(e.target.value)}
                  placeholder="Enter last financial year turnover"
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <FieldContainer
                  label="Company Email"
                  type="email"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  placeholder="Enter company email"
                  required
                />
                {!isValidEmail(companyEmail) && (
                  <div className="form-error">Please Enter Valid Email</div>
                )}
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <FieldContainer
                  label="How Many Offices"
                  type="number"
                  value={officesCount}
                  onChange={(e) => setOfficesCount(e.target.value)}
                  placeholder="Enter number of offices"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="cardHeading">
              <h5 className="cardTitle">Connected Address</h5>
            </div>
            <label className="flexCenter pointer">
              <input
                type="checkbox"
                className="form-check-input m0"
                value={gifts}
                onChange={(e) => setGifts(e.target.checked)}
              />
              <p className="ml8 mt2 wMaxContent">Diwali Gifts</p>
            </label>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <FieldContainer
                  label="Pin Code"
                  type="number"
                  value={conPinCode}
                  onChange={(e) => handlePincode(e, "connected")}
                  placeholder="Enter pin code"
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <CustomSelect
                  label="Connected Billing Country"
                  dataArray={countries}
                  optionId="country_name"
                  optionLabel="country_name"
                  selectedId={connectedBillingCountry}
                  setSelectedId={setConnectedBillingCountry}
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <IndianStatesMui
                  selectedState={connectedBillingState}
                  onChange={(option) =>
                    setConnectedBillingState(option ? option : null)
                  }
                  label="Connected Billing State"
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <IndianCitiesMui
                  selectedState={connectedBillingState}
                  selectedCity={connectedBillingCity}
                  onChange={(option) =>
                    setConnectedBillingCity(option ? option : null)
                  }
                  label="Connected Billing City"
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <FieldContainer
                  label="Connected Billing Address"
                  value={connectedBillingStreet}
                  onChange={(e) => setConnectedBillingStreet(e.target.value)}
                  placeholder="Enter connected billing Addresss"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="cardHeading">
              <h5 className="cardTitle">Head office Address</h5>
            </div>
            <label className="flexCenter pointer">
              <input
                type="checkbox"
                className="form-check-input m0"
                checked={fillHeadFields}
                onChange={handleCheckboxChange}
              />
              <p className="ml8 mt2 wMaxContent">
                Head office address same as Connected Office
              </p>
            </label>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <FieldContainer
                  label="Pin Code"
                  type="number"
                  value={headPinCode}
                  onChange={(e) => handlePincode(e, "head")}
                  placeholder="Enter pin code"
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <CustomSelect
                  label="Head Billing Country"
                  dataArray={countries}
                  optionId="country_name"
                  optionLabel="country_name"
                  selectedId={headBillingCountry}
                  setSelectedId={setHeadBillingCountry}
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="form-group ">
                  <IndianStatesMui
                    label="Head Billing State"
                    selectedState={headBillingState}
                    onChange={(option) =>
                      setHeadBillingState(option ? option : null)
                    }
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="form-group">
                  <IndianCitiesMui
                    label="Head Billing City"
                    selectedState={headBillingState}
                    selectedCity={headBillingCity}
                    onChange={(option) =>
                      setHeadBillingCity(option ? option : null)
                    }
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <FieldContainer
                  label="Head Billing Address"
                  value={headBillingStreet}
                  onChange={(e) => setHeadBillingStreet(e.target.value)}
                  placeholder="Enter head billing Address"
                />
              </div>
            </div>
          </div>
        </div>
        <PointOfContact
          pocs={pocs}
          setPocs={setPocs}
          departments={departments}
          isValidPoc={isValidPoc}
          setIsValIDPoc={setIsValIDPoc}
          socialOptions={socialOptions}
          openModal={openModal}
        />
        <div className="flexCenter colGap8 mb24">
          <button
            className="btn btn-primary"
            disabled={isCreateSalesLoading || editAccountLoading}
            onClick={handleSubmitWithValidation}
          >
            {!isCreateSalesLoading || !editAccountLoading
              ? id == 0
                ? "Submit"
                : "Save"
              : id == 0
              ? "Submitting..."
              : "Saving..."}
          </button>
          <button className="btn btn-warning" onClick={() => handleAddPoc()}>
            Add More POC
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSalesAccount;
