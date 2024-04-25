import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { GetSubmissionsQuery } from "../gql/graphql";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_SUBMISSION, GET_SUBMISSIONS } from "../garphql";
interface IProps {
  handleEdit: (id: string) => void;
}

function TableComponent({ handleEdit }: Readonly<IProps>) {
  const { loading, error, data } =
    useQuery<GetSubmissionsQuery>(GET_SUBMISSIONS);

  const [
    mutateFunctionDelete,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_SUBMISSION, {
    refetchQueries: [GET_SUBMISSIONS],
  });
  if (loading) return <div>loading</div>;
  const { submissions } = data!;

  const handleDelete = (id: string) => {
    mutateFunctionDelete({ variables: { deleteSubmissionId: id } });
  };

  return (
    <>
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
    </>
  );
}

export { TableComponent };
