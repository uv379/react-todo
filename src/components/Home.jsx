import React, { useEffect, useState } from "react";
import {
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from "react-redux";
import { addInfoInitiale, deleteInfoInitiale, editInfoInitiale, getInfoInitiale, getInfosInitiale } from "../redux/actions/actions";

const initialState = {
    name: "",
    phone: "",
    email: ""
}

const Home = () => {
    const [state, setState] = useState(initialState);
    const [editModel, setEditModel] = useState(false)
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [data, setData] = useState([]);
    const [infoId, setInfoId] = useState(null)
    const { name, phone, email } = state;
    const dispatch = useDispatch();
    const { infos, info } = useSelector(state => state.data)

    useEffect(() => {
        dispatch(getInfosInitiale());
    }, [])

    useEffect(() => {
        setData(infos)
        // setSearchInput(infos)
    }, [infos])


    useEffect(() => {
        if (info) {
            setState({ ...info })
        }
    }, [info])

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!editModel) {
            dispatch(addInfoInitiale(state));
            setState({ name: "", phone: "", email: "" });
        } else {
            dispatch(editInfoInitiale(infoId, state));
            setInfoId(null)
            setEditModel(false)
            setState({ name: "", phone: "", email: "" });
        }


    }

    const deleteInfo = (id) => {
        dispatch(deleteInfoInitiale(id))
    }
    const editInfo = (id) => {
        setEditModel(true);
        setInfoId(id)
        dispatch(getInfoInitiale(id))

    }

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = data.filter((item) => {

                return item.name.toLocaleLowerCase().includes(searchInput.toLowerCase()) || item.email.toLocaleLowerCase().includes(searchInput.toLowerCase())

            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(data)
        }
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" >
            <h2 className="fw-bold">List of all Candidates</h2>
            <div style={{ width: "300px" }} className='p-4'>
                <form onSubmit={handleSubmit}>

                    <MDBInput name="name" value={name || ""} onChange={handleInputChange} className='mb-4' type='text' label='Name' />
                    <MDBInput value={phone || ""} name="phone" onChange={handleInputChange} className='mb-4' type='number' label='Phone Number' />
                    <MDBInput value={email || ""} name="email" onChange={handleInputChange} className='mb-4' type='email' label='Email address' />
                    <MDBBtn type='submit' color={!editModel ? "success" : "worning"}>
                        {!editModel ? "Submit" : "Update"}
                    </MDBBtn>
                </form>
            </div>
            <div>
                <input icon='search'
                    placeholder='Search...'
                    onChange={(e) => searchItems(e.target.value)}
                />
            </div>
            <div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            searchInput.length > 1 ? (
                                filteredResults.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <th>
                                                {value.name}
                                            </th>
                                            <th>
                                                {value.phone}
                                            </th>
                                            <th>
                                                {value.email}
                                            </th>
                                            <th>
                                                <button className="btn btn-success mx-2" onClick={() => editInfo(value.id)}  >Edit</button>
                                                <button onClick={() => deleteInfo(value.id)} className="btn btn-danger">Delete</button>
                                            </th>
                                        </tr>
                                    )
                                })
                            ) : (

                                Object.values(data).map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <th>
                                                {value.name}
                                            </th>
                                            <th>
                                                {value.phone}
                                            </th>
                                            <th>
                                                {value.email}
                                            </th>
                                            <th>
                                                <button className="btn btn-success mx-2" onClick={() => editInfo(value.id)}  >Edit</button>
                                                <button onClick={() => deleteInfo(value.id)} className="btn btn-danger">Delete</button>
                                            </th>
                                        </tr>



                                    );
                                }))}


                    </tbody>

                </table>


            </div>
        </div>
    );
};

export default Home;
