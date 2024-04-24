import "./App.css";
import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";
import { CreateSubmissionMutation, GetSubmissionsQuery } from "./gql/graphql";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { faker } from "@faker-js/faker";

import {
  Box,
  Button,
  Container,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import LoadingButton from "@mui/lab/LoadingButton";

function App() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const GET_SUBMISSIONS = gql`
    query GetSubmissions {
      submissions {
        id
        submittedAt
        data
      }
    }
  `;

  const GET_SUBMISSION = gql`
    query Submission($submissionId: ID!) {
      submission(id: $submissionId) {
        data
      }
    }
  `;

  const DELETE_SUBMISSION = gql`
    mutation DeleteSubmission($deleteSubmissionId: ID!) {
      deleteSubmission(id: $deleteSubmissionId)
    }
  `;

  const UPDATE_SUBMISSION = gql`
    mutation UpdateSubmission($updateSubmissionId: ID!, $data: JSON) {
      updateSubmission(id: $updateSubmissionId, data: $data) {
        id
        data
        submittedAt
      }
    }
  `;

  const CREATE_SUBMISSION = gql`
    mutation CreateSubmission($submittedAt: DateTime!, $data: JSON!) {
      createSubmission(submittedAt: $submittedAt, data: $data) {
        id
        submittedAt
        data
      }
    }
  `;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updateDetail, setUpdateDetail] = useState({
    id: "",
    name: "",
    instagram: "",
  });

  const { loading, error, data } =
    useQuery<GetSubmissionsQuery>(GET_SUBMISSIONS);

  const [
    getSubmission,
    {
      loading: loadingSubmission,
      error: errorSubmission,
      data: dataSubmission = {},
    },
  ] = useLazyQuery(GET_SUBMISSION, {
    fetchPolicy: "no-cache",
  });

  const [
    mutateFunctionDelete,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_SUBMISSION, {
    refetchQueries: [GET_SUBMISSIONS],
  });

  const [
    mutateFunctionCreate,
    { data: dataCreate, loading: loadingCreate, error: errorCreate },
  ] = useMutation<CreateSubmissionMutation>(CREATE_SUBMISSION, {
    update(cache, { data }) {
      const result = cache.readQuery<GetSubmissionsQuery>({
        query: GET_SUBMISSIONS,
      });

      cache.writeQuery({
        query: GET_SUBMISSIONS,
        data: {
          submissions: [...(result?.submissions || []), data?.createSubmission],
        },
      });
    },
  });

  const [
    mutateFunctionUpdate,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_SUBMISSION, {
    refetchQueries: [GET_SUBMISSIONS],
  });

  if (loading) return <div>loading...</div>;

  const { submissions } = data!;

  const handleDelete = (id: string) => {
    mutateFunctionDelete({ variables: { deleteSubmissionId: id } });
  };

  const handleEdit = async (id: string) => {
    const detailToUpdate = await getSubmission({
      variables: { submissionId: id },
    });
    setUpdateDetail({
      name: detailToUpdate?.data?.submission?.data?.name,
      instagram: detailToUpdate?.data?.submission?.data?.instagram,
      id,
    });
    handleOpen();
  };

  const handleChange = (e: any) => {
    setUpdateDetail((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpdate = () => {
    mutateFunctionUpdate({
      variables: { updateSubmissionId: updateDetail.id, data: updateDetail },
    });
    handleClose();
  };

  const handleCreate = async () => {
    await mutateFunctionCreate({
      variables: {
        submittedAt: new Date(),
        data: {
          name: faker.person.fullName(),
          instagram: faker.internet.userName(),
        },
      },
    });
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          padding: "20px",
        }}
      >
        <LoadingButton
          loading={loadingCreate}
          loadingPosition="start"
          variant="contained"
          color="success"
          size="large"
          sx={{ width: "237px" }}
          onClick={handleCreate}
        >
          Create Submission
        </LoadingButton>
      </Box>
      {submissions.length > 0 && (
        <TableContainer sx={{ maxWidth: 2000 }} component={Paper}>
          <Table sx={{ maxWidth: 2000 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Submitted At</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Instagram</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.id}</TableCell>
                  <TableCell>{submission.submittedAt}</TableCell>
                  <TableCell>{submission.data.name}</TableCell>
                  <TableCell>{submission.data.instagram}</TableCell>
                  <TableCell>
                    <DeleteForeverIcon
                      onClick={() => handleDelete(submission.id)}
                    />
                    <EditIcon
                      onClick={() => handleEdit(submission.id)}
                      sx={{ marginLeft: "10px" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            label="Name"
            name="name"
            variant="standard"
            value={updateDetail.name}
            onChange={handleChange}
          />
          <TextField
            sx={{ margin: "0px 0px 20px 0px" }}
            label="Instagram"
            variant="standard"
            name="instagram"
            value={updateDetail.instagram}
            onChange={handleChange}
          />
          <Grid2 container spacing={4}>
            <Grid2>
              <Button variant="contained" onClick={handleUpdate}>
                Update
              </Button>
            </Grid2>
            <Grid2>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </Modal>
    </Container>
  );
}

export default App;
