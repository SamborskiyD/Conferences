import React, { useState } from 'react';
import MapContainer from './MapContainer';
import {Data, useJsApiLoader} from "@react-google-maps/api";
import Loading from './Loading';
import {countryList, DEFAULT_URL}  from "../helpers";
import axios from 'axios';



const ConfPage = ({confData, get, setGet}) => {


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.API_KEY
    });

    const [editData, setEditData] = useState(confData);

    const [data, setData] = useState(confData);


    const inputChange = (e) => {
        const {name, value} = e.target;
        setEditData((prev) => (
            {
                ...prev,
                [name]: value
            }
        ));
    }

    const [visible, setVisible] = useState(true);
    
    const changeVisibility = () => {
        setVisible(!visible)
    }

    const saveChanges = () => {
        setData({
            title: editData.title || data.title,
            date: editData.date || data.date,
            lat: editData.lat || data.lat,
            lng: editData.lng || data.lng,
            country: editData.country || data.country,
        });
    }

    const Delete = async () => {  
        await axios.delete(DEFAULT_URL + `/${confData.id}`);
        setGet(!get);
    }

    const Edit = async () => {
        await axios.put(DEFAULT_URL, {
            id: confData.id,
            title: editData.title || data.title,
            date: editData.date || data.date,
            lat: editData.lat || data.lat,
            lng: editData.lng || data.lng,
            country: editData.country || data.country,

        })
        saveChanges();
        setGet(!get);
    }

    return (
        <div className={"modal fade info-modal-lg-" + confData.id} data-backdrop="static" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className={visible ? "modal-content info" : "modal-content info not-visible"}>
                    <div className="modal-header">
                        <h5 className="modal-title">Conference info</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label className="col-form-label">Title:</label>
                                <p className='text-primary text-capitalize'>{data.title}</p>
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Date:</label>
                                <p className='text-primary text-capitalize'>{data.date === undefined ? "" : data.date.toString()}</p>
                            </div>
                            <div className="form-group">
                                <label  className="col-form-label">Country:</label>
                                <p className='text-primary text-capitalize'>{data.country}</p>
                            </div>
                            <label  className="col-form-label">Address:</label>
                            {isLoaded ? <MapContainer center={{lat: parseFloat(data.lat), lng: parseFloat(data.lng)}} 
                                markerPosition={{lat: parseFloat(data.lat), lng: parseFloat(data.lng)}} markerAllow={false}/> : <Loading />}
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Back</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={Delete}>Delete</button>
                        <button type="button" className="btn btn-primary" onClick={changeVisibility}>Edit</button>
                    </div>
                </div>
                <div className={visible ? "modal-content info not-visible" : "modal-content info"}>
                    <div className="modal-header">
                        <h5 className="modal-title">Edit conference info</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={Edit}>
                            <div className="form-group">
                                <label className="col-form-label">Title:</label>
                                <input 
                                    type="text" 
                                    name='title' 
                                    className="form-control" 
                                    value={editData.title ? editData.title : ""} 
                                    min={2} max={255} 
                                    onChange={inputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Date:</label>
                                <input 
                                    type={"datetime-local"} 
                                    name="date" 
                                    className='form-control' 
                                    value={editData.date ? editData.date : new Data(null)}
                                    onChange={inputChange}/>
                            </div>
                            <div className="form-group">
                                <label  className="col-form-label">Country:</label>
                                <select className="form-control" placeholder='Choose country' name='country' value={editData.country ? editData.country : data.country} onChange={inputChange}>
                                    {
                                        countryList.map(country => {
                                            return (
                                                <option value={country} key={country}>
                                                    {country}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                            {isLoaded 
                                ? <MapContainer
                                    center={{lat: parseFloat(data.lat), lng: parseFloat(data.lng)}} 
                                    markerPosition={{lat: parseFloat(editData.lat ? editData.lat : data.lat), lng: parseFloat(editData.lng ? editData.lng : data.lng)}} 
                                    markerAllow={true} setMarkerPos={setEditData}
                                /> 
                                : <h1>Loading...</h1>}

                            <div className='d-flex justify-content-between'>
                                <div className="form-group w-100 m-2">
                                    <label className="col-form-label">Latitude:</label>
                                    <input 
                                        type={"text"} 
                                        pattern="^(\+|-)?(?:90(?:(?:\.0{1,16})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,16})?))$" 
                                        name='lat' 
                                        className="form-control" 
                                        value={editData.lat ? editData.lat : 0}  
                                        onChange={inputChange}
                                    />
                                </div>
                                <div className="form-group w-100 m-2">
                                    <label className="col-form-label">Longitude:</label>
                                    <input 
                                        type={"text"} 
                                        pattern="^(\+|-)?(?:180(?:(?:\.0{1,16})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,16})?))$"  
                                        name="lng" 
                                        className="form-control" 
                                        value={editData.lng ? editData.lng : 0} 
                                        onChange={inputChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={changeVisibility}>Back</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

};


export default ConfPage;
