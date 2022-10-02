import axios from 'axios';
import React from 'react';
import ConfPage from './ConfPage';
import { DEFAULT_URL } from "../helpers";


const ConfCard = ({get, setGet, confData}) => {

    const Delete = async () => {  
        await axios.delete(DEFAULT_URL + `/${confData.id}`);
        setGet(!get);
    }

    return(
        <div className='rounded m-3 border border d-flex align-items-center justify-content-between w-100'>
            <div data-toggle="modal" data-target={".info-modal-lg-" + confData.id} className='p-2 w-100'>
                <div className='d-flex align-items-center justify-content-between w-75'>
                    <div className='text-primary text-capitalize'>
                        <label className="text-secondary">Title:</label>
                        <h5 className='text-primary text-capitalize'>{confData.title}</h5>
                    </div>
                    <div>
                        <label className="text-secondary">Date:</label>
                        <h5 className='text-primary text-capitalize'>{confData.date}</h5>
                    </div>
                </div>
            </div>
            <button className='btn btn-danger p-2 m-2' onClick={Delete}>
                Delete
            </button>
            <ConfPage confData={confData} get={get} setGet={setGet}/>
        </div>
        
    )
};

export default ConfCard;