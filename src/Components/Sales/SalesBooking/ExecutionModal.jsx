import React, { useState } from "react";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import { useGetAllBrandQuery } from "../../../Redux/Slices/SalesSlices/BrandApi";
import { useAddExecutionMutation } from "../../../Redux/Slices/SalesSlices/ExecutionApi";
import { toastAlert, toastError } from "../../../Utils/ToastUtil";

const DEBOUNCE_DELAY = 300;

const ExecutionModal = ({
    closeModal,
    saleBookingData,
    refetchSaleBooking,
}) => {
    const loginUserId = GetDecodedToken().id;
    const [addExecution, {
        isLoading: isExecutionSubmitting,
    }] = useAddExecutionMutation();

    // Helper function to format date
    const getFormattedDate = (date) => {
        const tzOffset = date.getTimezoneOffset() * 60000;
        const localISOTime = new Date(date.getTime() - tzOffset)
            .toISOString()
            .slice(0, 16);
        return localISOTime;
    };

    // Initialize startDate with today's date
    const [startDate, setStartDate] = useState(getFormattedDate(new Date()));

    const [startDateTimeout, setStartDateTimeout] = useState(null);
    const [remarks, setRemarks] = useState("");
    const [engagement, setEngagement] = useState();
    const [reach, setReach] = useState();
    const [impression, setImpression] = useState();
    const [storyView, setStoryView] = useState();

    const { data: brandArray } = useGetAllBrandQuery();

    const handleStartDateChange = (e) => {
        clearTimeout(startDateTimeout);
        const newStartDate = e.target.value;
        setStartDateTimeout(
            setTimeout(() => setStartDate(newStartDate), DEBOUNCE_DELAY)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            sale_booking_id: saleBookingData?.sale_booking_id,
            start_date: startDate,
            commitment: remarks,
            created_by: loginUserId,
            engagement,
            reach,
            impression,
            story_view: storyView,
        };
        try {
            await addExecution(payload).unwrap();
            toastAlert("Execution requested successfully |Token Created");
            refetchSaleBooking();
            closeModal();
        } catch (err) {
            console.error("execution request failed", err);
            toastError("execution request failed");
        }
    };

    return (
        <div>
            <h2>Request Execution</h2>
            <hr className="mt-3 mb-3" />

            <form onSubmit={handleSubmit}>
                <div className="d-flex flex-col">
                    <div className="flex-row">
                        Brand Name:{" "}
                        {brandArray?.find((item) => item._id === saleBookingData?.brand_id)
                            ?.brand_name || "N/A"}
                    </div>
                    <br />
                    Campaign Name: {saleBookingData?.campaign_name || "N/A"}
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="start_date">Start Date:</label>
                    <input
                        type="datetime-local"
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="engagement">Engagement:</label>
                    <input
                        type="number"
                        value={engagement}
                        placeholder="Engagement"
                        onChange={(e) => setEngagement(e.target.value)}
                        className="form-control"
                    // required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="reach">Reach(K):</label>
                    <input
                        type="number"
                        placeholder="Reach"
                        value={reach}
                        onChange={(e) => setReach(e.target.value)}
                        className="form-control"
                    // required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="impression">Impression(K):</label>
                    <input
                        type="number"
                        placeholder="Impression"
                        value={impression}
                        onChange={(e) => setImpression(e.target.value)}
                        className="form-control"
                    // required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="storyView">Story View(K):</label>
                    <input
                        type="number"
                        placeholder="Story Views"
                        value={storyView}
                        onChange={(e) => setStoryView(e.target.value)}
                        className="form-control"
                    // required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="remarks">Any other commitment/remark</label>
                    <textarea
                        id="remarks"
                        value={remarks}
                        placeholder="remarks"
                        onChange={(e) => setRemarks(e.target.value)}
                        className="form-control"
                        rows="4"
                        cols="50"
                    />
                </div>

                <div className="d-flex justify-content-between">
                    <button
                        type="submit"
                        disabled={isExecutionSubmitting}
                        className="btn cmnbtn btn-primary"
                    >
                        {isExecutionSubmitting ? "Submitting" : "Submit"}
                    </button>
                    <button className="btn cmnbtn btn-danger" onClick={closeModal}>
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExecutionModal;
