import React, { Fragment, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { DataGrid } from '@mui/x-data-grid'
import { toast } from 'react-toastify'
import { clearErrors, deleteOrder, getAllOrders } from '../../actions/orderAction'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'

const OrderList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
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
            toast.success("Order deleted successfully");
            navigate("/admin/orders");
            dispatch({ type: DELETE_ORDER_RESET });
        }

        dispatch(getAllOrders());
    }, [dispatch, error, deleteError, navigate, isDeleted]);

    const columns = [
                {
            field: "id",
            headerName: "Order ID",
            minWidth: 300,
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.row.status === "Delivered"
                ? "greenColor"
                : "redColor";
            }
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
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
                        <Link to={`/admin/order/${params.row.id}`}><EditIcon /></Link>
                        <Button onClick={() => deleteOrderHandler(params.row.id)}><DeleteIcon /></Button>
                    </Fragment>
                )
            }
        },
    ];

    const rows = [];

    orders && orders.forEach((item) => {
        rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus,
        });
    });

    return (
        <Fragment>
            <MetaData title={`ALL ORDERS -Admin`} />
            <div className='dashboard'>
                <Sidebar />
                <div className='productListContainer'>
                    <h1 id='productListHeading'>ALL ORDERS</h1>

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

export default OrderList;