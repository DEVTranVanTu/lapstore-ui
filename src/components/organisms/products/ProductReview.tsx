import FlexBox from '@Atoms/ui/FlexBox'
import { H2, H5 } from '@Atoms/utils/Typography'
import { Box, Button, TextField } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { Review } from '@Models/review'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { getUserInfo } from 'utils'
import * as yup from 'yup'
import ProductComment from './ProductComment'

export interface ProductReviewProps {
  reviews: Review[]
  addReview: Function
}

const ProductReview: React.FC<ProductReviewProps> = ({ reviews, addReview }) => {
  const { query } = useRouter()
  const productId = query.id
    ?.slice(query.id.indexOf('.') + 1, query.id.length)
    .toString()

  const handleFormSubmit = async (values: any, { resetForm }: any) => {
    const user = getUserInfo()
    if (user && productId && values) {
      const data: Review = {
        userName: user.username,
        userAvatar: user.profile?.photo,
        userId: user._id,
        product: productId,
        review: values.comment,
        rating: values.rating,
      }
      resetForm()

      addReview(data)
    }
  }

  const {
    values,
    errors,
    touched,
    dirty,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: reviewSchema,
    onSubmit: handleFormSubmit,
  })

  return (
    <Box>
      {reviews
        .filter((review) => !!review.review)
        .map((item, ind) => (
          <ProductComment reviews={item} key={ind} />
        ))}

      <H2 fontWeight="600" mt={7} mb={2.5}>
        Write a Review for this product
      </H2>

      <form onSubmit={handleSubmit}>
        <Box mb={2.5}>
          <FlexBox mb={1.5}>
            <H5 color="grey.700" mr={0.75}>
              Your Rating
            </H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <Rating
            color="warn"
            size="medium"
            value={values.rating || 0}
            onChange={(_, value) => setFieldValue('rating', value)}
          />
        </Box>

        <Box mb={3}>
          <FlexBox mb={1.5}>
            <H5 color="grey.700" mr={0.75}>
              Your Review
            </H5>
          </FlexBox>

          <TextField
            name="comment"
            placeholder="Write a review here..."
            variant="outlined"
            multiline
            fullWidth
            rows={8}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.comment || ''}
            error={!!touched.comment && !!errors.comment}
            helperText={touched.comment && errors.comment}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!(dirty && isValid)}
        >
          Submit
        </Button>
      </form>
    </Box>
  )
}

const initialValues = {
  rating: 0,
  comment: '',
  date: new Date().toISOString(),
}

const reviewSchema = yup.object().shape({
  rating: yup.number().required('required'),
  comment: yup.string().notRequired(),
})

export default ProductReview
