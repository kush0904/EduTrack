import { Box, Button, Typography,  TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Global/Header";
import { tokens } from "../theme";
import axios from 'axios';


const MarksForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      await axios.post('http://localhost:4000/api/marks', values);
      console.log('Data sent to the server successfully');
    } catch (error) {
      console.error('Error sending data to the server:', error.message);
    }
  };

  const theme = useTheme();


  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
    <Header title="ACADEMIC DETAILS" subtitle="Complete Your Academic Details" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
                <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
                >
                <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Student Id"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.st_id}
                    name="st_id"
                    error={!!touched.st_id && !!errors.st_id}
                    helperText={touched.st_id && errors.st_id}
                    sx={{ gridColumn: "span 4" }}
                />

                    <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Current Semester"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.semester}
                    name="semester"
                    error={!!touched.semester && !!errors.semester}
                    helperText={touched.semester && errors.semester}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Current CGPA"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cgpa}
                    name="cgpa"
                    error={!!touched.cgpa && !!errors.cgpa}
                    helperText={touched.cgpa && errors.cgpa}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Marks in DSA (out of 60)"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.dsa}
                    name="dsa"
                    error={!!touched.dsa && !!errors.dsa}
                    helperText={touched.dsa && errors.dsa}
                    sx={{ gridColumn: "span 2" }}
                />

                <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Marks in WDMS (out of 60)"
                    onBlur={handleBlur}
                onChange={handleChange}
                value={values.web}
                name="web"
                error={!!touched.web && !!errors.web}
                helperText={touched.web && errors.web}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Marks in NALR (out of 60)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nalr}
                name="nalr"
                error={!!touched.nalr && !!errors.nalr}
                helperText={touched.nalr && errors.nalr}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Marks in English (out of 60)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.english}
                name="english"
                error={!!touched.english && !!errors.english}
                helperText={touched.english && errors.english}
                sx={{ gridColumn: "span 2" }}
              />


            </Box>

            <Typography 
              variant="h4"
              color={colors.grey[300]}
              display="flex"
              justifyContent="center"
              alignItems="center"
              margin="30px"
            >
              ADDITIONAL INFORMATION
            </Typography>

            <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
                >
                

                <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="12th Passing Year"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.pass12}
                    name="pass12"
                    error={!!touched.pass12 && !!errors.pass12}
                    helperText={touched.pass12 && errors.pass12}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="12th Percentage"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.marks12}
                    name="marks12"
                    error={!!touched.marks12 && !!errors.marks12}
                    helperText={touched.marks12 && errors.marks12}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="10th Passing Year"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.pass10}
                    name="pass10"
                    error={!!touched.pass10 && !!errors.pass10}
                    helperText={touched.pass10 && errors.pass10}
                    sx={{ gridColumn: "span 2" }}
                />

                <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="10th Percentage"
                    onBlur={handleBlur}
                onChange={handleChange}
                value={values.marks10}
                name="marks10"
                error={!!touched.marks10 && !!errors.marks10}
                helperText={touched.marks10 && errors.marks10}
                sx={{ gridColumn: "span 2" }}
              />

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Save Details
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};


const initialValues = {
    st_id: "",
    cgpa: "",
    semester: "",
    dsa: "",
    nalr: "",
    web: "",
    english: "",
    pass10: "",
    pass12: "",
    marks10: "",
    marks12: "",
  };
  
  
  const checkoutSchema = yup.object().shape({
    st_id: yup.string().nullable().required("required"),
    cgpa: yup.string().nullable().required("required"),
    semester: yup.string().nullable().required("required"),
    dsa: yup.string().nullable().required("required"),
    web: yup.string().nullable().required("required"),
    nalr: yup.string().nullable().required("required"),
    english: yup.string().nullable().required("required"),
    pass10: yup.string().nullable().required("required"),
    pass12: yup.string().nullable().required("required"),
    marks10: yup.string().nullable().required("required"),
    marks12: yup.string().nullable().required("required"),
  });

export default MarksForm;