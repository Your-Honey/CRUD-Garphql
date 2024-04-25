import "./App.css";
import { useMutation, useLazyQuery } from "@apollo/client";
import { Container } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { CreateSubmission, TableComponent, UpdateModal } from "./components";
import { GET_SUBMISSION, GET_SUBMISSIONS, UPDATE_SUBMISSION } from "./garphql";

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updateDetail, setUpdateDetail] = useState({
    id: "",
    name: "",
    instagram: "",
  });

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
    mutateFunctionUpdate,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_SUBMISSION, {
    refetchQueries: [GET_SUBMISSIONS],
  });

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  return (
    <Container>
      <CreateSubmission />
      <TableComponent handleEdit={handleEdit} />
      <UpdateModal
        open={open}
        handleClose={handleClose}
        updateDetail={updateDetail}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
      />
    </Container>
  );
}

export default App;
