import React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Manage_users() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchdata();
    }, []);

    const fetchdata=async()=>
    {
       const res=await axios.get(`http://localhost:3000/user`);
       setData(res.data);
        //console.log(res.data);
    }

    /*
    function fetchdata() {
        fetch('https://morningfrontend-default-rtdb.firebaseio.com/user.json')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    }
    */
    const ondelete=async(id)=>
    {
       const res=await axios.delete(`http://localhost:3000/user/${id}`);
       toast.success('User Delete Success');
       fetchdata();
    }
   /*
    function ondelete(id) {
        fetch(`https://morningfrontend-default-rtdb.firebaseio.com/user/${id}.json`, {
            method: 'DELETE',
        })
            .then((res) => {
                fetchdata();
            });
    }
    */
    const [formvalue, setFormvalue] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
    })

    const [updid,setupdid]=useState("");
    const onedit=async(id)=>
    {
       const res=await axios.get(`http://localhost:3000/user/${id}`);
       setFormvalue({ ...formvalue, name: res.data.name, email: res.data.email, password: res.data.password, mobile: res.data.mobile });
       setupdid(id);
    }
    /*
    function onedit(id) {
        fetch(`https://morningfrontend-default-rtdb.firebaseio.com/user/${id}.json`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                setFormvalue({ ...formvalue, name: data.name, email: data.email, password: data.password, mobile: data.mobile });
                setupdid(id);
            });
    }
    */
    onchange = (e) => {
        setFormvalue({ ...formvalue, [e.target.name]: e.target.value })  // method 1
    }
    const onupdate=async(id)=>
    {
       const res=await axios.patch(`http://localhost:3000/user/${updid}`,formvalue);
       setFormvalue({ name: "", email: "", password: "",mobile:""});
       toast.success('User Update Success');
       fetchdata();
    }

    const status=async(id)=>
    {
       const resuser=await axios.get(`http://localhost:3000/user/${id}`);
       if(resuser.data.status=="Unblock")
       {
            const res=await axios.patch(`http://localhost:3000/user/${id}`,{status:"Block"});
            toast.success('User Block Success');
            fetchdata();
       }
       else
       {
            const res=await axios.patch(`http://localhost:3000/user/${id}`,{status:"Unblock"});
            toast.success('User Unblock Success');
            fetchdata();
       }
    }
    /*
    function onupdate() {
        fetch(`https://morningfrontend-default-rtdb.firebaseio.com/user/${updid}.json`, {
            method: 'PATCH',
            body: JSON.stringify(formvalue),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => 
            {
                setFormvalue({ name: "", email: "", password: "",mobile:""});
                fetchdata();
            });
    }
    */

    return (
        <div id="page-wrapper">
            <div className="row">
                {/*  page header */}
                <div className="col-lg-12">
                    <h1 className="page-header">Manage User</h1>
                </div>
                {/* end  page header */}
            </div>
            <div className="row">
                <div className="col-lg-12">
                    {/* Advanced Tables */}
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Manage User
                        </div>


                        <div className="panel-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered table-hover" id="dataTables-example">
                                    <thead>
                                        <tr>
                                            <th>User Id</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Password</th>
                                            <th>Mobile</th>

                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {

                                            data.map((item, index, entarr) => {
                                                return (
                                                    <tr className="odd gradeX">
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.password}</td>
                                                        <td>{item.mobile}</td>

                                                        <td>
                                                            <button className="btn btn-danger m-2" onClick={() => status(item.id)}>{item.status}</button>
                                                            <button className="btn btn-danger m-2" onClick={() => ondelete(item.id)}>Delete</button>
                                                            <button className="btn btn-danger m-2" onClick={() => onedit(item.id)} data-toggle="modal" data-target="#myModal">Edit</button>

                                                            <div className="modal" id="myModal">
                                                                <div className="modal-dialog">
                                                                    <div className="modal-content">
                                                                        {/* Modal Header */}
                                                                        <div className="modal-header">
                                                                            <h4 className="modal-title">Modal Heading</h4>
                                                                            <button type="button" className="close" data-dismiss="modal">×</button>
                                                                        </div>
                                                                        {/* Modal body */}
                                                                        <div className="modal-body">
                                                                            <form method='post'>
                                                                                <div className="row g-3">
                                                                                    <div className="col-sm-12">
                                                                                        <input type="text" value={formvalue.name} onChange={onchange} name="name" className="form-control bg-light border-0 px-4" placeholder="Your Name" style={{ height: 55 }} />
                                                                                    </div>
                                                                                    <div className="col-sm-12">
                                                                                        <input type="email" value={formvalue.email} onChange={onchange} name="email" className="form-control bg-light border-0 px-4" placeholder="Your Email" style={{ height: 55 }} />
                                                                                    </div>
                                                                                    <div className="col-sm-12">
                                                                                        <input type="password" value={formvalue.password} onChange={onchange} name="password" className="form-control bg-light border-0 px-4" placeholder="Password" style={{ height: 55 }} />
                                                                                    </div>
                                                                                    <div className="col-sm-12">
                                                                                        <input type="number" value={formvalue.mobile} onChange={onchange} name="mobile" className="form-control bg-light border-0 px-4" placeholder="mobile" style={{ height: 55 }} />
                                                                                    </div>
                                                                                    <div className="col-sm-12">
                                                                                        <button onClick={onupdate} data-dismiss="modal" className="btn btn-primary border-inner w-100 py-3" type="submit">Save</button>
                                                                                    </div>

                                                                                </div>
                                                                            </form>

                                                                        </div>
                                                                        {/* Modal footer */}
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                )
                                            })

                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>
                    {/*End Advanced Tables */}
                </div>
            </div>
        </div>

    )
}
