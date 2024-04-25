import { useMutation } from "@apollo/client";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { CreateSubmissionMutation, GetSubmissionsQuery } from "../gql/graphql";
import { CREATE_SUBMISSION, GET_SUBMISSIONS } from "../garphql";
import { faker } from "@faker-js/faker";

function CreateSubmission() {
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
  );
}

export { CreateSubmission };
