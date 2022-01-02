import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
    function_name: "",
    company_name: "",
    teamTags: "",
    from: "",
    to: "",
    ongoing: false,
};

export default function AddExp({ exp, addDataToBackend }) {


    const [formData, setFormData] = useState(initialState);
    const { function_name, company_name, teamTags, from, to, ongoing } = formData;

    const [toDateDisabled, toggleDisabled] = useState(false);

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });


    const success = (text) => toast.success(text, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });


    const submitForm = (e) => {
        e.preventDefault();
        const startdate = from.split('-')
        const enddate = to.split('-')
        if (!company_name || !function_name) {
            return
        }

        const submitDetails = {
            company_name,
            function_name: [function_name],
            team_name: teamTags?.split(','),
            from: {
                year: parseInt(startdate[0]),
                month: parseInt(startdate[1])
            },
            to: ongoing ? {} : {
                year: parseInt(enddate[0]),
                month: parseInt(enddate[1])
            },
            ongoing
        }
        exp.push(submitDetails)
        addDataToBackend("New Experience Added")
        setFormData(initialState)
        window.location.reload()
        // addExperience(submitDetails, history);
    };
    return (
        <div className="container">
            <div className="row">
                <div className="bg-white p-3 shadow-1" style={{}}>
                    <h1 className="large text-primary">Add An Experience</h1>

                    <small className="text_pink">* = required field</small>
                    <form className="form">
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="* Job company_name"
                                name="company_name"
                                required
                                value={company_name}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="* function_name"
                                name="function_name"
                                required
                                value={function_name}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="teamTags"
                                name="teamTags"
                                value={teamTags}
                                onChange={onChange}
                            />
                            <small className="form-text">
                                Please use comma separated values (eg. sde,marketing,accounts)
                            </small>
                        </div>

                        <div className="form-group">
                            <h4>* From Date</h4>
                            <input type="date" name="from" value={from} onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <p>
                                <input
                                    type="checkbox"
                                    name="ongoing"
                                    value={ongoing}
                                    className="form-check-input"
                                    id="checkbox"
                                    onChange={() => {
                                        setFormData({ ...formData, ongoing: !ongoing });
                                        toggleDisabled(!toDateDisabled);
                                    }}
                                />
                                {"  "}
                                <label htmlFor="checkbox"> ongoing Job</label>
                            </p>
                        </div>
                        <div className="form-group">
                            <h4>To Date</h4>
                            <input
                                type="date"
                                name="to"
                                value={to}
                                onChange={onChange}
                                disabled={toDateDisabled}
                            />
                        </div>


                        <Button
                            color="primary"
                            variant="contained"
                            type="Submit"
                            onClick={submitForm}
                            className="btn btn-primary bg_primary_special  my-1"
                        >
                            Add Experience
                        </Button>
                        <Button
                            variant="contained"
                            type="reset"
                            onClick={() => setFormData(initialState)}
                            color="secondary"
                        >
                            Reset
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};