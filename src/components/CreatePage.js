import React, {useState} from 'react';
import MapContainer from './MapContainer';
import {useJsApiLoader} from "@react-google-maps/api";
import { countryList, API_KEY, DEFAULT_URL }  from "../helpers";

import axios from 'axios';

const defaultCenter = {
    lat: 50.450001,
    lng: 30.523333
};


const CreatePage = ({get, setGet}) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY
    });

    const [data, setData] = useState({});

    const inputChange = (e) => {
        const {name, value} = e.target;
        setData((prev) => (
            {
                ...prev,
                [name]: value
            }
        ));
    }

    const Save = async (e) => {
        e.preventDefault();
        await axios({
            method: "POST",
            url: DEFAULT_URL,
            data: {
                title: data.title || "",
                date: data.date || new Date(null),
                lat: parseFloat(data.lat) || 0,
                lng: parseFloat(data.lng) || 0,
                country: data.country || ""
            }
        })
        setGet(!get);
        setData({});
    }

    

    return(
        <div className="modal fade create-modal-lg" data-backdrop="static" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add new conference</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={Save}>
                            <div className="form-group">
                                <label className="col-form-label">Title</label>
                                <input type={"text"} name='title' className="form-control" value={data.title ? data.title : ""} min={2} max={255} onChange={inputChange} required/>
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Date</label>
                                <input type={"datetime-local"} name="date" className='form-control' value={data.date} onChange={inputChange} required/>
                            </div>
                            <div className="form-group">
                                <label  className="col-form-label">Country</label>
                                <select className="form-control" placeholder='Choose country' name='country' value={data.country} onChange={inputChange}>
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
                            {isLoaded ? <MapContainer setAddress={setData} center={defaultCenter} 
                                markerPosition={{lat: parseFloat(data.lat), lng: parseFloat(data.lng)}} markerAllow={true} setMarkerPos={setData}/> : <h1>Loading...</h1>}

                            <div className='d-flex justify-content-between'>
                                <div className="form-group w-100 m-2">
                                    <label className="col-form-label">Latitude</label>
                                    <input 
                                        type={"text"} 
                                        pattern="^(\+|-)?(?:90(?:(?:\.0{1,15})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,15})?))$" 
                                        name='lat' 
                                        className="form-control" 
                                        value={data.lat}  
                                        onChange={inputChange}
                                    />
                                </div>
                                <div className="form-group w-100 m-2">
                                    <label className="col-form-label">Longitude</label>
                                    <input 
                                        type={"text"} 
                                        pattern="^(\+|-)?(?:180(?:(?:\.0{1,15})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,15})?))$" 
                                        name="lng" 
                                        className="form-control"  
                                        value={data.lng} 
                                        onChange={inputChange} 
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Back</button>
                                <button type="submit" className="btn btn-primary submit_button">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePage;