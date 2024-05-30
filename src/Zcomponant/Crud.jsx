import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";


function Crud() {

    let email = useRef();
    let password = useRef();

    const [data, setdata] = useState([]);
    const [view, setview] = useState()

    let getdata = () => {
        axios.get("http://localhost:3001/v1/user/getuser").then((res) => {
            setdata(res.data.result)
        })
    }

    useEffect(() => {
        getdata()
    }, [])

    console.log(data);

    let handlesubmit = async () => {
        let object = {
            email: email.current.value,
            password: password.current.value
        }
        if (object.email == "" || object.password == "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `plz complete all field`
            });
        } else {

            try {
                let res = await axios.post("http://localhost:3001/v1/user/adduser", object)
                setdata((storedata) => [...storedata, res.data.result])
                if (res) {
                    Swal.fire({
                        title: "Good job!",
                        text: "add user success",
                        icon: "success"
                    });
                }

            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${error.response.data.message}`
                });
            }

        }
    }

    let handleDelete = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    action: axios.delete(`http://localhost:3001/v1/user/deleteuser/${id}`).then(() => {
                        setdata(data.filter((val) => val._id !== id))
                    }),
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });


    }

    let viewdata = (id) => {

        let viewdata = data.find((val) => val._id == id);
        setview(viewdata)


    }

    let handleview = (e) => {
        setview({ ...view, [e.target.name]: e.target.value })
    }

    let handleupdate = () => {
        axios.put(`http://localhost:3001/v1/user/updateuser/${view._id}`, view).then((res) => {
            // console.log(res.data.result._id);
           console.log("🚀 ~ axios.put ~ res:", res);
           //jyare result moklu je old data melve se
           setdata(data.map((val, ind) => (val._id == res.data.result._id ? { ...view } : val)))

             //   jyare bavkend mathi updated bodymokli hoi tyare
            // setdata(data.map((val,ind)=>(val._id == res.data.result._id ? res.data.updatedata :  val)))


            res ?
                Swal.fire({
                    title: "Good job!",
                    text: " update success",
                    icon: "success"
                })
            
           :
                Swal.fire({
                    title: "Good job!",
                    text: "something went wrong",
                    icon: "error"

                })
            



        }
        )
    }

    return (


        <>

            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-3">
                        <div class="input-group flex-nowrap">
                            <span class="input-group-text" id="addon-wrapping">@</span>
                            <input type="text" class="form-control" placeholder="email" ref={email} aria-label="Username" aria-describedby="addon-wrapping" />
                        </div>
                        <div class="input-group flex-nowrap">
                            <span class="input-group-text" id="addon-wrapping">@</span>
                            <input type="text" class="form-control" placeholder="password" ref={password} aria-label="Username" aria-describedby="addon-wrapping" />
                        </div>

                        <button className="button btn-success " onClick={handlesubmit}>submit</button>
                    </div>
                </div>
            </div>



            <div>
                {
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                                <th>update</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((val, ind) => {
                                    console.log("🚀 ~ data.map ~ val:", val)
                                    return (
                                        <tr>
                                            <th scope="row">{val._id}</th>
                                            <td>{val.email}</td>
                                            <td>{val.password}</td>
                                            <td>
                                                <button className="btn-danger" onClick={() => handleDelete(val._id)}>delete</button>

                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => viewdata(val._id)}>
                                                    update
                                                </button>
                                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div className="container">
                                                                    <div className="row d-flex justify-content-center">
                                                                        <div className="col-8">
                                                                            <div class="input-group flex-nowrap">
                                                                                <span class="input-group-text" id="addon-wrapping">@</span>
                                                                                <input type="text" class="form-control" placeholder="email" aria-label="Username" aria-describedby="addon-wrapping"
                                                                                    name="email" value={view?.email} onChange={handleview} />
                                                                            </div>
                                                                            <div class="input-group flex-nowrap">
                                                                                <span class="input-group-text" id="addon-wrapping">@</span>
                                                                                <input type="text" class="form-control" placeholder="password" aria-label="Username" aria-describedby="addon-wrapping" value={view?.password} name="password" onChange={handleview} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                                                    onClick={handleupdate}
                                                                >Save changes</button>
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
                }
            </div>


        </>
    );
}

export default Crud;








