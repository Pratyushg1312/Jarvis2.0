import React, { useState } from "react";
import { useEditExeCampaignMutation } from "../../../Redux/Slices/SalesSlices/ExecutionCampaignApi";
import FieldContainer from "../../CommonComponent/FormElement/FieldContainer";

const EditCampaign = ({
  loginUserId,
  closeModal,
  campaignName,
  campaignList,
}) => {
  const [editedCampaign, setEditedCampaign] = useState(
    campaignList?.find((data) => data?._id === campaignName)?.exe_campaign_name
  );
  const [updateCampaignName, { isLoading, isError }] =
    useEditExeCampaignMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      exe_campaign_name: editedCampaign,
      updated_by: loginUserId,
      id: campaignName,
    };
    try {
      await updateCampaignName(payload).unwrap();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex-col gap-2">
      <FieldContainer
        fieldGrid={12}
        label={"Campaign Name"}
        value={editedCampaign}
        onChange={(e) => setEditedCampaign(e.target.value)}
        required={true}
        astric
      />
      <button
        className="btn btn_sm btn-primary"
        disabled={
          isLoading ||
          editedCampaign ===
            campaignList?.find((data) => data?._id === campaignName)
              ?.exe_campaign_name
        }
        onClick={(e) => handleSubmit(e)}
      >
        Submit
      </button>
    </div>
  );
};

export default EditCampaign;
