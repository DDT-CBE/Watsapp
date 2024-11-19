import axios from 'axios';
import React, { Fragment, useState } from 'react';
const APIURL = process.env.REACT_APP_API_URL;

const Editseller = ({ data }) => {
    const [numberhide, setNumberHide] = useState(data.numberhide);
    const [isSaving, setIsSaving] = useState(false); // To handle saving state
    const [errorMessage, setErrorMessage] = useState(''); // For displaying error messages

    const handleChange = () => {
        setNumberHide(!numberhide);
    };

    const saveChanges = () => {
        setIsSaving(true); // Set saving state to true
        axios.put(`${APIURL}updateseller/${data._id}`, { numberhide })
            .then(response => {
                console.log('Update successful:', response.data );
                setIsSaving(false); // Reset saving state after success
            })
            .catch(error => {
                console.error('There was an error updating the data!', error);
                setErrorMessage('Failed to update data'); // Set error message
                setIsSaving(false); // Reset saving state on error
            });
    };

    const resetChanges = () => {
        setNumberHide(data.numberhide); // Reset to the initial state
        setErrorMessage(''); // Clear any previous error messages
    };

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target={`#id${data._id}`}
            >
                Edit
            </button>

            <div className="modal fade" id={`id${data._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit User Data</h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={resetChanges} // Reset changes when the modal is closed
                            ></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" value={data.name} readOnly />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={numberhide}
                                    onChange={handleChange}
                                />
                                Hide Phone Number
                            </label>
                            {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={resetChanges} // Ensure the state is reset on close
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={saveChanges}
                                disabled={isSaving} // Disable the button while saving
                            >
                                {isSaving ? 'Saving...' : 'Save changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Editseller;
