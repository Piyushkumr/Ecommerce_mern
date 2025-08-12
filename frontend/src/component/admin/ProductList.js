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
import { clearErrors, deleteProduct, getAdminProduct } from '../../actions/productAction'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'

const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, products } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted } = useSelector((state) => state.product);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
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
            toast.success("Product deleted successfully");
            navigate("/admin/dashboard");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProduct());
    }, [dispatch, error, deleteError, navigate, isDeleted]);

    const columns = [
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "price",
            headerName: "Price",
            minWidth: 270,
            type: "number",
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
                        <Link to={`/admin/product/${params.row.id}`}><EditIcon /></Link>
                        <Button onClick={() => deleteProductHandler(params.row.id)}><DeleteIcon /></Button>
                    </Fragment>
                )
            }
        },
    ];

    const rows = [];

    products && products.forEach((item) => {
        rows.push({
            id: item._id,
            stock: item.stock,
            price: item.price,
            name: item.name,
        });
    });

    return (
        <Fragment>
            <MetaData title={`ALL PRODUCTS -Admin`} />
            <div className='dashboard'>
                <Sidebar />
                <div className='productListContainer'>
                    <h1 id='productListHeading'>ALL PRODUCTS</h1>

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

export default ProductList;