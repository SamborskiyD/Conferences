import React, {useState, useEffect} from 'react';
import axios from "axios"
import ConfCard from './ConfCard';
import CreatePage from './CreatePage';
import Loading from './Loading';
import { DEFAULT_URL } from "../helpers";


const MainPage = () => {

    const [allData, setAllData] = useState([]);

    const [get, setGet] = useState(true);

    async function getData() {
        const request = await axios.get(DEFAULT_URL + "/");
        setAllData(request.data || [])
    }

    useEffect(() => {
        getData();
    }, [get]);



    return(
        
        <section className='p-2'>
            {
                allData ? 
                (
                    <div className='container d-flex flex-column align-items-center'>
                        <h1 className='text-primary'>Conferences</h1>
                        <div className='w-100'>
                            {
                                allData.map(elem => (
                                    <ConfCard key={elem.id} confData={elem} get={get} setGet={setGet}/>
                                ))
                            }
                        </div>
                        <div className='m-2 w-100 d-flex justify-content-end'>
                            <button type="button" className="btn btn-primary w-25" data-toggle="modal" data-target=".create-modal-lg">
                                Add
                            </button>
                            <CreatePage get={get} setGet={setGet}/>
                        </div>
                    </div>
                )
                :
                <Loading />
            }
        </section>
    )
};

export default MainPage;