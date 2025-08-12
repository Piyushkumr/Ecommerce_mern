import React, { Fragment, useEffect, useState } from 'react'
import './ProductReviews.css'
import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { DataGrid } from '@mui/x-data-grid'
import { toast } from 'react-toastify'
import { clearErrors, deleteReviews, getAllReviews } from '../../actions/productAction'
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'

const ProductReviews = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, reviews, loading } = useSelector((state) => state.productReviews);
    const { error: deleteError, isDeleted } = useSelector((state) => state.review);

    const [productId, setProductId] = useState("");

    const deleteReviewHandler = (reviewId, productId) => {
        dispatch(deleteReviews(reviewId, productId));
    }

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(getAllReviews(productId));
    }

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (error) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success("Review deleted successfully");
            navigate("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    }, [dispatch, error, deleteError, navigate, isDeleted, productId]);

    const columns = [
        {
            field: "id",
            headerName: "Review ID",
            minWidth: 180,
            flex: 0.5,
        },
        {
            field: "user",
            headerName: "User",
            minWidth: 180,
            flex: 0.6,
        },
        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "rating",
            headerName: "Rating",
            minWidth: 180,
            type: "number",
            flex: 0.4,
            cellClassName: (params) => {
                return params.row.rating >= 3
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
                        <Button onClick={() => deleteReviewHandler(params.row.id, productId)}><DeleteIcon /></Button>
                    </Fragment>
                )
            }
        },
    ];

    const rows = [];

    reviews && reviews.forEach((item) => {
        rows.push({
            id: item._id,
            rating: item.rating,
            comment: item.comment,
            user: item.name,
        });
    });

    return (
        <Fragment>
            <MetaData title={`ALL REVIEWS -Admin`} />
            <div className='dashboard'>
                <Sidebar />
                <div className='productReviewsContainer'>
                    <form className='productReviewsForm' onSubmit={productReviewsSubmitHandler}>
                        <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
                        <div>
                            <StarIcon />
                            <input type='text'
                                placeholder='Product Id'
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>
                        <Button id='createProductBtn'
                            type='submit'
                            disabled={loading ? true : false || productId === "" ? true : false}
                        >
                            Search
                        </Button>
                    </form>

                    {reviews && reviews.length > 0
                        ? <DataGrid
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
                        : (<h1 className='productReviewsFormHeading'>No Reviews Found</h1>
                        )}
                </div>
            </div>
        </Fragment>
    )
}

export default ProductReviews;