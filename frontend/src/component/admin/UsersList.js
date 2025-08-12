import React, { Fragment, useEffect } from 'react'
import './ProductList.css'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { DataGrid } from '@mui/x-data-grid'
import { toast } from 'react-toastify'
import { clearErrors, deleteUser, getAllUsers } from '../../actions/userAction'
import { DELETE_USER_RESET } from '../../constants/userConstants'

const UsersList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, users } = useSelector((state) => state.allUsers);
    const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (error) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }
        if(isDeleted){
            toast.success(message);
            navigate("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers());
    }, [dispatch, error, navigate, isDeleted, deleteError, message]);

    const columns = [
        {
            field: "id",
            headerName: "User ID",
            minWidth: 180,
            flex: 0.8,
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.row.role === "admin"
                ? "greenColor"
                : "redColor";
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/user/${params.row.id}`}><EditIcon /></Link>
                        <Button onClick={() => deleteUserHandler(params.row.id)}><DeleteIcon /></Button>
                    </Fragment>
                )
            }
        },
    ];

    const rows = [];

    users && users.forEach((item) => {
        rows.push({
            id: item._id,
            role: item.role,
            email: item.email,
            name: item.name,
        });
    });

    return (
        <Fragment>
            <MetaData title={`ALL USERS -Admin`} />
            <div className='dashboard'>
                <Sidebar />
                <div className='productListContainer'>
                    <h1 id='productListHeading'>ALL USERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSizeOptions={[]}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 10, page: 0 },
                            },
                        }}
                        disableRowSelectionOnClick
                        autoHeight
                        className="productListTable"
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default UsersList;